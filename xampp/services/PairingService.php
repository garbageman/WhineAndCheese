<?php
	header('Content-Type: application/json');
	require('connection.php');
	$db = establishConnection();

	// wine and cheese parameters will always be set
	$wine = $_GET["wine"];
    $cheese = $_GET["cheese"];

	// table names
	$wine_table = "wine";
	$cheese_table = "cheese";
	$pairing_table = "pairing";
	$review_table = "review";

	// set up queries
	$wine_query = "select * from $wine_table where wine = '$wine'";
	$cheese_query = "select * from $cheese_table where cheese = '$cheese'";
	$pairing_query = "select * from $pairing_table where wine = '$wine' AND cheese = '$cheese'";
	$review_query = "select * from $review_table where wine = '$wine' AND cheese = '$cheese'";

	// just one result from wine, one result from cheese, multiple results from pairing
	$wine_result = $db->query($wine_query);
	$cheese_result = $db->query($cheese_query);
	$pairing_result = $db->query($pairing_query);
	$review_result = $db->query($review_query);

	/* wine results*/
	// get row in wine table for requested wine
	$wine_Result->data_seek(0);
	$wine_row = $wine_result->fetch_array(MYSQLI_ASSOC);
	
	$wine_info = $wine_row['information'];
	$wine_image = $wine_row['image'];
	
	/* cheese results*/
	// get row in cheese table for requested cheese
	$cheese_result->data_seek(0);
	$cheese_row = $cheese_result->fetch_array(MYSQLI_ASSOC);
	
	$cheese_info = $cheese_row['information'];
	$cheese_image = $cheese_row['image'];
	
	/* pairing results*/
	// get row in pairing table for requested pairing
	$pairing_result->data_seek(0);
	$pairing_row = $pairing_result->fetch_array(MYSQLI_ASSOC);
	
	$pairing_info = $pairing_row['information'];
	$pairing_image = $pairing_row['image'];
	
	/* review results */
	/* Number of rows found */
	$num_review_rows = $review_result->num_rows;
	$review_rows = array();
	for ($row_index = 0; $row_index < $num_review_rows; $row_index++) {
		$result->data_seek($row_index);
		$review_rows[$row_index] = $result->fetch_array(MYSQLI_ASSOC);
	}
?>
