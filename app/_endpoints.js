const endpoints = {
  getUsuarios: `${process.env.NEXT_PUBLIC_API_URL}usuarios_get.php`,
  delUsuario: `${process.env.NEXT_PUBLIC_API_URL}usuario_delete.php`,
  updateUsuario: `${process.env.NEXT_PUBLIC_API_URL}usuario_update.php`,
};

export default endpoints;
