import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROLE_ROUTES } from '@/types/auth';

interface HeaderProps {
  title: string;
  subtitle?: string;
  mobileMenuButton?: ReactNode;
}

export function Header({ title, subtitle, mobileMenuButton }: HeaderProps) {
  const { user } = useAuth();

  if (!user) return null;

  const notificationPath = `${ROLE_ROUTES[user.role]}/notifications`;

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {mobileMenuButton}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to={notificationPath}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="notification-badge">3</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
