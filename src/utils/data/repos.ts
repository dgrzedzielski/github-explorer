import reposData from './repos-data.json';

let repos = [...reposData];

export const reposDb = {
  readAll() {
    return repos;
  },
};
