import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { city: string } }) {
  const { city } = params;
  const res = await fetch(`http://localhost:8000/api/weather/${city}`);
  const data = await res.json();
  return NextResponse.json(data);
}