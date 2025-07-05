export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  adminNotes?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface AdminState {
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    new: number;
    contacted: number;
    inProgress: number;
    completed: number;
  };
}