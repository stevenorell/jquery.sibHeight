;(function ( $, window, document, undefined ) {

// Create the defaults once
var pluginName = "sibHeight",
	defaults = {
		breakPoint: 768
	};

// The actual plugin constructor
function Plugin ( element, options ) {
	this.element = element;

	this.options = $.extend( {}, defaults, options );
	this._defaults = defaults;
	this._name = pluginName;
	this.init();
	this.resize();
}

Plugin.prototype = {
	init: function () {

		// set our initial variables
		var maxHeight = 0,
			$siblings = $(this.element.children);

		// loop through each sibling of the element
		$siblings.each(function(){
			var $this = $(this),
				elemHeight;

			// check for border-box and get the appropriate height
			// TODO: make this work for a mix of non- and border-box elements
			if($this.css('box-sizing') == 'border-box') {
				elemHeight = $this.outerHeight();
			} else {
				elemHeight = $this.height();
			}

			maxHeight = maxHeight > elemHeight ? maxHeight : elemHeight;
		});

		if($(window).width() > this.options.breakPoint) {
			$siblings.css('height', maxHeight);
		} else {
			$siblings.css('height', 'auto');
		}

	},
	resize: function() {
		var self = this;
		$(window).resize(function(){
			// TODO: instead of reinitializing each time, DRY this out
			self.init();
		});
	}
};

$.fn[ pluginName ] = function ( options ) {
	return this.each(function() {
		if ( !$.data( this, "plugin_" + pluginName ) ) {
			$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
		}
	});
};

})( jQuery, window, document );
