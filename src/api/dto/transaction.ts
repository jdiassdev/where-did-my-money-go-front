export interface CreateTransaction {
  description: string;
  amount: number;
  category_id: number;
}
export interface UpdateTransaction {
  description?: string;
  amount?: number;
  category_id?: number;
}