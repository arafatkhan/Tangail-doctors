// Global variables
let allDoctors = [];
let filteredDoctors = [];
let currentLanguage = localStorage.getItem('language') || 'bn';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const hospitalFilter = document.getElementById('hospitalFilter');
const resetBtn = document.getElementById('resetBtn');
const doctorList = document.getElementById('doctorList');
const totalDoctorsSpan = document.getElementById('totalDoctors');
const noResults = document.getElementById('noResults');
const loading = document.getElementById('loading');

// Define 15 main categories with both languages
const mainCategories = [
    { 
        name: { bn: 'প্রসূতি ও স্ত্রীরোগ বিশেষজ্ঞ', en: 'Obstetrics & Gynecology Specialist' },
        keywords: ['প্রসূতি', 'স্ত্রী', 'গাইনী', 'গাইনি', 'অবস', 'obstetrics', 'gynecology', 'gynecologist']
    },
    { 
        name: { bn: 'সার্জারি বিশেষজ্ঞ', en: 'Surgery Specialist' },
        keywords: ['সার্জন', 'সার্জারি', 'জেনারেল সার্জন', 'ল্যাপারোস্কোপিক', 'surgeon', 'surgery']
    },
    { 
        name: { bn: 'হৃদরোগ বিশেষজ্ঞ', en: 'Cardiology Specialist' },
        keywords: ['হৃদরোগ', 'হার্ট', 'কার্ডিও', 'বাতজ্বর', 'heart', 'cardiology', 'cardiac']
    },
    { 
        name: { bn: 'শিশু রোগ বিশেষজ্ঞ', en: 'Pediatrics Specialist' },
        keywords: ['শিশু', 'পেডিয়া', 'নবজাতক', 'বাচ্চা', 'pediatrics', 'child', 'children']
    },
    { 
        name: { bn: 'মেডিসিন বিশেষজ্ঞ', en: 'Medicine Specialist' },
        keywords: ['মেডিসিন', 'জ্বর', 'ডায়াবেটিস', 'থাইরয়েড', 'medicine', 'fever', 'diabetes']
    },
    { 
        name: { bn: 'হাড় ও জয়েন্ট বিশেষজ্ঞ', en: 'Orthopedics & Joint Specialist' },
        keywords: ['হাড়', 'জোড়া', 'বাত', 'অর্থো', 'পঙ্গু', 'bone', 'joint', 'orthopedics', 'ortho']
    },
    { 
        name: { bn: 'চর্ম ও যৌনরোগ বিশেষজ্ঞ', en: 'Dermatology & Sexual Health Specialist' },
        keywords: ['চর্ম', 'যৌন', 'সেক্স', 'এলার্জি', 'ত্বক', 'dermatology', 'skin', 'sexual', 'allergy']
    },
    { 
        name: { bn: 'মনোরোগ বিশেষজ্ঞ', en: 'Psychiatry Specialist' },
        keywords: ['মনোরোগ', 'মনযৌন', 'মাদকাসক্ত', 'মানসিক', 'psychiatry', 'mental', 'psychological']
    },
    { 
        name: { bn: 'মস্তিষ্ক ও স্নায়ুরোগ বিশেষজ্ঞ', en: 'Neurology Specialist' },
        keywords: ['ব্রেইন', 'নিউরো', 'স্নায়ু', 'মস্তিষ্ক', 'brain', 'neurology', 'neuro', 'nerve']
    },
    { 
        name: { bn: 'কিডনি ও মূত্ররোগ বিশেষজ্ঞ', en: 'Nephrology & Urology Specialist' },
        keywords: ['কিডনি', 'মূত্র', 'ইউরো', 'পাথর', 'kidney', 'urology', 'nephrology', 'urinary']
    },
    { 
        name: { bn: 'চোখ বিশেষজ্ঞ', en: 'Ophthalmology Specialist' },
        keywords: ['চোখ', 'চক্ষু', 'আই', 'দৃষ্টি', 'eye', 'ophthalmology', 'vision']
    },
    { 
        name: { bn: 'নাক-কান-গলা বিশেষজ্ঞ', en: 'ENT Specialist' },
        keywords: ['নাক', 'কান', 'গলা', 'ইএনটি', 'ent', 'ear', 'nose', 'throat']
    },
    { 
        name: { bn: 'দাঁত ও মুখ বিশেষজ্ঞ', en: 'Dental & Oral Health Specialist' },
        keywords: ['দাঁত', 'ডেন্টাল', 'মুখ', 'dental', 'tooth', 'teeth', 'oral']
    },
    { 
        name: { bn: 'ফিজিওথেরাপি বিশেষজ্ঞ', en: 'Physiotherapy Specialist' },
        keywords: ['ফিজিও', 'ব্যথা', 'প্যারালাইসিস', 'physiotherapy', 'physio', 'pain', 'paralysis']
    },
    { 
        name: { bn: 'অন্যান্য বিশেষজ্ঞ', en: 'Other Specialists' },
        keywords: []
    }
];

