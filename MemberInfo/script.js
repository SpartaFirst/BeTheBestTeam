import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
// import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js';

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
// 추후에 querystring 받아서 uid값으로 비교
const name = '임재원';
let userInfo = [];
const findUser = query(collection(db, 'user'), where('userName', '==', name));
let docs = await getDocs(findUser);

docs.forEach((doc) => {
  console.log(doc.data());
  let row = doc.data();
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

  document.getElementById('main').innerHTML = `<section class="profile__container">
      <div class="profile__row">
        <div class="profile__name">
          <label for="userName" class="label">name</label>
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
            <img src=${userPhotoUrl} alt="프로필 사진" class="profile__photo" />
          </div>
        
          <div class="profile__links">
            <div class="blog">
              <label for="blogLink" class="label">Blog</label>
              <img class='blog-icons' src="./image/velogicon.png">
              <div id="blogLinkDisplay">${userBlogName}</div>
              <input type="text" id="blogLink" class="hidden" placeholder="블로그 주소 입력" />
        
            </div>
        
            <div class="github">
              <label for="githubLink" class="label">Github</label>
              <img class='blog-icons' src="./image/githubicon.png">
              <div id="githubLinkDisplay">${userGithub}</div>
              <input type="text" id="githubLink" class="hidden" placeholder="깃허브 주소 입력" />
            </div>
          </div>
        </div>
      </div>
                <button type="button" class="edit-btn" id="editBtn">✎</button>
    </section>`;

  // DOM 요소 가져오기
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userNameInput = document.getElementById('userNameInput');
  const userMbtiDisplay = document.getElementById('userMbtiDisplay');
  const userMbtiInput = document.getElementById('userMbtiInput');
  const introDisplay = document.getElementById('introDisplay');
  const introTextarea = document.getElementById('introTextarea');
  const hobbyDisplay = document.getElementById('hobbyDisplay');
  const hobbyTextarea = document.getElementById('hobbyTextarea');
  const blogLinkDisplay = document.getElementById('blogLinkDisplay');
  const blogLinkInput = document.getElementById('blogLink');
  const githubLinkDisplay = document.getElementById('githubLinkDisplay');
  const githubLinkInput = document.getElementById('githubLink');

  const editBtn = document.getElementById('editBtn');

  // input, textarea에 초기값 세팅
  userNameInput.value = userName;
  userMbtiInput.value = userMBTI;
  introTextarea.value = userBio;
  hobbyTextarea.value = userHobby;
  blogLinkInput.value = userBlogName;
  githubLinkInput.value = userGithub;

  let isEditMode = false;

  // edit 버튼 클릭 이벤트
  editBtn.addEventListener('click', () => {
    isEditMode = !isEditMode;

    if (isEditMode) {
      // Edit 모드
      editBtn.textContent = 'Save';

      // 숨김 처리 시 visibility로 유지
      userNameDisplay.classList.add('hidden');
      userNameInput.classList.remove('hidden');

      userMbtiDisplay.classList.add('hidden');
      userMbtiInput.classList.remove('hidden');

      introDisplay.classList.add('hidden');
      introTextarea.classList.remove('hidden');

      hobbyDisplay.classList.add('hidden');
      hobbyTextarea.classList.remove('hidden');

      blogLinkDisplay.classList.add('hidden');
      blogLinkInput.classList.remove('hidden');

      githubLinkDisplay.classList.add('hidden');
      githubLinkInput.classList.remove('hidden');
    } else {
      // Save 모드
      editBtn.textContent = '✎';

      // 입력된 값을 다시 반영
      userNameData = userNameInput.value;
      userMbtiData = userMbtiInput.value;
      introData = introTextarea.value;
      hobbyData = hobbyTextarea.value;
      blogLinkData = blogLinkInput.value;
      githubLinkData = githubLinkInput.value;

      userNameDisplay.innerText = userNameData;
      userMbtiDisplay.innerText = userMbtiData;
      introDisplay.innerText = introData;
      hobbyDisplay.innerText = hobbyData;
      blogLinkDisplay.innerText = blogLinkData;
      githubLinkDisplay.innerText = githubLinkData;

      // 숨김 처리 복구
      userNameDisplay.classList.remove('hidden');
      userNameInput.classList.add('hidden');

      userMbtiDisplay.classList.remove('hidden');
      userMbtiInput.classList.add('hidden');

      introDisplay.classList.remove('hidden');
      introTextarea.classList.add('hidden');

      hobbyDisplay.classList.remove('hidden');
      hobbyTextarea.classList.add('hidden');

      blogLinkDisplay.classList.remove('hidden');
      blogLinkInput.classList.add('hidden');

      githubLinkDisplay.classList.remove('hidden');
      githubLinkInput.classList.add('hidden');
    }
  })
});
