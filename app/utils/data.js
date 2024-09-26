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



export async function sendData(data, uri, method, id) {
  method === "PUT" && (uri = `${uri}?id=${id}`);

  const res = await fetch(uri, {
    method,
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data)
  });

  return await res.json();
}
