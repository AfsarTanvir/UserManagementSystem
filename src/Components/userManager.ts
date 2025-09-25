import type { UserData, User, Meta } from "./interfaces";

// Class for managing user operations
export class UserManager {
  private users: User[];
  private meta: Meta;

  constructor(data: UserData) {
    this.users = data.users;
    this.meta = data.meta;
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  getActiveUsers(): User[] {
    return this.users.filter((user: User) => user.isActive);
  }

  getInactiveUsers(): User[] {
    return this.users.filter((user: User) => !user.isActive);
  }

  searchUsers(query: string): User[] {
    const lowercaseQuery = query.toLowerCase();
    return this.users.filter(
      (user: User) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.profession.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.skills.some((skill: string) =>
          skill.toLowerCase().includes(lowercaseQuery)
        )
    );
  }

  sortUsersByName(users: User[]): User[] {
    return [...users].sort((a: User, b: User) => a.name.localeCompare(b.name));
  }

  sortUsersByAge(users: User[]): User[] {
    return [...users].sort((a: User, b: User) => a.age - b.age);
  }

  getMeta(): Meta {
    return this.meta;
  }
}
