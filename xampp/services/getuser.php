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
  $username =  trim($query['q']); //Variable name for user

  $host = "localhost";
  $user = "testUser"; //Correct database username
  $password = "moatsAndFerries"; //Correct database password
  $database = "GB";


  $con = mysqli_connect($host,$user,$password,$database);
  if (!$con) {
      die('Could not connect: ' . mysqli_connect_error());
  }

  $table="testUsers";
  $count = 0;
  // print($q); //For debugging purposes
  $sql="SELECT * FROM ".$table." join review on username = name WHERE username = '".$username."'";
  $result = mysqli_query($con,$sql);
  echo "<div class=\"container-fluid page-body\"><div class=\"row\"><div class=\"col-lg-12\">";
  echo "<h1 class=\"username-display\">" . $username . "'s Profile</h1></div></div>";
  echo "<div class=\"col-lg-offset-3 col-lg-6 top-section\">";
  echo "<h2 class=\"review-titlefd\">Reviews</h2>";


  while($row = mysqli_fetch_array($result)) {
    $sl = "SELECT * FROM wine where name = '" . $row['wine'] . "'";
    $res = mysqli_query($con, $sl) or die(mysqli_error($con));
    if($wine = mysqli_fetch_array($res)) {
      $sq = "SELECT * FROM cheese where name = '" . $row['cheese'] . "'";
      $r = mysqli_query($con,$sq) or die(mysqli_error($con));
      if($cheese = mysqli_fetch_array($r)) {
        echo "<div class=\"thumbnail-col\"><div class=\"thumbnail\">";
        // echo "<img align=\"left\" class=\"icons\" src=\"services/cheeseImage.php?cheese=" . $cheese['name'] . "\" alt=\"\">";
        // echo "<img align=\"right\" class=\"icons\" src=\"services/wineImage.php?wine=" . $wine['name'] . "\" alt=\"\">";
        echo "<div class=\"row\">";


        echo "<div class='col-sm-4'>";
        echo "<img align=\"right\" class=\"icons\" src=\"services/wineImage.php?wine=" . $wine['name'] . "\" alt=\"\">";

        echo "</div>";



        echo "<div class='col-sm-4'>";
        $script = "javascript:window.location.href = 'pairing.html?wine=' + '" . $row['wine'] . "'.replace(' ', '+') + '&cheese=' + '" . $row['cheese'] . "'.replace(' ', '+');";
        echo "<h3 class=\"thumbnail-header\" style=\"cursor: pointer;\" onclick=\"" . $script . "\" value=\"wine=" . $row['wine'] . "&cheese=" . $row['cheese'] . "\">" . $row['wine'] . " & " . $row['cheese'] . "</h3><br />";


        echo "<p class=\"thumbnail-rating\">" . $row['review'] . "</p>";

        echo "</div>";



        echo "<div class='col-sm-4'>";
        echo "<img align=\"left\" class=\"icons\" src=\"services/cheeseImage.php?cheese=" . $cheese['name'] . "\" alt=\"\">";
        echo "</div>";

        // echo "<div class=\"col-md-7\">";
        // echo "<img class=\"icons\" src=\"services/cheeseImage.php?cheese=" . $cheese['name'] . "\" alt=\"\">";
        // echo "<img class=\"icons\" src=\"services/wineImage.php?wine=" . $wine['name'] . "\" alt=\"\">";
        // echo "<div class=\"col-md-5\">";
        echo "<div class=\"container-fluid reviews\">";
        // $script = "javascript:window.location.href = 'pairing.html?wine=' + '" . $row['wine'] . "'.replace(' ', '+') + '&cheese=' + '" . $row['cheese'] . "'.replace(' ', '+');";
        // echo "<h3 class=\"thumbnail-header\" style=\"cursor: pointer;\" onclick=\"" . $script . "\" value=\"wine=" . $row['wine'] . "&cheese=" . $row['cheese'] . "\">" . $row['wine'] . " and " . $row['cheese'] . "</h3>";
        // echo "<p class=\"thumbnail-rating\">" . $row['review'] . "</p>";
        echo "</div>";
        // echo "</div>";

        echo "</div>";

        echo "</div></div>";
      }
    }
    $count++;

  }
  if($count == 0) {
    echo "<h1 class=\"username-display\">No Reviews</h1></div></div>";
  }
  echo "</div></div>";
  mysqli_close($con);
?>
</body>
</html>
