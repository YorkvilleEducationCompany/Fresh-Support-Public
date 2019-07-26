/**
 * Yu functions and definitions
 *
 * @package yu
 */
(function($)
{
	/**
	 * 
	 * @function yecUpdateIconGrids
	 * @description
	 * Dynamically makes icon grids are nice and square. Note we only set a
	 * minimum height, so if a page author gets really extreme with text, so
	 * we don't *guarantee* the result will be square.
	 * 
	 */
	function yecUpdateIconGrids () 
	{
		$('.yu-icon-grid-button')
			.css('min-width', '0px')
			.css('min-height', '0px')
			.css('flex-basis', '')
			.css('flex-grow', '');
		
		$('.yu-icon-grid').each(function(index, grid) 
		{
			var maxWidth  = 150;
			var maxHeight = 150;
			
			$('.yu-icon-grid-button', grid).each(function(index, el) {
				maxWidth  = Math.max($(el).outerWidth() - 1, maxWidth);
				maxHeight = Math.max($(el).outerWidth() - 1, maxHeight);
			});
			
			var minSize = Math.max(maxWidth, maxHeight);
			
			$('.yu-icon-grid-button', grid)
				.css('min-height',  minSize+"px")
				.css('min-width',   minSize+"px");
			
			// We apply height again as flex may have grown after the
			// layout has been applied.
			$('.yu-icon-grid-button', grid).each(function(index, el) {
				minSize  = Math.max($(el).outerWidth() - 1, minSize);
			});
			
			// We disable flex-grow on items as it intereferes with the last
			// rows sizing. Because we don't measure with outerWidth, this means
			// every column may fall short of the "perfect" width.
			$('.yu-icon-grid-button', grid)
				.css('min-width',  minSize+"px")
				.css('min-height', minSize+"px")
				.css('flex-grow', '0');
			
			// This ensures that the last item in a grid will align to the right
			// side. This may only need a few extra pixels, so rectangular-ness
			// should be imperceivable.
			var realcolumns = Math.floor($(grid).innerWidth() / minSize);
			var column = 1;
			
			$('.yu-icon-grid-button', grid).each(function(index, el) {
				if (column % realcolumns == 0) {
					$(el).css('flex-grow', '1');
				}
				
				column++;
			});
		});
	}
	
	$(window).on('resize',yecUpdateIconGrids);
	$(document).on('yec-icon-grid-update', yecUpdateIconGrids);
	$(window).on('load', yecUpdateIconGrids);
	
}(jQuery));
