/**
	@author : Kalpit Pandit
	@email : panditkalpit@gmail.com 
*/

$(document).ready(function(){

	$('.add,.edit').on('click',function(){
		$('.contact-popup').fadeIn();
		$('body').addClass('open');
	})
	$('.close').on('click',function(){
		$('.contact-popup').hide();
		$('body').removeClass('open');
	})
});