---
emoji: 👌
title: '약속 지킬래 말래 Feat. new Promise'
date: '2025-06-28'
categories: Dev
---
## new Promise와 await new Promise 이해하기
JavaScript를 하다 보면 꼭 만나게 되는 개념이 있습니다. 바로 Promise와 async/await 입니다.
비동기 프로그래밍의 핵심인데, 막상 쓰다 보면 new Promise는 무엇이고, await new Promise는 또 어떤 의미인지 헷갈릴 때가 있습니다.
이번 글에서는 이 둘을 비교하면서 개념을 정리해보겠습니다.

![](1.png)

## Promise란 무엇인가?
Promise는 비동기 작업의 완료(혹은 실패)를 나타내는 객체입니다.
```js
const promise = new Promise((resolve, reject) => {
  // 비동기 작업 수행
  setTimeout(() => {
    resolve("성공!");
  }, 1000);
});

promise.then(result => console.log(result)); // 1초 후 "성공!"
```
위 코드에서 new Promise는 **"곧 결과가 생길거야!"** 라는 약속을 만든 것입니다.
그리고 resolve를 호출하면 그 약속이 지켜지고, reject를 호출하면 약속이 깨집니다.

## new Promise는 언제 사용할까?
대부분의 경우 ``Promise``는 이미 API가 반환해줍니다.<br />
예를 들어 ``fetch``는 Promise를 반환하죠.<br />

그런데, 우리가 직접 비동기 동작을 Promise로 감싸고 싶을 때 ``new Promise``를 씁니다.
```js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

wait(2000).then(() => console.log("2초 후 실행!"));
```
이제 wait 함수는 Promise를 반환하기 때문에 await과도 함께 사용할 수 있습니다.

--- 

## await new Promise 패턴
await는 Promise의 결과를 기다립니다.<br />
따라서 다음과 같이 사용할 수 있습니다.
```js
async function run() {
  console.log("시작");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("2초 뒤 실행");
}

run();
```
여기서 await new Promise(...)는 흔히 **"딜레이 주기"**나 "비동기 동작이 끝날 때까지 기다리기" 패턴으로 많이 쓰입니다.<br />
즉, await는 Promise가 끝날 때까지 기다린 후, 그 결과값을 반환합니다.

## new Promise와 await new Promise의 차이
- new Promise
  - 단순히 Promise 객체를 생성함. 아직 끝난 건 아님
  - **“택배를 주문했다”** 는 상태
- await new Promise
  - Promise가 끝날 때까지 기다린 후, 그 결과를 받아옴
  - **“택배가 도착할 때까지 기다렸다가, 상자를 연다”** 는 상태

## 정리
- new Promise: 새로운 비동기 작업(약속)을 생성
- await new Promise: 그 약속이 지켜질 때까지 기다린 후 결과값을 받음
- await new Promise 패턴은 비동기 딜레이, 순차 처리, 사용자 정의 비동기 로직에 자주 사용됨

결론적으로, new Promise 자체는 ``단순히 약속을 만드는 행위``일 뿐이고,<br />
await new Promise를 써야 ``실제로 그 약속이 끝날 때까지 기다리는 효과``를 얻을 수 있습니다.



```toc
```
