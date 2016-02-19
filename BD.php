<?php

/*$basedatos = 'ahorcado';
$usuario = 'ahrocado';
$contrasenya = '1234';
$equipo = 'localhost';*/

class BD {

    protected static $bd = null;

    private function __construct() {
        try {
            self::$bd = new PDO('mysql:host=mysql.hostinger.es;dbname=u174001298_hard', 'u174001298_root', 'secret');
            self::$bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
        }
    }
    
    public static function getConexion() {
        if (!self::$bd) {
            new BD();
        }
        return self::$bd;
    }

}

    