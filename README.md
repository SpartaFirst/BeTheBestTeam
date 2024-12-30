# BeTheBestTeam

# 브랜치 전략

## Format

`branch-type/#issue-id`

## Rule

- 적절한 브랜치 생성
- 작업 후 해당 브랜치를 생성했던 브랜치로 PR
- 작업 완료된 브랜치는 삭제

## Branch Type - Github Flow

![image](https://github.com/dnd-side-project/dnd-10th-9-backend/assets/50333168/1dc87948-57cf-4b1e-94ab-13c691c2cf76)

- `main` : 제품 배포
- `feat` : 기능 개발
- `fix` : 버그 수정

# 커밋 메시지

### 깃헙 커밋 규칙

| 작업 타입 | 작업내용 |
| --- | --- |
| ✨ update   | 해당 파일에 새로운 기능이 생김 |
| 🎉 add | 없던 파일을 생성함, 초기 세팅 |
| 🐛 bugfix | 버그 수정 |
| ♻️ refactor | 코드 리팩토링 |
| 🩹 fix | 코드 수정 |
| 🚚 move | 파일 옮김/정리 |
| 🔥 del | 기능/파일을 삭제 |
| 🍻 test | 테스트 코드를 작성 |
| 💄 style | css |
| 🙈 gitfix | gitignore 수정 |
| 🔨script | package.json 변경(npm 설치 등) |

## Example

```
git commit -am  ✨ update : 게시판 작성 기능 구현'
```

# 디렉토리 구조 및 네이밍 컨벤션

## 디렉토리 구조

## 네이밍 컨벤션

1. **디렉토리 및 폴더명**

   - **PascalCase**를 사용. example) Main, Member, MemberInfo, MemberPost

2. **파일명**

   - **파일명:**  example) index.html, style.css, script.js 

4. **CSS 클래스명**

   - **BEM(Block Element Modifier)** 규칙을 사용
     - **Block** : menu, button, card
     - **Element** : menu__item, button__icon, card__header
     - **Modifier** : button--primary, menu__item--active, card__header--large     

5. **함수명 및 변수명**

   - **camelCase**를 사용하여 작성.


<br>
<br>
<br>
<br>
<br>


## :fire: 1조는 최고조
![team mini size logo](https://github.com/user-attachments/assets/fff0dde5-37e9-4366-8482-2951af89bef5)


**안녕하세요! 1조는 최고조!**
저희 조를 소개합니다~! <br>

<br/>

## :busts_in_silhouette: 프로젝트 멤버 소개

- 임재원<br>
<img width="236" alt="임재원" src="https://github.com/user-attachments/assets/4c297843-9ceb-46fb-b194-3dafddfa8228" />
<br>
- 강지수<br>
<img width="250" alt="강지수" src="https://github.com/user-attachments/assets/16cbc9fb-f43a-4087-9da8-2c2d6db9248f" />
<br>
- 유경민<br>
<img width="235" alt="유경민" src="https://github.com/user-attachments/assets/cddc7acb-421b-466b-839a-da6f6d015096" />
<br>
- 최지선<br>
<img width="231" alt="최지선" src="https://github.com/user-attachments/assets/c5aa2ea7-0d54-4672-93d5-dacdca0db643" />
<br>
- 이지은<br>
<img width="229" alt="이지은" src="https://github.com/user-attachments/assets/5aa66f0a-5798-4099-b4c6-31934c310b09" />
<br>
- 신병선<br>
<img width="223" alt="신병선" src="https://github.com/user-attachments/assets/ba3068ac-7dc5-4ed0-8728-cea92a1a9e2c" />


<br/>

## :mega: 프로젝트 소개

<멤버 가입(Join)을 통한 CRUD 구현>
- Create : 멤버 가입
- Read : DB에서 읽어와서 멤버 페이지 구성, 로그인 매칭 구현
- Update : Edit & Save 기능
- Delete : 삭제 기능

<멤버 로그인을 모달로 구현>

<br>

## :file_folder: 프로젝트 기록
- Figma 링크 : https://www.figma.com/design/E8wIK3AUIw1uzBD9e7wPsF/BeTheBestTeam?node-id=0-1&p=f&t=bA2hRnyeV4i5da1Z-0
- 배포된 링크 : https://spartafirst.github.io/BeTheBestTeam/Main/index.html

<br>

## :mag_right: 프로젝트 소개

1) 메인페이지 (오늘의 날씨 api 연동 : 자신의 위치에 맞는 날씨 정보 확인)

![메인페이지](https://github.com/user-attachments/assets/6a51197e-d290-4012-a0e7-e3f9f6fd306c)

2) 로그인페이지 (DB에 있는 정보와 매칭될 시, 로그인 / 로그아웃 기능)
   
![로그인페이지](https://github.com/user-attachments/assets/acd7b483-1052-4c8e-a32b-2d069b50f350)

2) 멤버 소개 페이지 (귀여운 꿀벌 마우스 커서 포인터 + 꽃, 스크롤리빌 라이브러리 추가)

![멤버소개](https://github.com/user-attachments/assets/6d592715-466e-412c-b1d6-bb2fcf03d1be)


3) 멤버 상세정보 페이지 (수정 & 삭제 기능 추가)

![멤버 상세정보](https://github.com/user-attachments/assets/0814451d-b723-457e-a1a4-9b9e118a8543)


<br>

## :rocket: 트러블 슈팅 기록
[로그인] Nav바에서 바로 Log in 모달로 연결되도록 구현하기
<br>
[멤버_이미지파일] 파이어베이스에 이미지를 저장해서 어떻게 가져오지?
<br>
[멤버인포] 수정과 저장 기능 구현하기
