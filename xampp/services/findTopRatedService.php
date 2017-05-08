<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christopher
 * Date: 5/7/2017
 * Time: 5:57 PM
 */

header('Content-Type: application/json');
require('connection.php');
$db = establishConnection();

$pairing_table = "pairing";

$top_rated_query = sprintf("select * from %s ORDER BY rating DESC LIMIT 0,9", $pairing_table);
if($result = $db->query($top_rated_query)) {
  echo(json_encode($result->fetch_all(MYSQLI_ASSOC)));
} else {
  echo json_encode(" { result : false, message : \"No Query\"}");
}


