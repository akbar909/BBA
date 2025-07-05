import { AdminState } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunks
export const fetchMessages = createAsyncThunk(
  'admin/fetchMessages',
  async () => {
    const response = await fetch('/api/admin/messages');
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  }
);

export const updateMessageStatus = createAsyncThunk(
  'admin/updateMessageStatus',
  async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
    const response = await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH', // Changed from PUT to PATCH
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (!response.ok) throw new Error('Failed to update message');
    return response.json();
  }
);

export const sendReply = createAsyncThunk(
  'admin/sendReply',
  async ({ messageId, subject, content }: { messageId: string; subject: string; content: string }) => {
    const response = await fetch('/api/admin/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, subject, content }),
    });
    if (!response.ok) throw new Error('Failed to send reply');
    return response.json();
  }
);

const initialState: AdminState = {
  messages: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    completed: 0,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
        state.stats = action.payload.stats;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      })
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        // Debug: log payload and ids
        // @ts-ignore
        console.log('updateMessageStatus payload:', action.payload);
        // @ts-ignore
        console.log('Current messages:', state.messages.map(m => m._id));
        const index = state.messages.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(sendReply.fulfilled, (state) => {
        // Handle reply success
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;