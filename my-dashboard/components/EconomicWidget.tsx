'use client';

import { useState, useEffect } from 'react';

export default function EconomicWidget() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEconomicData = async () => {
            try {
                const response = await fetch('/api/worldbank/USA/NY.GDP.MKTP.CD'); // PIB dos EUA
                if (!response.ok) throw new Error('Erro ao buscar dados econômicos');
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEconomicData();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3>US GDP</h3>
            <p>Value: {data[1][0]?.value} (Year: {data[1][0]?.date})</p>
        </div>
    );
}