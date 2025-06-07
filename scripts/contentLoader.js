class ContentManager {
  constructor() {
    this.content = null;
    this.pageType = document.body.dataset.pageType || 'home'; // Add data-page-type to body tag
  }

  async loadContent() {
    try {
      const response = await fetch('/config/content.json');
      this.content = await response.json();
      this.updateDOM();
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  // Get nested object value safely
  getContentValue(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this.content);
  }

  // Define page-specific content mappings
  contentMappings = {
    home: {
      'name': {
        textContent: 'personalInfo.name'
      },
      'title': {
        textContent: 'personalInfo.title'
      },
      'bio-link': {
        href: 'personalInfo.links.bio.url',
        title: 'personalInfo.links.bio.title'
      },
      'linkedin-link': {
        href: 'personalInfo.links.linkedin.url',
        title: 'personalInfo.links.linkedin.title'
      },
      'github-link': {
        href: 'personalInfo.links.github.url',
        title: 'personalInfo.links.github.title'
      },
      'profile-image': {
        src: 'assets.images.profile.src',
        alt: 'assets.images.profile.alt'
      }
    },
    bio: {
      'bio-title': {
        textContent: 'bioInfo.title'
      },
      // Add more bio page specific elements
    },
    projects: {
      // Add project page specific elements
    }
  };

  updateDOM() {
    const pageMapping = this.contentMappings[this.pageType];
    if (!pageMapping) return;

    Object.entries(pageMapping).forEach(([elementId, properties]) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      Object.entries(properties).forEach(([attribute, contentPath]) => {
        const value = this.getContentValue(contentPath);
        if (value) element[attribute] = value;
      });
    });
  }
}

// Initialize content manager
document.addEventListener('DOMContentLoaded', () => {
  const contentManager = new ContentManager();
  contentManager.loadContent();
});