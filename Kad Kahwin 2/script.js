document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. Google Sheets RSVP Integration
    // ==========================================
    const GOOGLE_SHEET_RSVP_URL = "https://script.google.com/macros/s/AKfycbxahCaQsqqUY9xKv435giPmvo-k6MHWxiZqZxv3rvkBGPUlsDOYhTT-4Wsqr0MLBPl9gw/exec";

    // ==========================================
    // 1. Audio Control & Initial Welcome Overlay
    // ==========================================
    const audioOverlay = document.getElementById('audio-overlay');
    const openInviteBtn = document.getElementById('open-invite');
    const bgMusic = document.getElementById('bg-music');
    const navBtnMusic = document.getElementById('nav-btn-music');
    const musicIconIndicator = document.getElementById('music-icon-indicator');

    let isAudioPlaying = false;

    const playMusic = () => {
        bgMusic.play()
            .then(() => {
                isAudioPlaying = true;
                musicIconIndicator.classList.add('spinning');
            })
            .catch(err => {
                console.log('Audio autoplay policy prevented direct play:', err);
            });
    };

    const pauseMusic = () => {
        bgMusic.pause();
        isAudioPlaying = false;
        musicIconIndicator.classList.remove('spinning');
    };

    const toggleMusic = () => {
        if (isAudioPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    };

    if (openInviteBtn) {
        openInviteBtn.addEventListener('click', () => {
            audioOverlay.classList.add('hidden');
            playMusic();
        });
    }

    if (navBtnMusic) {
        navBtnMusic.addEventListener('click', toggleMusic);
    }

    // ==========================================
    // 2. Real-Time Countdown Timer (Dynamically calculated for 24 January 2027)
    // ==========================================
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const getTargetWeddingDate = () => {
        const dayEl = document.querySelector("[data-key='date-day']");
        const monthEl = document.querySelector("[data-key='date-month']");
        const yearEl = document.querySelector("[data-key='date-year']");
        
        if (dayEl && monthEl && yearEl) {
            const d = dayEl.innerText.trim();
            const m = monthEl.innerText.trim();
            const y = yearEl.innerText.trim();
            if (d && m && y && !isNaN(d) && !isNaN(m) && !isNaN(y)) {
                const dateStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T11:00:00`;
                const parsed = new Date(dateStr).getTime();
                if (!isNaN(parsed)) return parsed;
            }
        }
        return new Date("2027-01-24T11:00:00").getTime();
    };

    const updateCountdown = () => {
        const targetDate = getTargetWeddingDate();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (daysEl) daysEl.innerText = "0";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 3. Navigation Menu Drawer
    // ==========================================
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navDrawer = document.getElementById('nav-drawer');
    const navDrawerClose = document.getElementById('nav-drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => navDrawer.classList.add('open');
    const closeDrawer = () => navDrawer.classList.remove('open');

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
    if (navDrawerClose) navDrawerClose.addEventListener('click', closeDrawer);
    if (navDrawer) {
        navDrawer.addEventListener('click', (e) => {
            if (e.target === navDrawer) closeDrawer();
        });
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // ==========================================
    // 4. Bottom Navigation Scrolling
    // ==========================================
    const navBtnLocation = document.getElementById('nav-btn-location');
    const navBtnContacts = document.getElementById('nav-btn-contacts');
    const navBtnRsvp = document.getElementById('nav-btn-rsvp');
    const navBtnCalendar = document.getElementById('nav-btn-calendar');

    if (navBtnLocation) {
        navBtnLocation.addEventListener('click', () => {
            document.getElementById('screen-location').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (navBtnContacts) {
        navBtnContacts.addEventListener('click', () => {
            const familyBlock = document.querySelector('.family-block');
            if (familyBlock) familyBlock.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================
    // 5. RSVP Modal Logic & Forms
    // ==========================================
    const rsvpModal = document.getElementById('rsvp-modal');
    const rsvpModalClose = document.getElementById('rsvp-modal-close');
    const tabHadir = document.getElementById('modal-tab-hadir');
    const tabTidak = document.getElementById('modal-tab-tidak');
    const paxGroup = document.getElementById('pax-group');
    const rsvpForm = document.getElementById('rsvp-submission-form');

    let currentAttendanceStatus = "HADIR";

    const setAttendanceStatus = (status) => {
        currentAttendanceStatus = status;
        if (status === "HADIR") {
            tabHadir.classList.add('active');
            tabTidak.classList.remove('active');
            paxGroup.style.display = 'flex';
        } else {
            tabTidak.classList.add('active');
            tabHadir.classList.remove('active');
            paxGroup.style.display = 'none';
        }
    };

    const openRsvpModal = (status = "HADIR") => {
        setAttendanceStatus(status);
        rsvpModal.classList.add('open');
    };

    const closeRsvpModal = () => {
        rsvpModal.classList.remove('open');
    };

    if (tabHadir) tabHadir.addEventListener('click', () => setAttendanceStatus("HADIR"));
    if (tabTidak) tabTidak.addEventListener('click', () => setAttendanceStatus("TIDAK HADIR"));

    if (rsvpModalClose) rsvpModalClose.addEventListener('click', closeRsvpModal);
    if (rsvpModal) {
        rsvpModal.addEventListener('click', (e) => {
            if (e.target === rsvpModal) closeRsvpModal();
        });
    }

    // Triggers for RSVP Modal
    const btnLocationHadir = document.getElementById('btn-location-hadir');
    const btnLocationTidak = document.getElementById('btn-location-tidak');
    const btnRsvpOpenHadir = document.getElementById('btn-rsvp-open-hadir');
    const btnRsvpOpenTidak = document.getElementById('btn-rsvp-open-tidak');

    if (btnLocationHadir) btnLocationHadir.addEventListener('click', () => openRsvpModal("HADIR"));
    if (btnLocationTidak) btnLocationTidak.addEventListener('click', () => openRsvpModal("TIDAK HADIR"));
    if (btnRsvpOpenHadir) btnRsvpOpenHadir.addEventListener('click', () => openRsvpModal("HADIR"));
    if (btnRsvpOpenTidak) btnRsvpOpenTidak.addEventListener('click', () => openRsvpModal("TIDAK HADIR"));
    if (navBtnRsvp) navBtnRsvp.addEventListener('click', () => openRsvpModal("HADIR"));

    // Handle RSVP submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('guest-name').value.trim();
            const phoneEl = document.getElementById('guest-phone');
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const pax = document.getElementById('pax-select').value;
            const wish = document.getElementById('guest-wish').value.trim();

            const responseData = {
                name,
                phone: phone || '-',
                status: currentAttendanceStatus,
                pax: currentAttendanceStatus === "HADIR" ? pax : "0",
                wish: wish || '-',
                timestamp: new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' })
            };

            // Send to Google Sheets (Excel real-time sync)
            if (GOOGLE_SHEET_RSVP_URL) {
                fetch(GOOGLE_SHEET_RSVP_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(responseData)
                }).catch(err => console.error('RSVP submission error:', err));
            }

            // Save to localStorage as local backup
            const savedResponses = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
            savedResponses.push(responseData);
            localStorage.setItem('wedding_rsvps', JSON.stringify(savedResponses));

            // If guest left a wish, append it to Ucapan & Doa list and persist it!
            if (wish && wish !== '-') {
                appendWishCard(name, wish);

                // Save to localStorage so it stays upon refresh
                const userWishes = JSON.parse(localStorage.getItem('wedding_custom_wishes') || '[]');
                userWishes.unshift({ author: name, text: wish });
                localStorage.setItem('wedding_custom_wishes', JSON.stringify(userWishes));
            }

            closeRsvpModal();
            rsvpForm.reset();
            alert(`Terima kasih, ${name}! Maklum balas RSVP anda telah berjaya dihantar.`);
        });
    }

    // ==========================================
    // 6. Wishes Management & Modal
    // ==========================================
    const wishModal = document.getElementById('wish-modal');
    const wishModalClose = document.getElementById('wish-modal-close');
    const btnTriggerWishModal = document.getElementById('btn-trigger-wish-modal');
    const standaloneWishForm = document.getElementById('standalone-wish-form');
    const wishesContainer = document.getElementById('wishes-container');

    const openWishModal = () => wishModal.classList.add('open');
    const closeWishModal = () => wishModal.classList.remove('open');

    if (btnTriggerWishModal) btnTriggerWishModal.addEventListener('click', openWishModal);
    if (wishModalClose) wishModalClose.addEventListener('click', closeWishModal);
    if (wishModal) {
        wishModal.addEventListener('click', (e) => {
            if (e.target === wishModal) closeWishModal();
        });
    }

    const renderedWishes = new Set();

    const appendWishCard = (name, text) => {
        if (!name || !text || text === '-') return;
        const key = `${name.trim().toLowerCase()}:::${text.trim().toLowerCase()}`;
        if (renderedWishes.has(key)) return;
        renderedWishes.add(key);

        const initials = name
            .split(' ')
            .filter(Boolean)
            .map(word => word[0].toUpperCase())
            .slice(0, 2)
            .join('') || 'NA';

        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.style.animation = 'fadeIn 0.5s ease';
        wishCard.innerHTML = `
            <p class="body-md italic-text quote-text">"${escapeHtml(text)}"</p>
            <div class="wish-author-row">
                <div class="avatar-badge">${escapeHtml(initials)}</div>
                <span class="label-md bold-text author-name">${escapeHtml(name.toUpperCase())}</span>
            </div>
        `;
        if (wishesContainer) {
            wishesContainer.prepend(wishCard);
        }
    };

    const escapeHtml = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    if (standaloneWishForm) {
        standaloneWishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const author = document.getElementById('wish-author-name').value.trim();
            const text = document.getElementById('wish-author-text').value.trim();

            if (author && text) {
                appendWishCard(author, text);

                const wishData = {
                    name: author,
                    phone: '-',
                    status: 'UCAPAN',
                    pax: '-',
                    wish: text,
                    timestamp: new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' })
                };

                // Send to Google Sheets (Excel real-time sync)
                if (GOOGLE_SHEET_RSVP_URL) {
                    fetch(GOOGLE_SHEET_RSVP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify(wishData)
                    }).catch(err => console.error('Wish submission error:', err));
                }

                // Save to localStorage
                const userWishes = JSON.parse(localStorage.getItem('wedding_custom_wishes') || '[]');
                userWishes.unshift({ author, text });
                localStorage.setItem('wedding_custom_wishes', JSON.stringify(userWishes));

                closeWishModal();
                standaloneWishForm.reset();
                alert(`Terima kasih atas ucapan anda, ${author}!`);
            }
        });
    }

    // Load custom wishes from localStorage on boot
    const storedWishes = JSON.parse(localStorage.getItem('wedding_custom_wishes') || '[]');
    storedWishes.slice().reverse().forEach(item => {
        appendWishCard(item.author, item.text);
    });

    // Also fetch all wishes from Google Sheet so all guests see each other's wishes!
    const syncWishesFromGoogleSheet = () => {
        if (!GOOGLE_SHEET_RSVP_URL) return;
        fetch(GOOGLE_SHEET_RSVP_URL)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(item => {
                        if (item.author && item.text) {
                            appendWishCard(item.author, item.text);
                        }
                    });
                }
            })
            .catch(err => {
                // Ignore if not JSON yet
            });
    };

    syncWishesFromGoogleSheet();

    // ==========================================
    // 7. Calendar Export (Google & .ICS)
    // ==========================================
    const calendarModal = document.getElementById('calendar-modal');
    const calendarModalClose = document.getElementById('calendar-modal-close');
    const btnAddGoogleCal = document.getElementById('btn-add-google-cal');
    const btnDownloadIcs = document.getElementById('btn-download-ics');

    const openCalendarModal = () => calendarModal.classList.add('open');
    const closeCalendarModal = () => calendarModal.classList.remove('open');

    if (navBtnCalendar) navBtnCalendar.addEventListener('click', openCalendarModal);
    if (calendarModalClose) calendarModalClose.addEventListener('click', closeCalendarModal);
    if (calendarModal) {
        calendarModal.addEventListener('click', (e) => {
            if (e.target === calendarModal) closeCalendarModal();
        });
    }

    // Google Calendar URL generator
    if (btnAddGoogleCal) {
        const title = encodeURIComponent("Walimatul Urus Nadzri & Adibah");
        const details = encodeURIComponent("Walimatul Urus Nadzri & Adibah di Dewan Tengku Zara, Seksyen 15, Shah Alam. Kehadiran anda amat bermakna buat kami.");
        const location = encodeURIComponent("Dewan Tengku Zara, 15, Jalan 15/23, Seksyen 15, 40200 Shah Alam, Selangor");
        // Jan 24, 2027: 11:00 AM to 4:00 PM (MYT = UTC+8 -> 03:00 to 08:00 UTC)
        const dates = "20270124T030000Z/20270124T080000Z";
        btnAddGoogleCal.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    }

    // .ICS file generator
    if (btnDownloadIcs) {
        btnDownloadIcs.addEventListener('click', () => {
            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Walimatul Urus Nadzri & Adibah//MS',
                'CALSCALE:GREGORIAN',
                'METHOD:PUBLISH',
                'BEGIN:VEVENT',
                'UID:walimatul-urus-nadzri-adibah-20270124@jemput.la',
                'DTSTAMP:20270124T000000Z',
                'DTSTART:20270124T030000Z',
                'DTEND:20270124T080000Z',
                'SUMMARY:Walimatul Urus Nadzri & Adibah',
                'DESCRIPTION:Walimatul Urus Nadzri & Adibah bertempat di Dewan Tengku Zara, 15, Jalan 15/23, Seksyen 15, 40200 Shah Alam, Selangor.',
                'LOCATION:Dewan Tengku Zara, 15, Jalan 15/23, Seksyen 15, 40200 Shah Alam, Selangor',
                'STATUS:CONFIRMED',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'Walimatul_Urus_Nadzri_Adibah.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            closeCalendarModal();
        });
    }

    // ==========================================
    // 8. Active Navigation Highlighting on Scroll
    // ==========================================
    const sections = document.querySelectorAll('.screen-page');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => item.classList.remove('active'));
        if (currentSectionId === 'screen-location' && navBtnLocation) {
            navBtnLocation.classList.add('active');
        } else if (currentSectionId === 'screen-rsvp' && navBtnRsvp) {
            navBtnRsvp.classList.add('active');
        }
    });

});
