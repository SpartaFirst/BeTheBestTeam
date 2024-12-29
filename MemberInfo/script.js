import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// Authentication에서도 삭제하기 위함...
import {
  getAuth,
  deleteUser,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

async function loadNavbar() {
  try {
    const response = await fetch("../Nav/index.html");
    const html = await response.text();
    document.getElementById("nav__container").innerHTML = html;
    console.log("fetch nav 완료");

    // fetch 완료 후 실행할 코드
    const scripts = document.querySelectorAll("#nav__container script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      console.log(newScript);
      if (script.src) {
        newScript.src = script.src; // 기존 src 복사
        newScript.type = script.type || "text/javascript"; // type 복사
      } else {
        newScript.textContent = script.textContent; // 인라인 스크립트 복사
      }
      document.head.appendChild(newScript);
    });
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
}

loadNavbar();

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

// localStorage와 query값 비교해서 작성자인지 확인
let login = false;
const loginUser = localStorage.getItem("userEmail");
const urlParams = new URLSearchParams(window.location.search);
const urlValue = urlParams.get("id");

console.log(loginUser, urlValue);

if (loginUser === urlValue) {
  login = true;
}

// 사진 재업로드 시 필요
function converFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // 파일을 Base64로 변환
  });
}

// 추후에 querystring 받아서 uid값으로 검색
const uid = urlValue;
const findUser = query(collection(db, "user"), where("userId", "==", uid));
let docs = await getDocs(findUser);

