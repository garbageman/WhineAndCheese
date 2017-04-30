<?php
  header('Content-Type: application/json');
  require('connection.php');
  $db = establishConnection();
  // First check that the user supplied doesn't already exist
  $userName = $_GET["username"];
  $password = $_GET["password"];
  $table = "testUsers";

  $sqlQuery = sprintf("select * from %s where username=\"%s\"", $table,$userName);
	$result = mysqli_query($db, $sqlQuery);
  if ($result) {
    $numberOfRows = mysqli_num_rows($result);
    if ($numberOfRows > 0) {
        echo json_encode("{ \"result\" : false, \"message\" : \"Username already exists\"}");
    } else {
      /* There are no users with this name so create a new item */
      $encryptedPassword = password_hash($password, PASSWORD_BCRYPT);
      $sqlQuery = sprintf("insert into %s values (\"%s\",\"%s\")", $table,$userName,$encryptedPassword);
      $result = mysqli_query($db, $sqlQuery);
      if ($result) {
        /* Return a token and username validating the session */
        $response = sprintf("{ \"result\" : true, \"username\" : \"%s\" }", $userName);
        echo json_encode($response);
      } else {
        $response = sprintf("{ \"result\" : false, \"message\" : \"%s\"}",mysqli_error($db));
        echo json_encode($response);
      }
    }
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }
 ?>
