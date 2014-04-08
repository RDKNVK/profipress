$(function() {
    Modernizr.addTest('preserve3d', Modernizr.testAllProps('transformStyle', 'preserve-3d'));
    if (Modernizr.preserve3d) {
        Books.init();
    }

    function colorGrad(shelf) {

        var $colors = $(shelf + " .bk-list li .bk-book .bk-left"), //tady vyber knihy
            color = $colors.eq(0).css("background-color"),
            components = color.match(/\d+/g),
            hsl = rgbToHsl(components[0], components[1], components[2]);

        $colors.each(function(i) {
            //tady pak uprav to 0.05, ať to co nejvíc odpovídá tomu přechodu v psd
            $(this).css("background-color", getHslColor(hsl[0], hsl[1], hsl[2] + i * 0.015));
        });

        function getHslColor(h, s, l) {
            return "hsl(" + (360 * h) + ", " + (100 * s) + "%, " + (100 * l) + "%)";
        }

        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return [h, s, l];
        }
    }
    if ($('.bookshelf').length) {
        var shelves = $('.bookshelf').length;
        for (var i = 0; i < shelves; i++) {
			colorGrad('.shelf-' + (i+1));
        }
    }
});
