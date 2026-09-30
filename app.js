/* =========================================================
   ICT461 Registration Form – app.js
   Handles: validation, submit interaction, status messages
   ========================================================= */

console.log("App.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const status = document.getElementById("formStatus");

    /* ---------- Field validation rules ---------- */
    const rules = {
        studentId: v => /^[0-9]{9}$/.test(v) || "Student ID must be exactly 9 digits.",
        fullName:  v => v.trim().length >= 3      || "Full name must be at least 3 characters.",
        email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
        phone:     v => v === "" || /^[0-9]{10}$/.test(v)     || "Phone must be 10 digits.",
        programme: v => v !== ""                  || "Please select your programme.",
        yearOfStudy: v => v !== ""                || "Please select your year of study.",
        semester:  v => v !== ""                  || "Please select a semester.",
        terms:     v => v === true                || "You must accept the registration terms."
    };

    /* ---------- Validate a single field ---------- */
    function validateField(name) {
        const input = form.elements[name];
        if (!input) return true;

        const value = input.type === "checkbox" ? input.checked : input.value;
        const result = rules[name] ? rules[name](value) : true;

        const group = input.closest(".form-group") || input.parentElement;
        const errorEl = document.getElementById(name + "Error");

        if (result === true) {
            group.classList.remove("invalid");
            if (errorEl) errorEl.textContent = "";
            return true;
        } else {
            group.classList.add("invalid");
            if (errorEl) errorEl.textContent = result;
            return false;
        }
    }

    /* ---------- Validate elective radio group ---------- */
    function validateElective() {
        const chosen = form.querySelector('input[name="elective"]:checked');
        const errorEl = document.getElementById("electiveError");
        const group = form.querySelector(".radio-group");

        if (chosen) {
            group.classList.remove("invalid");
            errorEl.textContent = "";
            return true;
        } else {
            group.classList.add("invalid");
            errorEl.textContent = "Please choose one elective module.";
            return false;
        }
    }

    /* ---------- Live validation on blur ---------- */
    Object.keys(rules).forEach(name => {
        const input = form.elements[name];
        if (!input) return;
        const evt = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "blur";
        input.addEventListener(evt, () => validateField(name));
    });

    /* ---------- Submit handler (THE JS interaction) ---------- */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;
        Object.keys(rules).forEach(name => {
            if (!validateField(name)) isValid = false;
        });
        if (!validateElective()) isValid = false;

        if (!isValid) {
            status.className = "form-status error";
            status.textContent = "❌ Please fix the highlighted fields before submitting.";
            // Focus the first invalid field for keyboard users
            const firstInvalid = form.querySelector(".invalid input, .invalid select, .invalid textarea");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Success
        const data = Object.fromEntries(new FormData(form).entries());
        console.log("Submitted registration:", data);

        status.className = "form-status success";
        status.textContent = `✅ Registration submitted successfully for ${data.fullName} (${data.studentId}).`;

        form.reset();
        // Re-check the compulsory module (reset() unchecks "checked" defaults on some browsers)
        document.getElementById("ict461").checked = true;
    });

    /* ---------- Reset clears messages ---------- */
    form.addEventListener("reset", () => {
        form.querySelectorAll(".form-group, .radio-group").forEach(g => g.classList.remove("invalid"));
        form.querySelectorAll(".error-message").forEach(e => e.textContent = "");
        status.className = "form-status";
        status.textContent = "";
    });
});