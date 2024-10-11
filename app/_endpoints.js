const endpoints = {
    getUsuarios: `${process.env.NEXT_PUBLIC_API_URL}usuarios_get.php`,
    deleteUsuario: `${process.env.NEXT_PUBLIC_API_URL}usuario_delete.php`,
    updateUsuario: `${process.env.NEXT_PUBLIC_API_URL}usuario_update.php`,
    setNewUsuario: `${process.env.NEXT_PUBLIC_API_URL}usuario_insert.php`

}


export default endpoints;