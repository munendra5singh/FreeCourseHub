// 1. THEME ENGINE
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("siteTheme", isDark ? "dark" : "light");
    const icon = document.querySelector(".theme-toggle-btn i");
    if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
}

function initThemeSync() {
    if (localStorage.getItem("siteTheme") === "dark") {
        document.body.classList.add("dark-mode");
        const icon = document.querySelector(".theme-toggle-btn i");
        if (icon) icon.className = "fas fa-sun";
    }
}

// 2. FAVORITES & SHARE ENGINE
function toggleFavorite(event, courseId) {
    event.preventDefault();
    event.stopPropagation();
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const icon = event.currentTarget.querySelector("i");
    const index = favs.indexOf(courseId);
    
    let isAdded = false;
    if (index > -1) {
        favs.splice(index, 1);
    } else {
        favs.push(courseId);
        isAdded = true;
    }
    
    localStorage.setItem("favorites", JSON.stringify(favs));
    if (icon) {
        icon.className = isAdded ? "fas fa-heart" : "far fa-heart";
    }
}

function shareCourse(event, courseId, name) {
    event.preventDefault();
    event.stopPropagation();
    
    // फिक्स: बीच से /FreeCourseHub/ हटा दिया गया है ताकि सीधा कस्टम डोमेन इस्तेमाल हो
    const shareUrl = `${window.location.origin}/share.html?id=${courseId}`;
    
    if (navigator.share) {
        navigator.share({
            title: name,
            text: "Check out this amazing free course!",
            url: shareUrl
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied! Now sharing with a rich preview.");
    }
}
// 3. MASTER RENDERER (IQ 1000 सुधार: अब यह रेंडर होने के बाद True रिटर्न करता है)
function renderCourses(containerId, filterCategory = null) {
    const container = document.getElementById(containerId);
    if (!container) return false;

    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const data = filterCategory 
        ? allCoursesMasterData.filter(c => (Array.isArray(c.category) ? c.category.includes(filterCategory) : c.category === filterCategory))
        : allCoursesMasterData;

    container.innerHTML = data.map(course => `
        <div class="course-card" data-id="${course.id}" style="position: relative; transition: all 0.4s ease;">
            <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px; z-index: 10;">
                <button class="fav-btn" onclick="toggleFavorite(event, '${course.id}')" style="background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer;">
                    <i class="${favs.includes(course.id) ? 'fas' : 'far'} fa-heart" style="color: #ef4444;"></i>
                </button>
                <button class="share-btn" onclick="shareCourse(event, '${course.id}', '${course.name}')" style="background: rgba(255,255,255,0.8); border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer;">
                    <i class="fas fa-share-alt" style="color: #3b82f6;"></i>
                </button>
            </div>
            <img src="${course.img}" alt="${course.name}" style="width: 100%; height: 180px; object-fit: cover;">
            <div style="padding: 15px;">
                <h3>${course.name}</h3>
                <p>${course.desc}</p>
                <a href="${course.link}" target="_blank" class="course-btn">Start Learning</a>
            </div>
        </div>
    `).join('');
    
    return true; // रेंडरिंग सफल रही
}

// 4. SCROLL, DEEP LINKING & AUTO-OPEN LOGIC
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const currentScroll = window.scrollY || window.pageYOffset; 
    
    if (Math.abs(currentScroll - lastScroll) > 30) {
        navbar.style.top = (currentScroll > lastScroll && currentScroll > 100) ? `-${navbar.offsetHeight}px` : "0";
        lastScroll = currentScroll;
    }
}, { passive: true });

// सहायक फंक्शन: सुनिश्चित करता है कि इमेजेस लोड हो चुकी हैं ताकि स्क्रॉल पोजीशन न बिगड़े
function mainScrollAndHighlight(courseId, shouldOpen) {
    const element = document.querySelector(`[data-id="${courseId}"]`);
    if (!element) {
        console.error(`Course element with id "${courseId}" not found.`);
        return;
    }

    // 1. स्मूथ स्क्रॉल (कार्ड को स्क्रीन के बीच में लाएगा)
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 2. बुलेटप्रूफ हाईलाइट और ज़ूम (cssText + !important का उपयोग ताकि CSS इसे रोक न पाए)
    // ज़ूम को 1.02 से बढ़ाकर 1.07 कर दिया है ताकि बड़ा होना साफ-साफ दिखाई दे!
    element.style.cssText += `
        outline: 4px solid #3b82f6 !important;
        outline-offset: 4px !important;
        transform: scale(1.07) !important;
        box-shadow: 0 12px 30px rgba(59, 130, 246, 0.6) !important;
        z-index: 99 !important;
        transition: transform 0.3s ease, outline 0.3s ease !important;
    `;

    // 3. 3 सेकंड बाद हाईलाइट को धीरे से हटाना
    setTimeout(() => { 
        element.style.outline = "";
        element.style.outlineOffset = "";
        element.style.transform = "";
        element.style.boxShadow = "";
        element.style.zIndex = "";
    }, 3000);

    // 4. फिक्स: ऑटो-ओपन लॉजिक को पूरी तरह हटा दिया गया है। 
    // अब यूज़र इसी पेज पर रहेगा, जब वह खुद "Start Learning" बटन दबाएगा, तभी कोर्स खुलेगा!
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeSync();
    
    const container = document.getElementById("allCourseGrid");
    if (container) {
        const isRendered = renderCourses("allCourseGrid");
        
        if (isRendered) {
            const params = new URLSearchParams(window.location.search);
            const courseId = params.get('course');
            const shouldOpen = params.get('open');
            
            if (courseId) {
                const targetCard = document.querySelector(`[data-id="${courseId}"]`);
                if (targetCard) {
                    const img = targetCard.querySelector('img');
                    
                    // अगर इमेज पहले से ही कैश्ड (Cached) या लोड हो चुकी है
                    if (img && img.complete) {
                        mainScrollAndHighlight(courseId, shouldOpen);
                    } else if (img) {
                        // इमेज लोड होने का इंतज़ार करें, ताकि लेआउट शिफ्ट न हो
                        img.addEventListener('load', () => {
                            mainScrollAndHighlight(courseId, shouldOpen);
                        });
                        img.addEventListener('error', () => {
                            // इमेज फ़ेल होने पर भी स्क्रॉल काम करना चाहिए
                            mainScrollAndHighlight(courseId, shouldOpen);
                        });
                    } else {
                        mainScrollAndHighlight(courseId, shouldOpen);
                    }
                }
            }
        }
    }
});
