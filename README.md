# Kad Kahwin Digital Interaktif (Walimatul Urus Hariz & Syahirah)

Kad jemputan perkahwinan digital interaktif berkonsepkan **Vintage Floral Elegance** (inspirasi jemputan eksklusif seperti *jemput.la*). Dibina khas menggunakan HTML5, Vanilla CSS3, dan Vanilla JavaScript tulen tanpa kebergantungan luar yang berat.

---

## ✨ Ciri-Ciri Utama & Interaktiviti

1. **Sampul & Meterai Lilin Interaktif (*Wax Seal Opening*)**:
   - Sampul berpintu kembar (*double-door envelope*) dengan meterai monogram lilin bulatan **H & S** ("Hariz & Syahirah" - **BUKA**).
   - Animasi buka pintu 3D secara lancar dan automatik memainkan lagu latar bila disentuh.
   - Letupan konfeti perayaan sebaik sahaja kad dibuka.

2. **Pemain Muzik Latar Romantik (*Floating Music Player*)**:
   - Piring vinil berputar dengan equalizer animasi visual di sudut atas dan butang pintas di bar bawah.
   - Trek instrumental perkahwinan berkualiti tinggi (*assets/wedding_melody.wav*).
   - Fungsi jeda / main (*Play/Pause*) bila-bila masa.

3. **Kandungan Kad Lengkap**:
   - Kaligrafi Arab Bismillah & Ucapan Salam.
   - Nama Ibu Bapa Pengantin: **Juzaimi Bin Mohd Thani & Fauziah Bt Md. Kassim**.
   - Nama Pengantin: **Muhammad Hariz Bin Juzaimi & Nur Syahirah Binti Hisham**.
   - **Nama Tetamu Tersuai Dinamik**: Menyokong pautan khas URL (contoh: `?to=Dato'+Ahmad` atau `?to=Keluarga+Pak+Ngah`).
   - Butiran Majlis: Magica Autumn Hall @ PICC, Putrajaya, Sabtu 7 November 2026, 11:00 Pagi - 4:00 Petang.
   - Kod Pakaian: *Formal / Tradisional* beserta palet warna sampel.
   - Atur Cara Majlis (*Program Timeline*) interaktif dengan penunjuk waktu ketibaan pengantin.
   - Doa Buat Kedua Mempelai.

4. **Kiraan Detik Langsung (*Live Countdown Timer*)**:
   - Mengira secara langsung hari, jam, minit, dan saat menuju hari bahagia 7 November 2026.

5. **Buku Ucapan & Titipan Doa Tetamu (*Guestbook Feed*)**:
   - Suapan langsung ucapan tetamu lengkap dengan inisial avatar dan masa.
   - Tetamu boleh menekan **Tulis Ucapan** atau **Sahkan Kehadiran** — ucapan baharu akan terus muncul di bahagian teratas serta disimpan dalam storan penyemak imbas (*localStorage*).

6. **Salam Kaut & Hadiah Digital**:
   - Paparan kod QR DuitNow untuk imbasan mana-mana perbankan atau e-Wallet.
   - Butiran akaun Maybank & CIMB Bank dengan butang **Salin Nombor Akaun** (1-klik salin ke papan keratan dengan notifikasi *toast*).

7. **Dermaga Navigasi Terapung Bawah (*Floating Navigation Dock*)**:
   - 📅 **Kalendar**: Pilihan Google Calendar terus ke web dan muat turun fail kalendar Apple / iCal (.ics).
   - 📞 **Hubungi**: Senarai kenalan keluarga (Juzaimi, Fauziah, Muhammad Haziq, Nurhazwani) dengan butang terus ke WhatsApp & panggilan telefon.
   - 🎵 **Lagu**: Kawalan hidup/mati muzik latar.
   - 📍 **Lokasi**: Peta interaktif PICC Putrajaya serta pintasan navigasi Google Maps dan Waze.
   - 🎁 **Hadiah**: Modal Salam Kaut & DuitNow QR.
   - 💌 **RSVP**: Borang 2-langkah (Pilihan Hadir / Tidak Hadir / Mungkin -> Isi nama, telefon, bilangan pax & ucapan).

8. **Fungsi Kongsi (*Share*)**:
   - Butang **WhatsApp** dengan teks jemputan rasmi yang telah diformatkan sedia untuk dihantar.
   - Butang **Salin Pautan** untuk berkongsi di mana-mana media sosial.

---

## 🚀 Cara Menjalankan

Buka fail `index.html` terus dalam mana-mana pelayar web moden (Google Chrome, Safari, Microsoft Edge, Firefox), atau jalankan pelayan tempatan:

```bash
# Menggunakan Python (jika ada):
python -m http.server 8080
```
Kemudian layari `http://localhost:8080/` pada pelayar anda.

Untuk menghantar jemputan khas kepada tetamu tertentu:
```
http://localhost:8080/?to=Dato'+Farid+dan+Datin
```
Nama tetamu akan terpapar secara automatik di dalam kad!
