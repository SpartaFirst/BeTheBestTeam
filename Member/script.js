// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyBoI6KU8CSsiSE31m7Z6HdjuQhcw02VfWw",
  authDomain: "bethebestteam-8ce27.firebaseapp.com",
  projectId: "bethebestteam-8ce27",
  storageBucket: "bethebestteam-8ce27.firebasestorage.app",
  messagingSenderId: "916725484205",
  appId: "1:916725484205:web:e6bc6963dff95693a39424",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(db);

const flowers = {
  flower1: "./image/flower1.png",
  flower2: "./image/flower2.png",
  flower3: "./image/flower3.png",
  flower4: "./image/flower4.png",
};
// flower 랜덤으로 뽑기
const rdmFlower = () => {
  const keys = Object.keys(flowers);
  const rdmKey = keys[Math.floor(Math.random() * keys.length)];
  return flowers[rdmKey];
};
console.log(flowers);

const main = document.getElementById("main");
let docs = await getDocs(collection(db, "user"));
docs.forEach((doc) => {
  let row = doc.data();
  // console.log(row);
  // let userPW = row.userPW;
  // let userHobby = row.userHobby;
  // let userMBTI = row.userMBTI;
  let userId = row.userId;
  let userName = row.userName;
  let userBio = row.userBio;
  let userDeveloper = row.userDeveloper;
  let userBlogCategory = row.userBlogCategory;
  let userBlogName = row.userBlogName;
  let userGithub = row.userGithub;
  let userPhotoUrl = row.userPhotoUrl;

  const flowerImg = rdmFlower();

  let sectionHtml = `
        <section class="section__main box">
        <!-- 멤버 설명 -->
        <div class="section__desc">
          <div class="section__head">
            <h1>${userName}</h1>
            <h4>${userDeveloper} </h4>
          </div>
          <p>
            ${userBio}
          </p>
          <a href="../MemberInfo/index.html?id=${userId}"></div>
            <div class = "section__more">
              <p>MORE INFO</p>
              <span>></span>
              <img class = "flower" src = ${flowerImg}></img>
            </div>
            </a>
        <!-- 멤버 정보 -->
        <div class="section__info">
          <div class="section__img">
            <img src="${userPhotoUrl}" />
          </div>
          <div class="section__link">
          <a href="${userGithub}" target="_blank"
          ><img src="./image/githubicon.png" alt="github"
          /></a>
          ${
            userBlogCategory === "tistory"
              ? `<a
              class="section__tistory"
              href="${userBlogName}"
              target="_blank"
              ><img src="./image/tistory.png" alt="tistory"
            /></a>`
              : `<a
              class="section__velog"
              href="${userBlogName}"
              target="_blank"
              ><img src="./image/velogicon.png" alt="velog"
            /></a>`
          }
          </div>
        </div>
        </section>
        `;

  main.innerHTML += sectionHtml;
});

// ScrollReveal 스크롤 이벤트
const sr = ScrollReveal({
  duration: 1000,
  distance: "50px",
  origin: "bottom",
  reset: true,
});

sr.reveal(".box");

// cursor 이벤트
document.addEventListener("mousemove", (e) => {
  let mouseX = e.pageX + 5;
  let mouseY = e.pageY + 5;

  let cursor = document.getElementById("cursor");
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

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