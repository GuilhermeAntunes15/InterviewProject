'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Admin() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [systemStatus, setSystemStatus] = useState<any>(null);
    const [apiHealth, setApiHealth] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user?.role !== 'admin') return;

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const [usersRes, statusRes, healthRes] = await Promise.all([
                    fetch('/api/users', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }),
                    fetch('/api/system/status', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }),
                    fetch('/api/health/check', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }),
                ]);

                if (!usersRes.ok || !statusRes.ok || !healthRes.ok) 
                    throw new Error('Error loading data');

                const usersData = await usersRes.json();
                const statusData = await statusRes.json();
                const healthData = await healthRes.json();

                setUsers(usersData);
                setSystemStatus(statusData);
                setApiHealth(healthData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (!user || user.role !== 'admin') {
        return <p className="p-4 text-red-500">Access denied. Administrators only.</p>;
    }

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Administration Panel</h2>

                {/* User Management Panel */}
                <section className="mb-6">
                    <h3 className="text-xl mb-2">User Management</h3>
                    <ul className="space-y-2">
                        {users.map((user: any) => (
                            <li key={user.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                {user.name} ({user.email}) - {user.role}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* System Status Monitoring */}
                <section className="mb-6">
                    <h3 className="text-xl mb-2">System Status</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                        <p>Database: {systemStatus.database}</p>
                        <p>Server Time: {systemStatus.server_time}</p>
                        <p>Memory Usage: {systemStatus.memory_usage}</p>
                    </div>
                </section>

                {/* API Integration Health Checks */}
                <section>
                    <h3 className="text-xl mb-2">API Health</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                        <p>Weather API: {apiHealth.weather_api}</p>
                        <p>World Bank API: {apiHealth.worldbank_api}</p>
                        <p>Disease API: {apiHealth.disease_api}</p>
                    </div>
                </section>
            </div>
          </main>
        </div>
      </div>
    );
}
