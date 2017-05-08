
<?php


require('connection.php');
$db = establishConnection();

//ini_set('memory_limit','512M');// change 16M to your desired number
mysqli_set_charset($db, 'utf8');

$wine = $_GET["wine"];
$cheese = $_GET["cheese"];
$review_table = "review";

$review_query = "select * from $review_table where wine='$wine' and cheese='$cheese'";
$review_result = $db->query($review_query);

if ($review_result) {
    echo json_encode(($review_result->fetch_all(MYSQLI_ASSOC)));
} else {
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
}

?>