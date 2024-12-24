//강의에서 배운 내용으로 진행
//script에 type = "module" 추가함 (firebase 4-4강 강의내용)

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정

const firebaseConfig = {
  apiKey: "AIzaSyBLTIcnTjGiYZaj4ZwgCRUOR3hNFMjvQCs",
  authDomain: "sparta-9bd71.firebaseapp.com",
  projectId: "sparta-9bd71",
  storageBucket: "sparta-9bd71.firebasestorage.app",
  messagingSenderId: "754248503208",
  appId: "1:754248503208:web:71dd76080c6e636341d79d"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



document.getElementById("myBtn").addEventListener("click", async function () {
  //ID 값을 가져올 변수 선언
  const myId = document.getElementById('myId').value;
  const myPassword = document.getElementById('myPassword').value;

   //데이터 객체 생성
  const doc = {
    아이디: myId,
    비밀번호: myPassword
  };

  if(!myId || !myPassword){
    alert("아이디와 비밀번호를 입력해주세요")
  }
  else{
    await addDoc(collection(db, "login"), doc);  //컬렉션 "login"에 값 저장
    alert('안녕하세요. OOO님 이란 메세지가 뜨면서 유효성 확인이 들어가야 할 것 같아요......');
    window.location.reload(); // 페이지 새로고침
  }

})






// $("#myBtn").click(async function () {
//   let ID = $("#myId").val();
//   let Password = $("#myPassword").val();

//   // 넣고싶은 데이터
//   let doc = {
//     '아이디': ID,
//     '비밀번호': Password,
//   };

//   // "콘렉션 이름"이라는 콜렉션에 데이터 doc 저장
//   await addDoc(collection(db, "login"), doc);
//   alert('저장완료');
//   window.location.reload();
// })