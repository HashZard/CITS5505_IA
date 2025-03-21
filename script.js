// script.js

document.addEventListener("DOMContentLoaded", () => {
  const isIndexPage = document.body.contains(document.getElementById("best-practices-section"));
  const isResultsPage = document.body.contains(document.getElementById("result-summary"));

  // ===== 如果是 Best Practices Page (index.html) =====
  if (isIndexPage) {
    const practiceCheckboxes = document.querySelectorAll("#best-practices-section input[type='checkbox']");
    const submitBtn = document.getElementById("submitBtn");

    // 初始化复选框选中状态
    practiceCheckboxes.forEach(checkbox => {
      const savedValue = localStorage.getItem(checkbox.id);
      if (savedValue === "true") {
        checkbox.checked = true;
      }
      // 监听复选框变化并更新 localStorage
      checkbox.addEventListener("change", () => {
        localStorage.setItem(checkbox.id, checkbox.checked.toString());
      });
    });

    // 点击提交按钮跳转到 results.html
    submitBtn.addEventListener("click", () => {
      window.location.href = "results.html";
    });
  }

  // ===== 如果是 Results Page (results.html) =====
  if (isResultsPage) {
    const textSummary = document.getElementById("text-summary");
    const successSection = document.getElementById("success-section");
    const animalContainer = document.getElementById("animal-container");
    const pieChartCanvas = document.getElementById("pieChart");
    const percentageDisplay = document.getElementById("percentage-display");

    // 与 index 页面对应的勾选项 (15项)
    const practiceIds = [
      "html1", "html2", "html3", "html4", "html5",
      "css1", "css2", "css3", "css4", "css5",
      "js1", "js2", "js3", "js4", "js5"
    ];
    const totalPractices = practiceIds.length;
    let selectedCount = 0;

    // 读取 localStorage，统计选中数量
    practiceIds.forEach(id => {
      const val = localStorage.getItem(id);
      if (val === "true") {
        selectedCount++;
      }
    });

    // 计算百分比
    const percentage = Math.round((selectedCount / totalPractices) * 100);

    // 更新文本
    textSummary.textContent = `You have selected ${selectedCount} out of ${totalPractices} best practices.`;

    // 显示百分比
    percentageDisplay.textContent = `This is ${percentage}% of the total best practices.`;

    // 画饼状图
    drawPieChart(pieChartCanvas, selectedCount, totalPractices);

    // 判断成功标准：12/15
    if (selectedCount >= 12) {
      successSection.classList.remove("hidden");
      fetchRandomAnimal(animalContainer);
    }
  }
});

// 绘制饼状图函数 (原生 canvas)
function drawPieChart(canvas, selectedCount, total) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  // 背景清除
  ctx.clearRect(0, 0, width, height);

  // 计算选中的比例
  const selectedRatio = selectedCount / total;
  const selectedAngle = selectedRatio * 2 * Math.PI;

  // 绘制选中的扇形 (绿色)
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, 0, selectedAngle, false);
  ctx.fillStyle = "#4CAF50";
  ctx.fill();

  // 绘制剩余扇形 (灰色)
  if (selectedCount < total) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, selectedAngle, 2 * Math.PI, false);
    ctx.fillStyle = "#ccc";
    ctx.fill();
  }
}

// AJAX获取随机狗狗图片
function fetchRandomAnimal(container) {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
      const img = document.createElement("img");
      img.src = data.message;
      img.alt = "Cute Animal";
      container.innerHTML = "";
      container.appendChild(img);
    })
    .catch(error => {
      console.error("Error fetching animal image:", error);
    });
}
