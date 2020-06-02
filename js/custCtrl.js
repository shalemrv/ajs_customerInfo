     

     app.controller("customerCtrl", function($scope, $rootScope, $http, $window, $location, $sce){
          
          ctrlCount++;
          console.log(" customerCtrl --- " + ctrlCount );




          //________________________________________________________________________
          //________________________________________________________________________
          // 
          //---------------------- RELOAD CUSTOMER DETAILS ---------------------
          //________________________________________________________________________
          //________________________________________________________________________ 

          $scope.reloadCustomers= function(){
               $http.get("requests/getCust.php").then(function(response){
                    console.log(response);
                    if(typeof(response.data)== "string")
                    {                     

                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : "Could not load customers data. "+response.data,
                              "blur"    : "3px",
                              "col"     : $rootScope.fCol
                         }

                         $rootScope.myAlert(msgObj, 10000);
                         

                    }else{
                         $scope.customers=response.data;   
                         globalCust=$scope.customers;

                         msgObj = {
                              "iSrc"    : $rootScope.sImg,
                              "mHead"   : "Success",
                              "mBody"   : "Customer details received.",
                              "blur"    : "3px",
                              "col"     : $rootScope.sCol
                         }

                         // $rootScope.myAlert(msgObj, 1500);     
                    }
                    

               }, function(response){

                    mStr = "Response Code :" + response.status + ". Your request could not be completed. Please Try again later"

                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Failed",
                         "mBody"   : mStr,
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);

                    // alert(response.status+" --- Your request could not be completed. \nPlease Try again later");
                    // $rootScope.msgToUser = response.data;
               });
          };//------ reloadCustomers

          // ------ Call first time when page loads loads ------ 
          $scope.reloadCustomers();

          //________________________________________________________________________
          //________________________________________________________________________
          // 
          //------------------ SHOW/ HIDE DELETE/EDIT BUTTONS --------------------
          //________________________________________________________________________
          //________________________________________________________________________ 
          
          $scope.changeAcc=function(){

               $scope.showEdit = false;
               $scope.showDel = false;
               
               switch($rootScope.acc){
                    case 1: $scope.showEdit = true; break;
                    case 2: $scope.showDel = true; break;   
               }
               $rootScope.acc=0;
          };


          //________________________________________________________________________
          //________________________________________________________________________
          // 
          //---------------------- EDIT CUSTOMER DETAILS ---------------------
          //________________________________________________________________________
          //________________________________________________________________________ 


          $scope.startEditCust= function(sel){

               $rootScope.passSelRow = sel;

               $location.url("/editCustomer");

          }; //------ startEditCust

          //________________________________________________________________________
          //________________________________________________________________________
          // 
          //---------------------- DELETE CUSTOMER DETAILS ---------------------
          //________________________________________________________________________
          //________________________________________________________________________ 

          $scope.delCust =  function(dCust){

               var custDetails = "ID : " + dCust.customerNumber + " \tName : " + dCust.customerName;
               var question = custDetails + "\n\nAre you sure you want to delete this customer?";
               var conf = $window.confirm(question);

               if(!conf)
               {
                    mStr = custDetails + " <br/> You cancelled your last request to Delete this customer.";

                    msgObj = {
                         "iSrc"    : $rootScope.fImg,
                         "mHead"   : "Cancelled",
                         "mBody"   : mStr,
                         "blur"    : "3px",
                         "col"     : $rootScope.fCol
                    }

                    $rootScope.myAlert(msgObj, 2000);

                    // $rootScope.msgToUser = "You cancelled your last request to Delete this customer \t----\t"+custDetails;
                    return;
               }

               var reqObj={
                    method: "POST", 
                    url: "requests/delCust.php", 
                    data: dCust
               };

               $http(reqObj).then(
                    function(response){
                         mStr="Last Action: Delete Customer ----- Request Complete ---- " + response.data;

                         if(response.data[0]=="I")
                         {
                              msgObj = {
                                   "iSrc"    : $rootScope.sImg,
                                   "mHead"   : "Success",
                                   "mBody"   : response.data,
                                   "blur"    : "3px"
                              }

                              $rootScope.myAlert(msgObj, 1500);
                              $scope.reloadCustomers();
                              return;
                         }

                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : response.data,
                              "blur"    : "3px"
                         }

                         $rootScope.myAlert(msgObj, 2000);

                         
                    },function(response){

                         mStr = response.data + " : Your request could not be completed. Please Try again later.";

                         msgObj = {
                              "iSrc"    : $rootScope.fImg,
                              "mHead"   : "Failed",
                              "mBody"   : mStr,
                              "blur"    : "3px"
                         }

                         $rootScope.myAlert(msgObj, 2000);

                         // alert(response.status+" --- Your request could not be completed. \nPlease Try again later");
                         // $rootScope.msgToUser="Last Action: Delete Customer ----- Request Failed ---- "+response.data;
                    }
               );
          }; //------ delCust



     });
