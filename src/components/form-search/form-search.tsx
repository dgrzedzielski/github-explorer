import React from 'react';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import { BaseButton } from 'components/base-button';
import { BaseInput } from 'components/base-input';
import './form-search.scss';

type FormSearchProps = {
  onSearch: (query: string) => void;
  label: string;
  placeholder?: string;
  defaultQuery?: string | null;
};

export function FormSearch({
  onSearch,
  label,
  placeholder,
  defaultQuery,
}: FormSearchProps) {
  const [query, setQuery] = React.useState(() => defaultQuery ?? '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="form-search">
      <div className="form-search__input-container">
        <SearchIcon className="form-search__icon" aria-hidden="true" />
        <BaseInput
          onChange={setQuery}
          value={query}
          type="search"
          placeholder={placeholder ?? label}
          aria-label={label}
          className="form-search__input"
        />
      </div>
      <BaseButton type="submit">Search</BaseButton>
    </form>
  );
}
