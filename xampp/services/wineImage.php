<?php
  header("Content-type: image/jpeg");
  require('connection.php');
  $db = establishConnection();
  // First check that the user supplied doesn't already exist
  $wine = $_GET["wine"];
  $table = "wine";

  $sqlQuery = sprintf("select * from %s where name=\"%s\"", $table, $wine);
	$result = $db->query($sqlQuery);
  if ($result) {
    //echo "got a result";
    $numberOfRows = mysqli_num_rows($result);
    if ($numberOfRows > 0) {
        /* Create a list of reviews */
        while ($recordArray = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
          echo $recordArray['image'];
        }
    } else {
      /* There are no results */

    }
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }
 ?>
