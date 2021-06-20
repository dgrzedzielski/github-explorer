import { User } from 'hooks/use-users-search';
import usersData from './users-data.json';

let users: Array<User> = [...usersData];

export const usersDb = {
  search(query: string) {
    const regex = new RegExp(query, 'i');
    return users.filter(({ login }) => regex.test(login));
  },

  readOne(login: string) {
    return users.find((user) => user.login === login);
  },
};
