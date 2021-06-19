import React from 'react';
import noDataImage from 'assets/images/no-data.png';
import './alert-not-found.scss';

type AlertNotFoundProps = {
  resource: string;
};

export function AlertNotFound({ resource }: AlertNotFoundProps) {
  return (
    <div role="alert" className="alert-not-found">
      <p>
        We couldn't find anything like
        <div>{resource}</div>
      </p>
      <img src={noDataImage} alt="" />
    </div>
  );
}
