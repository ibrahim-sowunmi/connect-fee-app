'use client'
import dynamic from 'next/dynamic'
import { Node, Edge } from 'reactflow'
import 'reactflow/dist/style.css'

const ReactFlow = dynamic(
  () => import('reactflow').then((mod) => mod.default),
  { ssr: false }
)

const Controls = dynamic(
  () => import('reactflow').then((mod) => mod.Controls),
  { ssr: false }
)

interface FlowWrapperProps {
  nodes: Node[]
  edges: Edge[]
  nodeTypes: any
  edgeTypes: any
  onNodesChange: any
  onEdgesChange: any
  onNodeClick: any
  onEdgeClick: any
}

export default function FlowWrapper({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  onEdgeClick,
}: FlowWrapperProps) {
  return (
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
      <Controls />
    </ReactFlow>
  )
} 