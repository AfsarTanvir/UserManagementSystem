// TypeScript interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  profession: string;
  skills: string[];
  isActive: boolean;
  avatar: string;
}

export interface Meta {
  total: number;
  lastUpdated: string;
  version: string;
}

export interface UserData {
  users: User[];
  meta: Meta;
}
