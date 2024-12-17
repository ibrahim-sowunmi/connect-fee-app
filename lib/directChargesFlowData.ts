import { Node, Edge, MarkerType } from 'reactflow'

// Constants for positioning
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800
const LEFT_MARGIN = 50
const TOP_MARGIN = 150
const CONNECTED_ACCOUNT_X = 300
const CENTER_Y = CANVAS_HEIGHT / 2
const BANK_Y = CENTER_Y + 200
const PLATFORM_X = 700

// Node size constants
const USER_NODE_HEIGHT = 50
const PLATFORM_NODE_HEIGHT = 80
const CONNECTED_ACCOUNT_HEIGHT = 60

// Helper function
const alignNodesByMidpoint = (baseY: number, nodeHeight: number) => {
  return baseY - (nodeHeight / 2)
}

export const directChargesNodes: Node[] = [
  // User
  {
    id: 'user',
    position: {
      x: LEFT_MARGIN,
      y: alignNodesByMidpoint(CENTER_Y, USER_NODE_HEIGHT) + 13
    },
    data: { label: 'User' },
    type: 'user'
  },

  // Platform
  {
    id: 'platform',
    position: {
      x: PLATFORM_X,
      y: alignNodesByMidpoint(CENTER_Y, PLATFORM_NODE_HEIGHT) + 20
    },
    data: { 
      label: 'Platform',
      country: 'US'
    },
    type: 'platform'
  },

  // Stripe
  {
    id: 'stripe',
    position: { x: CONNECTED_ACCOUNT_X, y: TOP_MARGIN },
    data: { label: 'Stripe' },
    type: 'stripe'
  },

  // Connected Account (single, centered)
  {
    id: 'connectedAccount',
    position: {
      x: CONNECTED_ACCOUNT_X,
      y: alignNodesByMidpoint(CENTER_Y, CONNECTED_ACCOUNT_HEIGHT)
    },
    data: { 
      label: 'Connected Account',
      country: 'GB'
    },
    type: 'platform'
  },

  // Recipient
  {
    id: 'recipient',
    position: { 
      x: PLATFORM_X + 300,
      y: alignNodesByMidpoint(CENTER_Y, PLATFORM_NODE_HEIGHT) + 10
    },
    data: { 
      label: 'Recipient'
    },
    type: 'recipient'
  },

  // Platform Banks
  {
    id: 'platformBankUSD',
    position: { 
      x: PLATFORM_X - 100,
      y: BANK_Y 
    },
    data: { label: 'USD Bank' },
    type: 'platformBank'
  },
  {
    id: 'platformBankEUR',
    position: { 
      x: PLATFORM_X + 50,
      y: BANK_Y 
    },
    data: { label: 'EUR Bank' },
    type: 'platformBank'
  },
  {
    id: 'platformBankGBP',
    position: { 
      x: PLATFORM_X + 200,
      y: BANK_Y 
    },
    data: { label: 'GBP Bank' },
    type: 'platformBank'
  },

  // Connected Account Banks
  {
    id: 'connectedBankUSD',
    position: { 
      x: CONNECTED_ACCOUNT_X - 100,
      y: BANK_Y 
    },
    data: { label: 'USD Bank' },
    type: 'platformBank'
  },
  {
    id: 'connectedBankEUR',
    position: { 
      x: CONNECTED_ACCOUNT_X + 50,
      y: BANK_Y 
    },
    data: { label: 'EUR Bank' },
    type: 'platformBank'
  },
  {
    id: 'connectedBankGBP',
    position: { 
      x: CONNECTED_ACCOUNT_X + 200,
      y: BANK_Y 
    },
    data: { label: 'GBP Bank' },
    type: 'platformBank'
  },
]

export const directChargesEdges: Edge[] = [
  // User directly to Connected Account
  {
    id: 'user-connected',
    source: 'user',
    target: 'connectedAccount',
    sourceHandle: 'user-right',
    targetHandle: 'connected-left',
    label: `Direct Charge\nPresentment Currency: USD`,
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Direct charge to connected account' }
  },

  // Connected Account to Platform
  {
    id: 'connected-platform',
    source: 'connectedAccount',
    target: 'platform',
    sourceHandle: 'platform-right-1',
    targetHandle: 'platform-left',
    label: 'Application Fee \n (Optional)',
    type: 'custom',
    style: { strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Platform application fee' }
  },

  // Connected Account to Stripe
  {
    id: 'connected-stripe',
    source: 'connectedAccount',
    target: 'stripe',
    sourceHandle: 'platform-top',
    targetHandle: 'stripe-bottom',
    label: 'Stripe fee',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Stripe processing fee' }
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
    data: { description: 'Platform payout to recipient' }
  },

  // Platform to Banks
  {
    id: 'platform-bankUSD',
    source: 'platform',
    target: 'platformBankUSD',
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
    target: 'platformBankEUR',
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
    target: 'platformBankGBP',
    sourceHandle: 'platform-bottom-3',
    targetHandle: 'platform-bank-top',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'GBP settlement' }
  },

  // Connected Account to Banks
  {
    id: 'connected-bankUSD',
    source: 'connectedAccount',
    target: 'connectedBankUSD',
    sourceHandle: 'platform-bottom-1',
    targetHandle: 'connected-bank-left',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'USD settlement' }
  },
  {
    id: 'connected-bankEUR',
    source: 'connectedAccount',
    target: 'connectedBankEUR',
    sourceHandle: 'platform-bottom-2',
    targetHandle: 'connected-bank-left',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'EUR settlement' }
  },
  {
    id: 'connected-bankGBP',
    source: 'connectedAccount',
    target: 'connectedBankGBP',
    sourceHandle: 'platform-bottom-3',
    targetHandle: 'connected-bank-left',
    label: 'Settlement',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'GBP settlement' }
  },
] 