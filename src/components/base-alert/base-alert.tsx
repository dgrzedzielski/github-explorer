import React from 'react';
import './base-alert.scss';

type AlertErrorProps = {
  children: React.ReactNode;
  type?: 'error' | 'info';
};

export function BaseAlert({ children, type = 'error' }: AlertErrorProps) {
  return (
    <div role="alert" className={`base-alert base-alert--${type}`}>
      {children}
    </div>
  );
}
