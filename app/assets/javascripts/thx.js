function pulseLogo() {
	$('.pulse').transition({
		scale: 6, opacity: 0, duration: 800
	}, function(){
      $(this).css({'transform':'', 'opacity':'1'});
    });
}

$(document).ready(function () {

	pulseLogo();

	$('#add-url').click(function() {
		pulseLogo();
	});

});