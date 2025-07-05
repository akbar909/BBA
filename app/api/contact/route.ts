import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const client = await clientPromise;
    const db = client.db('bba');
    
    const messageData = {
      ...body,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Save to database
    const result = await db.collection('messages').insertOne(messageData);
    
    // Send notification email to admin
    await sendNotificationEmail(messageData);
    
    return NextResponse.json({ 
      success: true, 
      messageId: result.insertedId 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}