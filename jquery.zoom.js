// Zoom 1.3 - jQuery image zooming plugin
// (c) 2012 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php

(function ($) {
    var defaults = {
        url: false,
        icon: true,
        grab: false,
        callback: false,
        duration: 120
    };

    $.fn.zoom = function (options) {
        return this.each(function () {
            var
            root = this,
            $root = $(root),
            img = new Image(),
            $img = $(img),
            $icon,
            position = $root.css('position'),
            settings = $.extend({}, defaults, options || {}),
            mousemove = 'mousemove';

            $root.css({
                position: /(absolute|fixed)/.test(position) ? position : 'relative',
                overflow: 'hidden'
            });

            if (!settings.url) {
                settings.url = $root.find('img:first')[0].src;
                if (!settings.url) {
                    return;
                }
            }

            if (settings.icon) {
                $icon = $('<div class="zoomIcon">').appendTo($root);
            }

            img.onload = function () {
                var
                outerWidth,
                outerHeight,
                xRatio,
                yRatio,
                left,
                top,
                offset = $root.offset();

                function ratio() {
                    outerWidth = $root.outerWidth();
                    outerHeight = $root.outerHeight();
                    xRatio = (img.width - outerWidth) / outerWidth;
                    yRatio = (img.height - outerHeight) / outerHeight;
                }

                function move(e) {
                    left = (e.pageX - offset.left);
                    top = (e.pageY - offset.top);

                    if (left > outerWidth) {
                        left = outerWidth;
                    } else if (left < 0) {
                        left = 0;
                    }

                    if (top > outerHeight) {
                        top = outerHeight;
                    } else if (top < 0) {
                        top = 0;
                    }

                    img.style.left = (left * -xRatio) + 'px';
                    img.style.top = (top * -yRatio) + 'px';

                    e.preventDefault();
                }

                ratio();

                $img
                .addClass('zoomImg')
                .css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: img.width,
                    height: img.height,
                    border: 'none',
                    maxWidth: 'none'
                })
                .appendTo($root);

                if (settings.grab) {
                    $img.mousedown(
                        function (e) {
                            offset = $root.offset();

                            $(document).one('mouseup',
                                function () {
                                    $img
                                    .stop()
                                    .fadeTo(settings.duration, 0);

                                    $(document).unbind(mousemove, move);
                                }
                            );

                            ratio();

                            move(e);

                            $img
                            .stop()
                            .fadeTo($.support.opacity ? settings.duration : 0, 1);

                            $(document)[mousemove](move);
                            
                            e.preventDefault();
                        }
                    );
                } else {
                    $img.hover(
                        function () {
                            offset = $root.offset();

                            ratio();

                            // Skip the fade-in for IE8 and lower since it chokes on fading-in
                            // and changing position based on mousemovement at the same time.
                            $img
                            .stop()
                            .fadeTo($.support.opacity ? settings.duration : 0, 1);
                        },
                        function () {
                            $img
                            .stop()
                            .fadeTo(settings.duration, 0);
                        }
                    )[mousemove](function (e) {
                        img.style.left = (e.pageX - offset.left) * -xRatio + 'px';
                        img.style.top = (e.pageY - offset.top) * -yRatio + 'px';
                    });
                }
        
                if ($.isFunction(settings.callback)) {
                    settings.callback.call(img);
                }

            };

            img.src = settings.url;
        });
    };

    $.fn.zoom.defaults = defaults;
}(jQuery));