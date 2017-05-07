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
  // echo $sqlQuery;
  $result = mysqli_query($db, $sqlQuery);
  if ($result) {
    // echo json_encode("{ result : true, message : \"Added into review database\"}");
  } else {
    // Something went horribly wrong with the search so log the error
    echo json_encode("{ \"result\" : false, \"message\" : \"There was an issue with the review insertion\"}");
  }

  // Need to queue for num_review
  $table = "pairing";
  $sqlQuery = sprintf("select * from %s where wine=\"%s\" AND cheese=\"%s\"", $table, $wine, $cheese);
  $result = mysqli_query($db, $sqlQuery);

  if ($result) {
    $numberOfRows = mysqli_num_rows($result);
    if ($numberOfRows > 0) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      $num_review = $row["num_reviews"];
      $total_rating = $row["total_rating"];

      // Update num_review and total_rating
      $num_review++;
      $total_rating += $rating;
      $avg_rating = $total_rating/$num_review;
      $sqlQuery = sprintf("update %s set num_reviews=\"%s\", total_rating=\"%s\", avg_rating=\"%s\" where wine=\"%s\" AND cheese=\"%s\"",
        $table, $num_review, $total_rating, $avg_rating, $wine, $cheese);
      $result = mysqli_query($db, $sqlQuery);
      if ($result) {
        echo json_encode("{ \"result\" : true, \"message\" : \"Added into review database\"}");
      } else {
        // Something went horribly wrong with the search so log the error
        echo json_encode("{ \"result\" : false, \"message\" : \"There was an issue with the final update\"}");
      }
    } else {
      // Add new pairing
      $sqlQuery = sprintf("insert into %s values(\"%s\",\"%s\",1,%s,%s)", $table, $wine, $cheese,$rating,$rating);
      $result = mysqli_query($db, $sqlQuery);
      echo json_encode("{ \"result\" : true, \"message\" : \"Added new pairing to db\"}");
    }
  } else {
    // Something went horribly wrong with the search so log the error
    // There is nothing in the db already so this is a brand new pairing
    $table = "pairing";
    $sqlQuery = sprintf("insert into %s values(\"%s\",\"%s\",1,%s,%s)", $table, $wine, $cheese,$rating,$rating);
    $result = mysqli_query($db, $sqlQuery);
    echo json_encode("{ \"result\" : true, \"message\" : \"Added new pairing to db\"}");
  }

 ?>
