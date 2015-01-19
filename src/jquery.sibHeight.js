// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

// undefined is used here as the undefined global variable in ECMAScript 3 is
// mutable (ie. it can be changed by someone else). undefined isn't really being
// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
// can no longer be modified.

// window and document are passed through as local variable rather than global
// as this (slightly) quickens the resolution process and can be more efficiently
// minified (especially when both are regularly referenced in your plugin).

// Create the defaults once
var pluginName = "sibHeight",
	defaults = {
		propertyName: "value"
	};

// The actual plugin constructor
function Plugin ( element, options ) {
	this.element = element;

	this.options = $.extend( {}, defaults, options );
	this._defaults = defaults;
	this._name = pluginName;
	this.init();
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

		$siblings.css('height', maxHeight);

	}
};

// A really lightweight plugin wrapper around the constructor,
// preventing against multiple instantiations
$.fn[ pluginName ] = function ( options ) {
	return this.each(function() {
		if ( !$.data( this, "plugin_" + pluginName ) ) {
			$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
		}
	});
};

})( jQuery, window, document );
