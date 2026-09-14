import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, ListChecks, CheckSquare, Paperclip,
  MessageSquare, FileText, CreditCard, LifeBuoy, User, LogOut,
  Menu, X, Bell, ChevronLeft, Users, DollarSign, Briefcase,
  HelpCircle, Settings, Code2, Inbox,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarLink {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const studentLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { label: 'My Project', path: '/student/project', icon: FolderKanban },
  { label: 'Milestones', path: '/student/milestones', icon: ListChecks },
  { label: 'Tasks', path: '/student/tasks', icon: CheckSquare },
  { label: 'Files', path: '/student/files', icon: Paperclip },
  { label: 'Messages', path: '/student/messages', icon: MessageSquare },
  { label: 'Quotes', path: '/student/quotes', icon: FileText },
  { label: 'Payments', path: '/student/payments', icon: CreditCard },
  { label: 'Support', path: '/student/support', icon: LifeBuoy },
  { label: 'Profile', path: '/student/profile', icon: User },
];

const adminLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Project Requests', path: '/admin/requests', icon: Inbox },
  { label: 'Active Projects', path: '/admin/projects', icon: Briefcase },
  { label: 'Students', path: '/admin/students', icon: Users },
  { label: 'Quotes', path: '/admin/quotes', icon: FileText },
  { label: 'Milestones', path: '/admin/milestones', icon: ListChecks },
  { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { label: 'Payments', path: '/admin/payments', icon: DollarSign },
  { label: 'Portfolio', path: '/admin/portfolio', icon: FolderKanban },
  { label: 'Services', path: '/admin/services', icon: Settings },
  { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { label: 'Notifications', path: '/admin/notifications', icon: Bell },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

interface DashboardLayoutProps {
  variant: 'student' | 'admin';
}

export function DashboardLayout({ variant }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const links = variant === 'student' ? studentLinks : adminLinks;
  const basePath = variant === 'student' ? '/student' : '/admin';
  const title = variant === 'student' ? 'Student Portal' : 'Developer Console';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-cream-100">
      {/* Sidebar — desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-terracotta-500 text-terracotta-100 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-between border-b border-terracotta-400/40 px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <Code2 className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white">DevProject Hub</span>
          </Link>
          <button className="rounded p-1 text-terracotta-100 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-3 py-2">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-terracotta-200">{title}</p>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white text-terracotta-700 shadow-sm'
                    : 'text-terracotta-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <link.icon className="h-4.5 w-4.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-terracotta-400/40 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-terracotta-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cream-300 bg-cream-50 px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-navy-600 hover:bg-cream-200 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="hidden items-center gap-1.5 text-sm text-navy-500 hover:text-navy-900 lg:flex">
              <ChevronLeft className="h-4 w-4" />
              Back to site
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`${basePath}/notifications`} className="relative rounded-lg p-2 text-navy-600 hover:bg-cream-200">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error-500" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-100 text-sm font-semibold text-terracotta-700">
                {user?.email?.[0]?.toUpperCase() ?? 'S'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-navy-900">
                  {user?.user_metadata?.full_name ?? user?.email ?? 'Student'}
                </p>
                <p className="text-xs text-navy-500">{variant === 'student' ? 'Student' : 'Developer'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}