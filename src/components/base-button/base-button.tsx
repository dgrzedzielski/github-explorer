import React from 'react';
import './base-button.scss';

type BaseButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  children: React.ReactNode;
};

export function BaseButton({
  children,
  onClick,
  type = 'submit',
}: BaseButtonProps) {
  return (
    <button type={type} className="base-button" onClick={onClick}>
      {children}
    </button>
  );
}
