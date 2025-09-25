import "./style.css";
import { getData } from "./data/getData";
import { UserManager } from "./services/userManager";
import { renderUsers } from "./ui/renderUsers";
import { showMetaInfo } from "./ui/metaInfo";
import { showLoadingState } from "./ui/loading";
import { debounce } from "./utils/debounce";
import type { User } from "./models/interfaces";

// State
let currentUsers: User[] = [];
let allUsers: User[] = [];

// DOM elements
const usersContainer = document.getElementById(
  "users-container"
) as HTMLDivElement;
const metaContainer = document.getElementById(
  "meta-container"
) as HTMLDivElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const mainTitle = document.getElementById("main-title") as HTMLHeadingElement;

// Buttons
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

// Data & manager
const userManager = new UserManager(await getData());

function loadUsers(): void {
  showLoadingState(usersContainer);
  setTimeout(() => {
    allUsers = userManager.getAllUsers();
    currentUsers = [...allUsers];
    renderUsers(usersContainer, currentUsers);
    showMetaInfo(metaContainer, userManager, allUsers);
    mainTitle.textContent = `User Management System (${allUsers.length} users)`;
  }, 500);
}

// Event listeners
loadUsersBtn.addEventListener("click", loadUsers);
showActiveBtn.addEventListener("click", () => {
  currentUsers = userManager.getActiveUsers();
  renderUsers(usersContainer, currentUsers);
});
showInactiveBtn.addEventListener("click", () => {
  currentUsers = userManager.getInactiveUsers();
  renderUsers(usersContainer, currentUsers);
});
showAllBtn.addEventListener("click", () => {
  currentUsers = userManager.getAllUsers();
  renderUsers(usersContainer, currentUsers);
});
sortByNameBtn.addEventListener("click", () => {
  currentUsers = userManager.sortUsersByName(currentUsers);
  renderUsers(usersContainer, currentUsers);
});
sortByAgeBtn.addEventListener("click", () => {
  currentUsers = userManager.sortUsersByAge(currentUsers);
  renderUsers(usersContainer, currentUsers);
});
clearBtn.addEventListener("click", () => {
  usersContainer.innerHTML = "";
  metaContainer.style.display = "none";
  mainTitle.textContent = "User Management System";
  searchInput.value = "";
  currentUsers = [];
  allUsers = [];
});

// Search with debounce
searchInput.addEventListener(
  "input",
  debounce((e: Event) => {
    const q = (e.target as HTMLInputElement).value;
    currentUsers = q.trim() ? userManager.searchUsers(q) : [...allUsers];
    renderUsers(usersContainer, currentUsers);
  }, 300)
);

// Init
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(loadUsers, 1000);
});
