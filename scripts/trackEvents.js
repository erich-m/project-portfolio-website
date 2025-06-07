document.addEventListener('DOMContentLoaded', function() {
    // Track LinkedIn clicks
    document.getElementById('linkedin-link').addEventListener('click', function() {
        gtag('event', 'click', {
            'event_category': 'social_links',
            'event_label': 'LinkedIn',
            'value': 1
        });
    });
    
    // Track GitHub clicks
    document.getElementById('github-link').addEventListener('click', function() {
        gtag('event', 'click', {
            'event_category': 'social_links',
            'event_label': 'GitHub',
            'value': 1
        });
    });
});