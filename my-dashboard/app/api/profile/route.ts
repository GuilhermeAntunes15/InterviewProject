import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { name, email, phone, password } = await req.json();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const res = await fetch('http://localhost:8000/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name, email, phone, password }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}