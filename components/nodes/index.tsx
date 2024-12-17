import React from 'react';
import { Handle, Position } from 'reactflow';

// Updated style function to include hover state
const getNodeStyle = (selected: boolean, isHovered: boolean) => ({
  border: selected ? '1.5px solid #5167FC' : '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: selected ? 'none' : (isHovered ? '0 0 0 0.5px rgba(0, 0, 0, 0.8)' : 'none'),
  transition: 'all 0.1s ease-in-out'
});

// Add this style object at the top of the file
const invisibleHandleStyle = {
  opacity: 0,
  width: '1px',  // Small width to maintain clickable area
  height: '1px',  // Small height to maintain clickable area
  background: 'transparent',
  border: 'none'
};

interface UserNodeProps {
  data: {
    label: string
    country?: string
  }
  selected: boolean
}

const getFlagEmoji = (country: string) => {
  switch (country) {
    case 'EU':
      return '🇪🇺'
    case 'GB':
      return '🇬🇧'
    case 'US':
      return '🇺🇸'
    case 'JP':
      return '🇯🇵'
    default:
      return '👤'
  }
}

export function UserNode({ data, selected }: UserNodeProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center bg-white"
        style={{
          border: selected ? '1.5px solid #5167FC' : '1px solid #999',
          transition: 'all 0.15s ease-in-out',
          boxShadow: selected ? 'none' : (isHovered ? '0 0 0 0.5px rgba(0, 0, 0, 0.8)' : 'none')
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-2xl">
          {getFlagEmoji(data.country || 'US')}
        </span>
      </div>

      <div className="absolute w-full text-center mt-2">
        {data.label}
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        id="user-right"
        style={invisibleHandleStyle}
      />
    </div>
  );
}

export function PlatformBankNode({ data, selected }: { data: { label: string }, selected: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Top} 
        id="platform-bank-top"
        style={invisibleHandleStyle}
      />
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center bg-white"
        style={{
          border: selected ? '1.5px solid #5167FC' : '1px solid #999',
          transition: 'all 0.15s ease-in-out',
          boxShadow: selected ? 'none' : (isHovered ? '0 0 0 0.5px rgba(0, 0, 0, 0.8)' : 'none')
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-xl">🏦</span>
      </div>
      <div className="absolute w-full text-center mt-2">
        <div className="text-xs">{data.label}</div>
      </div>
    </div>
  );
}

export function ConnectedBankNode({ data, selected }: { data: { label: string }, selected: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Left} 
        id="connected-bank-left"
        style={invisibleHandleStyle}
      />
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center bg-white"
        style={{
          border: selected ? '1.5px solid #5167FC' : '1px solid #999',
          transition: 'all 0.15s ease-in-out',
          boxShadow: selected ? 'none' : (isHovered ? '0 0 0 0.5px rgba(0, 0, 0, 0.8)' : 'none')
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-xl">🏦</span>
      </div>
      <div className="absolute w-full text-center mt-2">
        <div className="text-xs">{data.label}</div>
      </div>
    </div>
  );
}

export function PlatformNode({ data, selected }: { data: { label: string, country?: string }, selected: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const getFlagEmoji = (country: string) => {
    switch (country) {
      case 'EU':
        return '🇪🇺'
      case 'GB':
        return '🇬🇧'
      case 'US':
        return '🇺🇸'
      case 'JP':
        return '🇯🇵'
      default:
        return '💰'
    }
  }

  return (
    <>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="platform-left"
        style={invisibleHandleStyle}
      />
      <div 
        className="react-flow__node-default whitespace-pre-line flex items-center" 
        style={getNodeStyle(selected, isHovered)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 border border-gray-200">
          <span className="text-lg">{getFlagEmoji(data.country || 'US')}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium">{data.label}</span>
          <span className="text-xxs text-gray-500">USD/GBP/EUR</span>
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Top} 
        id="platform-top"
        style={invisibleHandleStyle}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="platform-right-1"
        style={{ ...invisibleHandleStyle, top: '30%' }}
      />
      <Handle 
        type="source" 
        position={Position.Right}
        id="platform-right-2"
        style={{ ...invisibleHandleStyle, top: '70%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="platform-bottom-1"
        style={{ ...invisibleHandleStyle, left: '25%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom}
        id="platform-bottom-2"
        style={{ ...invisibleHandleStyle, left: '50%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom}
        id="platform-bottom-3"
        style={{ ...invisibleHandleStyle, left: '75%' }}
      />
    </>
  );
}

export function ConnectedAccountNode({ data, selected }: { data: { label: string, country?: string }, selected: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const getFlagEmoji = (country: string) => {
    switch (country) {
      case 'EU':
        return '🇪🇺'
      case 'GB':
        return '🇬🇧'
      case 'US':
        return '🇺🇸'
      case 'JP':
        return '🇯🇵'
      default:
        return '💰'
    }
  }

  return (
    <>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="connected-left"
        style={invisibleHandleStyle}
      />
      <div 
        className="react-flow__node-default whitespace-pre-line flex items-center w-[200px]" 
        style={getNodeStyle(selected, isHovered)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 border border-gray-200">
          <span className="text-lg">{getFlagEmoji(data.country || 'GB')}</span>
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-medium">Connected Account</span>
          <span className="text-xxs text-gray-500">USD/GBP/EUR</span>
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        id="connected-right"
        style={invisibleHandleStyle}
      />
    </>
  );
}

export function StripeNode({ data, selected }: { data: any, selected: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <div 
        className="react-flow__node-default whitespace-pre-line" 
        style={getNodeStyle(selected, isHovered)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.label}
      </div>
      <Handle 
        type="target" 
        position={Position.Bottom} 
        id="stripe-bottom"
        style={invisibleHandleStyle}
      />
    </>
  );
}

export function RecipientNode({ data, selected }: { data: { label: string }, selected: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Left} 
        id="recipient-left"
        style={invisibleHandleStyle}
      />
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center bg-white"
        style={{
          border: selected ? '1.5px solid #5167FC' : '1px solid #999',
          transition: 'all 0.15s ease-in-out',
          boxShadow: selected ? 'none' : (isHovered ? '0 0 0 0.5px rgba(0, 0, 0, 0.8)' : 'none')
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-xl">👤</span>
      </div>
      <div className="absolute w-full text-center mt-2">
        <div className="text-xs font-medium">{data.label}</div>
      </div>
    </div>
  );
}