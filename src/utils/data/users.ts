import { UserDetails } from 'hooks/use-user-details';

let users: Array<UserDetails> = [];

export const usersDb = {
  create(user: UserDetails) {
    users.push(user);
    return user;
  },

  search(query: string) {
    const regex = new RegExp(query, 'i');
    return users.filter(({ login }) => regex.test(login));
  },

  readOne(login: string) {
    return users.find((user) => user.login === login);
  },

  reset() {
    users = [];
  },
};
