<?php
// Incluir el archivo de conexión
require_once 'conexion.php';

// Definir encabezado para indicar que se retorna JSON
header('Content-Type: application/json');

// Verificar si se recibió una solicitud DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obtener el id desde el parámetro de la URL
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    // Verificar que el ID no esté vacío y sea un número
    if (!empty($id) && is_numeric($id)) {
        // Preparar la consulta para actualizar el campo "activo" a 0
        $stmt = $conexion->prepare("UPDATE usuarios SET activo = 0 WHERE id = ?");
        $stmt->bind_param("i", $id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    "success" => true,
                    "message" => "Usuario marcado como inactivo correctamente"
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se encontró el usuario con el ID proporcionado"
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
            "message" => "ID inválido o no proporcionado"
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
