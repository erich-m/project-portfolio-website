document.addEventListener('DOMContentLoaded', function() {
  const pageType = document.body.dataset.pageType;

  if (pageType === 'home') {
    // Track LinkedIn clicks
    const linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink) {
      linkedinLink.addEventListener('click', function() {
        gtag('event', 'click', {
          'event_category': 'social_links',
          'event_label': 'LinkedIn',
          'value': 1
        });
      });
    }

    // Track GitHub clicks
    const githubLink = document.getElementById('github-link');
    if (githubLink) {
      githubLink.addEventListener('click', function() {
        gtag('event', 'click', {
          'event_category': 'social_links',
          'event_label': 'GitHub',
          'value': 1
        });
      });
    }

    // Track Bio clicks
    const bioLink = document.getElementById('bio-link');
    if (bioLink) {
      bioLink.addEventListener('click', function() {
        gtag('event', 'click', {
          'event_category': 'navigation_links',
          'event_label': 'home_to_bio',
          'value': 1
        });
      });
    }
  }

  if (pageType === 'bio') {
    // Track return to home clicks
    const returnLink = document.getElementById('return-link');
    if (returnLink) {
      returnLink.addEventListener('click', function() {
        gtag('event', 'click', {
          'event_category': 'navigation_links',
          'event_label': 'bio_to_home',
          'value': 1
        });
      });
    }
  }
});