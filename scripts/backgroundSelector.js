document.addEventListener('DOMContentLoaded', function() {
    const backgrounds = [
        'bg-rooms',
        'bg-shurikens',
        'bg-cubes',
        'bg-buildings',
        'bg-nested-cubes',
        'bg-diamonds',
        'bg-squiggles',
        'bg-crosses',
        'bg-plusses',
        'bg-tablecloth'
    ];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.classList.add(randomBg);
});