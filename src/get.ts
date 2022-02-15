export default function get(obj: any, path?: string) {
  if (!path) return obj;
  const keys = path.split('.');
  return keys.reduce((value, key) => {
    if (!value) return undefined;
    return value[key];
  }, obj);
}
