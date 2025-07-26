# Panduan Kontribusi

Terima kasih telah meluangkan waktu untuk berkontribusi pada proyek Call Center Scorecard!

## 💬 Alur Kerja Kontribusi

1.  **Fork Repositori**: Buat *fork* dari repositori ini ke akun GitHub Anda.
2.  **Clone Fork Anda**: Clone repositori yang sudah di-fork ke mesin lokal Anda.
3.  **Buat Branch Baru**: Selalu buat *branch* baru dari `dev` untuk setiap fitur atau perbaikan.
    -   Gunakan prefix yang sesuai untuk nama branch:
        -   Fitur baru: `feature/nama-fitur-singkat` (contoh: `feature/login-page`)
        -   Perbaikan bug: `bugfix/deskripsi-bug` (contoh: `bugfix/aht-calculation-error`)
        -   Tugas lainnya: `chore/deskripsi-tugas` (contoh: `chore/update-readme`)
    ```bash
    # Pindah ke branch dev dan pastikan sudah yang terbaru
    git checkout dev
    git pull origin dev

    # Buat branch fitur baru
    git checkout -b feature/nama-fitur-anda
    ```
4.  **Lakukan Perubahan**: Tulis kode Anda, pastikan untuk mengikuti standar coding yang ada.
5.  **Commit Perubahan**: Gunakan format *Conventional Commits* untuk pesan commit Anda.
    -   `feat`: Untuk penambahan fitur baru.
    -   `fix`: Untuk perbaikan bug.
    -   `docs`: Untuk perubahan pada dokumentasi.
    -   `style`: Untuk perubahan format kode (spasi, titik koma, dll).
    -   `refactor`: Untuk refactoring kode tanpa mengubah fungsionalitas.
    -   `chore`: Untuk tugas-tugas pemeliharaan (update dependensi, dll).
    ```bash
    git commit -m "feat: implement user authentication endpoint"
    ```
6.  **Push ke Fork Anda**: Push perubahan Anda ke repositori fork Anda.
    ```bash
    git push origin feature/nama-fitur-anda
    ```
7.  **Buat Pull Request**: Buka Pull Request (PR) dari branch fitur Anda ke branch `dev` repositori utama. Berikan judul dan deskripsi yang jelas pada PR Anda.

## 📜 Standar Koding

-   **Backend (Laravel)**: Ikuti standar PSR-12. Gunakan *Guard Clauses* dan hindari *nested if-else*. Manfaatkan *Form Requests* untuk validasi dan *Eloquent* untuk query.
-   **Frontend (React)**: Gunakan *functional components*