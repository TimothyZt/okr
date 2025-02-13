/**
 * Retrieve field names from object
 * https://stackoverflow.com/a/77813942/14749257
 * @returns Proxy object that returns field names
 */
export function nameIn<T>() {
  return _name_proxy as unknown as { [P in keyof T]: P };
}
const _name_proxy = new Proxy({}, { get: (_, key) => key });
