/*
    jQuery Zoom v1.7.0 - 2013-01-31
    (c) 2013 Jack Moore - jacklmoore.com/zoom
    license: http://www.opensource.org/licenses/mit-license.php
 */

(function( $, root ) {
    var defaults = {
        on: 'mouseover', // other options: 'grab', 'click', 'toggle',
        url: false,
        callback: false,
        target: false,
        duration: 120,
        zoomImgProps: {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            border: 'none',
            maxWidth: 'none'
        }
    },
    wN = 'zoom'; // widgetName

    // Core Zoom Logic, independent of event listeners.
    $[ wN ] = function( $target, $source, img ) {
        var targetWidth, targetHeight, xRatio, yRatio, offset, zoomImgProps;

        // The parent element needs positioning so that the zoomed element can be correctly positioned within.
        $target.css({
            position: /(absolute|fixed)/.test() ? $target.css( 'position' ) : 'relative',
            overflow: 'hidden'
        });

        zoomImgProps = $.extend( {}, defaults.zoomImgProps, {
            width: img.width,
            height: img.height
        });

        $( img )
            .addClass( 'zoomImg' )
            .css( zoomImgProps )
            .appendTo( $target );

        return {
            init: function() {
                targetWidth  = $target.outerWidth();
                targetHeight = $target.outerHeight();
                xRatio       = ( img.width  - targetWidth ) / $source.outerWidth();
                yRatio       = ( img.height - targetHeight) / $source.outerHeight();
                offset       = $source.offset();
            },

            move: function( e ) {
                var left = e.pageX - offset.left,
                    top  = e.pageY - offset.top;

                top  = Math.max( Math.min( top,  targetHeight ), 0 );
                left = Math.max( Math.min( left, targetWidth  ), 0 );

                img.style.left = ( left * -xRatio ) + 'px';
                img.style.top  = ( top  * -yRatio ) + 'px';
            }
        };
    };

    function Zoom( options ) {
        var clicked  = false,
            img      = new Image(),
            doc      = $( document ),
            settings = $.extend( {}, defaults, options || {} ),
            $target  = $( settings.target || this ), //target will display the zoomed image
            $source  = $( this ), //source will provide zoom location info (thumbnail)
            $img     = $( img ), zoom;

        if ( checkUrl() ) {
            img.onload = onLoadImg;
            img.src = settings.url;
        }

        function checkUrl() {
            if ( !settings.url ) {
                settings.url = $source.find( 'img' ).attr( 'src' );
                if ( !settings.url ) {
                    return false;
                }
            }

            return true;
        }

        function start( e ) {
            zoom.init();
            zoom.move( e );

            // Skip the fade-in for IE8 and lower since it chokes on fading-in
            // and changing position based on mousemovement at the same time.
            $img.stop().fadeTo( $.support.opacity ? settings.duration : 0, 1 );
        }

        function stop() {
            $img.stop().fadeTo( settings.duration, 0 );
        }

        function grabHandler( e ) {
            doc.one( 'mouseup', function() {
                stop();
                doc.off( 'mousemove' );
            });

            start( e );
            doc.mousemove( zoom.move );
            e.preventDefault();
        }

        function clickHandler( e ) {
            if ( clicked ) {
                // bubble the event up to the document to trigger the unbind.
                return;
            } else {
                clicked = true;
                start( e );
                doc.mousemove( zoom.move );
                doc.one( 'click', function() {
                    stop();
                    clicked = false;
                    doc.off( 'mousemove' );
                });
                return false;
            }
        }

        function toggleHandler( e ) {
            if ( clicked ) {
                stop();
            } else {
                start( e );
            }
            clicked = !clicked;
        }

        function onLoadImg() {
            zoom = $[ wN ]( $target, $source, img );

            switch( settings.on ) {
                case 'grab':   $source.mousedown( grabHandler ); break;
                case 'click':  $source.click( clickHandler );    break;
                case 'toggle': $source.click( toggleHandler );   break;
                default: {
                    zoom.init(); // Pre-emptively call init because IE7 will fire the mousemove handler before the hover handler.
                    $source.hover( start, stop ).mousemove( zoom.move );
                }
            }

            if ( $.isFunction( settings.callback ) ) {
                settings.callback.call( img );
            }
        }

        function destroy() {
            $img.remove();
            $source.off( 'hover click mousedown' ).data( 'zoom', null );
        }

        return {
            destroy: destroy
        }
    }

    $.fn[ wN ] = function( options ) {
        var item;
        return this.each( function() {
            item = $( this );
            if ( item.data( wN ) ) {
                console.log( wN + ' already init', this );
            } else {
                item.data( wN, Zoom.call( this, options ) );
            }
        });
    };

    $.fn[ wN ].defaults = defaults;

})( jQuery, window );