docs.forEach((docsItem) => {
  console.log(docsItem.data());
  let row = docsItem.data();
  //  초기 데이터
  let userID = row.userId;
  let userName = row.userName;
  let userBio = row.userBio;
  let userMBTI = row.userMBTI;
  let userHobby = row.userHobby;
  let userDeveloper = row.userDeveloper;
  let userBlogCategory = row.userBlogCategory;
  let userBlogName = row.userBlogName;
  let userGithub = row.userGithub;
  let userPhotoUrl = row.userPhotoUrl;

  document.getElementById(
    "memberInfo__main"
  ).innerHTML = `<section class="profile__container">
      <div class="profile__row">
        <div class="profile__name">
          <label for="userName" class="label">Name</label>
          <div id="userNameDisplay">${userName}</div>
          <input type="text" id="userNameInput" class="hidden" placeholder="이름 입력" />
        </div>
        <div class="profile__mbti">
          <label for="userMbti" class="label">MBTI</label>
          <div id="userMbtiDisplay">${userMBTI}</div>
          <input type="text" id="userMbtiInput" class="hidden" placeholder="MBTI 입력" />
        </div>
      </div>
      <div class="profile__bio">
        <div class="profile__left">
          <div class="info__box">
            <h2>자기소개</h2>
            <div id="introDisplay" class="display-box">${userBio}</div>
            <textarea id="introTextarea" class="hidden" placeholder="자기소개를 입력하세요..."></textarea>
          </div>
          <div class="info__box">
            <h2>취미</h2>
            <div id="hobbyDisplay" class="display-box">${userHobby}</div>
            <textarea id="hobbyTextarea" class="hidden" placeholder="취미를 입력하세요..."></textarea>
          </div>
        </div>
        <div class="profile__right">
          <div class="profile__photo-container">
            <img id="profilePhotoDisplay" src=${userPhotoUrl} alt="프로필 사진" class="profile__photo" />
            <input type="file" id="profilePhotoInput" class="hidden" />
          </div>
          <div class="profile__links">
            <div class="blog">
              <label for="blogLink" class="label">Blog</label>
              <img class='blog-icons' src="./image/${userBlogCategory}.png">
              <div id="blogLinkDisplay"><a href=${userBlogName}>${userBlogName}</a></div>
              <input type="text" id="blogLink" class="hidden" placeholder="블로그 주소 입력" />
            </div>
            <div class="github">
              <label for="githubLink" class="label">Github</label>
              <img class='blog-icons' src="./image/github.png">
              <div id="githubLinkDisplay"><a href=${userGithub}>${userGithub}</a></div>
              <input type="text" id="githubLink" class="hidden" placeholder="깃허브 주소 입력" />
            </div>
          </div>
        </div>
      </div>
      ${
        login
          ? `<button type="button" class="edit-btn" id="editBtn">✎</button><button class="delete__btn">🗑️</button>`
          : ""
      }
    </section>`;

  // DOM 요소 가져오기
  const userNameDisplay = document.getElementById("userNameDisplay");
  const userNameInput = document.getElementById("userNameInput");
  const userMbtiDisplay = document.getElementById("userMbtiDisplay");
  const userMbtiInput = document.getElementById("userMbtiInput");
  const introDisplay = document.getElementById("introDisplay");
  const introTextarea = document.getElementById("introTextarea");
  const hobbyDisplay = document.getElementById("hobbyDisplay");
  const hobbyTextarea = document.getElementById("hobbyTextarea");
  const blogLinkDisplay = document.getElementById("blogLinkDisplay");
  const blogLinkInput = document.getElementById("blogLink");
  const githubLinkDisplay = document.getElementById("githubLinkDisplay");
  const githubLinkInput = document.getElementById("githubLink");
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const profilePhotoDisplay = document.getElementById("profilePhotoDisplay");

  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementsByClassName("delete__btn")[0];

  // input, textarea에 초기값 세팅
  userNameInput.value = userName;
  userMbtiInput.value = userMBTI;
  introTextarea.value = userBio;
  hobbyTextarea.value = userHobby;
  blogLinkInput.value = userBlogName;
  githubLinkInput.value = userGithub;

  let isEditMode = false;

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      const userDocRef = doc(db, "user", docsItem.id);
      const confirmDelete = confirm("정말로 삭제하시겠습니까?");
      const auth = getAuth(app);
      // 사용자 상태확인
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // 사용자 삭제제
          if (confirmDelete) {
            try {
              //   const user = auth.currentUser;
              console.log(user);
              // deleteUser 비동기 처리
              await deleteUser(user);
              console.log("Authentication user successfully deleted!");
              localStorage.removeItem("userEmail");
              // deleteDoc 비동기 처리
              await deleteDoc(userDocRef);
              console.log("Document successfully deleted!");
              // 삭제 후 리다이렉트
              alert("사용자가 삭제되었습니다.");
            } catch (error) {
              console.error("Error deleting user:", error);
              alert("삭제 중 오류가 발생했습니다.");
            }
          }

          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      // window.location.href = "../Member/index.html"; 아마 요게 작동하면서 삭제가 안됨 그래서 1초 뒤에 리다이렉트 하게 함.
      setTimeout(() => {
        window.location.href = "../Member/index.html";
      }, 1000);
    });
  }
  // edit 버튼 클릭 이벤트
  if (editBtn) {
    editBtn.addEventListener("click", async () => {
      isEditMode = !isEditMode;

      if (isEditMode) {
        // Edit 모드
        editBtn.textContent = "Save";
        editBtn.classList.add("toggle__on");
        // 숨김 처리 시 visibility로 유지
        userNameDisplay.classList.add("hidden");
        userNameInput.classList.remove("hidden");

        userMbtiDisplay.classList.add("hidden");
        userMbtiInput.classList.remove("hidden");

        introDisplay.classList.add("hidden");
        introTextarea.classList.remove("hidden");

        hobbyDisplay.classList.add("hidden");
        hobbyTextarea.classList.remove("hidden");

        blogLinkDisplay.classList.add("hidden");
        blogLinkInput.classList.remove("hidden");

        githubLinkDisplay.classList.add("hidden");
        githubLinkInput.classList.remove("hidden");

        profilePhotoDisplay.classList.add("hidden");
        profilePhotoInput.classList.remove("hidden");
      } else {
        editBtn.textContent = "✎";
        editBtn.classList.remove("toggle__on");

        // 사진 수정 안 했을 시 기존 photoUrl 가져옴
        let basePhoto = "";
        console.log(profilePhotoInput.value);

        if (profilePhotoInput.files.length > 0) {
          const file = profilePhotoInput.files[0];
          basePhoto = await converFileToBase64(file);
          console.log(basePhoto);
        } else {
          basePhoto = userPhotoUrl;
        }

        const updatedData = {
          userName: userNameInput.value,
          userMBTI: userMbtiInput.value,
          userBio: introTextarea.value,
          userHobby: hobbyTextarea.value,
          userBlogName: blogLinkInput.value,
          userGithub: githubLinkInput.value,
          userPhotoUrl: basePhoto,
        };
        console.log(updatedData);
        const userDocRef = doc(db, "user", docsItem.id);
        updateDoc(userDocRef, updatedData)
          .then(() => {
            console.log("Document successfully updated!");
            location.reload();
          })
          .catch((error) => {
            console.error("Error updating document:", error);
            alert("저장 중 오류가 발생했습니다.");
          });
      }
    });
  }
});
