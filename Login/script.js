//강의에서 배운 내용으로 진행
//script에 type = "module" 추가함 (firebase 4-4강 강의내용)

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";



// Firebase 구성 정보 설정

const firebaseConfig = {
  apiKey: "AIzaSyBoI6KU8CSsiSE31m7Z6HdjuQhcw02VfWw",
  authDomain: "bethebestteam-8ce27.firebaseapp.com",
  projectId: "bethebestteam-8ce27",
  storageBucket: "bethebestteam-8ce27.firebasestorage.app",
  messagingSenderId: "916725484205",
  appId: "1:916725484205:web:e6bc6963dff95693a39424"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let docs = await getDocs(collection(db, "user"));
docs.forEach((doc) => {
  let row = doc.data();
  let userID = row.userID;
  let userPW = row.userPW;
  console.log(userID);

})


document.getElementById("myBtn").addEventListener("click", async function () {
  //ID 값을 가져올 변수 선언
  const myId = document.getElementById('myId').value;
  const myPassword = document.getElementById('myPassword').value;

  //form 쓰다가 어려워서 다시 처음 방법으로 돌아갔ㅠㅠㅠ

  //firebase에서 userID와 userPW를 가져와야함
  //1. getDoc?? doc??을 통해서 가져올 경로? 를 어떻게든 써야할테고
  //2. userID와 userPW를 담을 getId 와 getPw 변수가 필요할것
  //3. 첫번째 if문을 통해서, 만약 유저 아이디가 일치하지 않으면? 아이디를 확인해주세요
  // 두번째 if문으로, 만약 유저 패스워드가 일치하지 않으면? 비밀번호를 확인해주세요.
  // else로, 두가지가 맞다면 "로그인 성공!출력"

  // +기능으로 하나라도 빈칸이 있다면 "!myId || !myPw" -> "누락된 곳이 있습니다" 이거는 focus를 써주는 연습???



})