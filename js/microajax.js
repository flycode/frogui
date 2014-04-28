( function (window) {
  'use strict';

  /**
   * MicroAjax is an small library for call 
   * @example
   * // Get.
   * var request = ajax.get('/courses', function(data){
   *  // do something...
   * });
   * @example
   * // Post.
   * var post = ajax.post('/message', 'Hi john!');
   */

  var request, resp;

  // Constructor
  var MicroAjax = function () {
    return this;
  }

  /**
   * Initialize a new instance of Dropdown and merge custom options with defaults options.
   * @memberof! ch.Dropdown.prototype
   * @function
   * @private
   * @returns {dropdown}
   */
  MicroAjax.prototype.post = function (url, data) {

    // Instance for start request
    var request = new XMLHttpRequest();
    
    // Open the connection
    request.open('POST', url, true);
    
    // Set headers
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    
    // Finish connection
    request.send(data);

  };

  /**
   * Initialize a new instance of Dropdown and merge custom options with defaults options.
   * @memberof! ch.Dropdown.prototype
   * @function
   * @private
   * @returns {dropdown}
   */
  MicroAjax.prototype.get = function (url, callback) {

    // Instance for start request
    request = new XMLHttpRequest();

    // Open the connection
    request.open('GET', url, true);

    // Request id valid
    request.onload = function() {

      if (request.status >= 200 && request.status < 400) {
        
        if (callback) callback(request.responseText);

      } else {

        throw new Error('request: Error in status response ' + request.status);

      }

    };

    // Some are wrong!
    request.onerror = function() {
      throw new Error('request: Error in the request');
    };

    // Finish connection
    request.send();

  };


  // Expose
  window.MicroAjax = MicroAjax;
  window.ajax = new MicroAjax();

}(this));