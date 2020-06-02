<?php 
	// DELETE FROM customers WHERE customers.customerNumber = 508 

	require("_connect.php");

	$rawPostData=file_get_contents("php://input");
	$postData=json_decode($rawPostData, true);
	
	$cNo=$postData['customerNumber'];

     // $retObj = array('' => , );
     
	$myQuery = "DELETE FROM customers WHERE customerNumber = '$cNo'";

	if(mysqli_query($db_conn, $myQuery)){
		// echo "Successfully deleted <> ID = $cNo  ------- QUERY EXECUTED : $myQuery";
          echo "ID = $cNo <br> Successfully deleted.";
	}
     else{
          echo "An error occured while deleting --- ID = $cNo  ----", mysqli_report($db_conn);
     }

?>