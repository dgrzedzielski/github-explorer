import React from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from 'assets/images/arrow.svg';
import clsx from 'clsx';
import './block-link.scss';

type BlockLinkProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function BlockLink({ href, to, children, className }: BlockLinkProps) {
  const content = (
    <>
      {children}
      <img alt="" src={arrowIcon} className="block-link__arrow" />
    </>
  );

  const attrs = {
    className: clsx('block-link', className),
  };

  if (to) {
    return (
      <Link to={to} {...attrs}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} {...attrs}>
      {content}
    </a>
  );
}
