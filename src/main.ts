import "./style.css";
import { UserManager } from "./Components/userManager";
import { getData } from "./Components/data";
import type { User } from "./Components/interfaces";

// State variables
let currentUsers: User[] = [];
let allUsers: User[] = [];

// DOM Element selections with proper TypeScript typing
const usersContainer = document.getElementById(
  "users-container"
) as HTMLDivElement;
const metaContainer = document.getElementById(
  "meta-container"
) as HTMLDivElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const loadUsersBtn = document.getElementById(
  "load-users-btn"
) as HTMLButtonElement;
const showActiveBtn = document.getElementById(
  "show-active-btn"
) as HTMLButtonElement;
const showInactiveBtn = document.getElementById(
  "show-inactive-btn"
) as HTMLButtonElement;
const showAllBtn = document.getElementById("show-all-btn") as HTMLButtonElement;
const sortByNameBtn = document.getElementById(
  "sort-by-name-btn"
) as HTMLButtonElement;
const sortByAgeBtn = document.getElementById(
  "sort-by-age-btn"
) as HTMLButtonElement;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;
const mainTitle = document.getElementById("main-title") as HTMLHeadingElement;

const userData = getData();
console.log(userData);

// Initialize UserManager
const userManager = new UserManager(userData);
// DOM manipulation functions
function createUserCard(user: User): string {
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
                  .map(
                    (skill: string) => `<span class="skill-tag">${skill}</span>`
                  )
                  .join("")}
            </div>
        </div>
    `;
}

function renderUsers(users: User[]): void {
  if (users.length === 0) {
    usersContainer.innerHTML =
      '<div class="no-results">No users found matching your criteria.</div>';
    return;
  }

  usersContainer.innerHTML = users
    .map((user: User) => createUserCard(user))
    .join("");

  // Add click event listeners to user cards
  const userCards = document.querySelectorAll(
    ".user-card"
  ) as NodeListOf<HTMLDivElement>;
  userCards.forEach((card: HTMLDivElement) => {
    card.addEventListener("click", () => {
      const userId = parseInt(card.dataset.userId!);
      const user = users.find((u: User) => u.id === userId);
      if (user) {
        showUserDetails(user);
      }
    });
  });
}

function showUserDetails(user: User): void {
  alert(
    `User Details:\nName: ${user.name}\nProfession: ${
      user.profession
    }\nActive: ${user.isActive ? "Yes" : "No"}\nSkills: ${user.skills.join(
      ", "
    )}`
  );
}

function showMetaInfo(): void {
  const meta = userManager.getMeta();
  const activeCount = allUsers.filter((u: User) => u.isActive).length;
  const inactiveCount = allUsers.filter((u: User) => !u.isActive).length;

  metaContainer.innerHTML = `
        <h3>System Information</h3>
        <p>Total Users: ${
          meta.total
        } | Active: ${activeCount} | Inactive: ${inactiveCount}</p>
        <p>Last Updated: ${new Date(meta.lastUpdated).toLocaleString()}</p>
        <p>Version: ${meta.version}</p>
    `;
  metaContainer.style.display = "block";
}

function showLoadingState(): void {
  usersContainer.innerHTML = '<div class="loading">Loading users...</div>';
}

// Event handler functions
function loadUsers(): void {
  showLoadingState();

  // Simulate loading delay
  setTimeout(() => {
    allUsers = userManager.getAllUsers();
    currentUsers = [...allUsers];
    renderUsers(currentUsers);
    showMetaInfo();

    // Update title with user count
    mainTitle.textContent = `User Management System (${allUsers.length} users)`;
  }, 500);
}

function showActiveUsers(): void {
  currentUsers = userManager.getActiveUsers();
  renderUsers(currentUsers);
}

function showInactiveUsers(): void {
  currentUsers = userManager.getInactiveUsers();
  renderUsers(currentUsers);
}

function showAllUsers(): void {
  currentUsers = userManager.getAllUsers();
  renderUsers(currentUsers);
}

function sortByName(): void {
  currentUsers = userManager.sortUsersByName(currentUsers);
  renderUsers(currentUsers);
}

function sortByAge(): void {
  currentUsers = userManager.sortUsersByAge(currentUsers);
  renderUsers(currentUsers);
}

function searchUsers(query: string): void {
  if (!query.trim()) {
    currentUsers = [...allUsers];
  } else {
    currentUsers = userManager.searchUsers(query);
  }
  renderUsers(currentUsers);
}

function clearResults(): void {
  usersContainer.innerHTML = "";
  metaContainer.style.display = "none";
  mainTitle.textContent = "User Management System";
  searchInput.value = "";
  currentUsers = [];
  allUsers = [];
}

// Event listeners
loadUsersBtn.addEventListener("click", loadUsers);
showActiveBtn.addEventListener("click", showActiveUsers);
showInactiveBtn.addEventListener("click", showInactiveUsers);
showAllBtn.addEventListener("click", showAllUsers);
sortByNameBtn.addEventListener("click", sortByName);
sortByAgeBtn.addEventListener("click", sortByAge);
clearBtn.addEventListener("click", clearResults);

// Search input with debouncing
let searchTimeout: number;
searchInput.addEventListener("input", (e: Event) => {
  clearTimeout(searchTimeout);
  const target = e.target as HTMLInputElement;
  searchTimeout = setTimeout(() => {
    searchUsers(target.value);
  }, 300);
});

// Initialize the application
window.addEventListener("DOMContentLoaded", () => {
  // Add button hover effects
  const buttons = document.querySelectorAll(
    "button"
  ) as NodeListOf<HTMLButtonElement>;
  buttons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px) scale(1.05)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0) scale(1)";
    });
  });

  // Auto-load users after a delay
  setTimeout(loadUsers, 1000);
});
