export const VISITOR_STORAGE_KEY = "visitor_id";

export function getVisitorId() {
  return localStorage.getItem(VISITOR_STORAGE_KEY);
}