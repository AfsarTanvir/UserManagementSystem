import type { User } from "../models/interfaces";
import { UserManager } from "../services/userManager";

export function showMetaInfo(
  container: HTMLDivElement,
  userManager: UserManager,
  allUsers: User[]
): void {
  const meta = userManager.getMeta();
  const activeCount = allUsers.filter((u) => u.isActive).length;
  const inactiveCount = allUsers.filter((u) => !u.isActive).length;

  container.innerHTML = `
    <h3>System Information</h3>
    <p>Total Users: ${
      meta.total
    } | Active: ${activeCount} | Inactive: ${inactiveCount}</p>
    <p>Last Updated: ${new Date(meta.lastUpdated).toLocaleString()}</p>
    <p>Version: ${meta.version}</p>
  `;
  container.style.display = "block";
}
