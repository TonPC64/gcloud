/* global angular, $ */
angular.module('kaikongApp', [])
  .controller('kaikongCon', function ($scope, $http) {
    $scope.product = [
      {code:'0001',name:'pro1',price:'100'},
      {name:'pro2',price:'100'},
      {name:'pro3',price:'100'},
      {name:'pro4',price:'100'}]

      $scope.add = function (){
         $('#modal1').openModal();
      }

      $scope.addProduct = function(){
        $scope.product.push({code:$scope.barcode,name:$scope.name,price:$scope.price})
         $('#modal1').closeModal();
      }

  })
