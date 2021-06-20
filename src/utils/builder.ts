import faker from 'faker';
import { UserDetails } from 'hooks/use-user-details';
import { Repo } from 'hooks/use-user-repos';

const getId = () => faker.datatype.number(100000);

export function buildUser(overrides?: Partial<UserDetails>): UserDetails {
  return {
    login: faker.internet.userName(),
    id: getId(),
    avatar_url: faker.internet.avatar(),
    bio: faker.lorem.sentence(),
    name: faker.name.firstName() + faker.name.lastName(),
    ...overrides,
  };
}

export function buildRepo(overrides?: Partial<Repo>): Repo {
  return {
    id: getId(),
    name: faker.lorem.words(2),
    full_name: faker.lorem.words(3),
    owner: overrides?.owner ?? buildUser(),
    description: faker.lorem.sentence(),
    html_url: faker.internet.url(),
    stargazers_count: faker.datatype.number(20),
    ...overrides,
  };
}
