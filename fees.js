/* =========================================================
   ICT461 Registration Form – fees.js
   Handles: live fee calculation based on elective choice
   ========================================================= */

console.log("Fees.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const feeBox = document.getElementById("feeSummary");
    const electives = document.querySelectorAll('input[name="elective"]');

    // Compulsory ICT461 base fee (adjust as needed)
    const BASE_FEE = 800;

    function formatZmw(amount) {
        return "K" + amount.toLocaleString("en-ZM", { minimumFractionDigits: 2 });
    }

    function updateFees() {
        const chosen = document.querySelector('input[name="elective"]:checked');

        if (!chosen) {
            feeBox.innerHTML = "<p>Select an elective module to see your total fees.</p>";
            return;
        }

        const electiveFee = Number(chosen.dataset.fee) || 0;
        const total = BASE_FEE + electiveFee;

        feeBox.innerHTML = `
            <p><strong>ICT461 (Compulsory):</strong> ${formatZmw(BASE_FEE)}</p>
            <p><strong>${chosen.value} (Elective):</strong> ${formatZmw(electiveFee)}</p>
            <hr>
            <p><strong>Total Registration Fee:</strong> ${formatZmw(total)}</p>
        `;
    }

    electives.forEach(radio => radio.addEventListener("change", updateFees));

    // Initial paint
    updateFees();
});