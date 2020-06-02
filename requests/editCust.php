<?php 
     /*
     	http://localhost/ajs_jsonCust/addNewUser.php?fName=Shalem&lName=RVC&phN=345356346&city=Bluru&country=India&cLim=657

     	UPDATE customers SET customerNumber=[value-1],customerName=[value-2],customerLastName=[value-3],customerFirstName=[value-4],phone=[value-5],addressLine1=[value-6],addressLine2=[value-7],city=[value-8],state=[value-9],postalCode=[value-10],country=[value-11],salesRepEmployeeNumber=[value-12],creditLimit=[value-13] WHERE 1
     */
          
	require("_connect.php");	
     require('_crypt.php');

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //-------------------- FETCH POST VARIABLES RECIEVED --------------------
     //________________________________________________________________________
     //________________________________________________________________________


	$rawPostData    =    file_get_contents("php://input");
	$postData       =    json_decode($rawPostData);

	$cNo            =     $postData->customerNumber;
     $fName          =     strtoupper($postData->fName);
     $lName          =     strtoupper($postData->lName);
     $fullName       =     $fName." ".$lName;
	$phN            =     $postData->phone;
	$city           =     strtoupper($postData->city);
	$country        =     $postData->country;
	$cLim           =     $postData->creditLimit;



     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //----------------- VALIDATION AND INVALID MESSAGE BUILD -----------------
     //________________________________________________________________________
     //________________________________________________________________________ 

     require("_validate.php");
     
     if($invalidInput){
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

     $myQuery = "SELECT * FROM customers WHERE customerFirstName = '$_fName' AND customerNumber != '$cNo'";
     $result = mysqli_query($db_conn, $myQuery);
     
     if(mysqli_num_rows($result))
     {
          exit("An Error Occured. '$fName' is already taken. Please modify the First Name. \n $myQuery");
     }

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //----------------------- ADD CUSTOMER TO DATABASE ----------------------
     //________________________________________________________________________
     //________________________________________________________________________ 


	$myQuery="UPDATE customers SET 

               customerName        =    '$_fullName', 
               customerFirstName   =    '$_fName', 
               customerLastName    =    '$_lName', 
               phone               =    '$_phN', 
               city                =    '$_city', 
               country             =    '$_country',
               creditLimit         =    '$_cLim' 

     WHERE customerNumber='$cNo' ";

     $decQuery="UPDATE customers SET 

               customerName        =    '$fullName', 
               customerFirstName   =    '$fName', 
               customerLastName    =    '$lName', 
               phone               =    '$phN', 
               city                =    '$city', 
               country             =    '$country',
               creditLimit         =    '$cLim' 

     WHERE customerNumber='$cNo' ";

     	

	if(mysqli_query($db_conn, $myQuery)){
 		echo "Successfully Updated <br/> $fullName";
 	}
 	else{
          echo "An error occured while Updating -> $fullName ----", mysqli_report($db_conn), "--- QUERY EXECUTED : ", $decQuery;
 	}

?>