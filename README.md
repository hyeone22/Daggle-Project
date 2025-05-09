# Daggle Project

게시판 기능을 제공하는 웹 애플리케이션 사용자는 게시글을 작성, 수정, 삭제할 수 있으며, 댓글 기능을 통해 다른 사용자들과 소통할 수 있습니다.

## 주요 기능

- 사용자 인증 (로그인/로그아웃)
- 게시글 CRUD
- 댓글 CRUD
- 무한 스크롤 (모바일)
- 페이지네이션 (데스크톱)
- 반응형 디자인

## 기술 스택

### Frontend

- React 18
- TypeScript
- Vite
- TanStack Query (React Query)
- Zustand
- Tailwind CSS
- Shadcn UI

### 상태 관리

- Zustand: 전역 상태 관리 (인증 상태)
- TanStack Query: 서버 상태 관리

### 스타일링

- Tailwind CSS
- Shadcn UI
- clsx: 조건부 클래스 적용

### 개발 도구

- ESLint
- Prettier

## 프로젝트 폴더 구조

```
src/
├── action/          # React Query 관련 커스텀 훅 (게시글, 댓글, 인증 등)
├── api/             # API 엔드포인트 호출 함수
├── assets/          # 이미지, 아이콘 등 정적 리소스
├── component/       # ShadCN UI 컴포넌트
├── components/      # 재사용 컴포넌트
│   ├── comment/     # 댓글 관련 컴포넌트
│   ├── form/        # 폼 관련 컴포넌트
│   └── list/        # 게시판 리스트 관련 컴포넌트
│   └── section/     # Wrapper 관련 컴포넌트
│   └── ui/          # 공통 UI 컴포넌트
├── hooks/           # 커스텀 훅
├── interface/       # TypeScript 타입 정의
│   └── api/         # API 관련 인터페이스
│   └── item/        #  관련 인터페이스
├── layout/          # 레이아웃 컴포넌트
├── lib/             # 유틸리티 함수 및 설정
│   └── client.ts    # API 클라이언트 설정
│   └── client.ts    # 날짜 포맷 함수
├── pages/           # 페이지 컴포넌트
├── store/           # Zustand 스토어 (상태 관리)
└── utils/           # 유틸리티 함수
│   └── client.ts    # 라우팅 관련 컴포넌트
│   └── client.ts    # 에러 페이지 컴포넌트
│   └── client.ts    # 로딩 상태, 에러 상태 등 상태 컴포넌트
```

## 시작하기

1. 저장소 클론

```bash
git clone https://github.com/your-username/Daggle-Project.git
cd Daggle-Project
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정
   `.env` 파일을 생성하고 다음 내용을 추가:

```
VITE_API_URL=https://api.daggle.io/api
```

4. 개발 서버 실행

```bash
npm run dev
```

5. 테스트 계정

```
  "loginId": "dagglefront",
  "password": "password1234"
```

## 배포

이 프로젝트는 Vercel을 통해 배포됩니다.
또는 GitHub 저장소를 Vercel에 연결하여 자동 배포를 설정할 수 있습니다.

## 환경 변수

- `VITE_API_URL`: API 서버 주소 (필수)

## 문서 링크

프로젝트와 관련된 추가 문서는 아래 링크에서 확인할 수 있습니다.

- [프로젝트 이슈 관리](https://jagged-tang-bdd.notion.site/1edda43512c980c0a09fc5410720139e)
- [댓글 수 불일치 이슈](https://jagged-tang-bdd.notion.site/commentCount-1edda43512c98091a742c973d0dba497)
