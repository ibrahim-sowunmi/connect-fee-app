import { Node, Edge, MarkerType } from 'reactflow'

// Constants for positioning
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800
const LEFT_MARGIN = 50
const TOP_MARGIN = 150
const PLATFORM_X = 300
const CENTER_Y = CANVAS_HEIGHT / 2
const BANK_Y = CENTER_Y + 200
const CONNECTED_ACCOUNT_X = 700
const CONNECTED_ACCOUNT_OFFSET = 100

// Node size constants
const USER_NODE_HEIGHT = 50  // Circle height
const PLATFORM_NODE_HEIGHT = 80  // Rectangle height
const CONNECTED_ACCOUNT_HEIGHT = 60
const BANK_NODE_HEIGHT = 40

// Helper function to vertically align nodes
const alignNodesByMidpoint = (baseY: number, nodeHeight: number) => {
  return baseY - (nodeHeight / 2)
}

export const initialNodes: Node[] = [
  // Left side - User (aligned with Platform)
  {
    id: 'user',
    position: {
      x: 20,
      y: alignNodesByMidpoint(CENTER_Y, USER_NODE_HEIGHT) - 7
    },
    data: { label: 'User' },
    type: 'user'
  },

  // Center left - Platform
  {
    id: 'platform',
    position: {
      x: PLATFORM_X,
      y: alignNodesByMidpoint(CENTER_Y, PLATFORM_NODE_HEIGHT)
    },
    data: {
      label: 'Platform',
      country: 'US'
    },
    type: 'platform'
  },

  // Top center - Stripe
  {
    id: 'stripe',
    position: { x: PLATFORM_X, y: TOP_MARGIN },
    data: { label: 'Stripe' },
    type: 'stripe'
  },

  // Platform Banks (with top handles)
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

  // Connected Accounts - closer together but still equidistant from center
  {
    id: 'connectedAccount1',
    position: {
      x: CONNECTED_ACCOUNT_X,
      y: alignNodesByMidpoint(CENTER_Y - CONNECTED_ACCOUNT_OFFSET, CONNECTED_ACCOUNT_HEIGHT)
    },
    data: {
      label: 'Connected Account 1\nUSD/GBP/EUR',
      country: 'GB'
    },
    type: 'connectedAccount'
  },
  {
    id: 'connectedAccount2',
    position: {
      x: CONNECTED_ACCOUNT_X,
      y: alignNodesByMidpoint(CENTER_Y + CONNECTED_ACCOUNT_OFFSET, CONNECTED_ACCOUNT_HEIGHT)
    },
    data: {
      label: 'Connected Account 2\nUSD/GBP/EUR',
      country: 'GB'
    },
    type: 'connectedAccount'
  },

  // Connected Account Banks - adjusted to match new positions
  {
    id: 'gbpBank1',
    position: {
      x: CANVAS_WIDTH - 220,
      y: alignNodesByMidpoint(CENTER_Y - CONNECTED_ACCOUNT_OFFSET, BANK_NODE_HEIGHT)
    },
    data: { label: 'GBP Bank 1' },
    type: 'connectedBank'
  },
  {
    id: 'gbpBank2',
    position: {
      x: CANVAS_WIDTH - 220,
      y: alignNodesByMidpoint(CENTER_Y + CONNECTED_ACCOUNT_OFFSET, BANK_NODE_HEIGHT)
    },
    data: { label: 'GBP Bank 2' },
    type: 'connectedBank'
  },

  // Recipient node
  {
    id: 'recipient',
    position: {
      x: PLATFORM_X + 300,
      y: TOP_MARGIN + 25
    },
    data: {
      label: 'Recipient'
    },
    type: 'recipient'
  },
];

export const initialEdges: Edge[] = [
  // User to Platform
  {
    id: 'user-platform',
    source: 'user',
    target: 'platform',
    sourceHandle: 'user-right',
    targetHandle: 'platform-left',
    label: `Pay-in
    Fund Flow: Destination 
  Presentment Currency: USD`,
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Initial payment transfer' }
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

  // Platform to Platform Banks
  {
    id: 'platform-bankUSD',
    source: 'platform',
    target: 'bankUSD',
    sourceHandle: 'platform-bottom-1',
    targetHandle: 'platform-bank-top',
    label: 'Top-up ↑\nStandard Payout ↓',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    markerStart: { type: MarkerType.ArrowClosed },
    data: {
      description: 'USD settlement and top-up',
      bidirectional: true  // Add this flag to indicate bidirectional flow
    }
  },
  {
    id: 'platform-bankEUR',
    source: 'platform',
    target: 'bankEUR',
    sourceHandle: 'platform-bottom-2',
    targetHandle: 'platform-bank-top',
    label: 'Standard \nPayout',
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
    label: 'MCS \nPayout',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'GBP settlement' }
  },

  // Platform to Connected Accounts
  {
    id: 'platform-connected1',
    source: 'platform',
    target: 'connectedAccount1',
    sourceHandle: 'platform-right-1',
    targetHandle: 'connected-left',
    label: 'Transfers \n Cross Border Payout',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Cross-border routing' }
  },
  {
    id: 'platform-connected2',
    source: 'platform',
    target: 'connectedAccount2',
    sourceHandle: 'platform-right-2',
    targetHandle: 'connected-left',
    label: 'Transfers \n \n Account Debits',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Direct payment routing' }
  },

  // Connected Accounts to Connected Banks
  {
    id: 'connected1-bank1',
    source: 'connectedAccount1',
    target: 'gbpBank1',
    sourceHandle: 'connected-right',
    targetHandle: 'connected-bank-left',
    label: 'Payout \n Fees',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Cross-border settlement' }
  },
  {
    id: 'connected2-bank2',
    source: 'connectedAccount2',
    target: 'gbpBank2',
    sourceHandle: 'connected-right',
    targetHandle: 'connected-bank-left',
    label: 'Instant \n Payout',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Direct settlement' }
  },

  // New edge from platform to connected account 2
  {
    id: 'platform-connected2-alternate',
    source: 'platform',
    target: 'connectedAccount2',
    sourceHandle: 'platform-right-3',
    targetHandle: 'connected-left-2',
    label: 'Alternative Route',
    type: 'custom',
    style: { strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
    data: { description: 'Alternative payment routing' }
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
    data: { description: 'Payout to recipient' }
  },
];