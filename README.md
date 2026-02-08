# 🏥 Tangail Doctors Directory | টাঙ্গাইল ডাক্তার তালিকা

[**বাংলা**](#বাংলা) | [**English**](#english)

---

## বাংলা

### প্রকল্পের বিবরণ
টাঙ্গাইল ডাক্তার তালিকা একটি ওয়েব-ভিত্তিক ডিরেক্টরি যা টাঙ্গাইল জেলার সকল হাসপাতাল ও ক্লিনিকের বিশেষজ্ঞ ডাক্তারদের তথ্য সরবরাহ করে। এই প্ল্যাটফর্মটি রোগীদের সহজেই তাদের প্রয়োজনীয় বিশেষজ্ঞ ডাক্তার খুঁজে পেতে সাহায্য করে।

### ✨ বৈশিষ্ট্যসমূহ

- **৩টি ভিন্ন ভিউ মোড**
  - 🎴 **কার্ড গ্রিড ভিউ**: আকর্ষণীয় কার্ড লেআউটে ডাক্তারদের তথ্য
  - 📋 **টেবিল ভিউ**: ট্র্যাডিশনাল টেবিল ফরম্যাটে সম্পূর্ণ তথ্য
  - 📂 **ক্যাটাগরি ভিউ**: রোগের ধরন অনুযায়ী ডাক্তার তালিকা

- **🔍 রিয়েল-টাইম সার্চ**
  - 300ms debounce সহ দ্রুত সার্চ
  - ডাক্তারের নাম, বিশেষত্ব, হাসপাতাল দিয়ে খুঁজুন

- **🎯 ডুয়াল ফিল্টারিং**
  - বিশেষত্ব অনুযায়ী ফিল্টার
  - হাসপাতাল/ক্লিনিক অনুযায়ী ফিল্টার
  - একসাথে উভয় ফিল্টার ব্যবহার করুন

- **🏥 ১৫টি মেডিকেল ক্যাটাগরি**
  - প্রসূতি ও স্ত্রীরোগ বিশেষজ্ঞ
  - সার্জারি বিশেষজ্ঞ
  - হৃদরোগ বিশেষজ্ঞ
  - শিশু রোগ বিশেষজ্ঞ
  - মেডিসিন বিশেষজ্ঞ
  - হাড় ও জয়েন্ট বিশেষজ্ঞ
  - চর্ম ও যৌনরোগ বিশেষজ্ঞ
  - মনোরোগ বিশেষজ্ঞ
  - মস্তিষ্ক ও স্নায়ুরোগ বিশেষজ্ঞ
  - কিডনি ও মূত্ররোগ বিশেষজ্ঞ
  - চোখ বিশেষজ্ঞ
  - নাক-কান-গলা বিশেষজ্ঞ
  - দাঁত ও মুখ বিশেষজ্ঞ
  - ফিজিওথেরাপি বিশেষজ্ঞ
  - অন্যান্য বিশেষজ্ঞ

- **📱 মোবাইল রেসপন্সিভ ডিজাইন**
  - সকল ডিভাইসে সুন্দরভাবে কাজ করে
  - টাচ-ফ্রেন্ডলি ইন্টারফেস

- **🌐 দ্বিভাষিক সমর্থন**
  - বাংলা এবং ইংরেজি উভয় ভাষায় উপলব্ধ
  - স্বয়ংক্রিয় ভাষা সংরক্ষণ (localStorage)

### 🛠️ প্রযুক্তি স্ট্যাক

- **ফ্রন্ট-এন্ড**: HTML5, CSS3, JavaScript (ES6+)
- **ডেটা**: JSON
- **ফন্ট**: Hind Siliguri (Google Fonts)
- **আর্কিটেকচার**: Pure Client-Side, No Backend Required

### 📁 প্রকল্পের গঠন

```
Tangail-doctors/
├── index.html              # মূল হোম পেজ (কার্ড গ্রিড ভিউ)
├── table.html              # টেবিল ভিউ পেজ
├── category-page.html      # ক্যাটাগরি ভিউ পেজ
├── contact.html            # যোগাযোগ পেজ
├── script.js               # মূল JavaScript ফাইল
├── styles.css              # মূল CSS স্টাইলশিট
├── data.json               # বাংলা ডাক্তার ডেটা (370+ রেকর্ড)
├── english.json            # ইংরেজি ডাক্তার ডেটা (370+ রেকর্ড)
├── doctors logo.jpg        # লোগো ইমেজ
└── README.md               # এই ফাইল
```

### 🚀 ইনস্টলেশন এবং ব্যবহার

#### লোকালি চালানো

1. **রিপোজিটরি ক্লোন করুন**
   ```bash
   git clone https://github.com/arafatkhan/Tangail-doctors.git
   cd Tangail-doctors
   ```

2. **ব্রাউজারে খুলুন**
   - সরাসরি `index.html` ফাইল ব্রাউজারে খুলুন
   - অথবা একটি লোকাল সার্ভার ব্যবহার করুন:
     ```bash
     # Python 3 দিয়ে
     python -m http.server 8000
     
     # Node.js দিয়ে (http-server প্যাকেজ)
     npx http-server
     ```
   - ব্রাউজারে `http://localhost:8000` এ যান

#### ডেটা আপডেট করা

1. **নতুন ডাক্তার যোগ করতে**:
   - `data.json` (বাংলা) বা `english.json` (ইংরেজি) ফাইল খুলুন
   - নিচের ফরম্যাটে নতুন অবজেক্ট যোগ করুন:

   ```json
   {
     "id": 371,
     "name": "ডাক্তারের নাম",
     "qualification": "যোগ্যতা<br>অতিরিক্ত তথ্য",
     "specialty": "বিশেষত্ব",
     "schedule": "সময়সূচী<br>অতিরিক্ত তথ্য",
     "hospital": "হাসপাতাল/ক্লিনিকের নাম",
     "contact": "ফোন নম্বর<br>অতিরিক্ত নম্বর"
   }
   ```

2. **বিদ্যমান তথ্য সম্পাদনা করতে**:
   - JSON ফাইল খুলুন এবং প্রয়োজনীয় ফিল্ড আপডেট করুন
   - UTF-8 এনকোডিং বজায় রাখুন

3. **JSON যাচাই করুন**:
   - JSON ফরম্যাট সঠিক আছে কিনা নিশ্চিত করুন
   - অনলাইন JSON validator ব্যবহার করতে পারেন

### 📊 ডেটা স্ট্রাকচার

প্রতিটি ডাক্তারের রেকর্ডে নিম্নলিখিত ফিল্ড রয়েছে:

| ফিল্ড | টাইপ | বিবরণ |
|-------|------|--------|
| `id` | Number | ইউনিক আইডেন্টিফায়ার |
| `name` | String | ডাক্তারের নাম (বাংলা/ইংরেজি) |
| `qualification` | String | শিক্ষাগত যোগ্যতা (HTML `<br>` ট্যাগ সমর্থন করে) |
| `specialty` | String | মেডিকেল বিশেষত্ব |
| `schedule` | String | চেম্বার সময়সূচী (HTML `<br>` ট্যাগ সমর্থন করে) |
| `hospital` | String | হাসপাতাল/ক্লিনিকের নাম |
| `contact` | String | ফোন নম্বর(সমূহ) (HTML `<br>` ট্যাগ সমর্থন করে) |

**নোট**: 
- সকল টেক্সট ফিল্ডে `<br>` ট্যাগ ব্যবহার করে লাইন ব্রেক যোগ করা যায়
- ফোন নম্বরে `<br>` ট্যাগ কমা (,) দিয়ে প্রতিস্থাপিত হয়

### 📸 স্ক্রিনশট

#### হোম পেজ (কার্ড ভিউ)
_[স্ক্রিনশট যোগ করতে হবে]_

#### টেবিল ভিউ
_[স্ক্রিনশট যোগ করতে হবে]_

#### ক্যাটাগরি ভিউ
_[স্ক্রিনশট যোগ করতে হবে]_

#### মোবাইল ভিউ
_[স্ক্রিনশট যোগ করতে হবে]_

### 🤝 অবদান রাখার নির্দেশিকা

আমরা সকল ধরনের অবদানকে স্বাগত জানাই! অবদান রাখতে:

1. **Fork** করুন এই রিপোজিটরি
2. একটি নতুন **Branch** তৈরি করুন (`git checkout -b feature/AmazingFeature`)
3. আপনার পরিবর্তন **Commit** করুন (`git commit -m 'Add some AmazingFeature'`)
4. আপনার Branch এ **Push** করুন (`git push origin feature/AmazingFeature`)
5. একটি **Pull Request** খুলুন

#### অবদানের ক্ষেত্রসমূহ
- নতুন ডাক্তার তথ্য যোগ করা
- বিদ্যমান তথ্য আপডেট/সংশোধন করা
- UI/UX উন্নতি
- বাগ ফিক্স
- নতুন ফিচার যোগ করা
- ডকুমেন্টেশন উন্নত করা

### 📝 লাইসেন্স

এই প্রকল্পটি শিক্ষামূলক ও তথ্যমূলক উদ্দেশ্যে তৈরি করা হয়েছে। সকল ডাক্তারদের তথ্য শুধুমাত্র রেফারেন্সের জন্য।

### 📞 যোগাযোগ

- **GitHub**: [arafatkhan/Tangail-doctors](https://github.com/arafatkhan/Tangail-doctors)
- **Issues**: [Report an Issue](https://github.com/arafatkhan/Tangail-doctors/issues)

---

## English

### Project Description
Tangail Doctors Directory is a web-based directory providing comprehensive information about specialist doctors from all hospitals and clinics in Tangail district, Bangladesh. This platform helps patients easily find the right specialist doctor for their needs.

### ✨ Features

- **3 Different View Modes**
  - 🎴 **Card Grid View**: Attractive card layout with doctor information
  - 📋 **Table View**: Traditional table format with complete details
  - 📂 **Category View**: Doctors organized by medical specialties

- **🔍 Real-time Search**
  - Fast search with 300ms debounce
  - Search by doctor name, specialty, or hospital

- **🎯 Dual Filtering**
  - Filter by medical specialty
  - Filter by hospital/clinic
  - Use both filters simultaneously

- **🏥 15 Medical Categories**
  - Obstetrics & Gynecology Specialist
  - Surgery Specialist
  - Cardiology Specialist
  - Pediatrics Specialist
  - Medicine Specialist
  - Orthopedics & Joint Specialist
  - Dermatology & Sexual Health Specialist
  - Psychiatry Specialist
  - Neurology Specialist
  - Nephrology & Urology Specialist
  - Ophthalmology Specialist
  - ENT Specialist
  - Dental & Oral Health Specialist
  - Physiotherapy Specialist
  - Other Specialists

- **📱 Mobile Responsive Design**
  - Works beautifully on all devices
  - Touch-friendly interface

- **🌐 Bilingual Support**
  - Available in both Bengali and English
  - Automatic language preference saving (localStorage)

### 🛠️ Technology Stack

- **Front-end**: HTML5, CSS3, JavaScript (ES6+)
- **Data**: JSON
- **Font**: Hind Siliguri (Google Fonts)
- **Architecture**: Pure Client-Side, No Backend Required

### 📁 Project Structure

```
Tangail-doctors/
├── index.html              # Main home page (card grid view)
├── table.html              # Table view page
├── category-page.html      # Category view page
├── contact.html            # Contact page
├── script.js               # Main JavaScript file
├── styles.css              # Main CSS stylesheet
├── data.json               # Bengali doctor data (370+ records)
├── english.json            # English doctor data (370+ records)
├── doctors logo.jpg        # Logo image
└── README.md               # This file
```

### 🚀 Installation & Usage

#### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/arafatkhan/Tangail-doctors.git
   cd Tangail-doctors
   ```

2. **Open in browser**
   - Simply open `index.html` directly in your browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server package)
     npx http-server
     ```
   - Navigate to `http://localhost:8000` in your browser

#### Updating Data

1. **To add a new doctor**:
   - Open `data.json` (Bengali) or `english.json` (English)
   - Add a new object following this format:

   ```json
   {
     "id": 371,
     "name": "Doctor Name",
     "qualification": "Qualifications<br>Additional Info",
     "specialty": "Medical Specialty",
     "schedule": "Schedule<br>Additional Info",
     "hospital": "Hospital/Clinic Name",
     "contact": "Phone Number<br>Additional Number"
   }
   ```

2. **To edit existing information**:
   - Open the JSON file and update the required fields
   - Maintain UTF-8 encoding

3. **Validate JSON**:
   - Ensure JSON format is correct
   - Use an online JSON validator if needed

### 📊 Data Structure

Each doctor record contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Unique identifier |
| `name` | String | Doctor's name (Bengali/English) |
| `qualification` | String | Educational qualifications (supports HTML `<br>` tags) |
| `specialty` | String | Medical specialty |
| `schedule` | String | Chamber schedule (supports HTML `<br>` tags) |
| `hospital` | String | Hospital/Clinic name |
| `contact` | String | Phone number(s) (supports HTML `<br>` tags) |

**Note**: 
- All text fields support `<br>` tags for line breaks
- Phone numbers with `<br>` tags are displayed with commas (,)

### 📸 Screenshots

#### Home Page (Card View)
_[Screenshot to be added]_

#### Table View
_[Screenshot to be added]_

#### Category View
_[Screenshot to be added]_

#### Mobile View
_[Screenshot to be added]_

### 🤝 Contributing Guidelines

We welcome all types of contributions! To contribute:

1. **Fork** this repository
2. Create a new **Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to your Branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

#### Areas for Contribution
- Adding new doctor information
- Updating/correcting existing information
- UI/UX improvements
- Bug fixes
- Adding new features
- Improving documentation

### 📝 License

This project is created for educational and informational purposes. All doctor information is for reference only.

### 📞 Contact

- **GitHub**: [arafatkhan/Tangail-doctors](https://github.com/arafatkhan/Tangail-doctors)
- **Issues**: [Report an Issue](https://github.com/arafatkhan/Tangail-doctors/issues)

---

**Made with ❤️ for the people of Tangail**
