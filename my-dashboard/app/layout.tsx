import { AuthProvider } from '../lib/auth';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="h-full">
      <body className="h-full bg-gray-100 dark:bg-gray-900 transition-colors">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}