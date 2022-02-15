export const camelCase = (word: string): string =>
  word.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const get = (obj: any, path?: string) => {
  if (!path) return obj;
  const keys = path.split('.');
  return keys.reduce((value, key) => {
    if (!value) return undefined;
    return value[key];
  }, obj);
}
