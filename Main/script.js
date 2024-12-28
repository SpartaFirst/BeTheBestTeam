// const clientId = 'MvzGgkir2fzF50irbfTJ';
// const clientSecret = 'gz93UVQaV8';

// const query = 'IT';
// const display = '4';

// const url = `https://openapi.naver.com/v1/search/news.json?query=${query}&display=${display}&start=1&sort=sim`;

// fetch(url, {
//     method: 'POST',
//     headers: {
//         'X-Naver-Client-Id': clientId,
//         'X-Naver-Client-Secret': clientSecret
//     }
// })
//     .then(response => response.json())
//     .then(data => {
//         const articles = data.items;
//         const articlesList = document.getElementById('articles');
//         articlesList.innerHTML = '';

//         articles.forEach(article => {
//             const articleElement = document.createElement('div');
//             articleElement.innerHTML = `
//         <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
//         <p>${article.description}</p>
//         <small>작성일: ${article.pubDate}</small>
//         `;
//             articlesList.appendChild(articleElement);
//         });
//     })
//     .catch(error => {
//         console.error('API 호출 오류:', error);
//     });

// Main/index.html에서 Nav/index.html을 동적으로 불러오기
fetch('../Nav/index.html')
    .then((response) => response.text())
    .then((html) => {
        document.getElementById('nav__container').innerHTML = html;

        // HTML이 삽입된 후에, 스크립트 실행
        const scripts = document.querySelectorAll('#nav__container script');
        scripts.forEach((script) => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.head.appendChild(newScript);
        });

        // 날씨 API 호출 후 데이터 삽입
        navigator.geolocation.getCurrentPosition(success); // success 함수가 여전히 참조 가능해야 함
    })
    .catch((error) => console.error('Error loading navbar:', error));

    // success 함수와 getWeather 함수 정의 (main.js 내에서)
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    getWeather(latitude, longitude); // 위도, 경도를 넘겨서 날씨 정보를 가져옵니다.
};

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

            const locHtml = document.getElementsByClassName('loc')[0];
            const tempHtml = document.getElementsByClassName('temp')[0];
            const descHtml = document.getElementsByClassName('desc')[0];
            const iconHtml = document.getElementsByClassName('icon')[0];
            console.log(locHtml);

            const icon = json.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            locHtml.innerText = locSection;
            tempHtml.innerText = tempSection;
            descHtml.innerText = descSection;
            iconHtml.setAttribute('src', iconURL);
        })
        .catch((error) => {
            // 에러 처리
            alert(error);
        });
}
