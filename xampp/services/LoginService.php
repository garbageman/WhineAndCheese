<?php
  header('Content-Type: application/json');
  require('connection.php');
  $db = establishConnection();

  // First check that the user supplied doesn't already exist
  $userName = $_GET["username"];
  $password = $_GET["password"];
  $table="testUsers";

  // Create the password here
  $sqlQuery = sprintf("select * from %s where username=\"%s\"", $table,$userName);
	$result = mysqli_query($db, $sqlQuery);

  // If there is a result, check if the
  if ($result) {
    $numberOfRows = mysqli_num_rows($result);
    if ($numberOfRows > 0 ) {
      $body = "";
			while ($recordArray = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		    $passwordHash = $recordArray['password'];
        // Check that the password is correct
        if (password_verify($password,$passwordHash)) {
          $key = password_hash($userName,PASSWORD_BCRYPT);
          echo json_encode(sprintf("{ \"result\" : true, \"username\" : \"%s\", \"key\" : \"%s\" }",$userName,$key));
        } else {
          echo json_encode("{ result : false }");
        }
     	}
		  mysqli_free_result($result);
    } else {
      echo json_encode("{ result : false }");
    }
  } else {
    echo json_encode("{ result : false }");
  }
 ?>
