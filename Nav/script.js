const weatherId = document.getElementById("weather");
console.log(weatherId);

// 버튼 클릭 JS
weatherId.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(success);
});

// API호출 // 위도, 경도 받아오기
const API_KEY = "1396f5d3ad9dbaf5a390f92238b581a0";
const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeather(latitude, longitude); // 여기 담음
};

// const getWeather = (lat, lon) => {
//     fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
//     );
// };

// 담은거 여기 토스
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  ).then((response) => {
    return response.json(); // fetch()를 사용하면 응답 데이터를 JSON으로 인코딩해야 사용 가능
  });
}

// json 데이터 가져오기
const getWeather = (lat, lon) => {
    
.then((json) => {
    console.log(json);
  });
};

// 에러 처리
const getWeather = (lat, lon) => {
 .catch((error) => {
    alert(error);
  });
};