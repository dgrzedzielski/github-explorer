import React from 'react';
import { queries, Queries } from '@testing-library/dom';
import {
  screen,
  render as baseRender,
  waitForElementToBeRemoved,
  RenderOptions,
} from '@testing-library/react';
import { AppProviders } from 'app';

type CustomRenderOptions = {
  route?: string;
};

async function render<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactElement,
  {
    route = '/',
    ...renderOptions
  }: CustomRenderOptions & RenderOptions<Q, Container> = {}
) {
  window.history.pushState({}, 'Test page', route);

  const renderResult = baseRender<Q, Container>(ui, {
    wrapper: AppProviders as React.ComponentType,
    ...renderOptions,
  });

  if (getLoaders().length > 0) {
    await waitForLoadingToFinish();
  }

  return renderResult;
}

const getLoaders = () => [
  ...screen.queryAllByLabelText(/loading/i),
  ...screen.queryAllByText(/loading/i),
];

function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(() => getLoaders(), { timeout: 4000 });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { render, waitForLoadingToFinish };
