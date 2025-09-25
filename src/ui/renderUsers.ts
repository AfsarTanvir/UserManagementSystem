import type { User } from "../models/interfaces";
import { createUserCard } from "./userCard";
import { showUserDetails } from "./userDetails";

export function renderUsers(container: HTMLDivElement, users: User[]): void {
  if (users.length === 0) {
    container.innerHTML = '<div class="no-results">No users found.</div>';
    return;
  }

  container.innerHTML = users.map((u) => createUserCard(u)).join("");

  container.querySelectorAll(".user-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = parseInt((card as HTMLDivElement).dataset.userId!);
      const user = users.find((u) => u.id === id);
      if (user) showUserDetails(user);
    });
  });
}
