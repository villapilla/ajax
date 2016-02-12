<?php 
if(isset($_GET)) {
echo "Hola " . $_GET["search"];
} else {
echo "Hola anonymous";
}