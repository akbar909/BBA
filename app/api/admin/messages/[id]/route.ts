import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { status, adminNotes } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('bba');
    
    const result = await db.collection('messages').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status,
          adminNotes,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );
    
    if (result && result.value) {
      const doc = { ...result.value, _id: result.value._id.toString() };
      return NextResponse.json(doc);
    } else {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}