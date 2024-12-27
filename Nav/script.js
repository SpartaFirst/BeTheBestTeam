const weatherId = document.getElementById("weather");
console.log(weatherId);

const locSection = document.querySelector(".loc");
const tempSection = document.querySelector(".temp");

// 버튼 클릭 JS
document.addEventListener("DOMContentLoaded", function () {
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
  )
    .then((response) => {
      return response.json(); // fetch()를 사용하면 응답 데이터를 JSON으로 인코딩해야 사용 가능
    })
    .then((json) => {
      // json 데이터 가져오기
      console.log(json);
      const locSection = json.name;
      const tempSection = json.main.temp;

      const locHtml = document.getElementsByClassName("loc")[0];
      const tempHtml = document.getElementsByClassName("temp")[0];

      locHtml.innerText = locSection;
      tempHtml.innerText = tempSection;
    })
    .catch((error) => {
      // 에러 처리
      alert(error);
    });
}

// # id, . class
const asdf = document.querySelector("#weather");
console.log(asdf);
