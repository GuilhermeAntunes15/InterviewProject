'use client';

import { useState, useEffect } from 'react';

export default function WeatherWidget() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather/London'); // Exemplo: Londres
                if (!response.ok) throw new Error('Erro ao buscar clima');
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3>Weather in London</h3>
            <p>Temperature: {data.main.temp}°K</p>
            <p>Condition: {data.weather[0].description}</p>
        </div>
    );
}