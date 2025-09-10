// Theme management
const themes = ['indigo', 'emerald', 'slate', 'rose', 'amber'];
let currentThemeIndex = 0;

// Initialize theme system
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme or use default
    const savedTheme = localStorage.getItem('mapmyprops-theme') || 'indigo';
    currentThemeIndex = themes.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
    
    setTheme(themes[currentThemeIndex]);
    
    // Set up theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', cycleTheme);
    }
});

// Theme switching functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mapmyprops-theme', theme);
}

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
    
    // Visual feedback
    const button = document.getElementById('theme-toggle');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Search functionality
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // Show loading state
        showSearchLoading();
        
        // Simulate search (in real app, this would make API calls)
        setTimeout(() => {
            showSearchResults(query);
        }, 1000);
    } else {
        alert('Please enter a location to search');
    }
}

function showSearchLoading() {
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    
    setTimeout(() => {
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
    }, 1000);
}

function showSearchResults(query) {
    // Create a simple results modal
    const modal = createModal(`
        <h2>Search Results for "${query}"</h2>
        <p>🏠 Found 247 properties in ${query}</p>
        <div class="mock-results">
            <div class="result-item">
                <strong>Beautiful Family Home</strong><br>
                $450,000 • 3 bed, 2 bath • 1,800 sqft<br>
                <em>123 Main St, ${query}</em>
            </div>
            <div class="result-item">
                <strong>Modern Apartment</strong><br>
                $2,200/mo • 2 bed, 1 bath • 1,200 sqft<br>
                <em>456 Oak Ave, ${query}</em>
            </div>
        </div>
        <button onclick="closeModal()" class="close-btn">Close</button>
    `);
    
    document.body.appendChild(modal);
}

// Navigation functionality
function navigateTo(section) {
    // Create a simple page for the section
    const modal = createModal(`
        <h2>${section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}</h2>
        <p>Welcome to the ${section} section!</p>
        <p>This would typically show relevant listings and tools for ${section}.</p>
        <button onclick="closeModal()" class="close-btn">Back to Home</button>
    `);
    
    document.body.appendChild(modal);
}

// City search functionality
function searchCity(cityName) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = cityName;
    handleSearch();
}

// Modal functionality
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
        </div>
    `;
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .modal-content {
                background: white;
                border-radius: 0.5rem;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .modal-content h2 {
                color: rgb(var(--color-accent));
                margin-bottom: 1rem;
            }
            
            .mock-results {
                margin: 1.5rem 0;
            }
            
            .result-item {
                padding: 1rem;
                border: 1px solid rgb(var(--color-border));
                border-radius: 0.25rem;
                margin-bottom: 1rem;
            }
            
            .close-btn {
                background-color: rgb(var(--color-accent));
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.25rem;
                cursor: pointer;
                font-weight: 600;
                margin-top: 1rem;
            }
            
            .close-btn:hover {
                opacity: 0.9;
            }
        `;
        document.head.appendChild(styles);
    }
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Enhanced interactivity for cards
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to nav cards
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    });
    
    // Add click animation to city cards
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add click animation to listing cards
    const listingCards = document.querySelectorAll('.listing-card');
    listingCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const address = this.querySelector('.listing-address').textContent;
            const price = this.querySelector('.price-tag').textContent;
            
            const modal = createModal(`
                <h2>${title}</h2>
                <div class="listing-detail-price">${price}</div>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Description:</strong> This beautiful property offers modern amenities and is located in a desirable neighborhood.</p>
                <div class="listing-features">
                    <h3>Features:</h3>
                    <ul>
                        <li>Updated kitchen with granite countertops</li>
                        <li>Hardwood floors throughout</li>
                        <li>Private backyard</li>
                        <li>Two-car garage</li>
                        <li>Near schools and shopping</li>
                    </ul>
                </div>
                <button onclick="closeModal()" class="close-btn">Close</button>
            `);
            
            document.body.appendChild(modal);
        });
    });
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Search input enter key handler
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
});

