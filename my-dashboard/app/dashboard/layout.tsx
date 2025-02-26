import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { AuthProvider } from '../../lib/auth';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1">
                        <Header />
                        <main className="p-4">{children}</main>
                    </div>
                </div>
            </ProtectedRoute>
        </AuthProvider>
    );
}