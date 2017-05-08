<?php
  function connectToDB($host, $user, $password, $database) {
    $db = mysqli_connect($host, $user, $password, $database);
    if (mysqli_connect_errno()) {
      echo "Connect failed.\n".mysqli_connect_error();
      exit();
    }
    return $db;
  }

  function establishConnection() {
    $host = "localhost";
    // $user = "testUser";
    // $password = "moatsAndFerries";
    // $database = "GB";
    $user = "dbuser";
    $password = "goodbyeWorld";
    $database = "gb";
    return connectToDB($host, $user, $password, $database);
  }

?>
