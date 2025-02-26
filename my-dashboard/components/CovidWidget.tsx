'use client';

import { useState, useEffect } from 'react';

export default function CovidWidget() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCovidData = async () => {
            try {
                const response = await fetch('/api/covid/global');
                if (!response.ok) throw new Error('Erro ao buscar dados de COVID-19');
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCovidData();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3>Global COVID-19 Data</h3>
            <p>Cases: {data.cases}</p>
            <p>Deaths: {data.deaths}</p>
            <p>Recovered: {data.recovered}</p>
        </div>
    );
}