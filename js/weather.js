document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-31.95&longitude=115.86&current_weather=true&hourly=uv_index")
        .then(res => res.json())
        .then(data => {
            const current = data.current_weather;
            const hourly = data.hourly;

            const temp = current.temperature;
            const wind = current.windspeed;

            // 获取当前整点UV Index
            const now = new Date();
            const todayStr = now.toISOString().split("T")[0];
            const hour = now.getHours().toString().padStart(2, "0");
            const lookupTime = `${todayStr}T${hour}:00`;

            const uvIndexPos = hourly.time.indexOf(lookupTime);
            let uv = uvIndexPos >= 0 ? hourly.uv_index[uvIndexPos] : 0;
            if (uv === undefined || uv === null) uv = 0;

            // 动态更新UI
            document.getElementById("weather-temp").textContent = `${temp} °C`;
            document.getElementById("weather-wind").textContent = `${wind} km/h`;
            document.getElementById("weather-uv").textContent = uv;
        })
        .catch(err => {
            document.getElementById("weather-modules").innerHTML =
                "<p class='text-danger'>Failed to load weather data.</p>";
            console.error("AJAX error:", err);
        });
});