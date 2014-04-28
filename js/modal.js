( function (window) {
  'use strict';

  var settings;

  /**
   * Show
   * @memberof! Modal.prototype
   * @function
   * @private
   * @returns {this}
   */
  var show = function (el) {
    classie.add( el, 'modal-show' );
  };

  /**
   * Hide 
   * @memberof! Modal.prototype
   * @function
   * @private
   * @returns {this}
   */
  var hide = function (el) {
    classie.remove( el, 'modal-show' );
  };

  // Constructor
  var Modal = function () {
    return this;
  };

  /**
   * Initialize a new instance of Modal.
   * @function
   * @public
   * @returns {this}
   */
  Modal.prototype.init = function (callbackIn, callbackOut) {

    var that = this;
    settings = Modal.settings;
    
    [].slice.call(document.querySelectorAll('.modal-trigger')).forEach(function(el, i) {
      
      var modal = document.querySelector('#' + el.getAttribute('data-modal')),
          close = modal.querySelector('.modal-close');
      
      // Show events
      el.addEventListener( 'click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        show(modal);
        if (callbackIn) callbackIn();
      });
      // Close envents
      close.addEventListener( 'click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        hide(modal);
        if (callbackOut) callbackOut();
      });
      settings.overlay.addEventListener('click', function() {
        hide(modal);
        if (callbackOut) callbackOut();
      });
      document.addEventListener('keydown',function(e){
        if (e.keyCode === 27) {
          hide(modal);
          if (callbackOut) callbackOut();
        }
      })

    });

  }

  // Settings
  Modal.settings = {
    overlay: document.querySelector('.modal-overlay')
  };

  // Expose
  window.Modal = Modal;
  window.modal = new Modal();

}(this));
