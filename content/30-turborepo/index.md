---
emoji: 🚀
title: 'Turborepo로 모노레포 구축하기'
date: '2025-10-11'
categories: Dev
---

## Turborepo란?

Turborepo는 JavaScript와 TypeScript 프로젝트를 위한 고성능 빌드 시스템이다.<br/>
Vercel에서 개발하고 있으며, 모노레포(Monorepo) 환경에서 빌드 속도를 극적으로 향상시켜준다.

<br/>

## 모노레포(Monorepo)가 뭔데?

모노레포는 여러 프로젝트를 하나의 저장소에서 관리하는 방식이다.<br/>
예를 들어 프론트엔드, 백엔드, 공통 라이브러리를 하나의 레포지토리에서 관리할 수 있다.

**장점**
- 코드 공유가 쉽다
- 일관된 개발 환경 유지
- 의존성 관리가 편리하다
- 원자적 커밋 가능 (여러 패키지 변경을 한 커밋으로)

**단점**
- 저장소 크기가 커진다
- 빌드 시간이 오래 걸릴 수 있다 → **Turborepo가 해결!**

<br/>

## Turborepo의 핵심 기능

### 1. 캐싱 (Caching)

Turborepo의 가장 강력한 기능이다.<br/>
한 번 빌드한 결과를 캐싱해서, 코드가 변경되지 않으면 다시 빌드하지 않는다.

```bash
# 첫 번째 빌드
$ turbo build
# Tasks: 3 successful, 3 total
# Time: 15.2s

# 두 번째 빌드 (캐시 히트)
$ turbo build
# Tasks: 3 successful, 3 total
# Time: 0.5s >>> FULL TURBO
```

### 2. 병렬 실행 (Parallel Execution)

의존 관계가 없는 태스크들은 동시에 실행한다.<br/>
CPU 코어를 최대한 활용해서 빌드 시간을 단축시킨다.

### 3. Remote Caching

팀원들과 캐시를 공유할 수 있다.<br/>
A 개발자가 빌드한 결과를 B 개발자가 그대로 사용할 수 있어서, 팀 전체의 빌드 시간이 줄어든다.

<br/>

## 시작하기

### 새 프로젝트 생성

```bash
npx create-turbo@latest my-turborepo
cd my-turborepo
```

### 기존 프로젝트에 추가

```bash
npm install turbo --save-dev
```

<br/>

## 프로젝트 구조

Turborepo의 기본 구조는 다음과 같다.

```
my-turborepo/
├── apps/
│   ├── web/          # Next.js 앱
│   └── docs/         # 문서 사이트
├── packages/
│   ├── ui/           # 공유 UI 컴포넌트
│   ├── config/       # 공유 설정 (ESLint, TypeScript 등)
│   └── utils/        # 공유 유틸리티
├── turbo.json        # Turborepo 설정
└── package.json      # 루트 package.json
```

<br/>

## turbo.json 설정

프로젝트 루트에 `turbo.json` 파일을 생성한다.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### 주요 옵션 설명

| 옵션 | 설명 |
|------|------|
| `dependsOn` | 이 태스크 실행 전에 먼저 실행해야 할 태스크 |
| `^build` | 의존하는 패키지들의 build를 먼저 실행 |
| `outputs` | 캐싱할 출력 파일/폴더 |
| `cache` | 캐싱 여부 (dev는 보통 false) |
| `persistent` | 계속 실행되는 태스크 여부 |

<br/>

## 패키지 간 의존성 설정

### packages/ui/package.json

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

### apps/web/package.json

```json
{
  "name": "web",
  "dependencies": {
    "@repo/ui": "*"
  }
}
```

이제 web 앱에서 ui 패키지를 사용할 수 있다.

```tsx
import { Button } from '@repo/ui';

export default function Home() {
  return <Button>Click me</Button>;
}
```

<br/>

## 자주 사용하는 명령어

```bash
# 모든 패키지 빌드
turbo build

# 특정 패키지만 빌드
turbo build --filter=web

# 특정 패키지와 의존성 모두 빌드
turbo build --filter=web...

# 개발 서버 실행
turbo dev

# 캐시 삭제
turbo clean

# 변경된 패키지만 빌드
turbo build --filter=[origin/main]
```

<br/>

## Remote Caching 설정

Vercel과 연동하면 팀원들과 캐시를 공유할 수 있다.

```bash
# Vercel 로그인
npx turbo login

# Remote Caching 연결
npx turbo link
```

이후 빌드하면 캐시가 클라우드에 저장되고, 다른 팀원이나 CI에서 재사용할 수 있다.

<br/>

## 실제 사용 예시

### 공통 컴포넌트 라이브러리 만들기

`packages/ui/src/Button.tsx`
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = 'primary',
  onClick
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

`packages/ui/src/index.ts`
```tsx
export { Button } from './Button';
```

이제 모든 앱에서 이 컴포넌트를 import해서 사용할 수 있다.

<br/>

## Turborepo vs 다른 도구들

| 기능 | Turborepo | Nx | Lerna |
|------|-----------|-----|-------|
| 캐싱 | O | O | X |
| Remote Cache | O | O (유료) | X |
| 설정 복잡도 | 낮음 | 높음 | 낮음 |
| 빌드 속도 | 빠름 | 빠름 | 느림 |
| 학습 곡선 | 낮음 | 높음 | 낮음 |

Turborepo는 설정이 간단하면서도 강력한 캐싱 기능을 제공한다.<br/>
모노레포를 처음 시작한다면 Turborepo를 추천한다.

<br/>

## 마무리

Turborepo를 사용하면 모노레포의 장점을 누리면서도 빌드 시간 문제를 해결할 수 있다.<br/>
특히 Remote Caching 기능은 팀 전체의 개발 생산성을 크게 향상시켜준다.

프로젝트가 커지고 있거나, 여러 앱/라이브러리를 관리해야 한다면 Turborepo 도입을 고려해보자.

<br/>

<small>[참고] [https://turbo.build/repo/docs](https://turbo.build/repo/docs)</small>

```toc
```
