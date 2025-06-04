document.addEventListener('DOMContentLoaded', function() {
    // Track LinkedIn clicks
    document.querySelector('a[title="Linkedin - Erich MacLean"]').addEventListener('click', function() {
        gtag('event', 'click', {
            'event_category': 'social_links',
            'event_label': 'LinkedIn',
            'value': 1
        });
    });
    
    // Track GitHub clicks
    document.querySelector('a[title="Github - Erich MacLean"]').addEventListener('click', function() {
        gtag('event', 'click', {
            'event_category': 'social_links',
            'event_label': 'GitHub',
            'value': 1
        });
    });
});