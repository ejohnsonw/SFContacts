/*
 Copyright (c) 2014 NgeosOne LLC. All rights reserved.
 Created by Evol Johnson
 
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

[GENERATRON]
Filename:     controllers.js
Description:  Packaging Information
Project:      SFContacts

This file was generated from: ionic/controllers.js.vmg
DO NOT MODIFY, THIS FILE WILL BE OVERWRITTEN. Please use extend this class.

*/

/**
* Controllers
*/
angular.module('SFContacts.controllers', [])
.controller('LayoutController', function ($scope, auth) {
  // save auth data
  $scope.onAuth = function (authData) {
    auth.set(authData);
  }
})

.controller('ContactsCtrl', function ($scope, ContactService) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllContacts();
        }

        var findAllContacts = function() {
            ContactService.findAll().then(function (contacts) {
                $scope.contacts = contacts;
            });
        }

        findAllContacts();

})

.controller('ContactCtrl', function ($scope, $stateParams, ContactService) {
    ContactService.findById($stateParams.contactId).then(function(contact) {
        $scope.contact = contact;
    });
})


.controller('ContactSaveCtrl', function ($scope, $stateParams, ContactService) {
    ContactService.save($stateParams.contactId).then(function(contact) {
        $scope.contact = contact;
    });
})

.controller('ContactUpdateCtrl', function ($scope, $stateParams, ContactService) {
    ContactService.update($stateParams.contactId).then(function(contact) {
        $scope.contact = contact;
    });
})

.controller('ContactDeleteCtrl', function ($scope, $stateParams, ContactService) {
    ContactService.delete($stateParams.contactId).then(function(contact) {
        $scope.contact = contact;
    });
})



.controller('TrackingController', function ($scope, auth, $rootScope) {

  $scope.input = {};

  var positionWatchId;

  $scope.$watch('input.enableTracking', function (val) {
    if (val) {

      var authData = auth.get();
      var positionList = [];
      $rootScope.positionObjectId = null;

      $.ajax({
        url: authData.instance_url + '/services/data/v29.0/sobjects/Position__c',
        type: 'POST',
        headers: {
          'Authorization': authData.token_type + ' ' + authData.access_token,
          'Content-type': 'application/json'
        },
        data: JSON.stringify({'Data__c': ''}),
      })

        .then(function ok(e) {

          $rootScope.$apply(function () {
            $rootScope.positionObjectId = e.id;
          })

          // start position watch
          positionWatchId = navigator.geolocation.watchPosition(function (e) {

            positionList.unshift([e.coords.latitude, e.coords.longitude]);

            // store only 25 recent positions
            if (positionList.length > 25) {
              positionList.splice(-1);
            }

            // update Position object

            $.ajax({
              url: authData.instance_url + '/services/data/v29.0/sobjects/Position__c/' + $rootScope.positionObjectId,
              type: 'PATCH',
              headers: {
                'Authorization': authData.token_type + ' ' + authData.access_token,
                'Content-type': 'application/json'
              },
              data: JSON.stringify({'Data__c': JSON.stringify(positionList)}),
            });

          });

        }, function err(e) {
          if (e.responseJSON[0].errorCode === 'INVALID_SESSION_ID') {
            // refresh access token
            $scope.input.enableTracking = false;
            auth.openLogin();
          } else {
            alert(e.responseJSON[0].message);
          }
        });

    } else if (positionWatchId) {
      // stop position watch
      navigator.geolocation.clearWatch(positionWatchId);
    }
  })

})

.controller('HistoryController', function ($scope, $rootScope, $timeout, auth) {

  var authData = auth.get();
  var intervalId = null;

  if ($rootScope.positionObjectId) {
    update();
    intervalId = setInterval(update, 1000);
  }

  $scope.$on('$destroy', function () {
    clearInterval(intervalId);
  })

  function update() {

    $.ajax({
      url: authData.instance_url + '/services/data/v29.0/sobjects/Position__c/' + $rootScope.positionObjectId,
      type: 'GET',
      headers: {
        'Authorization': authData.token_type + ' ' + authData.access_token,
        'Content-type': 'application/json'
      }
    })
      .then(function ok(e) {
        $scope.$apply(function () {
          $scope.positions = JSON.parse(e.Data__c);
        })
      }, function err() {
      });
  }

});

	

