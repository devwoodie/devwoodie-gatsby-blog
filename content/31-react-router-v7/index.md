---
emoji: 🛣️
title: 'React Router v7 완벽 가이드'
date: '2025-11-15'
categories: Dev React&Next.js
---

## React Router v7이 왔다

React Router v7은 단순한 업데이트가 아니다.<br/>
Remix와 React Router가 합쳐지면서, 라우팅 라이브러리에서 **풀스택 프레임워크**로 진화했다.

<br/>

## 무엇이 달라졌나?

### Remix + React Router = React Router v7

기존에 Remix를 사용하던 팀은 React Router v7으로 마이그레이션하면 된다.<br/>
React Router를 사용하던 팀은 Remix의 강력한 기능들을 사용할 수 있게 되었다.

**핵심 변화**
- Remix의 data loading 패턴 통합
- 서버 사이드 렌더링(SSR) 내장
- 파일 기반 라우팅 지원
- 더 나은 타입 안전성

<br/>

## 설치하기

### 새 프로젝트

```bash
npx create-react-router@latest my-app
cd my-app
npm run dev
```

### 기존 프로젝트 업그레이드

```bash
npm install react-router@7
```

<br/>

## 프로젝트 구조

React Router v7은 파일 기반 라우팅을 지원한다.

```
app/
├── routes/
│   ├── _index.tsx        # / (홈)
│   ├── about.tsx         # /about
│   ├── blog._index.tsx   # /blog
│   ├── blog.$slug.tsx    # /blog/:slug
│   └── blog.tsx          # /blog 레이아웃
├── root.tsx              # 루트 레이아웃
└── entry.client.tsx      # 클라이언트 엔트리
```

### 라우트 파일 명명 규칙

| 파일명 | URL | 설명 |
|--------|-----|------|
| `_index.tsx` | `/` | 인덱스 라우트 |
| `about.tsx` | `/about` | 기본 라우트 |
| `blog.$slug.tsx` | `/blog/:slug` | 동적 파라미터 |
| `blog_.new.tsx` | `/blog/new` | 레이아웃 무시 |
| `($lang).about.tsx` | `/about`, `/ko/about` | 선택적 파라미터 |

<br/>

## Data Loading - loader

v7의 가장 강력한 기능 중 하나다.<br/>
컴포넌트가 렌더링되기 전에 데이터를 미리 로드한다.

```tsx
import { useLoaderData } from 'react-router';

export async function loader({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }

  return { post };
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### loader의 장점

- **워터폴 제거**: 부모-자식 라우트의 데이터를 병렬로 로드
- **SSR 지원**: 서버에서 데이터를 미리 로드
- **타입 안전성**: `typeof loader`로 타입 자동 추론

<br/>

## Data Mutation - action

폼 제출이나 데이터 변경을 처리한다.

```tsx
import { Form, useActionData, redirect } from 'react-router';

export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');

  const errors = {};
  if (!title) errors.title = '제목을 입력하세요';
  if (!content) errors.content = '내용을 입력하세요';

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await createPost({ title, content });
  return redirect('/blog');
}

export default function NewPost() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <input name="title" />
      {actionData?.errors?.title && (
        <span>{actionData.errors.title}</span>
      )}

      <textarea name="content" />
      {actionData?.errors?.content && (
        <span>{actionData.errors.content}</span>
      )}

      <button type="submit">작성하기</button>
    </Form>
  );
}
```

<br/>

## 중첩 라우팅 (Nested Routes)

레이아웃을 공유하는 중첩 라우팅이 더욱 직관적이다.

### routes/blog.tsx (레이아웃)

```tsx
import { Outlet, NavLink } from 'react-router';

export default function BlogLayout() {
  return (
    <div className="blog-layout">
      <nav>
        <NavLink to="/blog">전체 글</NavLink>
        <NavLink to="/blog/new">새 글 작성</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### routes/blog._index.tsx (목록)

```tsx
export async function loader() {
  const posts = await getPosts();
  return { posts };
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

<br/>

## Pending UI 처리

데이터 로딩 중 상태를 쉽게 처리할 수 있다.

### useNavigation

```tsx
import { useNavigation } from 'react-router';

export default function SubmitButton() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button disabled={isSubmitting}>
      {isSubmitting ? '저장 중...' : '저장'}
    </button>
  );
}
```

### 낙관적 UI (Optimistic UI)

```tsx
import { useFetcher } from 'react-router';

export default function LikeButton({ postId, likes }) {
  const fetcher = useFetcher();

  // 낙관적 업데이트: 서버 응답 전에 UI 먼저 변경
  const optimisticLikes = fetcher.formData
    ? likes + 1
    : likes;

  return (
    <fetcher.Form method="post" action={`/posts/${postId}/like`}>
      <button>❤️ {optimisticLikes}</button>
    </fetcher.Form>
  );
}
```

<br/>

## 에러 처리

라우트별로 에러 바운더리를 설정할 수 있다.

```tsx
import { useRouteError, isRouteErrorResponse } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>오류가 발생했습니다</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

<br/>

## 타입 안전성 강화

v7은 TypeScript 지원이 크게 향상되었다.

```tsx
import type { Route } from './+types/blog.$slug';

export async function loader({ params }: Route.LoaderArgs) {
  // params.slug 타입이 자동으로 추론됨
  const post = await getPost(params.slug);
  return { post };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  // loaderData 타입이 자동으로 추론됨
  return <h1>{loaderData.post.title}</h1>;
}
```

<br/>

## SPA vs SSR 모드

React Router v7은 두 가지 모드를 지원한다.

### SPA 모드 (클라이언트만)

```ts
// react-router.config.ts
export default {
  ssr: false
};
```

기존 React Router처럼 클라이언트 사이드에서만 동작한다.

### SSR 모드 (서버 + 클라이언트)

```ts
// react-router.config.ts
export default {
  ssr: true
};
```

Remix처럼 서버에서 렌더링하고 클라이언트에서 하이드레이션한다.

<br/>

## v6에서 v7로 마이그레이션

### 1. 패키지 업데이트

```bash
npm install react-router@7
```

### 2. import 경로 변경

```tsx
// Before (v6)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// After (v7)
import { BrowserRouter, Routes, Route } from 'react-router';
```

### 3. 점진적 마이그레이션

기존 코드는 그대로 동작한다.<br/>
새로운 기능(loader, action)은 필요할 때 점진적으로 도입하면 된다.

<br/>

## React Router v7 vs Next.js

| 기능 | React Router v7 | Next.js |
|------|----------------|---------|
| 라우팅 | 파일 기반 / 설정 기반 | 파일 기반 |
| SSR | 선택적 | 기본 |
| Data Loading | loader/action | Server Components |
| 번들러 | Vite | Webpack/Turbopack |
| 학습 곡선 | React 경험 있으면 쉬움 | 새로운 개념 필요 |
| 유연성 | 높음 | 중간 |

<br/>

## 마무리

React Router v7은 단순한 라우팅 라이브러리를 넘어 풀스택 프레임워크로 진화했다.<br/>
Remix의 강력한 data loading 패턴과 React Router의 유연함이 합쳐졌다.

기존 React Router 사용자라면 점진적으로 새 기능을 도입할 수 있고,<br/>
새 프로젝트라면 처음부터 loader/action 패턴을 활용해보자.

<br/>

<small>[참고] [https://reactrouter.com/](https://reactrouter.com/)</small>

```toc
```
