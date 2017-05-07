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
    // echo json_encode("{ result : true, message : \"Added into review database\"}");
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }


  // Need to queue for num_review
  $table = "pairing";
  $sqlQuery = sprintf("select * from %s where wine=\"%s\" AND cheese=\"%s\"", $table, $wine, $cheese);
  $result = mysqli_query($db, $sqlQuery);

  if ($result) {
    $row = $result->fetch_array(MYSQLI_ASSOC); 
    //echo json_encode("{ result : true, message : \"Recieved num_review\"}");
    $num_review = $row["num_reviews"];
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the num_review\"}");
  }


  // Need to queue for total_rating
  $sqlQuery = sprintf("select * from %s where wine=\"%s\" AND cheese=\"%s\"", $table, $wine, $cheese);
  $result = mysqli_query($db, $sqlQuery);

  if ($result) {
    $row = $result->fetch_array(MYSQLI_ASSOC); 
    //echo json_encode("{ result : true, message : \"Recieved num_review\"}");
    $total_rating = $row["total_rating"];
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }


  // Update num_review and total_rating
  $num_review++;
  $total_rating += $rating;
  $avg_rating = $total_rating/$num_review;
  $sqlQuery = sprintf("update %s set num_reviews=\"%s\", total_rating=\"%s\", avg_rating=\"%s\" where wine=\"%s\" AND cheese=\"%s\"", 
    $table, $num_review, $total_rating, $avg_rating, $wine, $cheese);
  $result = mysqli_query($db, $sqlQuery);
  if ($result) {
    echo json_encode("{ result : true, message : \"Added into review database\"}");
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ result : false, message : \"There was an issue with the query\"}");
  }
 ?>
