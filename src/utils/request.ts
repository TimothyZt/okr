export function parseQuery(obj: object) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        query.append(key, v);
      }
      continue;
    }

    if (value !== undefined) query.append(key, value);
  }
  return query;
}
