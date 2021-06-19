import React from 'react';
import './base-list.scss';

type CharactersListProps<TItem> = {
  items: Readonly<TItem[]>;
  renderItem: (item: Readonly<TItem>) => React.ReactNode;
  keyExtractor: (item: Readonly<TItem>) => string | number;
};

export function BaseList<TItem extends Record<string, unknown>>({
  items,
  renderItem,
  keyExtractor,
}: CharactersListProps<TItem>) {
  return (
    <ul className="base-list">
      {items.map((item) => (
        <li className="base-list__item" key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
