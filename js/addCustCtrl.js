     
     app.controller("addCustomerCtrl", function(forForm, $scope, $rootScope, $http, $filter, $location, $document){
          
          ctrlCount++;
          console.log(" addCustomerCtrl --- " + ctrlCount );

          $scope.newCust = {
               "fName": "",
               "lName": "",
               "phN" : "",
               "city": "",
               "country": "",
               "creditLimit": ""
          };  

          $scope.nameTakenS = false;  


          $scope.newCustInit = function(){
               $scope.newCust.fName = "";
               $scope.newCust.lName= "";
               $scope.newCust.phN = "";
               $scope.newCust.city= "";
               $scope.newCust.country= "";
               $scope.newCust.creditLimit= "";
               $scope.nameTakenS = false;

          }

          $scope.newCustInit();

          var countriesPromise = forForm.fetchCountries();

          countriesPromise.then(function(cList){
               $scope.countries = cList;
               console.log($scope.countries);
          }, function(response){
               console.log(response);
          });

          
          $scope.checkIfValid = function(e, t, sL){
              
              forForm.keyDownValidation(e, t, sL);
              
          }




          //________________________________________________________________________
          //________________________________________________________________________
          // 
          //------------------- CHECK FIRST NAME AVAILABLE ------------------
          //________________________________________________________________________
          //________________________________________________________________________ 

          $scope.validateFirstName = function(){               
               
               newName = $filter('uppercase')($scope.newCust.fName);

               var namePromise = forForm.checkWithServer(newName);
               
               namePromise.then(function(nameTaken){
                    $scope.nameTakenS = nameTaken;
                    if($scope.nameTakenS)
                    {
                         mStr = newName + " is already taken. Please modify the First Name";
                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : mStr,
                              "blur"    : "3px",
                              "col"     : $rootScope.fCol
                         }

                         $rootScope.myAlert(msgObj, 2000);
                   
                    }
                    else{
                         mStr = newName + " is Available";
                         msgObj = {
                              "iSrc"    : $rootScope.sImg,
                              "mHead"   : "Success",
                              "mBody"   : mStr,
                              "blur"    : "3px",
                              "col"     : $rootScope.sCol
                         }

                         $rootScope.myAlert(msgObj, 1000);
                         // $rootScope.msgToUser = newName + " is Available !!!";
                    }
                    console.log($scope.nameTakenS);  
               });
          };

          //________________________________________________________________________
          //________________________________________________________________________
          // 
          //---------------------- ADD NEW CUSTOMER DETAILS ---------------------
          //________________________________________________________________________
          //________________________________________________________________________ 

          
          $scope.newCustSubmit=function(){

               if($scope.nameTakenS){
                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Alert",
                         "mBody"   : "Please modify the First Name.",
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);
                    return;
               }

               var valC = $scope.countries.find(x => x.country === $scope.newCust.country)

               if(valC==null){
                    $scope.newCust.country = "";

                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Alert",
                         "mBody"   : "Invalid country. Please select from the drop down.",
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);
                    return;
               }           

               if($scope.register.$invalid)
               {
                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Alert",
                         "mBody"   : "Please fill the form completely!",
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);            
                    angular.element($document[0].querySelector('input.ng-invalid'))[0].focus();    
                    return;
               }


               var reqObj={
                    method: "POST", 
                    url: "requests/addCust.php", 
                    data: $scope.newCust
               };


               $http(reqObj).then(
                    function(response){
                         if(response.data[0]=="S"){
                             msgObj = {
                                   "iSrc"    : $rootScope.sImg,
                                   "mHead"   : "Success",
                                   "mBody"   : response.data,
                                   "blur"    : "3px",
                                   "col"     : $rootScope.sCol
                              };

                              $rootScope.myAlert(msgObj, 2000);
                              $location.url("/");
                              return; 
                         }    

                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : response.data,
                              "blur"    : "3px",
                              "col"     : $rootScope.fCol
                         };

                         $rootScope.myAlert(msgObj, 2000);                     

                    },
                    function(response){
                         mStr = response.status+" : Your request could not be completed. <br/>Please Try again later <br/>"+ response.data;
                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : response.data,
                              "blur"    : "3px",
                              "col"     : $rootScope.fCol
                         };

                         $rootScope.myAlert(msgObj, 2000);    
                         
                    }
               );
          
          };


     });