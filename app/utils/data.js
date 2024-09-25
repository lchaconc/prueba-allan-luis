export async function getData(uri) {
  const res = await fetch(uri);
  return await res.json();
}


export async function delRecord(uri, id) {
  const res = await fetch(`${uri}?id=${id}`, {
    method: 'DELETE', // Establecer el método como DELETE
    headers: {
      'Content-Type': 'application/json', // Encabezado para indicar que el contenido es JSON
    },
  });

  return await res.json();
}
