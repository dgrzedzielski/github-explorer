import React from 'react';
import './alert-error.scss';

type AlertErrorProps = {
  children: React.ReactNode;
};

export function AlertError({ children }: AlertErrorProps) {
  return (
    <div role="alert" className="alert-error">
      {children}
    </div>
  );
}
