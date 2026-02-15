// Booking modal
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

// Availability (temporary — will be replaced by Google Calendar API)
const availability = {
    "2026-02-20": ["9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"],
    "2026-02-21": ["11:00 AM", "12:00 PM"],
    "2026-02-22": ["9:00 AM", "2:00 PM", "4:00 PM"]
};

const lessonDate = document.getElementById("lessonDate");
const timeSlots = document.getElementById("timeSlots");
const selectedTimeInput = document.getElementById("selectedTime");

if (lessonDate) {
    lessonDate.addEventListener("change", () => {
        const selectedDate = lessonDate.value;
        const slots = availability[selectedDate] || [];

        timeSlots.innerHTML = "";

        if (slots.length === 0) {
            timeSlots.innerHTML = "<p class='time-placeholder'>No times available</p>";
            return;
        }

        slots.forEach(time => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = time;
            btn.className = "time-slot-btn";

            btn.addEventListener("click", () => {
                document.querySelectorAll(".time-slot-btn")
                    .forEach(b => b.classList.remove("selected"));

                btn.classList.add("selected");
                selectedTimeInput.value = time;
            });

            timeSlots.appendChild(btn);
        });
    });
}
bookingModal.addEventListener("click", (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove("open");
    }
});