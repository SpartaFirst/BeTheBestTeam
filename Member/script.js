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

const main = document.getElementById("main");

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(db);

let docs = await getDocs(collection(db, "user"));
docs.forEach((doc) => {
  let row = doc.data();
  console.log(row);
  // let userID = row.userID;
  // let userPW = row.userPW;
  // let userHobby = row.userHobby;
  // let userMBTI = row.userMBTI;
  let userName = row.userName;
  let userBio = row.userBio;
  let userDeveloper = row.userDeveloper;
  let userBlogCategory = row.userBlogCategory;
  let userBlogName = row.userBlogName;
  let userGithub = row.userGithub;
  let userPhotoUrl = row.userPhotoUrl;

  let sectionHtml = `<div class="section__main">
        <!-- 멤버 설명 -->
        <div class="section__desc">
          <div class="section__head">
            <h1>${userName}</h1>
            <h4>${userDeveloper || "개발자가 말대꾸?!"} </h4>
          </div>
          <p>
            ${userBio}
          </p>
        </div>
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
      </div>`;

  main.innerHTML += sectionHtml;
});
