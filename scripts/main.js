$(function() {
    Books.init();
    Modernizr.addTest('preserve3d', Modernizr.testAllProps('transformStyle', 'preserve-3d'));
});
