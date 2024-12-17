import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';
import { useState } from 'react';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
  data,
  label,
  selected
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calculate midpoint for additional markers
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  // Add selected state to edge style
  const edgeStyle = {
    ...style,
    stroke: selected ? '#5167FC' : style.stroke || '#000',
    strokeWidth: selected ? 1.5 : 0.5,
  };

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        markerStart={markerStart} 
        style={edgeStyle} 
      />
      {data?.bidirectional && (
        <>
          <marker
            id={`arrow-${id}`}
            markerWidth="12"
            markerHeight="12"
            refX="6"
            refY="6"
            orient="auto"
          >
            <path
              d="M2,2 L10,6 L2,10 L6,6 L2,2"
              fill="black"
              className="transition-colors duration-300"
            />
          </marker>
          <circle
            cx={midX}
            cy={midY}
            r="4"
            fill="black"
            className="transition-colors duration-300"
          />
        </>
      )}
      <EdgeLabelRenderer>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            fontSize: '0.65rem',
          }}
          className={`nodrag nopan bg-white px-2 py-1 text-center rounded-md shadow-sm border 
            ${isHovered ? 'border-black ring-0.5 ring-black' : 'border-gray-200'}
            whitespace-pre-line cursor-pointer transition-all ease-in-out duration-100`}
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
} 