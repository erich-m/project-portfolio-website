class ContentManager {
    constructor() {
        this.content = null;
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

    updateDOM() {
        // Update personal info
        document.getElementById('name').textContent = this.content.personalInfo.name;
        document.getElementById('title').textContent = this.content.personalInfo.title;

        // Update social links
        const linkedinLink = document.getElementById('linkedin-link');
        const githubLink = document.getElementById('github-link');
        
        linkedinLink.href = this.content.personalInfo.socialLinks.linkedin.url;
        linkedinLink.title = this.content.personalInfo.socialLinks.linkedin.title;
        
        githubLink.href = this.content.personalInfo.socialLinks.github.url;
        githubLink.title = this.content.personalInfo.socialLinks.github.title;

        // Update main image
        const mainImage = document.getElementById('profile-image');
        mainImage.src = this.content.assets.images.profile.src;
        mainImage.alt = this.content.assets.images.profile.alt;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contentManager = new ContentManager();
    contentManager.loadContent();
});