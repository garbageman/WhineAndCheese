<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Tangerine" rel="stylesheet">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/userProfile.css">
</head>
<body>

<?php

  $url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $parts = parse_url($url); //Getting user url variable
  parse_str($parts['query'], $query);
  // print_r($query); //For debugging purposes
  $q =  trim($query['q']); //Variable name for user

  $host = "localhost";
  // $user = "dbuser"; //For Matt's computer
  $user = "testUser"; //Correct database username
  // $password = "goodbyeWorld"; //For Matt's Computer
  $password = "moatsAndFerries"; //Correct database password
  $database = "gb";


  $con = mysqli_connect($host,$user,$password,$database);
  if (!$con) {
      die('Could not connect: ' . mysqli_connect_error());
  }

  mysqli_select_db($con,"ajax_demo");
  $table="testUsers";
  // print($q); //For debugging purposes
  $sql="SELECT * FROM ".$table." join review on username = name WHERE username = '".$q."'";
  $result = mysqli_query($con,$sql);
  echo $q;
  echo "<container class='userProfile'>";
  echo "<table>
  <tr>
  <th>Wine</th>
  <th>Cheese</th>
  <th>Review</th>
  <th>Rating</th>
  </tr>";
  while($row = mysqli_fetch_array($result)) {
      echo "<tr>";
      echo "<td>" . $row['wine'] . "</td>";
      echo "<td>" . $row['cheese'] . "</td>";
      echo "<td id='review'>" . $row['review'] . "</td>";
      echo "<td>" . $row['rating'] . "</td>";
      echo "</tr>";
  }
  echo "</table>";
  echo "</container>";
  mysqli_close($con);
?>
</body>
</html>
