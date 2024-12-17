import { Node, Edge, MarkerType } from 'reactflow'

// Constants for positioning
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800
const LEFT_MARGIN = 50
const TOP_MARGIN = 150
const PLATFORM_X = 300
const CENTER_Y = CANVAS_HEIGHT / 2
const BANK_Y = CENTER_Y + 200

// Node size constants
const USER_NODE_HEIGHT = 50
const PLATFORM_NODE_HEIGHT = 80

// Helper function to vertically align nodes
const alignNodesByMidpoint = (baseY: number, nodeHeight: number) => {
  return baseY - (nodeHeight / 2)
}

export const directNodes: Node[] = [
  // User
  {
    id: 'user',
    position: {
      x: LEFT_MARGIN,
      y: alignNodesByMidpoint(CENTER_Y, USER_NODE_HEIGHT) - 7
    },
    data: { label: 'User' },
    type: 'user'
  },

  // Platform
  {
    id: 'platform',
    position: {
      x: PLATFORM_X,
      y: alignNodesByMidpoint(CENTER_Y, PLATFORM_NODE_HEIGHT)
    },
    data: { label: 'Direct Account' },
    type: 'platform'
  },

  // Stripe
  {
    id: 'stripe',
    position: { x: PLATFORM_X, y: TOP_MARGIN },
    data: { label: 'Stripe' },
    type: 'stripe'
  },

  // Platform Banks
  {
    id: 'bankUSD',
    position: { x: PLATFORM_X - 100, y: BANK_Y },
    data: { label: 'USD Bank' },
    type: 'platformBank'
  },
  {
    id: 'bankEUR',
    position: { x: PLATFORM_X + 50, y: BANK_Y },
    data: { label: 'EUR Bank' },
    type: 'platformBank'
  },
  {
    id: 'bankGBP',
    position: { x: PLATFORM_X + 200, y: BANK_Y },
    data: { label: 'GBP Bank' },
    type: 'platformBank'
  },

  // Recipient
  {
    id: 'recipient',
    position: { 
      x: PLATFORM_X + 300,
      y: alignNodesByMidpoint(CENTER_Y, PLATFORM_NODE_HEIGHT) - 9
    },
    data: { 
      label: 'Recipient'
    },
    type: 'recipient'
  }
]

export const directEdges: Edge[] = [
  // User to Platform
  {
    id: 'user-platform',
    source: 'user',
    target: 'platform',
    sourceHandle: 'user-right',
    targetHandle: 'platform-left',
    label: `Pay-in
    Direct Charge
    Presentment Currency: USD`,
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Direct payment transfer' }
  },

  // Platform to Stripe
  {
    id: 'platform-stripe',
    source: 'platform',
    target: 'stripe',
    sourceHandle: 'platform-top',
    targetHandle: 'stripe-bottom',
    label: 'Stripe fee',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Fee processing' }
  },

  // Platform to Banks
  {
    id: 'platform-bankUSD',
    source: 'platform',
    target: 'bankUSD',
    sourceHandle: 'platform-bottom-1',
    targetHandle: 'platform-bank-top',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'USD settlement' }
  },
  {
    id: 'platform-bankEUR',
    source: 'platform',
    target: 'bankEUR',
    sourceHandle: 'platform-bottom-2',
    targetHandle: 'platform-bank-top',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'EUR settlement' }
  },
  {
    id: 'platform-bankGBP',
    source: 'platform',
    target: 'bankGBP',
    sourceHandle: 'platform-bottom-3',
    targetHandle: 'platform-bank-top',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'GBP settlement' }
  },

  // Platform to Recipient
  {
    id: 'platform-recipient',
    source: 'platform',
    target: 'recipient',
    sourceHandle: 'platform-right-1',
    targetHandle: 'recipient-left',
    label: 'Recipient\nPayout',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Direct payout to recipient' }
  }
] 