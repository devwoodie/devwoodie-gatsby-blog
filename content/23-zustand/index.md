---
emoji: 🏥
title: 'Zustand 상태 어때?'
date: '2024-11-28'
categories: Dev React&Next.js
---

지금까지 써 본 상태 관리 라이브러리는 Redux toolkit, mobX, Recoil이었다.

처음 썼던 상태관리가 Redux toolkit이었기 때문에 주로 사용해오다가 이직을 하면서 Recoil을 사용하게 되었다.

그런데 Recoil이 업데이트가 느리다는 글을 보게 된 후에 다른 상태 관리 라이브러리를 찾아보았다.
> Next도 15가 나왔고 React도 19가 임박한 시점에서 Recoil이 자주 업데이트가 안된다는 점이 맘에 안들었던 것 같다.

<br/>

![](1.png)

그러다 찾게 된

<br />

## Zustand

**Zustand**는 독일어로 `상태`라는 뜻이다.

아직 Redux가 많이 사용된다고 하는데 작은 기능을 사용하더라도 몇개의 파일과 코드들을 만들어야하는 boilerplate의 단점은 어쩔 수 없는 것 같다.

<br />

### Zustand 장점?
- 간단하고 직관적인 API를 제공한다.
- boilerplate가 거의 필요 없다.
- 사용 방법이 간단하다.
- 상태 변경 시 불필요한 컴포넌트 렌더링을 방지하는 최적화를 자동으로 처리한다.

### Zustand 단점?
- Redux와 다른 상태관리 라이브러리에 비해 커뮤니티와 생태계가 비교적 작다.
- 복잡한 상태 관리가 필요한 대규모 애플리케이션에서는 기능이 부족할 수 있다.

<br />

## Zustand 사용법

### 1. 설치

```bash
npm install zustand
```
```bash
yarn add zustand
```

### 2. store.ts 구현

store.ts 파일을 만들고 상태 관리에 사용할 로직을 구현한다.

```ts
// store.ts
import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
```

### 3. 컴포넌트 내에서 사용

```js
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

지금까지 써왔던 상태 관리 라이브러리에 비해 굉장히 간단한 것을 볼 수 있다.

### 새로고침 해도 데이터를 갖고 있으려면?

상태관리는 새로고침을 하게 되면 데이터가 휘발된다.

방지하기 위해 zustand 에는 persist 속성이 있다.

이는 localStorage에 데이터를 저장해서 새로고침 해도 날아가지 않는다.

```ts
// store.ts
import { create } from 'zustand';
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      updateBears: (newBears) => set({ bears: newBears }),
    }),
      {
        // localStorage에 저장될 이름
        name: 'useStore',
      },
  )
)
```

![](2.png)

```toc
```
