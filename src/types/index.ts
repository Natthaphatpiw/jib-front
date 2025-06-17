export interface Product {
  id: string;
  brand: string;
  category: string;
  detail: string;
  discount: number;
  image: string;
  link: string;
  name: string;
  price: number;
  sellprice: number;
  sku: string;
  views: number;
  warranty: string;
}

export interface SearchResponse {
  products: Product[];
  explanation: string;
  total_found: number;
  recommendations: RecommendationItem[];
}

export interface RecommendationItem {
  product_id: string;
  rank: number;
  score: number;
  reasons: string[];
  pros: string[];
  cons: string[] | null;
}

export interface SearchRequest {
  query: string;
}

export interface FilterResponse {
  mongodb_filter: object;
  explanation: string;
}