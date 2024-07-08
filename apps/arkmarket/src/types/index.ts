export interface Collection {
  contract_address: string;
  contract_type: string;
  image: string;
  name: string;
  symbol: string;
}

export interface CollectionApiResponse {
  result: Collection;
}

export interface Offer {
  order_hash: string;
  offer_maker: string;
  offer_amount: string;
  offer_quantity: `0x${string}`;
  offer_timestamp: number;
  currency_address: string;
  currency_chain_id: string;
  start_date: number;
  end_date: number;
  status: string;
}

export interface CollectionTokenOffersApiResponse {
  token_address: string;
  token_id: string;
  current_owner: string;
  last_price: null;
  offers: Offer[];
}

export interface Activity {
  event_type: string;
  event_timestamp: number;
  order_status: string;
  previous_owner: string;
  new_owner: string;
  amount: string;
  canceled_reason: string;
  end_amount: string;
  start_date: number;
  end_date: number;
}

export interface CollectionTokenActivityApiResponse {
  token_address: string;
  token_id: string;
  history: Activity[];
}

export interface CollectionTokenApiResponse {
  result: Token;
}

export interface Token {
  contract_address: string;
  token_id: string;
  owner: string;
  metadata?: {
    normalized: {
      image: string;
      name: string;
    };
  };
}

export interface TokenApiResponse {
  result: Token;
}

export interface OwnersTokensApiResponse {
  result: Token[];
}

export interface TokenMarketData {
  token_chain_id: string;
  token_address: string;
  token_id: string;
  listed_timestamp: number;
  updated_timestamp: number;
  current_owner: string;
  last_price: number | null;
  quantity: string;
  order_hash: string;
  start_amount: string;
  end_amount: string;
  start_date: number;
  end_date: number;
  broker_id: string;
  is_listed: boolean;
  has_offer: boolean;
  status: string;
  top_bid: {
    amount: string;
    order_hash: string;
  };
}

export interface ContractInfo {
  contract_address: string;
  contract_type: string;
  image: string;
  name: string;
  symbol: string;
}

export interface PricesResult {
  ethereum: {
    price: number;
  };
  starknet: {
    price: number;
  };
}

export interface SystemStatus {
  status: string;
}
