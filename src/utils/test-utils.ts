import React from 'react';
import { queries, Queries } from '@testing-library/dom';
import {
  screen,
  render as baseRender,
  waitForElementToBeRemoved,
  RenderOptions,
} from '@testing-library/react';
import { AppProviders } from 'app';

async function render<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(ui: React.ReactElement, options: RenderOptions<Q, Container> = {}) {
  const renderResult = baseRender<Q, Container>(ui, {
    wrapper: AppProviders as React.ComponentType,
    ...options,
  });

  await waitForLoadingToFinish();

  return renderResult;
}

export function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  );
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { render };
