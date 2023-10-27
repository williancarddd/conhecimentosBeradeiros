export interface IMessage {
  id: string;
  from: number;
  to: number;
  createdAt: Date;
  message: string;
  status: 0 | 1 | 2; // 0 enviado, 1 recebido e 2 lido
}
