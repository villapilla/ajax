<?php
require('BD.php');

function respuestaJSON($data) {
    header('Content-type: application/json; charset=utf-8');
    echo "[";
    foreach($data as $key => $product) {
         echo json_encode($product, JSON_FORCE_OBJECT);
        if(count($data) !== $key + 1) {
            echo ",";
        }
    }
    echo "]";
    exit();
}
function repuestaJSONAlone($product) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($product);
    exit();
}

if(isset($_GET)) {
    $conexion = BD::getConexion();  
    if(isset($_GET["search"])) {
        $search = $_GET["search"];
        $query = "Select id, price, name, image 
                from product 
                where name like :name OR 
                category_id IN (SELECT id 
                    FROM category
                    WHERE name like :name) LIMIT 0 , 12";
        $select = $conexion->prepare($query);
        $select->setFetchMode(PDO::FETCH_ASSOC);
        $select->execute(['name' => "%". $search ."%"]);
        $products = $select->fetchAll();
        respuestaJSON($products);
     } else {
        if(isset($_GET["dataset"])) {
            $search = $_GET["dataset"];
            $query = "Select id, name, image from product where name like :name LIMIT 0 , 5";
            $select = $conexion->prepare($query);
            $select->setFetchMode(PDO::FETCH_ASSOC);
            $select->execute(['name' => "%". $search ."%"]);
            $products = $select->fetchAll();
            respuestaJSON($products);
        } else {
            if(isset($_GET["description"])) {
                $id = $_GET["description"];
                $query = "Select * from product where id = :id";
                $select = $conexion->prepare($query);
                $select->setFetchMode(PDO::FETCH_ASSOC);
                $select->execute(['id' => $id]);
                $product = $select->fetch();
                repuestaJSONAlone($product);
            } else {
                $query = "Select id, name, image, price from product where promotion = '1' LIMIT 0 , 12";
                $select = $conexion->prepare($query);
                $select->setFetchMode(PDO::FETCH_ASSOC);
                $select->execute();
                $products = $select->fetchAll();
                respuestaJSON($products);
            }        
        }
    }
} else {
    $conexion = BD::getConexion(); 
    $query = "Select id, name, image, price from product where promotion = '1' LIMIT 0 , 12";
    $select = $conexion->prepare($query);
    $select->setFetchMode(PDO::FETCH_ASSOC);
    $select->execute();
    $products = $select->fetchAll();
    var_dump($product);
    respuestaJSON($products);
}


    


