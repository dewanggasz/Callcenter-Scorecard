Dokumentasi API Endpoints
Berikut adalah daftar endpoint API untuk aplikasi Call Center Scorecard.

Base URL: /api

Autentikasi (Laravel Sanctum)
Method

Endpoint

Deskripsi

Middleware/Akses

POST

/login

Mengautentikasi pengguna dan mengembalikan token.

guest

POST

/logout

Menghapus token autentikasi pengguna.

auth:sanctum

GET

/user

Mendapatkan data pengguna yang sedang login.

auth:sanctum

Scorecards
Method

Endpoint

Deskripsi

Middleware/Akses

POST

/scorecards

Membuat entri scorecard baru untuk seorang agen.

auth:sanctum, role:SPV,TL

GET

/scorecards

Mendapatkan daftar scorecard (dengan filter).

auth:sanctum

GET

/scorecards/{id}

Mendapatkan detail satu scorecard.

auth:sanctum

PUT

/scorecards/{id}

Memperbarui data scorecard.

auth:sanctum, role:SPV,TL

DELETE

/scorecards/{id}

Menghapus sebuah scorecard.

auth:sanctum, role:SPV

Manajemen Pengguna & Tim
Method

Endpoint

Deskripsi

Middleware/Akses

GET

/teams

Mendapatkan daftar semua tim.

auth:sanctum, role:SPV

GET

/teams/{id}/agents

Mendapatkan daftar agen dalam satu tim.

auth:sanctum, role:SPV,TL

GET

/agents

Mendapatkan daftar semua agen.

auth:sanctum, role:SPV

Ekspor & Impor
Method

Endpoint

Deskripsi

Middleware/Akses

POST

/scorecards/import

Mengimpor data scorecard dari file Excel.

auth:sanctum, role:SPV,TL

GET

/scorecards/export/excel

Mengekspor data scorecard ke format Excel.

auth:sanctum

GET

/scorecards/export/pdf

Mengekspor data scorecard ke format PDF.

auth:san