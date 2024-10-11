<?php
// Incluir el archivo de conexión
require_once 'conexion.php';

// Agregar encabezados para permitir CORS
header('Access-Control-Allow-Origin: *'); // Permitir todas las orígenes
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type'); // Encabezados permitidos

// Definir encabezado para indicar que se retorna JSON
header('Content-Type: application/json');
sleep(2);
// Verificar si se recibió una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados por POST y decodificarlos como JSON
    $datos = json_decode(file_get_contents("php://input"), true);

    // Extraer los datos
    $nombre = isset($datos['nombre']) ? $datos['nombre'] : '';
    $apellido = isset($datos['apellido']) ? $datos['apellido'] : '';
    $correo = isset($datos['correo']) ? $datos['correo'] : '';
    $genero = isset($datos['genero']) ? $datos['genero'] : '';

    // Verificar que los campos no estén vacíos
    if (!empty($nombre) && !empty($apellido) && !empty($correo) && !empty($genero)) {
        // Preparar la consulta de inserción
        $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, apellido, correo, genero) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nombre, $apellido, $correo, $genero);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Usuario insertado correctamente",
                "id" => $stmt->insert_id // Devolver el ID del nuevo registro
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error al insertar el usuario: " . $stmt->error
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
