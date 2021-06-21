import React from 'react';
import { FormSearchUser } from 'components/form-search-user';
import './default-layout.scss';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="layout">
      <header className="layout__header">
        <FormSearchUser />
      </header>
      <main className="layout__main">
        <div className="layout__container">{children}</div>
      </main>
    </div>
  );
}
