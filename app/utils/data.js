export async function getData(uri) {
  const res = await fetch(uri);
  return await res.json();
}