// UI Text translations
const uiText = {
    bn: {
        searchPlaceholder: '🔍 ডাক্তার, বিশেষত্ব বা হাসপাতালের নাম লিখুন...',
        categoryLabel: 'রোগের ধরন',
        categoryAll: 'সকল ক্যাটাগরি',
        hospitalLabel: 'হাসপাতাল/ক্লিনিক',
        hospitalAll: 'সকল হাসপাতাল',
        resetBtn: 'রিসেট করুন',
        totalDoctors: 'মোট',
        doctorsFound: 'জন ডাক্তার পাওয়া গেছে',
        noResults: '😔 কোন ডাক্তার পাওয়া যায়নি',
        noResultsSub: 'অন্য কিছু দিয়ে খুঁজে দেখুন',
        loading: 'লোড হচ্ছে...',
        loadError: 'ডেটা লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পেজ রিফ্রেশ করুন।',
        qualification: 'যোগ্যতা',
        schedule: 'সময়সূচী',
        hospital: 'প্রতিষ্ঠান',
        contact: 'যোগাযোগ'
    },
    en: {
        searchPlaceholder: '🔍 Search doctor, specialty or hospital name...',
        categoryLabel: 'Specialty',
        categoryAll: 'All Categories',
        hospitalLabel: 'Hospital/Clinic',
        hospitalAll: 'All Hospitals',
        resetBtn: 'Reset',
        totalDoctors: 'Total',
        doctorsFound: 'doctors found',
        noResults: '😔 No doctors found',
        noResultsSub: 'Try searching with different keywords',
        loading: 'Loading...',
        loadError: 'Failed to load data. Please refresh the page.',
        qualification: 'Qualification',
        schedule: 'Schedule',
        hospital: 'Institution',
        contact: 'Contact'
    }
};

// Get main category for a specialty
function getMainCategory(specialty) {
    const lowerSpecialty = specialty.toLowerCase();
    
    for (const cat of mainCategories) {
        if (cat.keywords.length === 0) continue;
        for (const keyword of cat.keywords) {
            if (lowerSpecialty.includes(keyword.toLowerCase())) {
                return cat.name[currentLanguage];
            }
        }
    }
    return mainCategories[mainCategories.length - 1].name[currentLanguage];
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'bn' ? 'en' : 'bn';
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
    
    // Update language button text
    const langBtn = document.getElementById('languageBtn');
    if (langBtn) {
        langBtn.innerHTML = currentLanguage === 'bn' ? '🌐 English' : '🌐 বাংলা';
    }
    
    updateUIText();
    loadDoctors();
}

