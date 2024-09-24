<?php
// Datos de conexión
$host = "localhost";
$usuario = "root";
$clave = "";
$base_datos = "recursos_demo1";

// Crear conexión
$conexion = new mysqli($host, $usuario, $clave, $base_datos);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
