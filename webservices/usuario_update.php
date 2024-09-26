<?php
// Incluir el archivo de conexión
require_once 'conexion.php';

// Definir encabezado para indicar que se retorna JSON
header('Content-Type: application/json');

// Agregar encabezados para permitir CORS
header('Access-Control-Allow-Origin: *'); // Permitir todas las orígenes
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type'); // Encabezados permitidos

// Verificar si se recibió una solicitud PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Obtener el id desde el parámetro de la URL
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    // Verificar que el ID sea válido
    if (empty($id) || !is_numeric($id)) {
        echo json_encode([
            "success" => false,
            "message" => "ID inválido o no proporcionado"
        ]);
        exit;
    }

    // Obtener los datos enviados por PUT y decodificarlos como JSON
    $datos = json_decode(file_get_contents("php://input"), true);

    // Extraer los valores del JSON
    $nombre = isset($datos['nombre']) ? $datos['nombre'] : '';
    $apellido = isset($datos['apellido']) ? $datos['apellido'] : '';
    $correo = isset($datos['correo']) ? $datos['correo'] : '';
    $genero = isset($datos['genero']) ? $datos['genero'] : '';

    // Verificar que todos los campos necesarios estén presentes
    if (!empty($nombre) && !empty($apellido) && !empty($correo) && !empty($genero)) {
        // Preparar la consulta para actualizar el registro
        $stmt = $conexion->prepare("UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, genero = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $nombre, $apellido, $correo, $genero, $id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    "success" => true,
                    "message" => "Usuario actualizado correctamente"
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se encontró el usuario con el ID proporcionado o los datos no han cambiado"
                ]);
            }
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error al actualizar el usuario: " . $stmt->error
            ]);
        }

        // Cerrar la consulta
        $stmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Todos los campos son obligatorios"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido"
    ]);
}

// Cerrar la conexión
$conexion->close();
?>