// Update UI text based on current language
function updateUIText() {
    const texts = uiText[currentLanguage];
    
    // Update search placeholder
    if (searchInput) searchInput.placeholder = texts.searchPlaceholder;
    
    // Update filter labels
    const categoryLabel = document.querySelector('label[for="categoryFilter"]');
    if (categoryLabel) categoryLabel.textContent = texts.categoryLabel;
    
    const hospitalLabel = document.querySelector('label[for="hospitalFilter"]');
    if (hospitalLabel) hospitalLabel.textContent = texts.hospitalLabel;
    
    // Update reset button
    if (resetBtn) resetBtn.textContent = texts.resetBtn;
    
    // Update loading text
    if (loading) {
        const loadingText = loading.querySelector('p');
        if (loadingText) loadingText.textContent = texts.loading;
    }
    
    // Update no results text
    if (noResults) {
        const noResultsMain = noResults.querySelector('p:first-child');
        const noResultsSub = noResults.querySelector('p.small');
        if (noResultsMain) noResultsMain.textContent = texts.noResults;
        if (noResultsSub) noResultsSub.textContent = texts.noResultsSub;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    document.documentElement.lang = currentLanguage;
    updateUIText();
    loadDoctors();

    // Event listeners
    searchInput.addEventListener('input', debounce(filterDoctors, 300));
    categoryFilter.addEventListener('change', filterDoctors);
    hospitalFilter.addEventListener('change', filterDoctors);
    resetBtn.addEventListener('click', resetFilters);
    
    // Language button event listener
    const langBtn = document.getElementById('languageBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
        langBtn.innerHTML = currentLanguage === 'bn' ? '🌐 English' : '🌐 বাংলা';
    }
});

// Load doctors data using AJAX
function loadDoctors() {
    loading.style.display = 'block';
    doctorList.style.display = 'none';

    const dataFile = currentLanguage === 'bn' ? 'data.json' : 'english.json';
    
    fetch(dataFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allDoctors = data;
            filteredDoctors = [...allDoctors];
            
            populateFilters();
            displayDoctors(filteredDoctors);
            
            loading.style.display = 'none';
            doctorList.style.display = 'grid';
        })
        .catch(error => {
            console.error('Error loading doctors:', error);
            loading.innerHTML = `<p>${uiText[currentLanguage].loadError}</p>`;
        });
}

// Populate filter dropdowns
function populateFilters() {
    const hospitals = new Set();

    allDoctors.forEach(doctor => {
        if (doctor.hospital) {
            const hospital = cleanText(doctor.hospital);
            if (hospital.trim()) {
                hospitals.add(hospital);
            }
        }
    });

    // Clear existing options
    categoryFilter.innerHTML = '';
    hospitalFilter.innerHTML = '';
    
    // Add default options
    const texts = uiText[currentLanguage];
    const defaultCategoryOption = document.createElement('option');
    defaultCategoryOption.value = '';
    defaultCategoryOption.textContent = texts.categoryAll;
    categoryFilter.appendChild(defaultCategoryOption);
    
    const defaultHospitalOption = document.createElement('option');
    defaultHospitalOption.value = '';
    defaultHospitalOption.textContent = texts.hospitalAll;
    hospitalFilter.appendChild(defaultHospitalOption);

    // Populate category filter with 15 main categories
    mainCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name[currentLanguage];
        option.textContent = cat.name[currentLanguage];
        categoryFilter.appendChild(option);
    });

    // Populate hospital filter (unique hospitals only)
    Array.from(hospitals).sort().forEach(hospital => {
        const option = document.createElement('option');
        option.value = hospital;
        option.textContent = hospital;
        hospitalFilter.appendChild(option);
    });
}

