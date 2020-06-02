<?php 

     require("_connect.php"); 
     require('_crypt.php');
     
     $rawData = file_get_contents("php://input");

     $postData = json_decode($rawData);

     $fName = $postData->fName;

     // $fName = "SHALEM";     

     $encName = encryptMe($fName);

     $myQuery = "SELECT * FROM customers WHERE customerFirstName = '$encName'";

     $decQuery = "SELECT * FROM customers WHERE customerFirstName = '$fName'";

     $result = mysqli_query($db_conn, $myQuery);

     $nameTaken = mysqli_num_rows($result);

     echo $nameTaken;

?>