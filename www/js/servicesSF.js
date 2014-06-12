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
Filename:     servicesSF.js
Description:  Packaging Information
Project:      SFContacts

This file was generated from: ionic/servicesSF.js.vmg
DO NOT MODIFY, THIS FILE WILL BE OVERWRITTEN. Please use extend this class.

*/

/**
* Services for Sales Force
*/

angular.module('SFContacts.services', [])
.factory('ContactService', function ($window, salesforce_client_id,$q) {
var contacts = [];
        
  return  {
  
  findAll: function() {
                var deferred = $q.defer();
                contacts = 
                deferred.resolve(contacts);
                return deferred.promise;
            },

            findById: function(contactId) {
                var deferred = $q.defer();
                var employee = contacts[contactId - 1];
                deferred.resolve(contact);
                return deferred.promise;
            },

 			save: function(entity) {
 			},
 			
 			update: function(entity) {
 			},
 			
 			erase: function(entity) {
 			}
 
  }  
})

.factory('auth', function ($window, salesforce_client_id) {
  return {

    get: function () {
      var data = $window.localStorage.auth;
      console.log('auth.get-->', data);
      return data ? JSON.parse(data) : false;
    },

    set: function (data) {
      data = JSON.stringify(data);
      console.log('auth.set', data);
      $window.localStorage.auth = data;
    },

    erase: function () {
      delete $window.localStorage.auth;
    },

    // open OAuth page in external browser
    openLogin: function () {
      $window.open('https://login.salesforce.com/services/oauth2/authorize' +
    	        '?response_type=token&display='+display+
    	        '&redirect_uri='+call_back +
    	        '&client_id=' + salesforce_client_id,
    	      '_system',
    	      'location=yes');
    }

  }

});


