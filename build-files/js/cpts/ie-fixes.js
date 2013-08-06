var app = window.app;

app.ieFixes = {
	icons: function(element){
		if($('html').hasClass('lt-ie9')){
			element.find('[data-icon]').each(function(){
				$(this).html($(this).data('icon'));
			});
		}
	}
};