<?php
// Incluir el archivo de conexión
require_once 'conexion.php';

// Agregar encabezados para permitir CORS
header('Access-Control-Allow-Origin: *'); // Permitir todas las orígenes
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type'); // Encabezados permitidos

// Definir encabezado para indicar que se retorna JSON
header('Content-Type: application/json');

// Consulta para obtener todos los registros de la tabla "usuarios"
$sql = "SELECT id, nombre, apellido, correo, genero FROM usuarios WHERE activo = 1";
$resultado = $conexion->query($sql);

// Crear un array para almacenar los resultados
$usuarios = [];

if ($resultado->num_rows > 0) {
    // Recorrer los resultados y agregarlos al array
    while($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }
}

// Retornar los datos en formato JSON
echo json_encode($usuarios);

// Cerrar la conexión
$conexion->close();
?>
