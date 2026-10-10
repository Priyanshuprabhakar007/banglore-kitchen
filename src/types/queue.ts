export interface QueueToken {
  id?: string;
  tokenNumber: string;
  customerName: string;
  phone: string;
  partySize: number;
  status: 'waiting' | 'serving' | 'completed' | 'cancelled';
  createdAt: any;
  calledAt?: any;
  completedAt?: any;
  estimatedWait: number; // in minutes
  specialRequest?: string;
  branchId: string; // Keep track of branch
}

export interface QueueSettings {
  avgServiceTime: number; // in minutes
  isQueueActive: boolean;
  currentServing: string | null;
  dailyTokenCounter: number;
  lastResetDate: string; // ISO date string YYYY-MM-DD
}
