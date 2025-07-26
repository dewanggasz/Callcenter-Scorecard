Design Document: Call Center Scorecard Application
Versi: 1.0
Status: Draf

1. Latar Belakang
Manajemen kinerja di call center seringkali bergantung pada proses manual dan spreadsheet yang tersebar, menyebabkan kurangnya transparansi, kesulitan dalam pelacakan, dan evaluasi yang tidak konsisten. Aplikasi ini bertujuan untuk menyediakan platform terpusat dan terstruktur untuk mengatasi masalah tersebut.

2. Tujuan & Sasaran
Membangun sebuah Minimum Viable Product (MVP) dari aplikasi scorecard dengan fitur-fitur berikut:

Sistem login berbasis peran (SPV, TL, Agent).

Formulir input manual untuk data kinerja harian.

Dashboard visual untuk memantau KPI utama.

Kontrol akses hierarkis sesuai dengan peran pengguna.

Fungsionalitas impor dari Excel dan ekspor ke PDF/Excel.

3. Arsitektur & Tumpukan Teknologi
Monorepo-style Structure: Direktori terpisah untuk frontend dan backend.

Backend: Laravel (PHP)

Server: XAMPP / Laravel Herd

Database: MySQL

Autentikasi: Laravel Sanctum (Token-based)

Frontend: React (JavaScript)

Styling: SCSS Modules (BEM)

State Management: React Context API (untuk MVP)

API Communication: Axios

4. Struktur Data (ERD)
Struktur data akan berpusat pada entitas berikut:

users: Menyimpan semua data pengguna.

roles: Mendefinisikan peran (SPV, TL, Agent).

teams: Mendefinisikan tim yang dipimpin oleh seorang SPV.

team_user: Tabel pivot untuk relasi many-to-many antara tim dan pengguna (anggota tim).

scorecards: Tabel utama yang menyimpan semua metrik KPI harian untuk setiap agen.

5. Alur Pengguna (User Flows)
Login: Pengguna memasukkan email dan kata sandi. Sistem memverifikasi dan memberikan akses sesuai peran.

Agent View: Setelah login, agen melihat dashboard pribadinya yang berisi skor dan performa historisnya.

Team Leader View: TL login dan melihat dashboard ringkasan timnya. TL dapat menavigasi untuk melihat detail setiap agen di timnya dan menginput atau mengedit scorecard mereka.

Supervisor View: SPV memiliki akses penuh. SPV dapat melihat perbandingan antar tim, menelusuri detail setiap tim dan agen, serta mengelola data secara keseluruhan.

6. Pertimbangan Keamanan
Validasi Input: Semua input dari pengguna, baik melalui form maupun API, akan divalidasi secara ketat menggunakan Laravel Form Requests.

Proteksi Terhadap SQL Injection: Penggunaan Eloquent ORM secara eksklusif untuk interaksi database.

Manajemen Token: Token autentikasi tidak akan disimpan di localStorage di frontend untuk menghindari serangan XSS. Token akan dikelola dengan aman.

Middleware: Akses ke endpoint API akan dilindungi oleh middleware auth:sanctum dan role untuk memastikan otorisasi yang tepat.