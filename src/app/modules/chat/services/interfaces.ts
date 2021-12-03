export interface Message {
  createdAt: any;
  id: string;
  body: string;
  status: string;
  from: string;
  to: string;
}

export interface Room {
  id: string;
  user: any;
  type: string;
  company: any;
  service: number;
  createdAt: any;
}
