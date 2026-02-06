function getWeather(lat, lon) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const w = data.current_weather;
      document.getElementById("temparatureText").innerHTML ='<img src="assets/img/icon/header_icon.png" alt="">'+ w.temperature + "°C, " + w.windspeed + " km/h";
      document.getElementById("dateText").innerHTML = '<img src="assets/img/icon/header_icon1.png" alt="">' + new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    });
}

window.addEventListener("load", () => {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported");
    return;
  }

  // 🔔 This line triggers the permission prompt
  navigator.geolocation.getCurrentPosition(
    pos => getWeather(pos.coords.latitude, pos.coords.longitude),
    err => {
      console.warn("Location denied or unavailable", err);
      // fallback city
      getWeather(-26.2041, 28.0473);
    }
  );
});
