
     var globalCust;
     var respData="";
     var ctrlCount = 0;
     var countries;
     var msgObj;
     var mStr;
     var nameTaken = false;
     
     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //---------------------- ROUTING CONFIG ---------------------
     //________________________________________________________________________
     //________________________________________________________________________ 

     var app=angular.module("myApp", ["ngRoute", "ngAnimate", "ngSanitize"]);

     app.config(function($routeProvider){

          $routeProvider
          .when(
               "/newCustomer", 
               {
                    templateUrl: "views/addCust.html"              
               }
          )
          .when(
               "/editCustomer", 
               {
                    templateUrl: "views/editCust.html"
               }
          )
          .when(
               "/", 
               {
                    templateUrl: "views/customers.html"
               }
          )
     });

     //________________________________________________________________________
     //________________________________________________________________________
     // 
     //---------------------- ROOTSCOPE INITIALIZATION ---------------------
     //________________________________________________________________________
     //________________________________________________________________________ 

     app.run(function($rootScope, $timeout) {

          $rootScope.passSelRow = {
               "city": "",
               "country": "",
               "creditLimit": "",
               "customerName": "",
               "customerNumber": "",
               "phone": ""
          };

          $rootScope.newCust = {
               "fName": "",
               "lName": "",
               "phN" : "",
               "city": "",
               "country": "",
               "creditLimit": ""
          };

          $rootScope.sImg = "src/success.png";
          $rootScope.fImg = "src/fail.png";

          $rootScope.msgToUser = {
               "iSrc"    : "src/success.png",
               "mHead"   : "",
               "mBody"   : "",
               "blur"    : "0",
               "col"     : ""
          };  



          $rootScope.showMessage = false;
          $rootScope.msgAvl= true;
          $rootScope.sCol = "#008000";
          $rootScope.fCol = "#e74c3c";

          $rootScope.acc = 0;
          $rootScope.currentView="Existing Cutomers";
         
          $rootScope.resetAddForm = true;

          $rootScope.resetAlert = function(){
               $rootScope.showMessage = false;
               $rootScope.msgToUser.blur="0";
               $rootScope.msgAvl= true;
               // $rootScope.msgToUser = {
               //      "iSrc"    : "",
               //      "mHead"   : "",
               //      "mBody"   : "",
               //      "blur"    : "0"
               // };                
          };

          $rootScope.myAlert = function(data, mTime){
               if(!$rootScope.msgAvl){
                    $timeout(function() {
                         $rootScope.msgAvl= false;
                         $rootScope.msgToUser = data;
                         $rootScope.showMessage = true;

                         $timeout(function(){                    
                              $rootScope.resetAlert();
                         }, mTime);
                    }, 2000);
                    return;
               }

               $rootScope.msgAvl= false;
               $rootScope.msgToUser = data;
               $rootScope.showMessage = true;

               $timeout(function(){                    
                    $rootScope.resetAlert();
               }, mTime);
          };

     });

     

     app.factory("forForm",function($filter, $http){

          return {
               checkWithServer : function(newName){
                    
                    console.log("\nnewName = " + newName);

                    nameTaken = false;

                    newName = $filter('uppercase')(newName);

                    var req = {
                         method    : "POST",
                         url       : "requests/nameTaken.php",
                         data      : { "fName" : newName}
                    };

                    return $http(req).then(function(response){

                         console.log(response);
                         if(response.data == "1")
                         {
                              console.log("\nnewName = " + newName + "Name exists");
                              nameTaken = true;
                              return nameTaken;
                         }     
                         
                    }, function(response){

                         alert(response.status+" --- Your request could not be completed. \nPlease Try again later");
                         return nameTaken;
                    });

               },

               fetchCountries : function(){
                    var req = {
                         method    : "GET",
                         url       : "requests/countries.json"
                    };

                    return $http(req).then(function(response){
                         return response.data;
                    }, function(response){
                         alert("An error occured");
                    });
               },

               keyDownValidation : function(e, t, sL){
                    // Tab ctrl delete arrows etc
                    if((e.keyCode>=8)&&(e.keyCode<=46)){
                         return;
                    }



                    switch(t){
                         case "A": 
                              if((e.keyCode<65)||(e.keyCode>90))
                              {
                                   console.log("Something Else");
                                   e.preventDefault();
                              }                         
                              break;
                         case "N":
                              if( (sL!=null) && (sL.length>9)) e.preventDefault();

                              if(  
                                   ((e.keyCode>=48) && (e.keyCode<=57)) 
                                   ||   
                                   ( (e.keyCode>=96)&& (e.keyCode<=105))
                              ){
                                   return;
                              }    
                              else{
                                   console.log("Something Else");
                                   e.preventDefault();
                                   return;
                              }                     
                              break;
                    }
               }
          };


     });


     