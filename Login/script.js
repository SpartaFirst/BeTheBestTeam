// //강의에서 배운 내용으로 진행
// //script에 type = "module" 추가함 (firebase 4-4강 강의내용)

// // Firebase SDK 라이브러리 가져오기
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Firebase 구성 정보 설정

const firebaseConfig = {
    apiKey: 'AIzaSyBoI6KU8CSsiSE31m7Z6HdjuQhcw02VfWw',
    authDomain: 'bethebestteam-8ce27.firebaseapp.com',
    projectId: 'bethebestteam-8ce27',
    storageBucket: 'bethebestteam-8ce27.firebasestorage.app',
    messagingSenderId: '916725484205',
    appId: '1:916725484205:web:e6bc6963dff95693a39424',
};
// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// let docs = await getDocs(collection(db, "user"));
// docs.forEach((doc) => {
//   let row = doc.data();
//   let userID = row.userID;
//   let userPW = row.userPW;
//   console.log(userID);

// })

// document.getElementById("myBtn").addEventListener("click", async function () {
//   //ID 값을 가져올 변수 선언
//   const myId = document.getElementById('myId').value;
//   const myPassword = document.getElementById('myPassword').value;

//   //form 쓰다가 어려워서 다시 처음 방법으로 돌아갔ㅠㅠㅠ

//   //firebase에서 userID와 userPW를 가져와야함
//   //1. getDoc?? doc??을 통해서 가져올 경로? 를 어떻게든 써야할테고
//   //2. userID와 userPW를 담을 getId 와 getPw 변수가 필요할것
//   //3. 첫번째 if문을 통해서, 만약 유저 아이디가 일치하지 않으면? 아이디를 확인해주세요
//   // 두번째 if문으로, 만약 유저 패스워드가 일치하지 않으면? 비밀번호를 확인해주세요.
//   // else로, 두가지가 맞다면 "로그인 성공!출력"

//   // +기능으로 하나라도 빈칸이 있다면 "!myId || !myPw" -> "누락된 곳이 있습니다" 이거는 focus를 써주는 연습???
// })

// 로그인 모달 HTML 생성
const loginHTML = `
        <div class="modal-overlay hidden" id="modal">
            <div class="modal-content">
                <main id="main__login__container">
                    <button class="close-button" id="closeModal">×</button>
                    <div>
                        <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FE6h7s%2FbtsLvjmB32i%2FrsXyZ0mW21H4uKlpDJApuk%2Fimg.png">
                    </div>
                    <div id="main__login">
                        <label for="loginId">Login ID</label>
                        <input id="loginId" type="text" placeholder="이메일을 입력해주세요">
                        <label for="loginPassword">Password</label>
                        <input id="loginPassword" type="password" placeholder="비밀번호를 입력해주세요">
                    </div>

                    <div id="alert"></div>

                    <footer id="login__footer">
                        <button id="loginBtn" class="footer__button" type="submit">Log in</button>
                        <button id="joinBtn" class="footer__button" type="submit">Join</button>
                    </footer>
                </main>
            </div>
        </div>
    `;
document.body.insertAdjacentHTML('beforeend', loginHTML);

// 이벤트 핸들러 연결
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
if (openModalButton) {
    console.log('openmodal');
    openModalButton.addEventListener('click', () => {
        modal.classList.add('active'); // 모달 열기
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('active'); // 모달 닫기
    });
}

if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.remove('active'); // 배경 클릭 시 모달 닫기
    });
}
// 회원가입 Part
if (document.getElementById('joinBtn')) {
    document.getElementById('joinBtn').addEventListener('click', (e) => {
        window.location.href = '../MemberPost/index.html';
    });
}

// 로그인 Part
if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const loginId = document.getElementById('loginId').value;
        const loginPassword = document.getElementById('loginPassword').value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, loginId, loginPassword)
            .then((userCredential) => {
                console.log('로그인 완료');
                const user = userCredential.user;
                // 로컬 스토리지에 사용자 이메일 저장
                localStorage.setItem('userEmail', user.uid);
                modal.classList.remove('active');
                alert('환영합니다.');
                location.reload(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-email') {
                    document.getElementById('alert').innerText = '이메일을 입력해주세요!';
                    document.getElementById('loginId').focus();
                }
                if (errorCode === 'auth/missing-password') {
                    document.getElementById('alert').innerText = '비밀번호를 입력해주세요!';
                    document.getElementById('loginPassword').focus();
                }
                if (errorCode === 'auth/invalid-login-credentials') {
                    document.getElementById('alert').innerText =
                        'ID 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않았습니다.';
                }
            });
    });
}

if (document.getElementsByClassName('nav__logout')[0]) {
    document.getElementsByClassName('nav__logout')[0].addEventListener('click', () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                alert('로그아웃 되었습니다.');
                localStorage.clear();
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
                // An error happened.
            });
    });
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user && localStorage.length) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        document.getElementsByClassName('nav__login')[0].classList.add('hidden');
        document.getElementsByClassName('nav__logout')[0].classList.remove('hidden');
        console.log('로그인중..');
        console.log(user);
        // ...
    } else {
        document.getElementsByClassName('nav__logout')[0].classList.add('hidden');
        document.getElementsByClassName('nav__login')[0].classList.remove('hidden');
        console.log('로그아웃');
        // User is signed out
        // ...
    }
});
