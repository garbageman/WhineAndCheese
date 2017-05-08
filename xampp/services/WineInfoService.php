<?php

//header("Content-type: image/jpeg");
require('connection.php');
$db = establishConnection();

$wine = $_GET["wine"];
$table = "wine2";

$wine_info_query = "select information from $table where name = '$wine'";
$wine_info_result = $db->query($wine_info_query);

if ($wine_info_result) {
    echo json_encode(($wine_info_result->fetch_all(MYSQLI_ASSOC)));
} else {
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
}

?>