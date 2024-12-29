import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyBoI6KU8CSsiSE31m7Z6HdjuQhcw02VfWw',
    authDomain: 'bethebestteam-8ce27.firebaseapp.com',
    projectId: 'bethebestteam-8ce27',
    storageBucket: 'bethebestteam-8ce27.firebasestorage.app',
    messagingSenderId: '916725484205',
    appId: '1:916725484205:web:e6bc6963dff95693a39424',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Nav js Load Success');

const userEmail = localStorage.getItem('userEmail'); // LocalStorage에서 userEmail 가져오기
const loginBtn = document.getElementsByClassName('nav-login-button')[0];
const loginName = document.getElementsByClassName('nav__login__name')[0];
const logoutBtn = document.getElementsByClassName('logout__btn')[0];
console.log(userEmail);
console.log(loginName);
async function fetchUserName() {
    if (!userEmail) {
        console.log('userEmail 값이 LocalStorage에 없습니다.');
        // 이름과 로그아웃 버튼 숨기기
        loginName.classList.add('hidden');
        logoutBtn.classList.add('hidden');
        // 로그인 버튼 활성화
        loginBtn.innerText = 'Login';
        loginBtn.classList.remove('hidden'); // display: none 상태에서 보이도록 설정
        return;
    }

    try {
        // Firestore의 'user' 컬렉션에서 userId 값이 userEmail과 일치하는 문서 쿼리
        const userRef = collection(db, 'user');
        const q = query(userRef, where('userId', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error('일치하는 유저가 없습니다.');
            loginName.classList.add('hidden');
            logoutBtn.classList.add('hidden');
            loginBtn.innerText = 'Login';
            loginBtn.classList.remove('hidden');
            return;
        }
        console.log(loginName);
        // 일치하는 문서의 userName 값 가져오기
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (loginName) {
                loginName.innerText = `${userData.userName}님`;
                loginName.classList.remove('hidden');
            } else {
                console.error('.nav__login__name 요소가 없습니다.');
            }

            // 로그아웃 버튼 활성화
            if (logoutBtn) {
                loginBtn.classList.add('hidden');
                logoutBtn.classList.remove('hidden');
                logoutBtn.innerText = 'Logout';
            }
        });
    } catch (error) {
        console.error('Firestore에서 데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
}

// 로그아웃 버튼 클릭 시 동작
function setupLogoutButton() {
    const logoutBtn = document.getElementsByClassName('logout__btn')[0];
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // LocalStorage에서 사용자 정보 삭제
            localStorage.removeItem('userEmail');
            alert('로그아웃되었습니다.');

            // 페이지 새로고침 또는 상태 초기화
            location.reload(); // 현재 페이지를 새로고침
        });
    }
}

// 페이지가 로드될 때 fetchUserName 실행
// document.addEventListener('DOMContentLoaded', () => {
fetchUserName();
setupLogoutButton();
// });

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

navigator.geolocation.getCurrentPosition(success); // success 함수가 여전히 참조 가능해야 함
