<?php
  header('Content-Type: application/json');
  require('connection.php');
  $db = establishConnection();

  // First check that the user supplied doesn't already exist
  $userName = $_GET["username"];
  $table="testUsers";

  // Create the password here
  $sqlQuery = sprintf("select * from %s where username=\"%s\"", $table,$userName);
	$result = mysqli_query($db, $sqlQuery);
  $exists = false;

  // If there is a result, check if the
  if ($result) {
    $numberOfRows = mysqli_num_rows($result);
    if ($numberOfRows > 0 ) {
      $exists = true;
    }
  }

  if ($exists) {
    echo json_encode("{ \"result\" : true }");
  } else {
    echo json_encode("{ \"result\" : false }");
  }
?>
