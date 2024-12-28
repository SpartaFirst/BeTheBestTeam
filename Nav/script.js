// 성공적으로 위치 정보를 얻은 후 호출되는 함수
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    getWeather(latitude, longitude); // 위도, 경도를 넘겨서 날씨 정보를 가져옵니다.
};

// 날씨 API 호출 함수
function getWeather(lat, lon) {
    const API_KEY = '1396f5d3ad9dbaf5a390f92238b581a0';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
        .then((response) => response.json()) // 응답 데이터를 JSON으로 변환
        .then((json) => {
            // 날씨 데이터를 처리
            console.log(json);

            const locSection = json.name;
            const tempSection = json.main.temp;
            const descSection = json.weather[0].description;

            // DOM 요소들 가져오기
            const locHtml = document.getElementsByClassName('loc')[0];
            const tempHtml = document.getElementsByClassName('temp')[0];
            const descHtml = document.getElementsByClassName('desc')[0];
            const iconSection = document.getElementsByClassName('icon')[0]; // 이 부분 추가

            console.log(locHtml);

            const icon = json.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            locHtml.innerText = locSection;
            tempHtml.innerText = tempSection;
            descHtml.innerText = descSection;
            iconSection.setAttribute('src', iconURL); // 아이콘 이미지 설정
        })
        .catch((error) => {
            // 에러 처리
            console.error('Error fetching weather data:', error);
            alert('날씨 데이터를 가져오는 데 문제가 발생했습니다.');
        });
}
