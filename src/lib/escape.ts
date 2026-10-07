const entities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape text so it can be placed safely inside HTML. */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => entities[char]);
}
