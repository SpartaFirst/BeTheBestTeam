import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoI6KU8CSsiSE31m7Z6HdjuQhcw02VfWw",
  authDomain: "bethebestteam-8ce27.firebaseapp.com",
  projectId: "bethebestteam-8ce27",
  storageBucket: "bethebestteam-8ce27.firebasestorage.app",
  messagingSenderId: "916725484205",
  appId: "1:916725484205:web:e6bc6963dff95693a39424",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const storage = getStorage(app);
const auth = getAuth(app);

function converFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function validationForm(formData) {
  const fields = [
    { id: "userId", name: "아이디" },
    { id: "userPw", name: "비밀번호" },
    { id: "name", name: "이름" },
    { id: "developer", name: "되고 싶은 개발자" },
    { id: "mbti", name: "MBTI" },
    { id: "hobby", name: "취미" },
    { id: "bio", name: "자기소개" },
    { id: "blog__category", name: "블로그 카테고리" },
    { id: "blog__name", name: "블로그 주소" },
    { id: "github", name: "깃허브 주소" },
  ];

  for (const field of fields) {
    if (!formData.get(`${field.id}`)) {
      alert(`${field.name}을 입력해주세요.`);
      document.getElementById(field.id).focus();
      return false;
    }

    if (field.id === "userId") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.get(`${field.id}`))) {
        alert(
          "아이디는 올바른 이메일 형식으로 입력해주세요. (예: example@domain.com)"
        );
        document.getElementById("userId").focus();
        return false;
      }
    }

    if (field.id === "mbti") {
      const mbtiRegex = /^[A-Z]{4}$/;
      if (!mbtiRegex.test(formData.get(`${field.id}`))) {
        alert("MBTI는 영어 대문자 4글자로 입력해주세요. (예: INFP, ENTP)");
        document.getElementById("mbti").focus();
        return false;
      }
    }
  }

  return true;
}

const memberForm = document.getElementById("member__form");

memberForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(memberForm);

  const userId = formData.get("userId");
  const userPw = formData.get("userPw");
  const userName = formData.get("name");
  const userDeveloper = formData.get("developer");
  const userMBTI = formData.get("mbti");
  const userHobby = formData.get("hobby");
  const userBio = formData.get("bio");
  const userBlogCategory = formData.get("blog__category");
  const userBlogName = formData.get("blog__name");
  const userGithub = formData.get("github");
  const userPhotoFile = formData.get("photo");

  let userPhotoUrl = null;

  // 이미지를 문자열로 변환 문자열 -> db에 저장
  // json server -> supabase
  if (userPhotoFile) {
    try {
      userPhotoUrl = await converFileToBase64(userPhotoFile);
      console.log("변환 파일 : ", userPhotoUrl);
    } catch (error) {
      console.error("파일 변환 실패 : ", error);
      alert("파일 변환 실패");
      return;
    }
  } else {
    alert("사진을 선택해주세요.");
    document.getElementById("photo").focus();
    return;
  }

  console.log(userPhotoFile);

  // firebase storage 사용 => 유료로 바껴서 사용 x...
  // if (userPhotoFile) {
  //     const photoRef = ref(storage, `photos/${encodeURIComponent(userPhotoFile.name)}`);
  //     console.log(photoRef);
  //     try {
  //         const snapshot = await uploadBytes(photoRef, userPhotoFile);
  //         userPhotoUrl = await snapshot.ref.getDownloadURL();
  //         console.log('사진 URL:', userPhotoUrl);
  //     } catch (error) {
  //         console.log('2');
  //         console.error('사진 업로드 실패:', error);
  //         alert('사진 업로드 실패');
  //         return;
  //     }
  // }

  if (!validationForm(formData)) {
    return;
  }

  createUserWithEmailAndPassword(auth, userId, userPw)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const docs = {
        userId: user.uid,
        userName: userName,
        userDeveloper: userDeveloper,
        userMBTI: userMBTI,
        userHobby: userHobby,
        userBio: userBio,
        userBlogCategory: userBlogCategory,
        userBlogName: userBlogName,
        userGithub: userGithub,
        userPhotoUrl: userPhotoUrl || null,
      };
      console.log(docs);
      try {
        await addDoc(collection(db, "user"), docs);
        window.location.href = "../Main/index.html";
      } catch (error) {
        console.error("Firestore 저장 실패:", error);
        alert("작성 실패");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("회원가입 오류:", errorMessage);
      alert("회원가입 실패");
    });
});

// cursor 이벤트
document.addEventListener("mousemove", (e) => {
  let mouseX = e.pageX +5;
  let mouseY = e.pageY +5;

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