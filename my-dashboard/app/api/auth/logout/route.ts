import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    const res = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}