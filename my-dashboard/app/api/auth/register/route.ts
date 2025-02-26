import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, password, phone } = await req.json();

  const res = await fetch('http://localhost:8000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone }),
  });

  const text = await res.text(); // Primeiro pegue como texto para depuração
  console.log('Resposta do backend:', text); // Veja o que está vindo

  try {
    const data = JSON.parse(text); // Tente parsear como JSON
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ message: 'Resposta inválida do backend', raw: text }, { status: 500 });
  }
}