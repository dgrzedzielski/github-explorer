import React from 'react';
import booksIcon from 'assets/images/books.svg';
import { BaseList } from 'components/base-list';
import { BlockLink } from 'components/block-link';
import { UserDetails } from 'hooks/use-user-details';
import { Repo } from 'hooks/use-user-repos';
import './user-profile.scss';

type UserProfileProps = {
  user: Readonly<UserDetails>;
  repos: Readonly<Array<Repo>>;
};

export function UserProfile({ user, repos }: UserProfileProps) {
  const displayName = user.name ?? user.login;

  return (
    <div className="user-profile">
      <img
        src={user.avatar_url}
        alt={`avatar of ${displayName}`}
        className="user-profile__avatar"
        width={120}
        height={120}
      />
      <h2 className="user-profile__name">{displayName}</h2>
      <div>
        <h3 className="user-profile__heading">About</h3>
        <p className="user-profile__bio">{user.bio ?? ' - '}</p>
      </div>
      <div>
        <h3 className="user-profile__heading">Top repositories</h3>
        <BaseList
          items={repos}
          renderItem={(item) => (
            <BlockLink href={item.html_url} className="user-profile__repo">
              <img src={booksIcon} alt="" />
              <span>{item.name}</span>
            </BlockLink>
          )}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
}
