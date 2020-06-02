
     app.controller("editCustomerCtrl", function(forForm, $scope, $rootScope, $location, $filter, $document, $http){

          ctrlCount++;
          console.log(" editCustomerCtrl --- " + ctrlCount );


           $scope.editedData = {
               "customerNumber"    :    "",
               "customerName"      :    "",
               "customerFirstName" :    "",
               "fName"             :    "",
               "lName"             :    "",
               "phone"             :    "",
               "city"              :    "",
               "country"           :    "",
               "creditLimit"       :    ""    
          };  

          $scope.nameTakenS = false;

          var countriesPromise = forForm.fetchCountries();

          countriesPromise.then(function(cList){
               $scope.countries = cList;
               console.log($scope.countries);
          }, function(response){
               console.log(response);
          });

          $scope.editFormInit=function(){

               $scope.editedData.customerNumber = $rootScope.passSelRow.customerNumber
               $scope.editedData.customerName = $rootScope.passSelRow.customerName;
               $scope.editedData.customerFirstName = $rootScope.passSelRow.customerFirstName;
               $scope.editedData.fName = $rootScope.passSelRow.customerFirstName;
               $scope.editedData.lName = $rootScope.passSelRow.customerLastName;
               $scope.editedData.phone = $rootScope.passSelRow.phone;
               $scope.editedData.city= $rootScope.passSelRow.city;
               $scope.editedData.country = $rootScope.passSelRow.country;
               $scope.editedData.creditLimit= $rootScope.passSelRow.creditLimit;
               $scope.nameTaken = false;
               $scope.nameTakenS = false;
          };

          $scope.validateFirstName = function(){

               currentName = $filter('uppercase')($scope.editedData.customerFirstName);
               newName = $filter('uppercase')($scope.editedData.fName);

               if( currentName == newName ){
                    console.log("Same Name" + nameTaken);
                    $scope.nameTakenS = false;
                    return;
               }   

               console.log(currentName);
               console.log(newName);

               var namePromise = forForm.checkWithServer(newName);

               
               namePromise.then(function(nameTaken){
                    $scope.nameTakenS = nameTaken;
                    mStr = newName + " is already taken. Please modify the First Name";
                    if($scope.nameTakenS)
                    {
                         msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Failed",
                         "mBody"   : mStr,
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                         }

                         $rootScope.myAlert(msgObj, 2000);

                         // alert(newName + " is already taken. Please modify the First Name");
                    }
                    
               });
          };


          
          $scope.checkIfValid = function(e, t, sL){
              
              forForm.keyDownValidation(e, t, sL);
              
          }





          // ------ Updated Details Submit ------ 
          $scope.editedDataSubmit= function(){

               if($scope.nameTakenS){
                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Alert",
                         "mBody"   : "Please modify the First Name.",
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);
                    // alert("Please modify the First Name");
                    return;
               }

               var valC = $scope.countries.find(x => x.country === $scope.editedData.country)

               if(valC==null){
                    $scope.editedData.country = "";

                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Alert",
                         "mBody"   : "Invalid country. Please select from the drop down.",
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 10000);
                    // alert("");
                    return;
               }           

               if($scope.editForm.$invalid)
               {
                    mStr = "Please fill the form completely!";

                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Alert",
                         "mBody"   : mStr,
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);

                    // alert("Please fill the form completely!");                    
                    angular.element($document[0].querySelector('input.ng-invalid'))[0].focus();                
                    return;
               }

               var reqObj={
                    method: "POST", 
                    url: "requests/editCust.php", 
                    data: $scope.editedData
               };

               $http(reqObj).then(
                    function(response){
                         respData = response.data;

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
                         mStr = response.status+"<br/>Your request could not be completed. <br/> Please Try again later";
                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : mStr,
                              "blur"    : "3px",
                              "col"     : $rootScope.fCol
                         }

                         $rootScope.myAlert(msgObj, 2000);
                         
                    }
               );

          }; //------ editedDataSubmit

     });