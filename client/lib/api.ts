import { API_URL } from "@/constants/env";
import type {
  UserType,
  StatisticsType,
  UserTypesType,
  FetchUsersParams,
} from "@/lib/types";

export async function getStatistics(): Promise<StatisticsType> {
  const response = await fetch(`${API_URL}/statics`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return response.json();
}

export async function getUserTypes(): Promise<UserTypesType> {
  const response = await fetch(`${API_URL}/userTypes`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user types");
  }
  return response.json();
}

export async function fetchUsers({
  page = 1,
  limit = 10,
  search = "",
  sort = "name",
  order = "asc",
  status = "",
}: FetchUsersParams): Promise<{ users: UserType[]; total: number }> {
  let url = `${API_URL}/users?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;

  if (search) {
    url += `&q=${search}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const totalCount = response.headers.get("X-Total-Count");
  const total = totalCount ? Number.parseInt(totalCount, 10) : 0;
  const users = await response.json();
  return { users, total };
}

export async function getUserById(id: number): Promise<UserType> {
  const response = await fetch(`${API_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }

  return response.json();
}

export async function createUser(
  userData: Omit<UserType, "id">
): Promise<UserType> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function updateUser(
  id: number,
  userData: Partial<UserType>
): Promise<UserType> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user with ID ${id}`);
  }

  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
}
