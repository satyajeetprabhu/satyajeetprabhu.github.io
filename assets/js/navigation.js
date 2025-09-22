// Navigation configuration - update links here only
const navigationConfig = {
    links: [
        { href: "index.html", text: "About" },
        { href: "work.html", text: "Work" },
        { href: "tech.html", text: "Tech" },
        { href: "music.html", text: "Music" },
		{ href: "CV/satya_cv_web.pdf", text: "CV", external: true }
    ]
};

// Function to generate navigation HTML
function generateNavigation(currentPage) {
    const navHTML = navigationConfig.links.map(link => {
        const isCurrent = link.href === currentPage;
        const currentAttr = isCurrent ? ' aria-current="page"' : '';
        const targetAttr = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        
        return `<li role="none"><a href="${link.href}" role="menuitem"${currentAttr}${targetAttr}>${link.text}</a></li>`;
    }).join('');
    
    return navHTML;
}

// Update navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update desktop navigation
    const desktopNav = document.querySelector('.nav-menu');
    if (desktopNav) {
        desktopNav.innerHTML = generateNavigation(currentPage);
    }
    
    // Update mobile navigation
    const mobileNav = document.querySelector('.mobile-nav ul');
    if (mobileNav) {
        mobileNav.innerHTML = generateNavigation(currentPage);
        
        // Re-attach event listeners to new mobile nav links
        const newMobileNavLinks = mobileNav.querySelectorAll('a');
        newMobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close mobile nav when clicking on menu items
                const mobileNav = document.getElementById('mobile-nav');
                const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
                const body = document.body;
                
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                }
                if (mobileNavOverlay) {
                    mobileNavOverlay.classList.remove('active');
                }
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
    }
}); 