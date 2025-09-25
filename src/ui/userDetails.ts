import type { User } from "../models/interfaces";

export function showUserDetails(user: User): void {
  alert(
    `User Details:\nName: ${user.name}\nProfession: ${
      user.profession
    }\nActive: ${user.isActive ? "Yes" : "No"}\nSkills: ${user.skills.join(
      ", "
    )}`
  );
}