// Add some demo data and functionality
const demoListings = [
    {
        id: 1,
        title: "Beautiful Family Home",
        price: "$450,000",
        specs: "3 bed • 2 bath • 1,800 sqft",
        address: "123 Main St, Austin, TX",
        type: "sale",
        image: "images/pexels-binyaminmellish-186077.jpg"
    },
    {
        id: 2,
        title: "Modern Downtown Apartment", 
        price: "$2,200/mo",
        specs: "2 bed • 1 bath • 1,200 sqft",
        address: "456 Oak Ave, Seattle, WA",
        type: "rent",
        image: "images/pexels-alex-staudinger-829197-1732414.jpg"
    },
    {
        id: 3,
        title: "Luxury Suburban Villa",
        price: "$725,000", 
        specs: "4 bed • 3 bath • 2,500 sqft",
        address: "789 Pine Dr, Denver, CO",
        type: "sale",
        image: "images/pexels-pixabay-280222.jpg"
    },
    {
        id: 4,
        title: "Cozy Cottage Home",
        price: "$365,000",
        specs: "2 bed • 2 bath • 1,400 sqft",
        address: "321 Maple Lane, Portland, OR",
        type: "sale",
        image: "images/pexels-asphotograpy-101808.jpg"
    },
    {
        id: 5,
        title: "Modern Contemporary House",
        price: "$895,000",
        specs: "5 bed • 4 bath • 3,200 sqft",
        address: "567 Vista Boulevard, San Jose, CA",
        type: "sale",
        image: "images/pexels-pixabay-280229.jpg"
    },
    {
        id: 6,
        title: "Charming Ranch Style",
        price: "$525,000",
        specs: "3 bed • 2 bath • 2,100 sqft",
        address: "890 Country Road, Nashville, TN",
        type: "sale",
        image: "images/pexels-joshsorenson-427649.jpg"
    }
];

// Contact Form Functionality
function showContactForm(interest) {
    const interestTitles = {
        'buy': 'Find Your Dream Home',
        'rent': 'Find Your Perfect Rental',
        'sell': 'Sell Your Property',
        'mortgage': 'Get Pre-Approved'
    };

    const formModal = document.createElement('div');
    formModal.className = 'form-modal';
    formModal.innerHTML = `
        <div class="form-content">
            <div class="form-header">
                <h2>${interestTitles[interest] || 'Get Started'}</h2>
                <p>Fill out the form below and we'll connect you with a local expert.</p>
            </div>
            <form id="contact-form" onsubmit="handleFormSubmit(event)">
                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required>
                    <div class="form-error" id="name-error"></div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                    <div class="form-error" id="email-error"></div>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
                    <div class="form-error" id="phone-error"></div>
                </div>
                
                <div class="form-group">
                    <label for="area">Preferred Area *</label>
                    <input type="text" id="area" name="area" placeholder="City, State or ZIP Code" required>
                    <div class="form-error" id="area-error"></div>
                </div>
                
                <div class="form-group">
                    <label for="interest">Primary Interest *</label>
                    <select id="interest" name="interest" required>
                        <option value="${interest}" selected>${interestTitles[interest]}</option>
                        <option value="buy" ${interest === 'buy' ? '' : ''}>Buying a Home</option>
                        <option value="rent" ${interest === 'rent' ? '' : ''}>Renting a Property</option>
                        <option value="sell" ${interest === 'sell' ? '' : ''}>Selling a Property</option>
                        <option value="mortgage" ${interest === 'mortgage' ? '' : ''}>Mortgage/Financing</option>
                    </select>
                    <div class="form-error" id="interest-error"></div>
                </div>
                
                <div class="form-group">
                    <label for="budget">Budget Range</label>
                    <select id="budget" name="budget">
                        <option value="">Select budget range</option>
                        <option value="under-200k">Under $200,000</option>
                        <option value="200k-400k">$200,000 - $400,000</option>
                        <option value="400k-600k">$400,000 - $600,000</option>
                        <option value="600k-800k">$600,000 - $800,000</option>
                        <option value="800k-1m">$800,000 - $1,000,000</option>
                        <option value="over-1m">Over $1,000,000</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="timeline">Timeline</label>
                    <select id="timeline" name="timeline">
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-12-months">6-12 months</option>
                        <option value="over-1-year">Over 1 year</option>
                        <option value="just-browsing">Just browsing</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="message">Additional Details</label>
                    <textarea id="message" name="message" placeholder="Tell us more about what you're looking for..."></textarea>
                </div>
                
                <div class="form-buttons">
                    <button type="button" class="form-btn secondary" onclick="closeContactForm()">Cancel</button>
                    <button type="submit" class="form-btn primary">Submit Request</button>
                </div>
            </form>
        </div>
    `;

    // Close on overlay click
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            closeContactForm();
        }
    });

    document.body.appendChild(formModal);

    // Focus on the first input
    setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
    }, 100);
}

function closeContactForm() {
    const formModal = document.querySelector('.form-modal');
    if (formModal) {
        formModal.remove();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
    });

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    let hasErrors = false;
    
    if (!data.name.trim()) {
        document.getElementById('name-error').textContent = 'Name is required';
        hasErrors = true;
    }
    
    if (!data.email.trim()) {
        document.getElementById('email-error').textContent = 'Email is required';
        hasErrors = true;
    } else if (!isValidEmail(data.email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        hasErrors = true;
    }
    
    if (!data.area.trim()) {
        document.getElementById('area-error').textContent = 'Preferred area is required';
        hasErrors = true;
    }
    
    if (!data.interest) {
        document.getElementById('interest-error').textContent = 'Please select your primary interest';
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('.form-btn.primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showFormSuccess(data);
    }, 1500);
}

