/*jshint onevar: false */
var IePatch = (function () {
  'use strict';

  // private variables and functions
  var bindEvents = function () {
    App.Events.on('render', App.Modules.IePatch.render);
    App.Events.on('IePatch.render', App.Modules.IePatch.render);
  };

  // constructor
  var IePatch = function () {

  };

  // prototype
  IePatch.prototype = {
    init: function () {
      _.bindAll(this, 'render');
      bindEvents();
      App.log('tests');
    },

    render: function (event, params) {
      App.log('rendering');
      var $el = params !== undefined && params.el !== undefined ? $(params.el) : $(this.el);

      if ($('html').hasClass('lt-ie9')) {
        $el.find('[data-icon]').each(function () {
          $(this).html($(this).data('icon'));
        });
      }
    }
  };

  // return module
  return IePatch;
}());

App.Modules.IePatch = new IePatch();

// App.Modules.IePatch.init();


// App.Modules.IePatch = {
//   // this is your root DOM element for your module, a module doesn't have to be connected to the DOM, but if it is,
//   // then it should control one element and everything inside it
//   el: 'body',

//   // this is your init function, this runs when the module is first initialised by the app (app.js)
//   init: function() {
//     // this underscore.js function allows us to use the keyword 'this' inside the 'render' function and for 'this' to have
//     // the context of our 'introduction' module and not whatever called the 'render' function
//     _.bindAll(this, 'render');
//     this.bindEvents();
//   },

//   // bindEvents is where you set up your event listeners and even DOM events, ie. this.$button.click(this.buttonClicked)
//   bindEvents: function () {
//     App.Events.on('render', this.render);
//     App.Events.on('IePatch.render', this.render);
//   },

//   // this is where you can cache your templates and your DOM elements, ie. this.$button = $(this.el).find('#myButton'), so
//   // jQuery knows to look inside the master 'el' (#jesse) and not traverse the complete DOM tree
//   cacheEls: function () {},

//   // this is your render function, this takes data, either from an AJAX call or properties of the modules and displays them
//   // in the browser via a template. This render function could be triggered by another module through 'app.Events'
//   render: function (event, params) {
//     var $el = params !== undefined && params.el !== undefined ? $(params.el) : $(this.el);

//     if ($('html').hasClass('lt-ie9')) {
//       $el.find('[data-icon]').each(function () {
//         $(this).html($(this).data('icon'));
//       });
//     }
//   }
// };