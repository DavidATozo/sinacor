export interface CashFlow {
    id?: string;
    descricao?: string;
    valor?: number; 
    tipo?: 'ENTRADA' | 'SAIDA'; 
    data?: Date | string;
}