import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const res = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function GET(req: NextRequest) {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    console.log(token);
    const res = await fetch('http://localhost:8000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json(data);
}