function showFormSuccess(data) {
    const formContent = document.querySelector('.form-content');
    formContent.innerHTML = `
        <div class="form-success">
            <h2 style="color: #166534; margin-bottom: 1rem;">Thank You!</h2>
            <p>Your request has been submitted successfully. A local expert will contact you within 24 hours.</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 1rem;">Your Information:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Area:</strong> ${data.area}</p>
            <p><strong>Interest:</strong> ${data.interest}</p>
            ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
            ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
        </div>
        <div class="form-buttons">
            <button type="button" class="form-btn primary" onclick="closeContactForm()">Close</button>
        </div>
    `;

    // Save lead data to localStorage for demo purposes
    const leads = JSON.parse(localStorage.getItem('mapmyprops-leads') || '[]');
    leads.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('mapmyprops-leads', JSON.stringify(leads));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.form-modal') || document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }
});

// Update the existing closeModal function to handle both types
function closeModal() {
    const modal = document.querySelector('.modal-overlay') || document.querySelector('.form-modal');
    if (modal) {
        modal.remove();
    }
}

// Cookie Consent Management
function showCookieConsent() {
    if (localStorage.getItem('mapmyprops-cookie-consent')) {
        return; // Already consented
    }

    const cookieBanner = document.createElement('div');
    cookieBanner.id = 'cookie-banner';
    cookieBanner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <h4>We use cookies</h4>
                <p>This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. We also use Google Analytics and may use Google Ads.</p>
            </div>
            <div class="cookie-actions">
                <button onclick="acceptCookies()" class="cookie-btn accept">Accept All</button>
                <button onclick="declineCookies()" class="cookie-btn decline">Decline</button>
                <a href="privacy-policy.html" class="cookie-link">Learn More</a>
            </div>
        </div>
    `;

    document.body.appendChild(cookieBanner);

    // Add cookie banner styles
    if (!document.querySelector('#cookie-styles')) {
        const styles = document.createElement('style');
        styles.id = 'cookie-styles';
        styles.textContent = `
            #cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.95);
                color: white;
                padding: 1.5rem;
                z-index: 10000;
                backdrop-filter: blur(10px);
                border-top: 3px solid rgb(var(--color-accent));
                animation: slideUp 0.3s ease-out;
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 2rem;
                flex-wrap: wrap;
            }
            
            .cookie-text h4 {
                margin: 0 0 0.5rem 0;
                font-size: 1.125rem;
                color: white;
            }
            
            .cookie-text p {
                margin: 0;
                opacity: 0.9;
                line-height: 1.4;
                max-width: 600px;
            }
            
            .cookie-actions {
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .cookie-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                white-space: nowrap;
            }
            
            .cookie-btn.accept {
                background: rgb(var(--color-accent));
                color: white;
            }
            
            .cookie-btn.accept:hover {
                opacity: 0.9;
                transform: translateY(-1px);
            }
            
            .cookie-btn.decline {
                background: transparent;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            
            .cookie-btn.decline:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .cookie-link {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: underline;
                font-size: 0.9rem;
            }
            
            .cookie-link:hover {
                color: white;
            }
            
            @media (max-width: 768px) {
                .cookie-content {
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }
                
                .cookie-actions {
                    justify-content: center;
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

function acceptCookies() {
    localStorage.setItem('mapmyprops-cookie-consent', 'accepted');
    localStorage.setItem('mapmyprops-cookie-date', new Date().toISOString());
    hideCookieBanner();
    
    // Enable analytics/tracking here
    console.log('Cookies accepted - analytics enabled');
}

function declineCookies() {
    localStorage.setItem('mapmyprops-cookie-consent', 'declined');
    localStorage.setItem('mapmyprops-cookie-date', new Date().toISOString());
    hideCookieBanner();
    
    // Disable non-essential cookies
    console.log('Cookies declined - only essential cookies');
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => banner.remove(), 300);
    }
}

// Show cookie banner on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showCookieConsent, 1000); // Show after 1 second
});

// Navigation helper for legal pages
function navigateToAction(action) {
    // Store the action in sessionStorage
    sessionStorage.setItem('pendingAction', action);
    // Navigate to home page
    window.location.href = 'index.html';
}

// Check for pending actions on page load
document.addEventListener('DOMContentLoaded', function() {
    const pendingAction = sessionStorage.getItem('pendingAction');
    if (pendingAction) {
        // Clear the pending action
        sessionStorage.removeItem('pendingAction');
        // Execute the action after a short delay
        setTimeout(() => {
            if (pendingAction === 'buy' || pendingAction === 'rent' || pendingAction === 'sell' || pendingAction === 'mortgage') {
                showContactForm(pendingAction);
            }
        }, 500);
    }
});

// Console welcome message
console.log('%cWelcome to MapMyProps!', 'color: rgb(79, 70, 229); font-size: 18px; font-weight: bold;');
console.log('This is a demo real estate marketplace. Try switching themes with the 🎨 button!');
console.log('Form submissions are saved to localStorage for demo purposes.');