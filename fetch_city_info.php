<?php
$city = $_GET['city'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch city information from the database
$sql = "SELECT * FROM cities WHERE city_name = '$city'";
$result = $conn->query($sql);

$cityInfo = array();
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $cityInfo['rank'] = $row['rank'];

  // Remove commas and convert population values to integers
  $cityInfo['population_2011'] = intval(str_replace(',', '', $row['population_2011']));
  $cityInfo['population_2001'] = intval(str_replace(',', '', $row['population_2001']));

  $cityInfo['state'] = $row['state'];
}

$conn->close();

echo json_encode($cityInfo);
?>

