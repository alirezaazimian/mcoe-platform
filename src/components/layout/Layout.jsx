import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="site-public-shell min-h-screen flex flex-col">
      <Header />
      <main className="site-public-main flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
