<?php
  header('Content-Type: application/json');
  require('connection.php');
  $db = establishConnection();
  // First check that the user supplied doesn't already exist
  $user = $_GET["user"];
  $wine = $_GET["wine"];
  $cheese = $_GET["cheese"];
  $review = str_replace("+"," ",$_GET["review"]);
  $rating = $_GET["rating"];

  $table = "review";

  $sqlQuery = sprintf("insert into %s values (\"%s\",\"%s\",\"%s\",\"%s\", %s)", $table, $user, $wine, $cheese, $review, $rating);
  $result = mysqli_query($db, $sqlQuery);
  if ($result) {
    echo json_encode("{ result : true, message : \"Added into review database\"}");
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }



  $table = "pairing";
  $num_review = 
  $sqlQuery = sprintf("update %s set num_review

    (\"%s\",\"%s\",\"%s\",\"%s\", %s)", $table, $user, $wine, $cheese, $review, $rating);
  $result = mysqli_query($db, $sqlQuery);
  if ($result) {
    echo json_encode("{ result : true, message : \"Added into review database\"}");
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }
 ?>
