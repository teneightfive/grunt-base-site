'use strict';

App.Modules.Template = {
  compile: function (templateName, data) {
    return window.templates[templateName](data);
  }
};