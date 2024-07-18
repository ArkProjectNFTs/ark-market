export interface Collection {
  address: string;
  collection_name: string;
  contract_symbol: string;
  floor?: number;
  image?: string;
  listed_items: number;
  listed_percentage: number;
  marketcap: number;
  owner_count: number;
  sales_7d: number;
  token_count: number;
  total_sales: number;
  total_volume: number;
  volume_7d_eth: number;
}

export interface PortfolioCollection {
  address: string;
  image?: string;
  collection_name: string;
  floor?: number;
  user_listed_tokens: number;
  user_token_count: number;
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

interface TokenMetadataAttribute {
  display_type?: string;
  trait_type?: string;
  value?: string;
}

export interface TokenMetadata {
  image: string;
  name: string;
  animation_key?: string;
  animation_url?: string;
  image_key?: string;
  attributes: TokenMetadataAttribute[];
}

export interface Token {
  collection_image: string;
  collection_name: string;
  collection_address: string;
  last_price?: string;
  metadata?: TokenMetadata;
  owner: string;
  price?: string;
  top_offer?: string;
  token_id: string;
}

export interface CollectionToken {
  collection_address: string;
  floor_difference?: number;
  last_price?: string;
  listed_at?: number;
  metadata?: TokenMetadata;
  owner: string;
  price?: string;
  token_id: string;
}

export interface PortfolioToken {
  collection_name: string;
  collection_address: string;
  best_offer?: number;
  floor?: number;
  list_price?: number;
  owner: string;
  received_at?: string;
  token_id: string;
  metadata?: TokenMetadata;
}

export interface TokenOffer {
  expire_at: number;
  floor_difference?: number;
  hash: string;
  offer_id: number;
  price: string;
  source: string;
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

export type TokenActivityType =
  | "LISTING"
  | "OFFER"
  | "CANCELLED"
  | "FULFILL"
  | "TRANSFER"
  | "EXECUTED"
  | "MINT";

export interface TokenActivity {
  activity_type: TokenActivityType;
  from: string | null;
  price: string | null;
  time_stamp: number;
  to: string | null;
  transaction_hash: string | null;
}
