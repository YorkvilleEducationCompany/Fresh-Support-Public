/**
 * YEC Fresh Support
 *
 * @package yec
 */
(function($)
{
	// 
	function depreciatedReplace (selector, find, replace)
	{
		$(selector).each(function () {
			var self = $(this);
			if (self.children().length == 0) {
				self.text(self.text().replace(find, replace));
			}
		});
	}

	// Murder the native Freshservice stylesheet. It causes problems.
	// Because the native stylesheet is listed before his script,
	// we don't need to wait for the page to load.
	$('link[href^="/support/theme.css"]').remove();
	
	// Hide the loading overlay once loaded.
	$(window).load(function () {
		
		// AAaaaAAAaaaaaAAAAaAAAaAAAAaaaa
		depreciatedReplace('body *', 'ticket', 'inquiry');
		depreciatedReplace('body *', 'Ticket', 'Inquiry');
		depreciatedReplace('body *', 'tickets', 'inquiries');
		depreciatedReplace('body *', 'Tickets', 'Inquiries');
		
		$('#body-loading-overlay').addClass('complete');
		
		$('#servicecatalog-index-web #catalog_search').after('<button id="catalog_search_button">Search</button>');
		$('#catalog_search_button').click(function(){
			//var e = jQuery.Event( 'keydown', { which: 13, keyCode: 13 } );
			//$('#servicecatalog-index-web #catalog_search').trigger(e);
			//console.log('trigger2');
			
			
			$('#servicecatalog-index-web #catalog_search').each (function () {
				//var e = jQuery.Event( 'keydown', { which: 13, keyCode: 13 } );
				//$(this).trigger(e);
				
				var self = this;
				search_string = jQuery(this).val();
				
				if (search_string.length > 0) {
					jQuery.ajax({
						url: "/support/catalog/items/search_catalog_items",
						type: "get",
						dataType: "html",
						data: {
						"search_term": search_string
						},
						beforeSend: function(e) {
						loading_box("#catalog_items_container");
						jQuery("ul#categories>li.active").removeClass("active");
						},
						success: function(data) {
						jQuery('#catalog_items_container').html(data);
						if (jQuery('#take_to_index_crs').length == 0) {
							jQuery(self).after("<i class='icon-close2' id='take_to_index_crs'></i>");
						}
						changeCatalogImages();
						}
					});
				}
				
			});
		});
	});
	
	
	
}(jQuery));
