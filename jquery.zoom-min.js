/*
	jQuery Zoom v1.6.1
	(c) 2013 Jack Moore - jacklmoore.com/zoom
	updated: 2013-01-23
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(a){var l={url:!1,icon:!0,callback:!1,target:!1,duration:120,on:"mouseover"};a.zoom=function(c,b,e){var d,f,k,g,h,m=a(c).css("position");a(c).css({position:/(absolute|fixed)/.test()?m:"relative",overflow:"hidden"});a(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width,height:e.height,border:"none",maxWidth:"none"}).appendTo(c);return{init:function(){d=a(c).outerWidth();f=a(c).outerHeight();k=(e.width-d)/a(b).outerWidth();g=(e.height-f)/a(b).outerHeight();
h=a(b).offset()},move:function(a){var b=a.pageX-h.left;a=a.pageY-h.top;a=Math.max(Math.min(a,f),0);b=Math.max(Math.min(b,d),0);e.style.left=b*-k+"px";e.style.top=a*-g+"px"}}};a.fn.zoom=function(c){return this.each(function(){var b=a.extend({},l,c||{}),e=b.target||this,d=this,f=new Image,k=a(f),g=!1;if(!b.url&&(b.url=a(d).find("img").attr("src"),!b.url))return;b.icon&&a('<div class="zoomIcon"/>').appendTo(a(d));f.onload=function(){function h(c){j.init();j.move(c);k.stop().fadeTo(a.support.opacity?
b.duration:0,1)}function c(){k.stop().fadeTo(b.duration,0)}var j=a.zoom(e,d,f);"grab"===b.on?a(d).mousedown(function(b){a(document).one("mouseup",function(){c();a(document).off("mousemove",j.move)});h(b);a(document).mousemove(j.move);b.preventDefault()}):"click"===b.on?a(d).click(function(b){if(!g)return g=!0,h(b),a(document).mousemove(j.move),a(document).one("click",function(){c();g=!1;a(document).off("mousemove",j.move)}),!1}):"toggle"===b.on?a(d).click(function(b){if(!g)return g=!0,h(b),a(d).one("click",
function(){c();g=!1}),!1}):(j.init(),a(d).hover(h,c).mousemove(j.move));a.isFunction(b.callback)&&b.callback.call(f)};f.src=b.url})};a.fn.zoom.defaults=l})(window.jQuery);

