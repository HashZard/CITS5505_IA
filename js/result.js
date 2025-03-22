document.addEventListener("DOMContentLoaded", () => {
    const practiceIds = [
        "html1", "html2", "html3", "html4", "html5",
        "css1", "css2", "css3", "css4", "css5",
        "js1", "js2", "js3", "js4", "js5"
    ];

    const total = practiceIds.length;
    const selected = countSelectedPractices(practiceIds);
    const percentage = Math.round((selected / total) * 100);

    displaySummary(selected, total, percentage);
    drawPieChart(document.getElementById("pieChart"), selected, total);

    if (selected >= 12) {
        document.getElementById("success-section").classList.remove("hidden");
        loadAnimalImage("animal-container");
    }
});

// Count selected items in localStorage
function countSelectedPractices(practiceIds) {
    let count = 0;
    practiceIds.forEach(id => {
        if (localStorage.getItem(id) === "true") {
            count++;
        }
    });
    return count;
}

// display Summary Text
function displaySummary(selected, total, percentage) {
    const textSummary = document.getElementById("text-summary");
    const percentageDisplay = document.getElementById("percentage-display");

    if (textSummary) {
        textSummary.textContent = `You have selected ${selected} out of ${total} best practices.`;
    }

    if (percentageDisplay) {
        percentageDisplay.textContent = `This is ${percentage}% of the total best practices.`;
    }
}

// draw Canvas Pie Chart
function drawPieChart(canvas, selected, total) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    const selectedRatio = selected / total;
    const selectedAngle = selectedRatio * 2 * Math.PI;

    // Green part (completed)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, selectedAngle);
    ctx.fillStyle = "#4CAF50";
    ctx.fill();

    // Gray part (remaining)
    if (selected < total) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, selectedAngle, 2 * Math.PI);
        ctx.fillStyle = "#ccc";
        ctx.fill();
    }
}

// Load random animal image
function loadAnimalImage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            const img = document.createElement("img");
            img.src = data.message;
            img.alt = "Cute Animal";
            img.classList.add("img-fluid", "mt-3");
            container.innerHTML = '';
            container.appendChild(img);
        })
        .catch(error => {
            console.error("Animal image fetch failed:", error);
            container.innerHTML = "<p class='text-danger'>Failed to load image.</p>";
        });
}
