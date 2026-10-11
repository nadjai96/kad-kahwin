document.addEventListener('DOMContentLoaded', () => {
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
            const pax = document.getElementById('pax-select').value;
            const wish = document.getElementById('guest-wish').value.trim();

            const responseData = {
                name,
                status: currentAttendanceStatus,
                pax: currentAttendanceStatus === "HADIR" ? pax : "0",
                wish,
                timestamp: new Date().toISOString()
            };

            // Save to localStorage
            const savedResponses = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
            savedResponses.push(responseData);
            localStorage.setItem('wedding_rsvps', JSON.stringify(savedResponses));

            // If guest left a wish, append it to Ucapan & Doa list!
            if (wish) {
                appendWishCard(name, wish);
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

    const appendWishCard = (name, text) => {
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
        wishesContainer.prepend(wishCard);
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
    storedWishes.forEach(item => {
        appendWishCard(item.author, item.text);
    });

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

    // ==========================================
    // 9. Live In-Browser Text Editing & Storage
    // ==========================================
    const editToolbar = document.getElementById('edit-toolbar');
    const btnSaveEdits = document.getElementById('btn-save-edits');
    const btnResetEdits = document.getElementById('btn-reset-edits');
    const btnDismissToolbar = document.getElementById('btn-dismiss-toolbar');
    const btnReopenToolbar = document.getElementById('btn-reopen-toolbar');
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    const STORAGE_KEY = 'kad_kahwin_exact_edits';

    // Store original defaults from screen.png
    const defaultTexts = {};
    editableElements.forEach((el, index) => {
        const key = el.getAttribute('data-key') || `editable_${index}`;
        defaultTexts[key] = el.innerHTML;
    });

    const sanitizeContent = (html) => {
        if (!html) return '';
        // Strip font tags and inline style attributes so original fonts remain pristine
        let clean = html.replace(/<\/?font[^>]*>/gi, '');
        clean = clean.replace(/style="[^"]*"/gi, '');
        return clean;
    };

    // Load saved edits if any
    const loadSavedEdits = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Purge any stale Ruscus Hall or outdated dates from old saves
                let changed = false;
                if (parsed['location-hall'] && parsed['location-hall'].includes('Ruscus')) {
                    delete parsed['location-hall'];
                    changed = true;
                }
                if (parsed['rsvp-deadline'] && parsed['rsvp-deadline'].includes('Mei 2026')) {
                    delete parsed['rsvp-deadline'];
                    changed = true;
                }
                if (changed) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
                }
                editableElements.forEach((el, index) => {
                    const key = el.getAttribute('data-key') || `editable_${index}`;
                    if (key.startsWith('timer-')) return; // Keep live dynamic timer
                    if (key === 'location-hall' && (!parsed[key] || parsed[key].includes('Ruscus'))) return;
                    if (key === 'rsvp-deadline' && (!parsed[key] || parsed[key].includes('Mei 2026'))) return;
                    if (parsed[key] !== undefined) {
                        el.innerHTML = sanitizeContent(parsed[key]);
                    }
                });
            }
        } catch (e) {
            console.error('Error loading saved edits:', e);
        }
    };

    // Save current text & lasso offsets
    const saveEdits = (notify = true) => {
        try {
            const currentEdits = {};
            editableElements.forEach((el, index) => {
                const key = el.getAttribute('data-key') || `editable_${index}`;
                if (!key.startsWith('timer-')) {
                    currentEdits[key] = sanitizeContent(el.innerHTML);
                }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentEdits));
            if (typeof saveLassoOffsets === 'function') {
                saveLassoOffsets();
            }

            if (notify && btnSaveEdits) {
                const originalHtml = btnSaveEdits.innerHTML;
                btnSaveEdits.innerHTML = '<i class="fa-solid fa-check"></i> Disimpan!';
                btnSaveEdits.style.backgroundColor = '#25d366';
                btnSaveEdits.style.color = '#ffffff';
                setTimeout(() => {
                    btnSaveEdits.innerHTML = originalHtml;
                    btnSaveEdits.style.backgroundColor = '';
                    btnSaveEdits.style.color = '';
                }, 1600);
            }
        } catch (e) {
            console.error('Error saving edits:', e);
        }
    };

    // Reset to exact screen.png defaults & reset positions
    const resetEdits = () => {
        if (confirm('Kembalikan semua teks dan kedudukan asal?')) {
            localStorage.removeItem(STORAGE_KEY);
            editableElements.forEach((el, index) => {
                const key = el.getAttribute('data-key') || `editable_${index}`;
                if (defaultTexts[key] !== undefined) {
                    el.innerHTML = defaultTexts[key];
                }
            });
            if (typeof resetAllLassoOffsets === 'function') {
                resetAllLassoOffsets();
            }
            updateCountdown();
        }
    };

    // Toolbar dismiss & reopen
    if (btnDismissToolbar && editToolbar && btnReopenToolbar) {
        btnDismissToolbar.addEventListener('click', () => {
            editToolbar.classList.add('hidden');
            btnReopenToolbar.style.display = 'flex';
        });

        btnReopenToolbar.addEventListener('click', () => {
            editToolbar.classList.remove('hidden');
            btnReopenToolbar.style.display = 'none';
        });
    }

    if (btnSaveEdits) btnSaveEdits.addEventListener('click', () => saveEdits(true));
    if (btnResetEdits) btnResetEdits.addEventListener('click', resetEdits);

    // Auto-save on blur / input debounced
    let saveTimeout;
    editableElements.forEach(el => {
        el.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => saveEdits(false), 800);
        });
    });

    // Initialize saved content
    loadSavedEdits();

    // ==========================================
    // 9.5. Lasso Group Selection & Strict Y-Axis (Up/Down Only) Movement System
    // ==========================================
    const btnModeText = document.getElementById('btn-mode-text');
    const btnModeLasso = document.getElementById('btn-mode-lasso');
    const toolbarMoveControls = document.getElementById('toolbar-move-controls');
    const selectQuickGroup = document.getElementById('select-quick-group');
    const btnToolbarUp10 = document.getElementById('btn-toolbar-up-10');
    const btnToolbarUp = document.getElementById('btn-toolbar-up');
    const btnToolbarDown = document.getElementById('btn-toolbar-down');
    const btnToolbarDown10 = document.getElementById('btn-toolbar-down-10');
    const btnToolbarResetPos = document.getElementById('btn-toolbar-reset-pos');
    const toolbarYReadout = document.getElementById('toolbar-y-readout');

    const lassoBox = document.getElementById('lasso-box');
    const lassoController = document.getElementById('lasso-controller');
    const lassoYReadout = document.getElementById('lasso-y-readout');
    const btnLassoUp10 = document.getElementById('btn-lasso-up-10');
    const btnLassoUp2 = document.getElementById('btn-lasso-up-2');
    const btnLassoDown2 = document.getElementById('btn-lasso-down-2');
    const btnLassoDown10 = document.getElementById('btn-lasso-down-10');
    const btnLassoResetPos = document.getElementById('btn-lasso-reset-pos');
    const btnLassoClose = document.getElementById('btn-lasso-close');
    const lassoDragHandle = document.getElementById('lasso-drag-handle');
    const mobileContainer = document.querySelector('.mobile-container') || document.body;

    const LASSO_STORAGE_KEY = 'kad_kahwin_lasso_y_offsets';
    const defaultLassoOffsets = {
        "hero-title-group": -53,
        "hero-all-text": -15,
        "hero-fine-divider": -30,
        "hero-top-label": -16,
        "venue-info": 38
    };
    let currentLassoOffsets = Object.assign({}, defaultLassoOffsets);
    let isLassoMode = true; // Default to Lasso mode
    const selectedElements = new Set();

    // 1. Load saved offsets from localStorage
    const loadSavedLassoOffsets = () => {
        try {
            const saved = localStorage.getItem(LASSO_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                currentLassoOffsets = Object.assign({}, defaultLassoOffsets, parsed);
            } else {
                currentLassoOffsets = Object.assign({}, defaultLassoOffsets);
            }
            for (const moveId in currentLassoOffsets) {
                const offset = currentLassoOffsets[moveId];
                if (typeof offset === 'number' && offset !== 0) {
                    const targetEl = document.querySelector(`[data-move-id="${moveId}"]`);
                    if (targetEl) {
                        // STRICTLY Y-AXIS ONLY - NO HORIZONTAL DEVIATION
                        targetEl.style.transform = `translateY(${offset}px)`;
                    }
                }
            }
        } catch (e) {
            console.error('Error loading lasso offsets:', e);
        }
    };

    // 2. Save offsets to localStorage
    const saveLassoOffsets = () => {
        try {
            const pruned = {};
            for (const key in currentLassoOffsets) {
                if (currentLassoOffsets[key] !== 0) {
                    pruned[key] = currentLassoOffsets[key];
                }
            }
            localStorage.setItem(LASSO_STORAGE_KEY, JSON.stringify(pruned));
        } catch (e) {
            console.error('Error saving lasso offsets:', e);
        }
    };

    // 3. Reset all lasso offsets
    const resetAllLassoOffsets = () => {
        currentLassoOffsets = {};
        localStorage.removeItem(LASSO_STORAGE_KEY);
        document.querySelectorAll('[data-move-id]').forEach(el => {
            el.style.transform = '';
        });
        clearLassoSelection();
        updateYReadout(0);
    };

    // 4. Update Y readout badges (both toolbar and floating controller)
    const updateYReadout = (val) => {
        const num = Math.round(val || 0);
        const text = (num > 0 ? `+${num}` : `${num}`) + 'px';
        if (lassoYReadout) lassoYReadout.textContent = text;
        if (toolbarYReadout) toolbarYReadout.textContent = text;
    };

    // 5. Hierarchy deduplication: Keep topmost selected ancestors
    const deduplicateAncestors = (elements) => {
        const arr = Array.from(elements);
        return arr.filter(el => {
            let parent = el.parentElement;
            while (parent) {
                if (arr.includes(parent)) {
                    return false; // parent container is already selected
                }
                parent = parent.parentElement;
            }
            return true;
        });
    };

    // 6. Selection management
    const clearLassoSelection = () => {
        selectedElements.forEach(el => el.classList.remove('lasso-selected'));
        selectedElements.clear();
        if (lassoController) lassoController.style.display = 'none';
        if (selectQuickGroup) selectQuickGroup.value = '';
        updateYReadout(0);
    };

    const updateSelectionDisplay = () => {
        if (selectedElements.size === 0) {
            if (lassoController) lassoController.style.display = 'none';
            if (selectQuickGroup) selectQuickGroup.value = '';
            updateYReadout(0);
            return;
        }
        if (lassoController) lassoController.style.display = 'flex';
        const firstEl = Array.from(selectedElements)[0];
        const moveId = firstEl ? firstEl.getAttribute('data-move-id') : null;
        const currentY = moveId ? (currentLassoOffsets[moveId] || 0) : 0;
        updateYReadout(currentY);

        // Sync dropdown if matches
        if (selectQuickGroup && moveId) {
            const hasOption = selectQuickGroup.querySelector(`option[value="${moveId}"]`);
            if (hasOption) {
                selectQuickGroup.value = moveId;
            } else {
                selectQuickGroup.value = '';
            }
        }
    };

    const setLassoSelection = (elements, isAdditive = false) => {
        if (!isAdditive) {
            selectedElements.forEach(el => el.classList.remove('lasso-selected'));
            selectedElements.clear();
        }
        elements.forEach(el => {
            if (el) {
                selectedElements.add(el);
                el.classList.add('lasso-selected');
            }
        });
        updateSelectionDisplay();
    };

    // Fallback group helper: If no element is selected, pick the most relevant group
    const getActiveOrFallbackGroup = () => {
        if (selectedElements.size > 0) {
            return Array.from(selectedElements);
        }
        if (selectQuickGroup && selectQuickGroup.value) {
            const el = document.querySelector(`[data-move-id="${selectQuickGroup.value}"]`);
            if (el) return [el];
        }
        // Detect visible section
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY < 400) {
            const heroAll = document.querySelector('[data-move-id="hero-all-text"]') || document.querySelector('.hero-center-cluster');
            if (heroAll) return [heroAll];
        }
        // General fallback: hero-all-text
        const defaultHero = document.querySelector('[data-move-id="hero-all-text"]');
        return defaultHero ? [defaultHero] : [];
    };

    // Quick Select Group Dropdown
    if (selectQuickGroup) {
        selectQuickGroup.addEventListener('change', () => {
            const val = selectQuickGroup.value;
            if (!val) {
                clearLassoSelection();
                return;
            }
            const target = document.querySelector(`[data-move-id="${val}"]`);
            if (target) {
                setEditorMode('lasso');
                setLassoSelection([target], false);
                const rect = target.getBoundingClientRect();
                const inView = rect.top >= 60 && rect.bottom <= (window.innerHeight - 60);
                if (!inView) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    };

    // 7. Apply Y-Offset strictly to selected elements (deltaX = 0 locked)
    const applyYOffsetToSelection = (deltaY, isAbsolute = false) => {
        if (selectedElements.size === 0) {
            const fallback = getActiveOrFallbackGroup();
            if (fallback.length > 0) {
                setLassoSelection(fallback, false);
            } else {
                return;
            }
        }

        selectedElements.forEach(el => {
            const moveId = el.getAttribute('data-move-id');
            if (!moveId) return;

            let newY;
            if (isAbsolute) {
                newY = deltaY;
            } else {
                const currentY = currentLassoOffsets[moveId] || 0;
                newY = Math.round(currentY + deltaY);
            }

            currentLassoOffsets[moveId] = newY;

            // STRICTLY translateY only!
            if (newY === 0) {
                el.style.transform = '';
            } else {
                el.style.transform = `translateY(${newY}px)`;
            }
        });

        const firstEl = Array.from(selectedElements)[0];
        const firstId = firstEl ? firstEl.getAttribute('data-move-id') : null;
        const dispY = firstId ? (currentLassoOffsets[firstId] || 0) : 0;
        updateYReadout(dispY);

        saveLassoOffsets();
    };

    // 8. Mode switching (Text Edit vs Lasso Move)
    const setEditorMode = (mode) => {
        if (mode === 'lasso') {
            isLassoMode = true;
            if (btnModeLasso) btnModeLasso.classList.add('active');
            if (btnModeText) btnModeText.classList.remove('active');
            if (toolbarMoveControls) toolbarMoveControls.classList.remove('hidden');
            mobileContainer.classList.add('lasso-mode-active');
            editableElements.forEach(el => el.setAttribute('contenteditable', 'false'));
        } else {
            isLassoMode = false;
            if (btnModeText) btnModeText.classList.add('active');
            if (btnModeLasso) btnModeLasso.classList.remove('active');
            if (toolbarMoveControls) toolbarMoveControls.classList.add('hidden');
            mobileContainer.classList.remove('lasso-mode-active');
            clearLassoSelection();
            editableElements.forEach(el => el.setAttribute('contenteditable', 'true'));
        }
    };

    if (btnModeLasso) {
        btnModeLasso.addEventListener('click', () => setEditorMode('lasso'));
    }
    if (btnModeText) {
        btnModeText.addEventListener('click', () => setEditorMode('text'));
    }

    // Initialize mode to Lasso
    setEditorMode('lasso');

    // 9. Nudge Buttons (Toolbar + Floating Controller)
    // Top Toolbar Nudge Buttons
    if (btnToolbarUp) btnToolbarUp.addEventListener('click', () => applyYOffsetToSelection(-2));
    if (btnToolbarDown) btnToolbarDown.addEventListener('click', () => applyYOffsetToSelection(2));
    if (btnToolbarUp10) btnToolbarUp10.addEventListener('click', () => applyYOffsetToSelection(-10));
    if (btnToolbarDown10) btnToolbarDown10.addEventListener('click', () => applyYOffsetToSelection(10));
    if (btnToolbarResetPos) btnToolbarResetPos.addEventListener('click', () => applyYOffsetToSelection(0, true));

    // Floating Controller Nudge Buttons
    if (btnLassoUp10) btnLassoUp10.addEventListener('click', () => applyYOffsetToSelection(-10));
    if (btnLassoUp2) btnLassoUp2.addEventListener('click', () => applyYOffsetToSelection(-2));
    if (btnLassoDown2) btnLassoDown2.addEventListener('click', () => applyYOffsetToSelection(2));
    if (btnLassoDown10) btnLassoDown10.addEventListener('click', () => applyYOffsetToSelection(10));
    if (btnLassoResetPos) btnLassoResetPos.addEventListener('click', () => applyYOffsetToSelection(0, true));
    if (btnLassoClose) btnLassoClose.addEventListener('click', clearLassoSelection);

    // Keyboard support: ArrowUp, ArrowDown, Esc
    window.addEventListener('keydown', (e) => {
        if (!isLassoMode) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            applyYOffsetToSelection(e.shiftKey ? -10 : -2);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            applyYOffsetToSelection(e.shiftKey ? 10 : 2);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            clearLassoSelection();
        }
    });

    // 10. Direct Dragging of Selected Elements & Drag Handle
    let isDraggingElements = false;
    let dragStartY = 0;
    let initialSelectedOffsets = new Map();

    const startElementDrag = (clientY) => {
        if (selectedElements.size === 0) return;
        isDraggingElements = true;
        dragStartY = clientY;
        initialSelectedOffsets.clear();
        selectedElements.forEach(el => {
            const moveId = el.getAttribute('data-move-id');
            const startVal = moveId ? (currentLassoOffsets[moveId] || 0) : 0;
            initialSelectedOffsets.set(el, startVal);
        });
        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
    };

    const moveElementDrag = (clientY) => {
        if (!isDraggingElements) return;
        const deltaY = Math.round(clientY - dragStartY);
        selectedElements.forEach(el => {
            const moveId = el.getAttribute('data-move-id');
            if (!moveId) return;
            const baseVal = initialSelectedOffsets.get(el) || 0;
            const newY = baseVal + deltaY;
            currentLassoOffsets[moveId] = newY;
            // STRICTLY translateY only!
            if (newY === 0) {
                el.style.transform = '';
            } else {
                el.style.transform = `translateY(${newY}px)`;
            }
        });

        const firstEl = Array.from(selectedElements)[0];
        const firstId = firstEl ? firstEl.getAttribute('data-move-id') : null;
        const dispY = firstId ? (currentLassoOffsets[firstId] || 0) : 0;
        updateYReadout(dispY);
    };

    const endElementDrag = () => {
        if (!isDraggingElements) return;
        isDraggingElements = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        saveLassoOffsets();
    };

    if (lassoDragHandle) {
        lassoDragHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startElementDrag(e.clientY);
        });
        lassoDragHandle.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                e.stopPropagation();
                startElementDrag(e.touches[0].clientY);
            }
        }, { passive: true });
    }

    // 11. Lasso Marquee Selection & Direct Drag Initiation
    let isDrawingLasso = false;
    let lassoStartX = 0;
    let lassoStartY = 0;
    let lassoCurrentX = 0;
    let lassoCurrentY = 0;
    let isShiftSelection = false;

    const isExcludedTarget = (target) => {
        if (!target) return true;
        return !!target.closest('#edit-toolbar, #lasso-controller, #design-studio-panel, #main-bottom-nav, .section-resizer-bar, .drawer-overlay, .modal-overlay, #audio-overlay, .edit-reopen-badge, .studio-trigger-fab, button, a, select, input, textarea');
    };

    const onLassoPointerStart = (clientX, clientY, target, shiftKey) => {
        if (!isLassoMode) return;
        if (isExcludedTarget(target)) return;

        // Check if user clicked directly on or inside a movable item/group
        const movable = target.closest('.movable-item, .movable-group');
        if (movable) {
            // User interacted with a movable element -> Direct Drag!
            if (shiftKey) {
                if (selectedElements.has(movable)) {
                    movable.classList.remove('lasso-selected');
                    selectedElements.delete(movable);
                    updateSelectionDisplay();
                    return;
                } else {
                    setLassoSelection([movable], true);
                }
            } else {
                if (!selectedElements.has(movable)) {
                    setLassoSelection([movable], false);
                }
            }
            startElementDrag(clientY);
            return;
        }

        // Otherwise: User clicked on empty background -> Start Lasso Marquee drawing!
        isDrawingLasso = true;
        lassoStartX = clientX;
        lassoStartY = clientY;
        lassoCurrentX = clientX;
        lassoCurrentY = clientY;
        isShiftSelection = shiftKey;

        if (lassoBox) {
            lassoBox.style.left = `${clientX}px`;
            lassoBox.style.top = `${clientY}px`;
            lassoBox.style.width = '0px';
            lassoBox.style.height = '0px';
            lassoBox.style.display = 'block';
        }
    };

    const onLassoPointerMove = (clientX, clientY) => {
        if (isDraggingElements) {
            moveElementDrag(clientY);
            return;
        }

        if (!isDrawingLasso || !lassoBox) return;

        lassoCurrentX = clientX;
        lassoCurrentY = clientY;

        const left = Math.min(lassoStartX, lassoCurrentX);
        const top = Math.min(lassoStartY, lassoCurrentY);
        const width = Math.abs(lassoCurrentX - lassoStartX);
        const height = Math.abs(lassoCurrentY - lassoStartY);

        lassoBox.style.left = `${left}px`;
        lassoBox.style.top = `${top}px`;
        lassoBox.style.width = `${width}px`;
        lassoBox.style.height = `${height}px`;
    };

    const onLassoPointerEnd = (clientX, clientY) => {
        if (isDraggingElements) {
            endElementDrag();
            return;
        }

        if (!isDrawingLasso) return;
        isDrawingLasso = false;

        const left = Math.min(lassoStartX, lassoCurrentX);
        const top = Math.min(lassoStartY, lassoCurrentY);
        const width = Math.abs(lassoCurrentX - lassoStartX);
        const height = Math.abs(lassoCurrentY - lassoStartY);

        if (lassoBox) lassoBox.style.display = 'none';

        // Single tap/click on background (< 8px moved)
        if (width < 8 && height < 8) {
            if (!isShiftSelection) {
                clearLassoSelection();
            }
            return;
        }

        // Marquee intersection test
        const marqueeRect = {
            left,
            top,
            right: left + width,
            bottom: top + height,
            area: width * height
        };

        const allCandidates = document.querySelectorAll('.movable-item, .movable-group');
        const intersected = [];

        allCandidates.forEach(cand => {
            const rect = cand.getBoundingClientRect();
            const candArea = rect.width * rect.height;
            const isOutside = rect.right < marqueeRect.left ||
                              rect.left > marqueeRect.right ||
                              rect.bottom < marqueeRect.top ||
                              rect.top > marqueeRect.bottom;

            if (!isOutside) {
                // If candidate completely encloses the marquee box and is more than twice as large,
                // ignore the giant outer container so that inner items are selected instead!
                const completelyEncloses = rect.left <= marqueeRect.left &&
                                           rect.right >= marqueeRect.right &&
                                           rect.top <= marqueeRect.top &&
                                           rect.bottom >= marqueeRect.bottom;
                if (completelyEncloses && candArea > marqueeRect.area * 2.2) {
                    return; // Skip outer container wrapper
                }
                intersected.push(cand);
            }
        });

        const finalSelection = deduplicateAncestors(intersected);
        if (finalSelection.length > 0) {
            setLassoSelection(finalSelection, isShiftSelection);
        } else if (!isShiftSelection) {
            clearLassoSelection();
        }
    };

    // Attach pointer listeners to window & document
    document.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Left click only
        if (isLassoMode && !isExcludedTarget(e.target)) {
            e.preventDefault();
        }
        onLassoPointerStart(e.clientX, e.clientY, e.target, e.shiftKey);
    });

    window.addEventListener('mousemove', (e) => {
        onLassoPointerMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', (e) => {
        onLassoPointerEnd(e.clientX, e.clientY);
    });

    // Touch events for mobile/tablet with smooth vertical dragging
    document.addEventListener('touchstart', (e) => {
        if (!isLassoMode) return;
        if (e.touches.length === 1) {
            const t = e.touches[0];
            if (!isExcludedTarget(e.target)) {
                if (e.cancelable) e.preventDefault();
                onLassoPointerStart(t.clientX, t.clientY, e.target, false);
            }
        }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (isDraggingElements || isDrawingLasso) {
            if (e.cancelable) e.preventDefault();
            if (e.touches && e.touches.length === 1) {
                const t = e.touches[0];
                onLassoPointerMove(t.clientX, t.clientY);
            }
        }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
        const t = e.changedTouches ? e.changedTouches[0] : null;
        if (t) {
            onLassoPointerEnd(t.clientX, t.clientY);
        }
    });

    // Load saved positions on startup
    loadSavedLassoOffsets();

    // ==========================================
    // 10. Design Studio & Visual Drag Resizing
    // ==========================================
    const studioPanel = document.getElementById('design-studio-panel');
    const btnOpenStudio = document.getElementById('btn-open-studio');
    const btnCloseStudio = document.getElementById('btn-close-studio');
    const studioTabBtns = document.querySelectorAll('.studio-tab-btn');
    const studioTabContents = document.querySelectorAll('.studio-tab-content');
    const studioSliders = document.querySelectorAll('.studio-slider');
    const studioSelects = document.querySelectorAll('.studio-select');
    const btnSaveStudio = document.getElementById('btn-save-studio');
    const btnCopyCss = document.getElementById('btn-copy-css');
    const btnResetStudio = document.getElementById('btn-reset-studio');
    const resizerBars = document.querySelectorAll('.section-resizer-bar');

    const LAYOUT_STORAGE_KEY = 'kad_kahwin_layout_settings';

    // Factory layout defaults with granular background image scaling and positioning
    const layoutDefaults = {
        '--card-max-width': '427px',
        // Hero S1
        '--s1-padding-top': '84px',
        '--s1-padding-bottom': '84px',
        '--s1-bg-scale-x': '100%',
        '--s1-bg-scale-y': '100%',
        '--s1-bg-pos-x': 'center',
        '--s1-bg-pos-y': '0px',
        // Jemputan S1.5
        '--s15-min-height': '1022px',
        '--s15-padding-top': '165px',
        '--s15-padding-bottom': '140px',
        '--s15-bg-scale-x': '100%',
        '--s15-bg-scale-y': '100%',
        '--s15-bg-pos-x': 'center',
        '--s15-bg-pos-y': '0px',
        // Hitung Hari S2
        '--s2-min-height': '899px',
        '--s2-padding-top': '78px',
        '--s2-spacer-height': '140px',
        '--s2-padding-bottom': '40px',
        '--s2-bg-scale-x': '100%',
        '--s2-bg-scale-y': '100%',
        '--s2-bg-pos-x': 'center',
        '--s2-bg-pos-y': '0px',
        // Lokasi S3
        '--s3-min-height': '1022px',
        '--s3-padding-top': '175px',
        '--s3-map-height': '215px',
        '--s3-padding-bottom': '120px',
        '--s3-bg-scale-x': '100%',
        '--s3-bg-scale-y': '100%',
        '--s3-bg-pos-x': 'center',
        '--s3-bg-pos-y': '0px',
        // RSVP S4
        '--s4-min-height': '898px',
        '--s4-padding-top': '165px',
        '--s4-padding-bottom': '24px',
        '--s4-bg-scale-x': '100%',
        '--s4-bg-scale-y': '100%',
        '--s4-bg-pos-x': 'center',
        '--s4-bg-pos-y': '0px',
        // Footer
        '--footer-bg-scale-x': '100%',
        '--footer-bg-scale-y': '100%',
        '--footer-bg-pos-x': 'center',
        '--footer-bg-pos-y': '0px'
    };

    // Open/Close Studio
    if (btnOpenStudio && studioPanel) {
        btnOpenStudio.addEventListener('click', () => {
            studioPanel.classList.toggle('minimized');
        });
    }

    if (btnCloseStudio && studioPanel) {
        btnCloseStudio.addEventListener('click', () => {
            studioPanel.classList.add('minimized');
        });
    }

    // Tabs switching
    studioTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            studioTabBtns.forEach(b => b.classList.remove('active'));
            studioTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Update CSS variable, badge readouts, and synced inputs
    const updateVariable = (varName, value, unit = '') => {
        let defaultUnit = unit;
        if (!defaultUnit && !isNaN(value)) {
            if (varName.includes('scale')) defaultUnit = '%';
            else if (varName.includes('height') || varName.includes('padding') || varName.includes('pos-y') || varName.includes('pos-x') || varName.includes('width')) {
                defaultUnit = 'px';
            }
        }

        const fullVal = isNaN(value) ? value : `${value}${defaultUnit}`;
        document.documentElement.style.setProperty(varName, fullVal);

        // Update exact badge
        const badge = document.getElementById(`val-${varName}`) || document.getElementById(`val-${varName.replace('--', '')}`);
        if (badge) badge.textContent = fullVal;

        // Update slider input if exists
        const slider = document.querySelector(`.studio-slider[data-var="${varName}"]`);
        if (slider && !isNaN(value)) slider.value = value;

        // Update select dropdown if exists
        const select = document.querySelector(`.studio-select[data-var="${varName}"]`);
        if (select) select.value = value;
    };

    // Standard Slider inputs
    studioSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const varName = slider.getAttribute('data-var');
            if (varName) {
                updateVariable(varName, e.target.value);
            }
        });
    });

    // Zoom Sliders (changes both width and height scale proportionally)
    const zoomSliders = document.querySelectorAll('.zoom-slider');
    zoomSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const prefix = slider.getAttribute('data-prefix'); // e.g. '--s15'
            const val = e.target.value;
            updateVariable(`${prefix}-bg-scale-x`, val, '%');
            updateVariable(`${prefix}-bg-scale-y`, val, '%');

            const zoomBadge = document.getElementById(`val-zoom-${prefix.replace('--', '')}`);
            if (zoomBadge) zoomBadge.textContent = `${val}%`;

            // Clear active preset buttons in the same tab
            const tabContent = slider.closest('.studio-tab-content');
            if (tabContent) {
                tabContent.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            }
        });
    });

    // Quick Preset Buttons (Buang Putih, Fit, Cover)
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prefix = btn.getAttribute('data-prefix');
            const parentRow = btn.closest('.quick-preset-row');
            if (parentRow) parentRow.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.getAttribute('data-zoom')) {
                const zoomVal = btn.getAttribute('data-zoom');
                updateVariable(`${prefix}-bg-scale-x`, zoomVal, '%');
                updateVariable(`${prefix}-bg-scale-y`, zoomVal, '%');
                const zoomSlider = document.querySelector(`.zoom-slider[data-prefix="${prefix}"]`);
                if (zoomSlider) zoomSlider.value = zoomVal;
                const zoomBadge = document.getElementById(`val-zoom-${prefix.replace('--', '')}`);
                if (zoomBadge) zoomBadge.textContent = `${zoomVal}%`;
            }

            if (btn.hasAttribute('data-y')) {
                const yVal = btn.getAttribute('data-y');
                updateVariable(`${prefix}-bg-pos-y`, yVal, 'px');
            }

            if (btn.getAttribute('data-mode') === 'cover') {
                updateVariable(`${prefix}-bg-scale-x`, 'cover', '');
                updateVariable(`${prefix}-bg-scale-y`, 'cover', '');
                const zoomBadge = document.getElementById(`val-zoom-${prefix.replace('--', '')}`);
                if (zoomBadge) zoomBadge.textContent = 'Cover';
            }
        });
    });

    // Nudge Micro-Adjustment Buttons (1px - 2px precision)
    const nudgeBtns = document.querySelectorAll('.nudge-btn');
    nudgeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const varName = btn.getAttribute('data-var');
            const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
            const currentVal = parseInt(getComputedStyle(document.documentElement).getPropertyValue(varName).trim(), 10) || 0;
            const newVal = currentVal + delta;
            updateVariable(varName, newVal, 'px');
        });
    });

    // Interactive Alt+Drag on any section to nudge background image position
    const contentSections = document.querySelectorAll('.screen-page, .site-royal-footer-card');
    contentSections.forEach(sec => {
        const id = sec.id;
        let prefix = '';
        if (id === 'screen-hero') prefix = '--s1';
        else if (id === 'screen-invitation-details') prefix = '--s15';
        else if (id === 'screen-countdown') prefix = '--s2';
        else if (id === 'screen-location') prefix = '--s3';
        else if (id === 'screen-rsvp') prefix = '--s4';
        else if (sec.classList.contains('site-royal-footer-card')) prefix = '--footer';

        if (!prefix) return;

        let isNudging = false;
        let startY = 0;
        let initialPosY = 0;

        sec.addEventListener('mousedown', (e) => {
            if (e.altKey || e.shiftKey) {
                e.preventDefault();
                isNudging = true;
                startY = e.clientY;
                initialPosY = parseInt(getComputedStyle(document.documentElement).getPropertyValue(`${prefix}-bg-pos-y`).trim(), 10) || 0;
                document.body.style.cursor = 'ns-resize';
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (!isNudging) return;
            const deltaY = Math.round(e.clientY - startY);
            updateVariable(`${prefix}-bg-pos-y`, initialPosY + deltaY, 'px');
        });

        window.addEventListener('mouseup', () => {
            if (isNudging) {
                isNudging = false;
                document.body.style.cursor = '';
                saveLayoutSettings();
            }
        });
    });

    // Select dropdowns
    studioSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const varName = select.getAttribute('data-var');
            if (varName) {
                updateVariable(varName, e.target.value, '');
            }
        });
    });

    // Save layout settings
    const saveLayoutSettings = () => {
        const currentSettings = {};
        for (const key in layoutDefaults) {
            const val = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
            if (val) currentSettings[key] = val;
        }
        localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(currentSettings));

        if (btnSaveStudio) {
            const orig = btnSaveStudio.innerHTML;
            btnSaveStudio.innerHTML = '<i class="fa-solid fa-check"></i> Disimpan!';
            btnSaveStudio.style.backgroundColor = '#25d366';
            setTimeout(() => {
                btnSaveStudio.innerHTML = orig;
                btnSaveStudio.style.backgroundColor = '';
            }, 1500);
        }
    };

    if (btnSaveStudio) btnSaveStudio.addEventListener('click', saveLayoutSettings);

    // Copy CSS button
    if (btnCopyCss) {
        btnCopyCss.addEventListener('click', () => {
            let cssCode = ':root {\n';
            for (const key in layoutDefaults) {
                const val = getComputedStyle(document.documentElement).getPropertyValue(key).trim() || layoutDefaults[key];
                cssCode += `    ${key}: ${val};\n`;
            }
            cssCode += '}';

            navigator.clipboard.writeText(cssCode).then(() => {
                const orig = btnCopyCss.innerHTML;
                btnCopyCss.innerHTML = '<i class="fa-solid fa-check"></i> Disalin!';
                setTimeout(() => {
                    btnCopyCss.innerHTML = orig;
                }, 1500);
            }).catch(() => {
                alert('Gagal menyalin. Sila salin secara manual.');
            });
        });
    }

    // Reset layout settings
    if (btnResetStudio) {
        btnResetStudio.addEventListener('click', () => {
            if (confirm('Kembalikan semua saiz dan jarak kepada nilai asal?')) {
                localStorage.removeItem(LAYOUT_STORAGE_KEY);
                for (const key in layoutDefaults) {
                    const defaultVal = layoutDefaults[key];
                    const numVal = parseInt(defaultVal, 10);
                    let unit = '';
                    if (defaultVal.includes('%')) unit = '%';
                    else if (defaultVal.includes('px')) unit = 'px';
                    updateVariable(key, isNaN(numVal) ? defaultVal : numVal, unit);
                }
            }
        });
    }

    // Load saved layout settings
    const loadSavedLayout = () => {
        try {
            const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                for (const key in parsed) {
                    const val = parsed[key];
                    const numVal = parseInt(val, 10);
                    let unit = '';
                    if (val.includes('%')) unit = '%';
                    else if (val.includes('px')) unit = 'px';
                    updateVariable(key, isNaN(numVal) ? val : numVal, unit);
                }
            }
        } catch (e) {
            console.error('Error loading layout settings:', e);
        }
    };

    // Direct Drag-To-Resize for Sections
    resizerBars.forEach(bar => {
        const varName = bar.getAttribute('data-var');
        let isDragging = false;
        let startY = 0;
        let startHeight = 0;
        const parentSection = bar.closest('section');

        const onStart = (clientY) => {
            isDragging = true;
            startY = clientY;
            startHeight = parentSection ? parentSection.offsetHeight : 1000;
            bar.classList.add('dragging');
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
        };

        const onMove = (clientY) => {
            if (!isDragging) return;
            const deltaY = clientY - startY;
            const newHeight = Math.max(650, Math.min(1600, Math.round(startHeight + deltaY)));
            updateVariable(varName, newHeight, 'px');
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            bar.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            saveLayoutSettings();
        };

        bar.addEventListener('mousedown', (e) => {
            e.preventDefault();
            onStart(e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) onMove(e.clientY);
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) onEnd();
        });

        // Touch support for mobile dragging
        bar.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                onStart(e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                onMove(e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if (isDragging) onEnd();
        });
    });

    // Initialize layout
    loadSavedLayout();
});
