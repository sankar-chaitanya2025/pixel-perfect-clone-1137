import { apiFetch } from "./client";

export const getDashboard = () => apiFetch("/faculty/dashboard");
