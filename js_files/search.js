
    document.addEventListener("DOMContentLoaded", () => {
        // 1. कोर्सेज रेंडर करें
        renderCourses("allCourseGrid"); // यहाँ अपनी ID सही रखें (जैसे 'courseGrid')

        const searchInput = document.getElementById("searchInput");
        
        // 2. सर्च लॉजिक
        searchInput.addEventListener("keyup", function() {
            const value = this.value.toLowerCase();
            const cards = document.querySelectorAll(".course-card");
            let visibleCount = 0;

            cards.forEach(card => {
                const title = card.querySelector("h3").textContent.toLowerCase();
                if (title.includes(value)) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            // 3. अगर कोई कार्ड नहीं दिख रहा, तो मैसेज दिखाएं
            const container = document.getElementById("allCourseGrid"); // कंटेनर ID
            let noResultMsg = document.getElementById("noResultMsg");

            if (visibleCount === 0 && value.length > 0) {
                if (!noResultMsg) {
                    noResultMsg = document.createElement("div");
                    noResultMsg.id = "noResultMsg";
                    container.appendChild(noResultMsg);
                }
                noResultMsg.innerHTML = `
                    <div style="text-align:center; padding: 40px; color: #4f46e5;">
                        <i class="fas fa-search" style="font-size: 50px; margin-bottom: 20px; opacity: 0.5;"></i>
                        <h3 style="font-size: 24px;">ओह! "${value}" के लिए कोई कोर्स नहीं मिला</h3>
                        <p style="color: #666; margin-top: 10px;">शायद आपने कुछ गलत टाइप किया है , या यह कोर्स अभी हमारी लाइब्रेरी में नहीं है।</p>
                        <p style="margin-top: 10px;">कोई बात नहीं, आप हमारे पॉपुलर कोर्सेज देख सकते हैं!</p>
                        <div style="text-align: center; width: 100%; display: flex; justify-content: center; gap: 20px; margin-top: 25px;">
                            <button onclick="location.reload()" class="course-btn" style="border:none; cursor:pointer;">वापस जाएं</button>
                        
                        </div>
                    </div>`;




            } else if (noResultMsg) {
                noResultMsg.remove();
            }
        });
    });
