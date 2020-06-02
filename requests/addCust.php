<?php 
     /*
     	localhost/ajs_jsonCust/addNewUser.php?fName=Shalem&lName=RVC&phN=345356346&city=Bluru&country=India&cLim=657

     	INSERT INTO customers (customerName, contactLastName, contactFirstName, phone, city, country, creditLimit) VALUES ('Shalem Raj', 'Shalem', 'Raj', '952347', 'Blore', 'India', '2500');
     */

	require("_connect.php");
     require('_crypt.php');

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //-------------------- FETCH POST VARIABLES RECIEVED --------------------
     //________________________________________________________________________
     //________________________________________________________________________ 


	$rawPostData       =    file_get_contents("php://input");
	$postData          =    json_decode($rawPostData);


	$fName        =    strtoupper($postData->fName);
	$lName        =    strtoupper($postData->lName);
	$fullName     =    $fName." ".$lName;
	$phN          =    $postData->phN;
	$city         =    strtoupper($postData->city);
	$country      =    strtoupper($postData->country);
	$cLim         =    $postData->cLim;  


     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //----------------- VALIDATION AND INVALID MESSAGE BUILD -----------------
     //________________________________________________________________________
     //________________________________________________________________________ 

     require("_validate.php");

     if( $invalidInput ){

          exit("Failed to Update.".$finalInvalidMessage);

     }

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //--------------- ENCRYPT VARIABLES TO BE ADDED TO DATABASE -------------
     //________________________________________________________________________
     //________________________________________________________________________ 

     
     $_fName          =     encryptMe($fName);
     $_lName          =     encryptMe($lName);
     $_fullName       =     encryptMe($fullName);
     $_phN            =     encryptMe($phN);
     $_city           =     encryptMe($city);
     $_country        =     encryptMe($country);
     $_cLim           =     encryptMe($cLim);


     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //---------------- CHECK IF NAME IS PRESENT IN DATABASE -----------------
     //________________________________________________________________________
     //________________________________________________________________________

     $myQuery = "SELECT * FROM customers WHERE customerFirstName = '$_fName'";
     $result = mysqli_query($db_conn, $myQuery);
     
     if(mysqli_num_rows($result))
     {
          exit("An Error Occured. $fName is already taken. Please modify the First Name");
     }

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //----------------------- ADD CUSTOMER TO DATABASE ----------------------
     //________________________________________________________________________
     //________________________________________________________________________ 



 	$myQuery= "

          INSERT INTO customers (

               customerName, 
               customerFirstName, 
               customerLastName, 
               phone, 
               city, 
               country, 
               creditLimit

          ) VALUES (

               '$_fullName', 
               '$_fName', 
               '$_lName', 
               '$_phN', 
               '$_city', 
               '$_country', 
               '$_cLim'
          );
     ";

     $decQuery= "

          INSERT INTO customers (

               customerName, 
               customerFirstName, 
               customerLastName, 
               phone, 
               city, 
               country, 
               creditLimit

          ) VALUES (

               '$fullName', 
               '$fName', 
               '$lName', 
               '$phN', 
               '$city', 
               '$country', 
               '$cLim'
          );
     ";

     
 	if(mysqli_query($db_conn, $myQuery)){
 		echo "Successfully Added -> $fullName ------- QUERY EXECUTED : $decQuery ";
 	}
 	else{
 		echo "An error occured -> $fullName ----", mysqli_report($db_conn), "--- QUERY EXECUTED : $decQuery";
 	}

?>