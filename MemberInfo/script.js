import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
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
let docs = await getDocs(collection(db, "user"));

docs.forEach((doc) => {
    let row = doc.data();
    console.log(row);

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

    let sectionHtml = `<div class="section__main box">
<!-- 멤버 설명 -->
<div class="section__desc">
  <div class="section__head">
    <h1>${userName}</h1>
    <h4>${userDeveloper || "개발자가 말대꾸?!"} </h4>
  </div>
  <p>
    ${userID}
    ${userMBTI}
    ${userHobby}
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
  ${userBlogCategory === "tistory"
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

    // 화면에 초기 데이터 표시
    // userNameDisplay.innerText = userNameData;
    // userMbtiDisplay.innerText = userMbtiData;
    // introDisplay.innerText = introData;
    // hobbyDisplay.innerText = hobbyData;
    // blogLinkDisplay.innerText = blogLinkData;
    // githubLinkDisplay.innerText = githubLinkData;

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

            // Display 갱신
            userNameDisplay.innerText = userNameData;
            userMbtiDisplay.innerText = userMbtiData;
            introDisplay.innerText = introData;
            hobbyDisplay.innerText = hobbyData;
            blogLinkDisplay.innerText = blogLinkData;
            githubLinkDisplay.innerText = githubLinkData;

            // UI 토글
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
    });

})
