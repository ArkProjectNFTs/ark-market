export interface Collection {
  address: string;
  floor?: string;
  image?: string;
  is_verified: boolean;
  listed_items: number;
  listed_percentage: number;
  marketcap: number;
  name: string;
  owner_count: number;
  sales_7d: number;
  token_count: number;
  total_sales: number;
  total_volume: number;
  volume_7d_eth: number;
  floor_7d_percentage: string;
}

export type CollectionTrait = Record<string, number>;

export type CollectionTraits = Record<string, CollectionTrait>;

export interface PortfolioCollection {
  address: string;
  image?: string;
  name: string;
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
  animation_key: string | null;
  animation_url: string | null;
  image_key: string | null;
  image_key_540_540?: string | null;
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
  buy_in_progress: boolean;
  collection_address: string;
  collection_name: string;
  floor_difference: number | null;
  last_price?: string;
  is_listed: boolean;
  listed_at?: number;
  listing: {
    is_auction: boolean;
  };
  metadata?: TokenMetadata;
  owner: string;
  price?: string;
  token_id: string;
}

export interface AccountSearchResult {
  owner: string;
  starknet_id: string | null;
  image: string | null;
}

export interface CollectionSearchResult {
  address: string;
  image: string | null;
  is_verified: boolean;
  name: string;
  token_count: number;
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

export type ActivityType =
  | "AUCTION"
  | "BURN"
  | "CANCEL_AUCTION"
  | "CANCEL_OFFER"
  | "CANCELLED"
  | "DELISTING"
  | "EXECUTED"
  | "EXPIRED_OFFER"
  | "EXPIRED_LISTING"
  | "FULFILL"
  | "LISTING"
  | "MINT"
  | "OFFER"
  | "SALE"
  | "TRANSFER";

export interface PortfolioActivity {
  activity_type: ActivityType;
  collection_address: string;
  collection_is_verified: boolean;
  collection_name: string;
  from: string;
  metadata?: TokenMetadata;
  price: string;
  time_stamp: number;
  to: string;
  transaction_hash: string | null;
  token_id: string;
}

export interface CollectionActivity {
  activity_type: ActivityType;
  address: string;
  collection_address: string;
  from: string;
  is_verified: boolean;
  name: string;
  price: string;
  time_stamp: number;
  to: string;
  token_id: string;
  token_metadata: TokenMetadata | null;
  transaction_hash: string | null;
}

export interface TokenOffer {
  expire_at: number;
  floor_difference: number | null;
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

export interface PortfolioStats {
  total_value: string;
}

export interface TokenMarketData {
  buy_in_progress: boolean;
  created_timestamp: number | null;
  floor: string;
  has_offer: boolean;
  is_listed: boolean;
  last_price: string | null;
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

export interface TokenActivity {
  activity_type: ActivityType;
  from: string | null;
  price: string | null;
  time_stamp: number;
  to: string | null;
  transaction_hash: string | null;
}

export interface Filters {
  traits: Record<string, string[]>;
}
