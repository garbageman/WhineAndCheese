<?php
	header('Content-Type: application/json');
	require('connection.php');
	$db = establishConnection();

	// wine and cheese parameters will always be set
	$wine = $_GET["wine"];
   $cheese = $_GET["cheese"];

	// table names
	$wineTable = "wine";
	$cheeseTable = "cheese";
	$pairingTable = "pairing";

	// $genericQuery = "select * from %s where %s = '%s'";
	$wineQuery = "select * from $wineTable where wine = '$wine'";
	$cheeseQuery = "select * from $cheeseTable where cheese = '$cheese'";
	$pairingQuery = "select * from $pairingTable where wine = '$wine' AND cheese = '$cheese'";

	$wineResult = $db->query($wineQuery);
	$cheeseResult = $db->query($cheeseQuery);
	$pairingResult = $db->query($pairingQuery);

?>
