// ---------------------------
// BOOKING MODAL
// ---------------------------
const bookingModal = document.getElementById("bookingModal");
const openBooking = document.getElementById("openBooking");
const closeBooking = document.getElementById("closeBooking");

if (openBooking) {
    openBooking.addEventListener("click", () => {
        bookingModal.classList.add("open");
    });
}

if (closeBooking) {
    closeBooking.addEventListener("click", () => {
        bookingModal.classList.remove("open");
    });
}

// Close modal if clicking outside
if (bookingModal) {
    bookingModal.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove("open");
        }
    });
}


// ---------------------------
// AUTO AVAILABILITY GENERATOR
// ---------------------------

// Weekly teaching schedule (EDITABLE BY JACOB)
const weeklySchedule = {
    1: ["9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"], // Monday
    2: ["9:00 AM", "10:00 AM", "1:00 PM"],           // Tuesday
    3: ["11:00 AM", "2:00 PM"],                      // Wednesday
    4: ["9:00 AM", "1:00 PM", "4:00 PM"],            // Thursday
    5: ["9:00 AM", "12:00 PM"],                      // Friday
    6: ["10:00 AM", "11:00 AM"],                     // Saturday
    0: []                                            // Sunday off
};

// Generate next 30 days availability
const availability = {};

function generateNext30DaysAvailability() {
    const today = new Date();

    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);

        const day = d.getDay();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");

        const key = `${yyyy}-${mm}-${dd}`;

        availability[key] = weeklySchedule[day]
            ? [...weeklySchedule[day]]
            : [];
    }
}

generateNext30DaysAvailability();


// ---------------------------
// DATE → TIME SLOT UI (BUTTONS)
// ---------------------------
const lessonDate = document.getElementById("lessonDate");
const timeSlotsContainer = document.getElementById("timeSlots");
const selectedTimeInput = document.getElementById("selectedTime");

if (lessonDate && timeSlotsContainer) {
    lessonDate.addEventListener("change", () => {
        const selectedDate = lessonDate.value;
        const slots = availability[selectedDate] || [];

        timeSlotsContainer.innerHTML = "";

        if (slots.length === 0) {
            timeSlotsContainer.innerHTML =
                '<p class="time-placeholder">No availability</p>';
            return;
        }

        slots.forEach(time => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "time-slot-btn";
            btn.textContent = time;

            btn.addEventListener("click", () => {
                // remove previous selection
                document.querySelectorAll(".time-slot-btn")
                    .forEach(b => b.classList.remove("selected"));

                // mark selected
                btn.classList.add("selected");

                // store value for form submit
                selectedTimeInput.value = time;
            });

            timeSlotsContainer.appendChild(btn);
        });
    });
}


// ---------------------------
// REMOVE BOOKED SLOT
// ---------------------------
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", () => {
        const date = lessonDate.value;
        const time = timeSlots.value;

        if (availability[date]) {
            availability[date] = availability[date].filter(t => t !== time);
        }
    });
}
