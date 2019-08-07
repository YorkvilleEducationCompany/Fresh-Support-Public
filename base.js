/**
 * YEC Fresh Support
 *
 * @package yec
 */
(function($)
{
	// Murder the native Freshservice stylesheet. It causes problems.
	// Because the native stylesheet is listed before his script,
	// we don't need to wait for the page to load.
	$('link[href^="/support/theme.css"]').remove();
	
	// Hide the loading overlay once loaded.
	$(window).load(function () {
		$('#body-loading-overlay').addClass('complete');
		
		$('#servicecatalog-index-web #catalog_search').after('<button id="catalog_search_button">Search</button>');
		$('#catalog_search_button').click(function(){
			var e = jQuery.Event( 'keydown', { which: 13, keyCode: 13 } );
			$('#servicecatalog-index-web #catalog_search').trigger(e);
			console.log('trigger');
		});
	});
	
	
	
}(jQuery));
