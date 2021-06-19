import React from 'react';
import './page-header.scss';

type PageHeaderProps = {
  children: React.ReactNode;
};

export function PageHeader({ children }: PageHeaderProps) {
  return <header className="page-header">{children}</header>;
}
