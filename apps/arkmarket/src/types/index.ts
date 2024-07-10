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
  buy_in_progress: boolean;
  created_timestamp: number | null;
  floor: string;
  has_offer: boolean;
  is_listed: boolean;
  listing: {
    currency_address: string | null;
    end_amount: string | null;
    end_date: number | null;
    is_auction: boolean;
    order_hash: string;
    start_amount: string | null;
    start_date: number | null;
  };
  owner: string;
  top_offer: {
    amount: string;
    currency_address: string;
    end_date: number;
    order_hash: string;
    start_date: number;
  };
  updated_timestamp: number;
}

export interface CollectionTokenMarketApiResponse {
  data: TokenMarketData;
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
