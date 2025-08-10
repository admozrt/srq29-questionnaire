# SRQ-29 Mental Health Questionnaire

## 📋 Deskripsi

Aplikasi web untuk Skrining Kesehatan Jiwa menggunakan kuesioner SRQ-29 (Self Reporting Questionnaire 29) yang dikembangkan oleh World Health Organization (WHO). Aplikasi ini digunakan untuk mendeteksi masalah kesehatan mental termasuk gangguan mental emosional, penggunaan zat psikoaktif, gejala psikotik, dan PTSD.

## 🏥 Institusi

**SHAWA (Sistem Skrining Kesehatan Jiwa)**  
Rumah Sakit Jiwa Daerah Provinsi Kepulauan Bangka Belitung

## ✨ Fitur Utama

- ✅ **Form Data Pribadi** - Pengumpulan informasi responden
- ✅ **Kuesioner SRQ-29** - 29 pertanyaan standar WHO
- ✅ **Sistem Penilaian Otomatis** - Berdasarkan kriteria klinis
- ✅ **Hasil dalam Modal** - Tampilan hasil yang profesional
- ✅ **Integrasi Pendaftaran** - Direct link ke sistem antrian online
- ✅ **Responsive Design** - Optimal di desktop dan mobile
- ✅ **Print-friendly** - Hasil dapat dicetak
- ✅ **Progressive Web App Ready** - Dapat diinstall sebagai aplikasi

## 🎯 Kategori Skrining

1. **GME (Gangguan Mental Emosional)**: Deteksi cemas dan depresi (5+ dari 20 pertanyaan)
2. **Penggunaan Zat**: Deteksi penggunaan alkohol/narkoba berlebihan
3. **Gangguan Psikotik**: Deteksi gejala psikosis (1+ dari 3 pertanyaan)
4. **PTSD**: Deteksi gangguan stres pasca trauma (1+ dari 5 pertanyaan)

## 🛠️ Teknologi

- **Frontend**: React 19.1.1 + TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.539.0
- **Build Tool**: Create React App 5.0.1
- **Testing**: React Testing Library + Jest

## 📦 Instalasi

### Prasyarat

- Node.js ≥ 16.x
- npm atau yarn

### Langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd srq29-questionnaire
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment**

   ```bash
   cp .env.example .env
   # Edit file .env sesuai kebutuhan
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```
   Aplikasi akan berjalan di `http://localhost:3000`

## 🏗️ Struktur Proyek

```
srq29-questionnaire/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── Forms/        # Form components
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   └── QuestionnaireForm.tsx
│   │   ├── Results/      # Results components
│   │   │   └── ResultsModal.tsx
│   │   └── SRQ29Questionnaire.tsx
│   ├── data/             # Static data
│   │   └── questions.ts  # SRQ-29 questions
│   ├── hooks/            # Custom hooks
│   │   └── useQuestionnaire.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── calculation.ts
│   │   └── helpers.ts
│   ├── App.tsx           # Main app component
│   └── index.tsx         # Entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Deployment

### Build Production

```bash
npm run build
```

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy ke Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build dan deploy
npm run build
netlify deploy --prod --dir=build
```

## 📊 Algoritma Penilaian

### GME (Gangguan Mental Emosional)

- **Kriteria**: 5+ jawaban "YA" dari pertanyaan 1-20
- **Rujukan**: Psikiater/Psikolog klinis

### Penggunaan Zat Psikoaktif

- **Kriteria**: Jawaban "YA" pada pertanyaan 21
- **Rujukan**: Psikiater/Psikolog klinis, Konselor adiksi

### Gangguan Psikotik

- **Kriteria**: 1+ jawaban "YA" dari pertanyaan 22-24
- **Rujukan**: Psikiater/Psikolog klinis (SEGERA)

### PTSD (Post Traumatic Stress Disorder)

- **Kriteria**: 1+ jawaban "YA" dari pertanyaan 25-29
- **Rujukan**: Psikiater/Psikolog klinis trauma specialist

## 🎨 Komponen Utama

### `SRQ29Questionnaire`

Komponen utama yang mengatur alur aplikasi dan state management.

### `PersonalInfoForm`

Form untuk mengumpulkan data pribadi responden (nama, umur, gender, pekerjaan, alamat).

### `QuestionnaireForm`

Form utama dengan 29 pertanyaan SRQ-29, dilengkapi progress bar dan validasi.

### `ResultsModal`

Modal untuk menampilkan hasil skrining dengan interpretasi dan rekomendasi rujukan.

### `useQuestionnaire`

Custom hook untuk mengelola state aplikasi dan business logic.

## 🔧 Konfigurasi

### Environment Variables

```bash
REACT_APP_NAME=SRQ-29 Questionnaire
REACT_APP_HOSPITAL_NAME=RSJ SAMBANG LIHUM
REACT_APP_REGISTRATION_URL=https://antrian.sambanglihum.com/apps/RegOnline/
```

### Tailwind CSS

Menggunakan konfigurasi standar dengan color scheme emerald untuk tema kesehatan.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📱 Progressive Web App

Aplikasi dapat diinstall sebagai PWA dengan menambahkan file manifest dan service worker.

## 🔒 Privacy & Security

- **No Data Storage**: Data tidak disimpan permanen di browser
- **Client-side Only**: Semua proses berjalan di browser pengguna
- **HIPAA Compliant**: Desain mengikuti standar keamanan medis
- **Encrypted HTTPS**: Wajib menggunakan HTTPS di production

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tim Pengembang

- **Developer**: Laravel dan React Engineer
- **Institution**: RSJ Sambang Lihum, Kalimantan Selatan

## 📞 Kontak & Support

Untuk pertanyaan teknis atau support, silakan hubungi tim IT RSJ Sambang Lihum.

## 📈 Roadmap

- [ ] Integrasi database untuk penyimpanan hasil
- [ ] Dashboard admin untuk analisis data
- [ ] Export hasil ke PDF
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] API integration dengan sistem rumah sakit

## ⚠️ Disclaimer

Aplikasi ini hanya untuk skrining awal dan tidak menggantikan konsultasi medis profesional. Hasil skrining harus selalu dikonfirmasi oleh tenaga medis yang kompeten.
