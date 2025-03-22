// index.js
document.addEventListener("DOMContentLoaded", () => {
    const practiceCheckboxes = document.querySelectorAll("#best-practices-section input[type='checkbox']");
    const resetBtn = document.getElementById("resetBtn");
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

    // 重置按钮事件：清空 localStorage 并刷新页面
    resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset all selections?")) {
            localStorage.clear();
            location.reload(); // 页面刷新
        }
    });
});
