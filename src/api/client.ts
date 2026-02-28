const BASE_URL = "http://localhost:8000";

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { data: null, error: err.detail || `HTTP ${res.status}` };
    }
    return { data: await res.json(), error: null };
  } catch (e: any) {
    return { data: null, error: e.message };
  }
}
