app.template = {
	compile: function(templateName, data){
		return window['fgw'][templateName+'.tpl'](data);
	}
};