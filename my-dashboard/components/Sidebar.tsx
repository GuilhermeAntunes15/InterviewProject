'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth';
import Link from 'next/link';

export default function Sidebar() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg z-50"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64 h-screen bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 z-40 shadow-xl`}
      >
        <h3 className="text-xl mb-4">Menu</h3>
        <ul>
          <li className="mb-2" onClick={() => setIsSidebarOpen(false)}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="mb-2" onClick={() => setIsSidebarOpen(false)}>
            <Link href="/profile">Profile</Link>
          </li>
          {user?.role === 'admin' && (
            <li className="mb-2" onClick={() => setIsSidebarOpen(false)}>
              <Link href="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}