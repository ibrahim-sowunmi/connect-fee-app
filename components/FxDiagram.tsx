'use client'
import React, { useState } from 'react'
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import InfoPanel from './InfoPanel'
import ConfigMenu from './ConfigMenu'
import { initialNodes, initialEdges } from '@/lib/flowData'
import { directNodes, directEdges } from '@/lib/directFlowData'
import { UserNode, ConnectedAccountNode, PlatformNode, StripeNode, PlatformBankNode, ConnectedBankNode, RecipientNode } from './nodes'
import CustomBackground from './CustomBackground'
import CustomEdge from '@/components/edges/CustomEdge'
import { directChargesNodes, directChargesEdges } from '@/lib/directChargesFlowData'

const nodeTypes = {
  user: UserNode,
  platformBank: PlatformBankNode,
  connectedBank: ConnectedBankNode,
  platform: PlatformNode,
  stripe: StripeNode,
  connectedAccount: ConnectedAccountNode,
  recipient: RecipientNode
}

const edgeTypes = {
  custom: CustomEdge,
}

export default function FxDiagram() {
  const [integrationType, setIntegrationType] = useState<'connect' | 'direct'>('connect')
  const [fundFlow, setFundFlow] = useState<'direct' | 'destination' | 'separate'>('direct')
  const [nodes, setNodes, onNodesChange] = useNodesState(integrationType === 'connect' ? initialNodes : directNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(integrationType === 'connect' ? initialEdges : directEdges)
  const [selectedElement, setSelectedElement] = useState<any>(null)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [userCountry, setUserCountry] = useState('US')
  const [presentmentCurrency, setPresentmentCurrency] = useState('USD')

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedElement({ type: 'node', data: node })
  }

  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedElement({ type: 'edge', data: edge })
  }

  const getNodesAndEdges = (type: 'connect' | 'direct', flow: 'direct' | 'destination' | 'separate') => {
    if (type === 'direct') {
      const filteredNodes = directNodes.filter(node => {
        return !node.id.includes('connectedAccount') && !node.id.includes('gbpBank')
      })
      
      const filteredEdges = directEdges.filter(edge => {
        return !edge.id.includes('connected')
      })
      
      return { nodes: filteredNodes, edges: filteredEdges }
    } else {
      if (flow === 'direct') {
        return { nodes: directChargesNodes, edges: directChargesEdges }
      }
      return { nodes: initialNodes, edges: initialEdges }
    }
  }

  const handleIntegrationTypeChange = (type: 'connect' | 'direct') => {
    setIntegrationType(type)
    const { nodes: newNodes, edges: newEdges } = getNodesAndEdges(type, fundFlow)
    setNodes(newNodes)
    setEdges(newEdges)
    setSelectedElement(null)
  }

  const handleFundFlowChange = (flow: 'direct' | 'destination' | 'separate') => {
    setFundFlow(flow)
    if (integrationType === 'connect') {
      const { nodes: newNodes, edges: newEdges } = getNodesAndEdges('connect', flow)
      setNodes(newNodes)
      setEdges(newEdges)
      setSelectedElement(null)
    }
  }

  const handleUserCountryChange = (country: string) => {
    setUserCountry(country)
    setNodes(nodes.map(node => {
      if (node.id === 'user') {
        return {
          ...node,
          data: {
            ...node.data,
            country: country
          }
        }
      }
      return node
    }))
  }

  const handlePresentmentCurrencyChange = (currency: string) => {
    setPresentmentCurrency(currency)
    setEdges(edges.map(edge => {
      if (edge.id === 'user-platform') {
        return {
          ...edge,
          label: `Pay-in\nPresentment Currency: ${currency}`
        }
      }
      return edge
    }))
  }

  const handlePlatformCountryChange = (country: string) => {
    setNodes(nodes.map(node => {
      if (node.id === 'platform') {
        return {
          ...node,
          data: {
            ...node.data,
            country: country
          }
        }
      }
      return node
    }))
  }

  return (
    <div className="flex h-screen relative" suppressHydrationWarning={true}>
      <div className="absolute top-4 w-full pl-2 z-30">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="p-2 bg-transparent hover:bg-white/10 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg shadow-sm">
              Simple Fund Flow Fee Map
            </h1>
            <p className="text-xs text-red-600 -mt-2 py-2 px-4">Current as of 16th Dec 2024. For educational purposes only. Please consult with a SA for confirmation.</p>
          </div>
        </div>
      </div>

      <div className={`flex w-full transition-opacity duration-300 ${isConfigOpen ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex-1 h-screen">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodesConnectable={false}
            nodesDraggable={false}
            fitView={false}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <CustomBackground />
            <Controls />
          </ReactFlow>
        </div>
        <InfoPanel selectedElement={selectedElement} />
      </div>

      <ConfigMenu 
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onIntegrationTypeChange={handleIntegrationTypeChange}
        integrationType={integrationType}
        onUserCountryChange={handleUserCountryChange}
        onPresentmentCurrencyChange={handlePresentmentCurrencyChange}
        onPlatformCountryChange={handlePlatformCountryChange}
        onFundFlowChange={handleFundFlowChange}
        fundFlow={fundFlow}
      />
    </div>
  )
}