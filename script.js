// Global variables
let allDoctors = [];
let filteredDoctors = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const hospitalFilter = document.getElementById('hospitalFilter');
const resetBtn = document.getElementById('resetBtn');
const doctorList = document.getElementById('doctorList');
const totalDoctorsSpan = document.getElementById('totalDoctors');
const noResults = document.getElementById('noResults');
const loading = document.getElementById('loading');

// Define 15 main categories
const mainCategories = [
    { name: 'প্রসূতি ও স্ত্রীরোগ বিশেষজ্ঞ', keywords: ['প্রসূতি', 'স্ত্রী', 'গাইনী', 'গাইনি', 'অবস'] },
    { name: 'সার্জারি বিশেষজ্ঞ', keywords: ['সার্জন', 'সার্জারি', 'জেনারেল সার্জন', 'ল্যাপারোস্কোপিক'] },
    { name: 'হৃদরোগ বিশেষজ্ঞ', keywords: ['হৃদরোগ', 'হার্ট', 'কার্ডিও', 'বাতজ্বর'] },
    { name: 'শিশু রোগ বিশেষজ্ঞ', keywords: ['শিশু', 'পেডিয়া', 'নবজাতক', 'বাচ্চা'] },
    { name: 'মেডিসিন বিশেষজ্ঞ', keywords: ['মেডিসিন', 'জ্বর', 'ডায়াবেটিস', 'থাইরয়েড'] },
    { name: 'হাড় ও জয়েন্ট বিশেষজ্ঞ', keywords: ['হাড়', 'জোড়া', 'বাত', 'অর্থো', 'পঙ্গু'] },
    { name: 'চর্ম ও যৌনরোগ বিশেষজ্ঞ', keywords: ['চর্ম', 'যৌন', 'সেক্স', 'এলার্জি', 'ত্বক'] },
    { name: 'মনোরোগ বিশেষজ্ঞ', keywords: ['মনোরোগ', 'মনযৌন', 'মাদকাসক্ত', 'মানসিক'] },
    { name: 'মস্তিষ্ক ও স্নায়ুরোগ বিশেষজ্ঞ', keywords: ['ব্রেইন', 'নিউরো', 'স্নায়ু', 'মস্তিষ্ক'] },
    { name: 'কিডনি ও মূত্ররোগ বিশেষজ্ঞ', keywords: ['কিডনি', 'মূত্র', 'ইউরো', 'পাথর'] },
    { name: 'চোখ বিশেষজ্ঞ', keywords: ['চোখ', 'চক্ষু', 'আই', 'দৃষ্টি'] },
    { name: 'নাক-কান-গলা বিশেষজ্ঞ', keywords: ['নাক', 'কান', 'গলা', 'ইএনটি'] },
    { name: 'দাঁত ও মুখ বিশেষজ্ঞ', keywords: ['দাঁত', 'ডেন্টাল', 'মুখ'] },
    { name: 'ফিজিওথেরাপি বিশেষজ্ঞ', keywords: ['ফিজিও', 'ব্যথা', 'প্যারালাইসিস'] },
    { name: 'অন্যান্য বিশেষজ্ঞ', keywords: [] }
];

// Get main category for a specialty
function getMainCategory(specialty) {
    const lowerSpecialty = specialty.toLowerCase();
    
    for (const cat of mainCategories) {
        if (cat.keywords.length === 0) continue;
        for (const keyword of cat.keywords) {
            if (lowerSpecialty.includes(keyword.toLowerCase())) {
                return cat.name;
            }
        }
    }
    return 'অন্যান্য বিশেষজ্ঞ';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadDoctors();

    // Event listeners
    searchInput.addEventListener('input', debounce(filterDoctors, 300));
    categoryFilter.addEventListener('change', filterDoctors);
    hospitalFilter.addEventListener('change', filterDoctors);
    resetBtn.addEventListener('click', resetFilters);
});

// Load doctors data using AJAX
function loadDoctors() {
    loading.style.display = 'block';
    doctorList.style.display = 'none';

    fetch('data.json')
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
            loading.innerHTML = '<p>ডেটা লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পেজ রিফ্রেশ করুন।</p>';
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

    // Populate category filter with 15 main categories
    mainCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
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
    totalDoctorsSpan.textContent = doctors.length;

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

    const name = cleanText(doctor.name || 'নাম পাওয়া যায়নি');
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
                        <div class="detail-label">যোগ্যতা</div>
                        <div class="detail-text">${qualification}</div>
                    </div>
                </div>
            ` : ''}
            
            ${schedule ? `
                <div class="detail-item">
                    <div class="detail-icon">⏰</div>
                    <div class="detail-content">
                        <div class="detail-label">সময়সূচী</div>
                        <div class="schedule-badge">${schedule}</div>
                    </div>
                </div>
            ` : ''}
            
            ${hospital ? `
                <div class="detail-item">
                    <div class="detail-icon">🏥</div>
                    <div class="detail-content">
                        <div class="detail-label">প্রতিষ্ঠান</div>
                        <div class="hospital-name">${hospital}</div>
                    </div>
                </div>
            ` : ''}
            
            ${contact ? `
                <div class="detail-item">
                    <div class="detail-icon">📞</div>
                    <div class="detail-content">
                        <div class="detail-label">যোগাযোগ</div>
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
