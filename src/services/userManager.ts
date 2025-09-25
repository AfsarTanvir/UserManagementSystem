import type { User, Meta, UserData } from "../models/interfaces";

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
    return this.users.filter((u) => u.isActive);
  }

  getInactiveUsers(): User[] {
    return this.users.filter((u) => !u.isActive);
  }

  searchUsers(query: string): User[] {
    const q = query.toLowerCase();
    return this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.profession.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  sortUsersByName(users: User[]): User[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortUsersByAge(users: User[]): User[] {
    return [...users].sort((a, b) => a.age - b.age);
  }

  getMeta(): Meta {
    return this.meta;
  }
}
