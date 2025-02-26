import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { countryCode: string, indicator: string } }) {
    const { countryCode, indicator } = params;
    const res = await fetch(`http://localhost:8000/api/worldbank/${countryCode}/${indicator}`);
    const data = await res.json();
    return NextResponse.json(data);
}