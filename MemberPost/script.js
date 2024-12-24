import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore, collection, addDoc} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
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
// const storage = getStorage(app);

function converFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    })
}

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

    // 이미지를 문자열로 변환 문자열 -> db에 저장
    // json server -> supabase
    if (userPhotoFile) {
        try {
            userPhotoUrl = await converFileToBase64(userPhotoFile);
            console.log('변환 파일 : ', userPhotoUrl);
        } catch (error) {
            console.error('파일 변환 실패 : ', error);
            alert('파일 변환 실패');
            return;
        }
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
