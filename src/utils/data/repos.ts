import { Repo } from 'hooks/use-user-repos';

let repos: Array<Repo> = [];

export const reposDb = {
  create(repo: Repo) {
    repos.push(repo);
    return repo;
  },

  createMany(newRepos: Array<Repo>) {
    repos.push(...newRepos);
    return newRepos;
  },

  readAll() {
    return repos;
  },

  reset() {
    repos = [];
  },
};
