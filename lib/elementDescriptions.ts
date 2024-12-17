interface ElementDescription {
  title: string;
  description: string;
}

interface Descriptions {
  nodes: {
    [key: string]: ElementDescription;
  };
  edges: {
    [key: string]: ElementDescription;
  };
}

export const elementDescriptions: Descriptions = {
  nodes: {
    user: {
      title: "User",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    },
    platform: {
      title: "Multi-Currency Platform",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
    },
    stripe: {
      title: "Stripe Integration",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
    },
    bankUSD: {
      title: "USD Settlement Bank",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus."
    },
    bankEUR: {
      title: "EUR Settlement Bank",
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    bankGBP: {
      title: "GBP Settlement Bank",
      description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt."
    },
    connectedAccount1: {
      title: "Connected Account 1",
      description: "Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
    },
    connectedAccount2: {
      title: "Connected Account 2",
      description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas."
    },
    gbpBank1: {
      title: "GBP Bank 1",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores."
    },
    gbpBank2: {
      title: "GBP Bank 2",
      description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit."
    },
    connectedAccount: {
      title: "Connected Account (Direct Charges)",
      description: "In Direct Charges, the Connected Account receives the payment directly from the customer. The Connected Account is responsible for the Stripe fee and pays an application fee to the platform. This setup is ideal when the Connected Account needs to receive funds immediately and handle their own refunds."
    },
    recipient: {
      title: "Recipient",
      description: "The final destination for funds in the payment flow. Recipients can be individuals, businesses, or marketplace sellers who receive payouts through the platform. They can receive funds in their local currency, with automatic FX conversion handled by the platform."
    }
  },
  edges: {
    "user-platform": {
      title: "Initial Payment Flow",
      description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
    },
    "platform-stripe": {
      title: "Fee Processing",
      description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    "platform-bankUSD": {
      title: "USD Settlement Flow",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo."
    },
    "platform-bankEUR": {
      title: "EUR Settlement Flow",
      description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est."
    },
    "platform-bankGBP": {
      title: "GBP Settlement Flow",
      description: "Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint."
    },
    "platform-connected1": {
      title: "Cross-Border Payment Route",
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    "platform-connected2": {
      title: "Direct Payment Route",
      description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt."
    },
    "connected1-bank1": {
      title: "Cross-Border Settlement",
      description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur."
    },
    "connected2-bank2": {
      title: "Direct Settlement",
      description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat."
    },
    "user-connected": {
      title: "Direct Charge Flow",
      description: "The payment is made directly from the customer to the Connected Account. This is different from other flows where the payment goes to the platform first. The charge appears on the customer's statement with the Connected Account's name (if they have statement descriptor enabled)."
    },
    "connected-platform": {
      title: "Application Fee",
      description: "A portion of the payment amount is automatically transferred to the platform as an application fee. This fee is configurable and can be a percentage and/or a fixed amount. The application fee is transferred immediately when the charge succeeds."
    },
    "connected-stripe": {
      title: "Stripe Processing Fee",
      description: "The Stripe fee is deducted from the Connected Account's balance, not the platform's. The fee varies by country and payment method. For example, in the US it's typically 2.9% + 30¢ for card payments. The Connected Account sees this fee in their Stripe dashboard."
    },
    "platform-recipient": {
      title: "Recipient Payout",
      description: "The transfer of funds from the platform to the recipient's bank account. This can be a standard payout (1-2 business days), instant payout (if eligible), or cross-border payout with automatic currency conversion. Payout timing and fees vary by recipient country and payout method."
    },
    "connected-recipient": {
      title: "Connected Account Recipient Payout",
      description: "Direct payout from a Connected Account to the recipient. In this flow, the Connected Account handles the payout directly, including any currency conversion fees. This is common in marketplace scenarios where sellers manage their own payouts."
    },
    "connected-bankUSD": {
      title: "Connected Account USD Settlement",
      description: "Settlement flow from Connected Account to its USD bank account. Funds are automatically paid out based on the Connected Account's payout schedule and settings."
    },
    "connected-bankEUR": {
      title: "Connected Account EUR Settlement",
      description: "Settlement flow from Connected Account to its EUR bank account. Supports SEPA payouts with automatic currency conversion if needed."
    },
    "connected-bankGBP": {
      title: "Connected Account GBP Settlement",
      description: "Settlement flow from Connected Account to its GBP bank account. Supports Faster Payments for rapid settlement in the UK."
    },
    
  }
}; 