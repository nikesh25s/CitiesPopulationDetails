<?php
$input = $_GET['input'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch cities from the database based on the input
$sql = "SELECT city_name FROM cities WHERE city_name LIKE '$input%'";
$result = $conn->query($sql);

$cities = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $cities[] = $row['city_name'];
  }
}

$conn->close();

echo json_encode($cities);
?>

