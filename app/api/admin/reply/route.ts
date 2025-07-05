import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { messageId, subject, content } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('bba');
    
    // Get the original message
    const message = await db.collection('messages').findOne({
      _id: new ObjectId(messageId)
    });
    
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    // Send email reply
    const emailResult = await sendEmail(message.email, subject, content);
    
    if (emailResult.success) {
      // Update message status to contacted
      await db.collection('messages').updateOne(
        { _id: new ObjectId(messageId) },
        {
          $set: {
            status: 'contacted',
            updatedAt: new Date(),
          },
        }
      );
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Reply error:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}