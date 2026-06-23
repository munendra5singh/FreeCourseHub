import { db } from './firebase-config.js';
import { doc, onSnapshot, updateDoc, arrayUnion, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const grid = document.getElementById('followerGrid');

// 20 Dummy Data
const dummyUsers = [
    {name:"RAHUL SHARMA", gender:"male"}, {name:"PRIYA VERMA", gender:"female"},
    {name:"AMIT KUMAR", gender:"male"}, {name:"NEHA SINGH", gender:"female"},
    {name:"VIKASH YADAV", gender:"male"}, {name:"POOJA GUPTA", gender:"female"},
    {name:"ROHIT MISHRA", gender:"male"}, {name:"ANJALI SHARMA", gender:"female"},
    {name:"SAURABH PATEL", gender:"male"}, {name:"KAVYA JAIN", gender:"female"},
    {name:"ABHISHEK TIWARI", gender:"male"}, {name:"SNEHA AGARWAL", gender:"female"},
    {name:"DEEPAK KUMAR", gender:"male"}, {name:"SHREYA SINGH", gender:"female"},
    {name:"NITIN CHAUHAN", gender:"male"}, {name:"MUSKAN VERMA", gender:"female"},
    {name:"ARJUN MEHTA", gender:"male"}, {name:"RIYA GUPTA", gender:"female"},
    {name:"MANISH RAJ", gender:"male"}, {name:"ADITI SHARMA", gender:"female"}
];

// Helper Function: Card banane ke liye
function createCard(name, gender) {
    const card = document.createElement('div');
    card.className = 'follower-card';
    card.innerHTML = `
        <div class="inner-box">${gender.toLowerCase() === "female" ? "👩‍💻" : "👨‍💻"}</div>
        <div class="name-text">${name}</div>
    `;
    return card;
}

// 1. FRONTEND: Real-time Data Sync (Home aur Contact dono ke liye optimized)
onSnapshot(doc(db, "community", "members"), (docSnap) => {
    let firebaseCount = 0;
    const followers = docSnap.exists() ? (docSnap.data().followers || []) : [];
    firebaseCount = followers.length;

    // A. AGAR GRID HAI (Yani user Contact page par hai)
    if (grid) {
        grid.innerHTML = ""; 
        
        // Sabse pehle Firebase wale add karein (Naya follower top par)
        if (firebaseCount > 0) {
            [...followers].reverse().forEach(user => grid.appendChild(createCard(user.name, user.gender)));
        }
        
        // Uske baad Dummy list niche dikhegi
        dummyUsers.forEach(user => grid.appendChild(createCard(user.name, user.gender)));
    }

    // B. TOTAL COUNT UPDATE (Yeh dono pages par chalega bina error ke)
    const totalCount = firebaseCount + dummyUsers.length;

    // 1. Contact Page Counter Update (ID target)
    const memberCountEl = document.getElementById('memberCount');
    if (memberCountEl) {
        memberCountEl.innerText = totalCount;
    }

    // 2. Home Page Counter Update (Class target - Naya Badge)
    const homeCounters = document.querySelectorAll('.memberCount');
    if (homeCounters.length > 0) {
        homeCounters.forEach(el => {
            el.innerText = totalCount;
        });
    }
});

// 2. ADMIN PANEL: List Render (Firebase)
window.renderListFirebase = async function() {
    const listDisplayEl = document.getElementById('listDisplay');
    if (!listDisplayEl) return; // Error handling agar admin page na ho
    
    const listDisplay = listDisplayEl.querySelector('tbody');
    listDisplay.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
    
    const docSnap = await getDoc(doc(db, "community", "members"));
    if (docSnap.exists()) {
        const data = docSnap.data().followers || [];
        listDisplay.innerHTML = '';
        data.forEach((user, index) => {
            const row = document.createElement('tr');
            row.style.borderBottom = "1px solid #ddd";
            row.innerHTML = `
                <td style="padding: 10px;">${user.name}</td>
                <td style="padding: 10px;">${user.phone}</td>
                <td style="padding: 10px;">${user.gender}</td>
                <td style="padding: 10px;">
                    <button onclick="removeFollowerFirebase(${index})" style="color:red; cursor:pointer; background:none; border:none;">Remove</button>
                </td>
            `;
            listDisplay.appendChild(row);
        });
    }
};

// 3. ADMIN PANEL: Remove Follower
window.removeFollowerFirebase = async function(index) {
    const docRef = doc(db, "community", "members");
    const docSnap = await getDoc(docRef);
    let followers = docSnap.data().followers;
    followers.splice(index, 1);
    await updateDoc(docRef, { followers: followers });
    if (typeof window.renderListFirebase === "function") window.renderListFirebase(); 
};

// 4. ADMIN PANEL: Export Excel
window.exportToExcelFirebase = async function() {
    const docSnap = await getDoc(doc(db, "community", "members"));
    const data = docSnap.data().followers || [];
    let csv = 'Name,Phone,Gender\n';
    data.forEach(u => csv += `${u.name},${u.phone},${u.gender}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FollowersList.csv';
    a.click();
};

// 5. Add Follower (टॉगल बटन सपोर्ट के साथ अपडेटेड)
window.addFollower = async function() {
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');
    if (!nameInput || !phoneInput) return;
    
    // नए टॉगल स्विच से जेंडर गेट करना
    const genderToggle = document.getElementById('genderToggle');
    const gender = (genderToggle && genderToggle.checked) ? "female" : "male";

    const name = nameInput.value.trim().toUpperCase();
    const phone = phoneInput.value.trim();

    if (!name || !/^[0-9]{10}$/.test(phone)) {
        alert("कृपया सही नाम और 10 अंकों का नंबर भरें!");
        return;
    }

    const docRef = doc(db, "community", "members");
    const docSnap = await getDoc(docRef);
    const followers = docSnap.data().followers || [];
    
    if (followers.find(f => f.phone === phone)) {
        alert("⚠️ यह नंबर पहले से रजिस्टर्ड है!");
        return;
    }

    await updateDoc(docRef, { followers: arrayUnion({ name, phone, gender }) });
    
    // फॉर्म रीसेट और पॉपअप बंद करें
    const popup = document.getElementById('followPopup');
    if (popup) popup.style.display = 'none';
    
    nameInput.value = '';
    phoneInput.value = '';
    if(genderToggle) {
        genderToggle.checked = false;
        if(typeof window.toggleGenderText === "function") window.toggleGenderText();
    }

    window.triggerToast(name);
};

// 6. Toast Trigger
window.triggerToast = function(name) {
    const toast = document.getElementById("toast");
    const toastName = document.getElementById("toastName");
    const audio = document.getElementById("toastSound");
    if (toast && toastName) {
        toastName.innerText = "🎉 Welcome to the Family, " + name + "!";
        if(audio) audio.play().catch(e => console.log("Audio play blocked"));
        toast.style.visibility = "visible";
        toast.style.opacity = "1";
        toast.style.transition = "0.5s";
        setTimeout(() => { toast.style.visibility = "hidden"; toast.style.opacity = "0"; }, 7000);
    }
};

// टॉगल बदलने पर टेक्स्ट और उसका रंग (Blue/Pink) अपडेट करने के लिए फंक्शन
window.toggleGenderText = function() {
    const toggle = document.getElementById('genderToggle');
    const genderText = document.getElementById('genderText');
    
    if (toggle && genderText) {
        if (toggle.checked) {
            genderText.innerText = "Female 👩‍💼";
            genderText.className = "gender-text female-mode";
        } else {
            genderText.innerText = "Male 👨‍💼";
            genderText.className = "gender-text male-mode";
        }
    }
}

// कीबोर्ड के Esc बटन से पॉपअप बंद करने के लिए
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const popup = document.getElementById('followPopup');
        if (popup && popup.style.display !== 'none') {
            popup.style.display = 'none'; // पॉपअप बंद कर देगा
            
            // फॉर्म इनपुट्स को भी साफ (Reset) कर देगा
            const nameInp = document.getElementById('userName');
            const phoneInp = document.getElementById('userPhone');
            if (nameInp) nameInp.value = '';
            if (phoneInp) phoneInp.value = '';
            
            const toggle = document.getElementById('genderToggle');
            if(toggle) {
                toggle.checked = false;
                if(typeof window.toggleGenderText === "function") window.toggleGenderText();
            }
        }
    }
});
