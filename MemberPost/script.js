import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore, collection, addDoc} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js';
// api에서 허용
// server
// firebase
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
const storage = getStorage(app);

const memberForm = document.getElementById('member__form');

memberForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(memberForm);

    const userName = formData.get('name');
    const userMBTI = formData.get('mbti');
    const userHobby = formData.get('hobby');
    const userBio = formData.get('bio');
    const userBlogCategory = formData.get('blog__category');
    const userBlogName = formData.get('blog__name');
    const userGithub = formData.get('github');
    const userPhotoFile = formData.get('photo');

    let userPhotoUrl = null;

    // if (userPhotoFile) {
    //     const photoRef = ref(storage, `photos/${encodeURIComponent(userPhotoFile.name)}`);
    //     try {
    //         const snapshot = await uploadBytes(photoRef, userPhotoFile);
    //         userPhotoUrl = await snapshot.ref.getDownloadURL();
    //     } catch (error) {
    //         console.error('사진 업로드 실패:', error);
    //         alert('사진 업로드 실패');
    //         return;
    //     }
    // }

    try {
        let docs = {
            userName: userName,
            userMBTI: userMBTI,
            userHobby: userHobby,
            userBio: userBio,
            userBlogCategory: userBlogCategory,
            userBlogName: userBlogName,
            userGithub: userGithub,
            userPhotoUrl: userPhotoUrl || null, 
        };
        console.log(docs);
        await addDoc(collection(db, 'user'), docs);
        alert('작성 완료!');
    } catch (error) {
        console.error('Firestore 저장 실패:', error);
        alert('작성 실패');
    }
});
