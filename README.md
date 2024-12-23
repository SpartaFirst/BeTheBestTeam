# BeTheBestTeam
# 컴포넌트 구조

- **Common Components**: 여러 곳에서 재사용되는 공통 컴포넌트들 (e.g., 버튼, 입력 필드 등)
- **Feature-Specific Components**: 특정 기능이나 페이지에만 사용되는 컴포넌트들
- **Layout Components**: 페이지 레이아웃을 구성하는 컴포넌트들 (e.g., Header, Footer, Sidebar 등)
- **Pages**: 각 페이지별로 사용되는 컴포넌트들을 해당 페이지 폴더 안에 넣어 관리 

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
git commit -am 'feat (#189) : 게시판 작성 기능 구현'
```

# 디렉토리 구조 및 네이밍 컨벤션

## 디렉토리 구조

## 네이밍 컨벤션

1. **디렉토리 및 폴더명**

   - **PascalCase**를 사용. ex) Main, Member, MemberInfo, MemberPost

2. **파일명**

   - **파일명:**  example) index.html, style.css, script.js 

4. **CSS 클래스명**

   - **BEM(Block Element Modifier)** 규칙을 사용
     example)
     - **Block** : menu, button, card
     - **Element** : menu__item, button__icon, card__header
     - **Modifier** : button--primary, menu__item--active, card__header--large     

5. **함수명 및 변수명**

   - **camelCase**를 사용하여 작성.

