import { apiFetch } from "./client";

export const getNextProblem = (studentId: string, concept?: string) =>
  apiFetch(`/problems/next?student_id=${studentId}${concept ? `&concept=${concept}` : ""}`);

export const getProblem = (id: string) => apiFetch(`/problems/${id}`);
