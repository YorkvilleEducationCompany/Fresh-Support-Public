/**
 * YEC Fresh Support
 *
 * @package yec
 */
(function($)
{
	$(window).load(function () {
		$('#body-loading-overlay').addClass('complete');
	});
	
	
	$('link[href^="/support/theme.css]').remove();
}(jQuery));
