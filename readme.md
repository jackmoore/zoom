## About Zoom

A small jQuery plugin for zooming images on mouseover or mousedown. See the [project page](http://jacklmoore.com/zoom/) for documentation and a demonstration.  Released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

To compile the .min.js file, run: `uglifyjs --comments '/license:/' < jquery.zoom.js > jquery.zoom.min.js` 

## Changelog:

##### v1.7.20 - 2017/4/25
* Replaced alt and aria-hidden with role attribute. Resolves #121

##### v1.7.19 - 2017/4/20
* Added alt and aria-hidden attributes to the zoom layer img element. Merged #121

##### v1.7.18 - 2016/9/9
* Fixed regression from 1.7.16 that occurred when the target option was passed a selector. Fixes #113

##### v1.7.17 - 2016/9/7
* Detect src using element.currentSrc to support srcset. Fixes #82

##### v1.7.16 - 2016/9/7
* Cancelled the onload event when calling destroy.  Fixes #83

##### v1.7.15 - 2016/2/8
* Added touchend event, might fix #97 #75 #62.  Merges #100.

##### v1.7.14 - 2015/3/18
* Fixes bug with passing the `target` property a selector, rather than a DOM node. Merges #73.

##### v1.7.13 - 2014/4/29
* Destroy event does a better job of reseting back to the original state.

##### v1.7.12 - 2014/2/11
* Set zoomed image's maxHeight to none, just in case a maxHeight has been defined for images in the CSS.

##### v1.7.11 - 2013/11/12
* Added magnify property to allow scaling of the zoomed image.

##### v1.7.10 - 2013/10/16
* Fixed bug relating to the size of the target element when using the target property (Fixes #35)

##### v1.7.9 - 2013/10/16
* Added simple fallback for touch events (Fixes #37 #39)
* Renamed minified file to jquery.zoom.min.js to match jQuery's convention.

##### v1.7.8 - 2013/7/30
* Will use data-src attribute if present before checking for the presence of an src attribute.

##### v1.7.7 - 2013/7/14
* Restricted grab to just the left-mouse-button on mousedown

##### v1.7.6 - 2013/6/24
* Fixed misnamed onZoomOut callback

##### v1.7.5 - 2013/6/19
* Fixed a bug with absolutely or fixed position target elements
* Set the value of `this` to be zoom-image element for the onZoomIn and onZoomOut callbacks

##### v1.7.4 - 2013/6/18
* Namespaced events to assist unbinding events.
* Added destroy event to unbind zoom events & remove created img element. Example:
	$('.example').trigger('zoom.destroy');
* Added onZoomIn and onZoomOut callbacks

##### v1.7.3 - 2013/6/10
* Fixing mistake made in previous commit

##### v1.7.2 - 2013/6/6
* Replaced new Image() with document.createElement('img') to avoid a potential bug in Chrome 27.

##### v1.7.1 - 2013/3/12
* Replaced jQuery shorthand methods with on() in anticipation of jQuery 2.0

##### v1.7.0 - 2013/1/31
* Added 'toggle' behavior to zoom in/out on click.  Example: $('#example').zoom({ on:'toggle' });
* Removed the icon property in favor of just using CSS.

##### v1.6.0 - 2013/1/22
* Created $.zoom which contains the positioning logic, so that users can write custom controls or event handling.

##### v1.5.0 - 2012/11/19
* Added 'target' property for specifying the element that displays the zoomed image.

##### v1.4.0 - 2012/9/29
* Changed API & added option to activate on click.

##### v1.3.0 - 2011/12/21
* Added 'callback' property that will execute a callback function once the image has loaded.
* Fixed a bug relating to the 'grab' property

##### v1.2.0 - 2011/11/15
* Fixed a positioning bug

##### v1.1.0 - 2011/11/15
* Added 'grab' property

##### v1.0.0 - 2011/11/11
* First release