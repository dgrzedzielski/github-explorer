import React from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from 'assets/images/arrow.svg';
import './block-link.scss';

type BlockLinkProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
};

export function BlockLink({ href, to, children }: BlockLinkProps) {
  const content = (
    <>
      {children}
      <img alt="" src={arrowIcon} className="block-link__arrow" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className="block-link">
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className="block-link">
      {content}
    </a>
  );
}
