import type { User } from "../models/interfaces";

export function createUserCard(user: User): string {
  return `
    <div class="user-card" data-user-id="${user.id}">
      <div class="status ${user.isActive ? "active" : "inactive"}"></div>
      <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
      <div class="user-name">${user.name}</div>
      <div class="user-profession">${user.profession}</div>
      <div class="user-email">📧 ${user.email}</div>
      <div class="user-age">🎂 Age: ${user.age}</div>
      <div class="user-skills">
        <div class="skills-title">Skills:</div>
        ${user.skills
          .map((s) => `<span class="skill-tag">${s}</span>`)
          .join("")}
      </div>
    </div>
  `;
}
