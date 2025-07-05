import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const client = await clientPromise;
    const db = client.db('bba');
    
    // Get all messages
    const messages = await db.collection('messages')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Calculate stats
    const stats = {
      total: messages.length,
      new: messages.filter(m => m.status === 'new').length,
      contacted: messages.filter(m => m.status === 'contacted').length,
      inProgress: messages.filter(m => m.status === 'in-progress').length,
      completed: messages.filter(m => m.status === 'completed').length,
    };
    
    return NextResponse.json({ messages, stats });
  } catch (error) {
    console.error('Admin messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}