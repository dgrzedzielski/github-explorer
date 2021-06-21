import React from 'react';
import './base-loader.scss';

export function BaseLoader() {
  return (
    <div className="base-loader__container">
      <div className="base-loader" aria-label="Loading">
        <div className="base-loader__dot" aria-hidden="true" />
        <div className="base-loader__dot" aria-hidden="true" />
        <div className="base-loader__dot" aria-hidden="true" />
      </div>
    </div>
  );
}