// Filter doctors based on search and filters
function filterDoctors() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedHospital = hospitalFilter.value;

    filteredDoctors = allDoctors.filter(doctor => {
        // Search filter
        const matchesSearch = !searchTerm || 
            doctor.name?.toLowerCase().includes(searchTerm) ||
            doctor.qualification?.toLowerCase().includes(searchTerm) ||
            doctor.specialty?.toLowerCase().includes(searchTerm) ||
            doctor.schedule?.toLowerCase().includes(searchTerm) ||
            doctor.hospital?.toLowerCase().includes(searchTerm);

        // Category filter
        const doctorCategory = doctor.specialty ? getMainCategory(cleanText(doctor.specialty)) : '';
        const matchesCategory = !selectedCategory || doctorCategory === selectedCategory;

        // Hospital filter
        const matchesHospital = !selectedHospital || 
            cleanText(doctor.hospital) === selectedHospital;

        return matchesSearch && matchesCategory && matchesHospital;
    });

    displayDoctors(filteredDoctors);
}

// Display doctors
function displayDoctors(doctors) {
    doctorList.innerHTML = '';
    const texts = uiText[currentLanguage];
    totalDoctorsSpan.textContent = `${doctors.length}`;
    
    // Update stats text
    const statsP = document.querySelector('.stats p');
    if (statsP) {
        statsP.innerHTML = `${texts.totalDoctors} <span id="totalDoctors">${doctors.length}</span> ${texts.doctorsFound}`;
    }

    if (doctors.length === 0) {
        noResults.style.display = 'block';
        doctorList.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    doctorList.style.display = 'grid';

    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        doctorList.appendChild(card);
    });
}

// Create doctor card
function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.className = 'doctor-card';

    const texts = uiText[currentLanguage];
    const name = cleanText(doctor.name || texts.noResults);
    const qualification = formatText(doctor.qualification || '');
    const specialty = cleanText(doctor.specialty || '');
    const schedule = formatText(doctor.schedule || '');
    const hospital = cleanText(doctor.hospital || '');
    const contact = formatContact(doctor.contact || '');

    // Get first letter for avatar
    const initial = name.charAt(0);

    card.innerHTML = `
        <div class="doctor-header">
            <div class="doctor-avatar">${initial}</div>
            <div class="doctor-info">
                <h3>${name}</h3>
                ${specialty ? `<span class="specialty-badge">${specialty}</span>` : ''}
            </div>
        </div>
        
        <div class="doctor-details">
            ${qualification ? `
                <div class="detail-item">
                    <div class="detail-icon">🎓</div>
                    <div class="detail-content">
                        <div class="detail-label">${texts.qualification}</div>
                        <div class="detail-text">${qualification}</div>
                    </div>
                </div>
            ` : ''}
            
            ${schedule ? `
                <div class="detail-item">
                    <div class="detail-icon">⏰</div>
                    <div class="detail-content">
                        <div class="detail-label">${texts.schedule}</div>
                        <div class="schedule-badge">${schedule}</div>
                    </div>
                </div>
            ` : ''}
            
            ${hospital ? `
                <div class="detail-item">
                    <div class="detail-icon">🏥</div>
                    <div class="detail-content">
                        <div class="detail-label">${texts.hospital}</div>
                        <div class="hospital-name">${hospital}</div>
                    </div>
                </div>
            ` : ''}
            
            ${contact ? `
                <div class="detail-item">
                    <div class="detail-icon">📞</div>
                    <div class="detail-content">
                        <div class="detail-label">${texts.contact}</div>
                        <div class="phone-numbers">
                            ${contact}
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    return card;
}

// Utility functions
function cleanText(text) {
    if (!text) return '';
    return text
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function formatText(text) {
    if (!text) return '';
    return text.replace(/<br>/g, '<br>').trim();
}

function formatContact(contact) {
    if (!contact) return '';
    
    const phones = contact.split('<br>').filter(p => p.trim());
    return phones.map(phone => {
        const cleaned = phone.trim();
        return `<span class="phone-number">${cleaned}</span>`;
    }).join('');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function resetFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    hospitalFilter.value = '';
    filteredDoctors = [...allDoctors];
    displayDoctors(filteredDoctors);
}
