// index.js
document.addEventListener("DOMContentLoaded", () => {
    const practiceCheckboxes = document.querySelectorAll("#best-practices-section input[type='checkbox']");
    const resetBtn = document.getElementById("resetBtn");
    const submitBtn = document.getElementById("submitBtn");

    // init checkbox state
    practiceCheckboxes.forEach(checkbox => {
        const savedValue = localStorage.getItem(checkbox.id);
        if (savedValue === "true") {
            checkbox.checked = true;
        }
        // listen to checkbox change event and update localStorage
        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkbox.id, checkbox.checked.toString());
        });
    });

    // click submit button to navigate to results.html
    submitBtn.addEventListener("click", () => {
        window.location.href = "results.html";
    });

    // reset button event: clear localStorage and reload the page
    resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset all selections?")) {
            localStorage.clear();
            location.reload(); // reload the page
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedCountSpan = document.getElementById("checked-count");
    const totalCountSpan = document.getElementById("total-count");

    // init total count
    totalCountSpan.textContent = checkboxes.length;

    function updateCount() {
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        checkedCountSpan.textContent = checked;
    }

    updateCount();

    checkboxes.forEach(cb => cb.addEventListener('change', updateCount));
});