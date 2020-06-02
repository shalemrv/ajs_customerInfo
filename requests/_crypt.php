<?php 
     
     function encryptMe($str){
          
          $encMethod     =    "AES-256-CBC";
          $myEncPwd      =    "a27105fa47bde14a436da2ebf965ebb0";
           
          return openssl_encrypt($str, $encMethod, $myEncPwd);;

     }

     function decryptMe($str){
          
          $encMethod     =    "AES-256-CBC";
          $myEncPwd      =    "a27105fa47bde14a436da2ebf965ebb0";

          return openssl_decrypt($str, $encMethod, $myEncPwd);

     }

     // echo encryptMe("Shalem Rathna Raj");

?>