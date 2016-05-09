/* global angular, $ */
angular.module('kaikongApp', [])
  .controller('kaikongCon', function ($scope, $http) {
    $http.get('/data').success(function (req, res) {
      $scope.product = req
    })

    $scope.addProduct = function (barcode, name, price) {
      $http.post('/data', {code: barcode, name: name, price: price}).success(function (req, res) {
        $scope.product.push(req)
        $('#modal1').closeModal()
      })
    }

    $scope.edit = function (index) {
      $scope.editShow = index
      $('#tr *').addClass('blur')
      $('.edit_a').addClass('disabled')
      $('.edit_d').addClass('disabled')
    }
    $scope.delete = function (index, id) {
      $http.delete('/data/' + id, {params: {_id: id}}).success(function (req, res) {
        $scope.product.splice(index, 1)
        $('#modal2').closeModal()
      })
    }

    $scope.bfdelete = function (index, id) {
      $('#modal2').openModal()
      $scope.dindex = index
      $scope.did = id
    }
    $scope.yes = function (index, id) {
      $http.put('/data', {_id: id, code: $scope.product[index].code, name: $scope.product[index].name, price: $scope.product[index].price}).success(function (req, res) {
        $('#tr *').removeClass('blur')
        $('.edit_a').removeClass('disabled')
        $('.edit_d').removeClass('disabled')
        $scope.editShow = null
      })
    }
    $scope.no = function (index) {
      $scope.editShow = null
      $('#tr *').removeClass('blur')
      $('.edit_a').removeClass('disabled')
      $('.edit_d').removeClass('disabled')
    }
  })
