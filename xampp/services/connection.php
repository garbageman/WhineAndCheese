<?php
  function connectToDB($host, $user, $password, $database) {
    $db = mysqli_connect($host, $user, $password, $database);
    if (mysqli_connect_errno()) {
      echo "Connect failed.\n".mysqli_connect_error();
      exit();
    }
    return $db;
  }

  function connectToTable() {
    $host = "localhost";
    $user = "testUser";
    $password = "moatsAndFerries";
    $database = "GB";
    return connectToDB($host, $user, $password, $database);
  }

?>
