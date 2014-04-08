$(function() {
    Modernizr.addTest('preserve3d', Modernizr.testAllProps('transformStyle', 'preserve-3d'));
    if (Modernizr.preserve3d) {
		Books.init();
    }
});
