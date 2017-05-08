<?php
 /* Grabs wine or cheese from url, queries DB for information, returns information */
 
//header("Content-type: image/jpeg");
require('connection.php');
$db = establishConnection();
mysqli_set_charset($db, 'utf8');

if (isset($_GET["wine"])) {
    $name = $_GET["wine"];
    $table = "wine";
} else {
    $name = $_GET["cheese"];
    $table = "cheese";
}

$info_query = "select information from $table where name = '$name'";
$info_result = $db->query($info_query);

if ($info_result) {
    echo json_encode(($info_result->fetch_all(MYSQLI_ASSOC)));
} else {
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
}

?>