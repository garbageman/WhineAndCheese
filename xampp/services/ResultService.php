<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christopher
 * Date: 4/22/2017
 * Time: 3:16 PM
 */

header('Content-Type: application/json');
require('connection.php');
$db = establishConnection();
$wine_table = "wine";
$cheese_table = "cheese";
$pairing_table = "pairing";

if (!isset($_GET['item1'])) {
    $result = "Empty Query";
    echo $result;
    exit();
}

//Parse string and add spaces if necessary
$item1 = str_replace("+", " ", $_GET['item1']);

//Look for item1 in the wine table
$wine_query = sprintf("select * from %s where name=\"%s\"", $wine_table, $item1);

$wine_result = $db->query($wine_query);
//If we got a result, item1 is a wine.
if ($wine_result->num_rows > 0) {
    $wine = $item1;
    //If item2 exists, it must be a cheese for this search to be valid.
    if (isset($_GET['item2']))
        $cheese = str_replace("+", " ", $_GET['item2']);
}
//Otherwise, we can assume item1 is a cheese.
else {
    $cheese = $item1;
    //Item2 must be a wine if it exists.
    if (isset($_GET['item2']))
        $wine = str_replace("+", " ", $_GET['item2']);
}

//Perform the relevant query depending on our search parameters
if (isset($wine) && isset($cheese))
    $sqlQuery = sprintf("select * from %s where wine=\"%s\" AND cheese=\"%s\"", $pairing_table, $wine, $cheese);
else if (isset($wine))
    $sqlQuery = sprintf("select * from %s where wine=\"%s\"", $pairing_table,$wine);
else if (isset($cheese))
    $sqlQuery = sprintf("select * from %s where cheese=\"%s\"", $pairing_table,$cheese);
else
    $sqlQuery = "";

$result = $db->query($sqlQuery);

echo json_encode(($result->fetch_all(MYSQLI_ASSOC)));


