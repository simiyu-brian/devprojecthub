import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './Footer';

export function PublicLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className={pathname === '/' ? 'flex-1' : 'flex-1 pt-16'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;