import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db('bba');
    const existing = await db.collection('admins').findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.collection('admins').insertOne({ email, password: hashed, role: 'admin', createdAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
