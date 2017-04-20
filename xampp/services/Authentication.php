<?php
  header('Content-Type: application/json');

  // This service just verifies that the key associated with the username is valid
  // this verification method is a huge security hole but we can't use JWTs or
  // anything useful

  $userName = $_GET["username"];
  $key = $_GET["key"];

  if (password_verify($userName,$key)) {
    echo json_encode("{ result : true }");
  } else {
    echo json_encode("{ result : false }");
  }
?>
