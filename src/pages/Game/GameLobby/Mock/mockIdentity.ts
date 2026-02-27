import type { User } from "../Type/types";

const KEY = "mock_current_user_v1";

function randomName() {
  const a = ["Kha", "Triet", "Tan", "Huong", "Linh", "Minh", "Bao", "Quan"];
  const b = ["99", "88", "Pro", "Cute", "Dev", "42", "X", "Z"];
  return a[Math.floor(Math.random() * a.length)] + b[Math.floor(Math.random() * b.length)];
}

function randomAvatar(id: number) {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${id}`;
}

export function getOrCreateCurrentUser(): User {
  const raw = sessionStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);

  const id = Math.floor(Math.random() * 1_000_000_000);
  const user: User = {
    id,
    username: randomName(),
    avatarUrl: randomAvatar(id),
  };
  sessionStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function resetCurrentUser() {
  sessionStorage.removeItem(KEY);
}