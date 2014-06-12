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
Filename:     app.js
Description:  Packaging Information
Project:      SFContacts

This file was generated from: ionic/app.js.vmg
DO NOT MODIFY, THIS FILE WILL BE OVERWRITTEN. Please use extend this class.

*/

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SFContacts' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'SFContacts.services' is found in services.js
// 'SFContacts.controllers' is found in controllers.js

// handle custom url scheme
function handleOpenURL(url) {

//console.log(url);
  var path = url.match('://(.*?)[\\?#]')[1];

  //if (path == 'oauth-callback') {

    // get hash part
    var query = url.substr(url.indexOf("#") + 1);
    //console.log(query);
    var data = {};

    // split into parts
    var parts = query.split('&');

    // read names and values
    for (var i = 0; i < parts.length; i++) {
      var name = parts[i].substr(0, parts[i].indexOf('='));
      var val = parts[i].substr(parts[i].indexOf('=') + 1);
      val = decodeURIComponent(val);
      data[name] = val;
        //console.log(name+"<=>"+data[name]);
    }
      

    //save auth using LayoutController

    var $scope = angular.element(document.body).scope();
    /*$scope.$apply(function () {
      $scope.onAuth(data);
    });*/
    //$scope.onAuth(data);
      window.localStorage.auth = JSON.stringify(data);
  //}
}

var client_id = "";
var call_back = "";
var display = "";
var usingBrowser = false;
if (usingBrowser) {
	client_id = '{your salesforce connected app client id here}';
	call_back = 'http://localhost:8100/oauthcallback.html';
	display ="popup";
} else {
	client_id = '{your salesforce connected app client id here}';
	call_back = 'sfsampleapp://oauth-callback';
	display ="touch";
}


//

var app = angular.module('SFContacts', ['ionic','SFContacts.controllers','SFContacts.services'])

  .run(function ($ionicPlatform, $window) {
    $ionicPlatform.ready(function () {
      if ($window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
	.state('tab', {
		url : "/tab",
		abstract : true,
		templateUrl : 'templates/tabs.html'
	})

	.state('tab.dash', {
		url : '/dash',
		views : {
			'tab-dash' : {
				templateUrl : 'templates/tab-dash.html',
				controller : 'DashCtrl'
			}
		}
	})    

.state('tab.contacts', {
        url: '/contacts',
        views: {
          'contacts': {
            templateUrl: 'templates/contacts.html',
            controller: 'ContactsCtrl'
          }
        }
      })

    // default state
    $urlRouterProvider.otherwise('/tab/dash');

  })

  // check auth data
  .run(function ($ionicPlatform, auth) {

    $ionicPlatform.ready(function () {
      if (false === auth.get()) {
        auth.openLogin();
      }
    })
  })

  // configuration
  // configuration
.constant('salesforce_client_id', client_id);


