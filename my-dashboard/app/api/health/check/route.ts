import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const token = req.headers.get('Authorization')?.replace('Bearer ', '');
        const res = await fetch('http://localhost:8000/api/health/check', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}