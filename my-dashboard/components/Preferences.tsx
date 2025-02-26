'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth';

export default function Preferences() {
  const [config, setConfig] = useState('');
  const { user } = useAuth();

  const handleSave = async () => {
    await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, dashboard_config: config }),
    });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <input
        type="text"
        value={config}
        onChange={(e) => setConfig(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={handleSave} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Salvar
      </button>
    </div>
  );
}