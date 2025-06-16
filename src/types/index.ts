export interface Product {
  id: number;
  ชื่อสินค้า: string;
  หมวดหมู่: string;
  รูปสินค้า: string;
  คำอธิบายสินค้า: string;
  ราคาเดิม: string;
  ราคาปัจจุบัน: string;
  ส่วนลด: string;
  views: string;
}

export interface SearchResponse {
  products: Product[];
  suggestions: string[];
  ranking_explanation: string;
}

export interface SearchRequest {
  query: string;
  llm_provider: 'gemini' | 'openai';
}

export interface SuggestionsResponse {
  suggestions: string[];
}