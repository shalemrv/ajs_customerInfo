<?php 

     // $fullName= "Shalem Raj";
     // $phN="90603334";
     // $city="Bluru";
     // $country="India";
     // $cLim="22.545";
 

     function alphaOnly($inp){
          $pAlphaOnly = "/^[a-zA-Z ]+$/";
          if(preg_match($pAlphaOnly, $inp)){
               return true;
          }
          return false;
     }

     function numOnly($inp){

          $pFloatInt = "/[0-9]+(\.[0-9]{0,2})?/";

          if(preg_match($pFloatInt, $inp))
          {
               return true;
          }
          return false;
     }

     function validMobile($inp){

          $pMobile = '/^[0-9]{10}$/';

          if(preg_match($pMobile, $inp))
          {
               return true;
          }
          return false;
     }

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //----------------- VALIDATION AND INVALID MESSAGE BUILD -----------------
     //________________________________________________________________________
     //________________________________________________________________________ 

     
     $invalidInput = false;

     $invalTitle = "Please check the ";
     $invalDesc = "";

     if(empty($fName))
     {
          exit("Failed to Update. Please check the First Name.");
     }
     if(empty($lName))
     {
          exit("Failed to Update. Please check the Last Name.");
     }
     if(empty($phN))
     {
          exit("Failed to Update. Please check the Phone Number.");
     }
     if(empty($city))
     {
          exit("Failed to Update. Please check the City.");
     }
     if(empty($country))
     {
          exit("Failed to Update. Please check the Country.");
     }
     if(empty($cLim))
     {
          exit("Failed to Update. Please check the Credit Limit.");
     }


     if( ! alphaOnly($fullName) )
     {
          $invalidInput = true;
          $invalTitle = $invalTitle . " --Name-- ";
          $invalDesc = $invalDesc . "\nName cannot contain Numbers or Special Characters ";
     }

     if(! validMobile($phN))
     {
          $invalidInput = true;
          $invalTitle = $invalTitle . " --Mobile-- ";
          $invalDesc = $invalDesc . "\nMobile has to be 10 digits long and cannot contain Alphabets or Special Characters";
     }

     if(! alphaOnly($city))
     {
          $invalidInput = true;
          $invalTitle = $invalTitle . " --City-- ";
          $invalDesc = $invalDesc . "\nCity cannot contain Numbers or Special Characters --- ";
     }

     if(! alphaOnly($country))
     {
          $invalidInput = true;
          $invalTitle = $invalTitle . " --Country-- ";
          $invalDesc = $invalDesc . "\nCountry cannot contain Numbers or Special Characters --- ";
     }


     if(! numOnly($cLim))
     {
          $invalidInput = true;
          $invalTitle = $invalTitle . " --CreditLimit-- ";
          $invalDesc = $invalDesc . "\nCredit Limit cannot contain Alphabets or Special Characters";
     }


     $invalTitle = $invalTitle . "\n";

     $finalInvalidMessage = $invalTitle ."\n". $invalDesc ;

?>