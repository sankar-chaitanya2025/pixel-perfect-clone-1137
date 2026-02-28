import { apiFetch } from "./client";

export const getProfile = (studentId: string) =>
  apiFetch(`/student/${studentId}/profile`);
