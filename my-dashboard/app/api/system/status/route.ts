import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // Extrai o token do cabeçalho Authorization
        const token = request.headers.get('Authorization')?.split(' ')[1];
        // Verifica se o token existe
        if (!token) {
            return NextResponse.json({ error: 'Não autorizado: Token não fornecido' }, { status: 401 });
        }

        // Usa o token para fazer a requisição ao backend
        const res = await fetch('http://localhost:8000/api/system/status', {
            headers: {
                'Authorization': `Bearer ${token}` // Passa o token para o backend
            },
        });

        if (!res.ok) {
            throw new Error(`Erro no backend: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}