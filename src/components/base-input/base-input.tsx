import React from 'react';
import clsx from 'clsx';
import './base-input.scss';

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (val: string) => void;
  value: string;
};

export function BaseInput({
  onChange,
  value,
  className,
  type = 'text',
  ...attributes
}: BaseInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      {...attributes}
      type={type}
      value={value}
      onChange={handleChange}
      className={clsx('base-input', className)}
    />
  );
}
