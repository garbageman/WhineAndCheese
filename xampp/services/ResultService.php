<?php
/**
 * Created by IntelliJ IDEA.
 * User: Christopher
 * Date: 4/22/2017
 * Time: 3:16 PM
 */

header('Content-Type: application/json');
require('connection.php');
$db = connectToTable();
$table = "pairings";

if (isset($_GET['wine']))
    $wine = $_GET['wine'];

if (isset($_GET['cheese']))
    $cheese = $_GET['cheese'];

if (isset($_GET['wine']) && isset($_GET['cheese']))
    $sqlQuery = sprintf("select * from %s where wine=\"%s\" AND cheese=\"%s\"", $table, $wine, $cheese);
else if (isset($_GET['wine']))
    $sqlQuery = sprintf("select * from %s where wine=\"%s\"", $table,$wine);
else if (isset($_GET['cheese']))
    $sqlQuery = sprintf("select * from %s where cheese=\"%s\"", $table,$wine);
else
    $sqlQuery = "";

$result = $db->query($sqlQuery);

echo json_encode($result->fetch_all(MYSQLI_ASSOC));


