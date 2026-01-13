export type ListTransaction = {
  id: number;
  description: string;
  amount: number;
  category: string;
  category_id?: number;
  created_at: string;
};

export type UpdateTransaction = {
  id: number;
  description: string;
  amount: number;
  category?: string;
  category_id?: number
};

export type TotalResume = {
  total_itens: number;
  total_amount: number;
  min_amount: number;
  max_amount: number;
};
