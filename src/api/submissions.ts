import { apiFetch } from "./client";

export const postSubmission = (body: {
  student_id: string;
  problem_id: string;
  code: string;
}) => apiFetch("/submit", { method: "POST", body: JSON.stringify(body) });

export const getHistory = (studentId: string) =>
  apiFetch(`/student/${studentId}/history`);
