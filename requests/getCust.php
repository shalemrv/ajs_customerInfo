<?php

     /*
          {"customerNumber":"112","customerName":"Signal Gift Stores","phone":"7025551838","city":"Las Vegas","country":"USA","creditLimit":"71800.00"}
     */

     require("_connect.php");
     require('_crypt.php');

     header('Content-type: application/json'); 

     $query= "SELECT customerNumber, customerName, customerFirstName, customerLastName, phone, city, country, creditLimit FROM customers";

     $customers= mysqli_query($db_conn, $query);

     $jStr="[";

     $c= mysqli_fetch_assoc($customers);

     $c['customerName']       =    decryptMe( $c['customerName']      );
     $c['customerFirstName']  =    decryptMe( $c['customerFirstName'] );
     $c['customerLastName']   =    decryptMe( $c['customerLastName']  );
     $c['phone']              =    decryptMe( $c['phone']             );
     $c['city']               =    decryptMe( $c['city']              );
     $c['country']            =    decryptMe( $c['country']           );
     $c['creditLimit']        =    decryptMe( $c['creditLimit']       );

     $jStr=$jStr.(string)json_encode($c);



     while($c= mysqli_fetch_assoc($customers))
     {    
          
          $c['customerName']       =    decryptMe( $c['customerName']      );
          $c['customerFirstName']  =    decryptMe( $c['customerFirstName'] );
          $c['customerLastName']   =    decryptMe( $c['customerLastName']  );
          $c['phone']              =    decryptMe( $c['phone']             );
          $c['city']               =    decryptMe( $c['city']              );
          $c['country']            =    decryptMe( $c['country']           );
          $c['creditLimit']        =    decryptMe( $c['creditLimit']       );

          $temp=(string)json_encode($c);
          $jStr=$jStr.",".$temp;
     }
     $jStr.="]";  

     while( substr_count($jStr, ",,") )
     {
          $jStr = str_replace(",," , "," , $jStr);
     } 

     echo $jStr;

?>
