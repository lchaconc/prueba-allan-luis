
export async function getData(uri) {
  const res = await fetch(uri);
  return await res.json();
}

export async function deleteRecord(uri, id) {
  //Realizo la petición DELETE

  //`${uri}?id=${id}` concatena la URL base con el identificador del registro que se desea eliminar, creando la URL completa que será usada por fetch() para hacer la petición HTTP DELETE.

  const res = await fetch(`${uri}?id=${id}`, {
    method: "DELETE",
  });

  return await res.json();
}

export async function sendData(uri, data, id, method) {
  method === "PUT" && (uri = `${uri}?id=${id}`);

  const options = {
    method,
    headers: {
      "Content-Type": "appliaction/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(uri, options);

  return await res.json();
}


export async function sendDataNew(uri, data,method) {
  method === "PUT" && (uri = `${uri}`);

  const options = {
    method,
    headers: {
      "Content-Type": "appliaction/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(uri, options);

  return await res.json();
}
