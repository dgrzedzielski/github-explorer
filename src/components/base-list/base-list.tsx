import React from 'react';
import './base-list.scss';

type CharactersListProps<TItem> = {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
  keyExtractor: (item: TItem) => string | number;
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
