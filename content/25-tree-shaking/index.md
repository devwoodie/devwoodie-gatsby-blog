---
emoji: 🍃
title: '나무를 흔들어 잔가지를 털어내는 트리쉐이킹 Feat. 코드 최적화'
date: '2025-02-09'
categories: Dev
---
## Tree Shaking (트리쉐이킹)

![](1.png)

**트리쉐이킹**은 나무를 흔들어 잔가지를 털어내듯 사용하지 않는 코드를 제거하는 `최적화 기법`이다.

<br />

### Bundler (번들러)

웹개발을 할 때 번들러를 통해서 `모듈화된 파일을 하나로 합치는 작업`을 한다. <br />
이때 불필요한 코드가 함께 포함될 수 있기 때문에 번들러는 코드를 최적화하는 **트리쉐이킹**을 진행한다.

<br />

### sideEffects (사이드이펙트)

sideEffects는 package.json에 명시하는 내용으로 패키지의 어떤 파일이 사이드 이펙트를 갖고 있는지 번들러에게 알려주는 역할을 한다.

```json
{
  "name": "devwoodie",
  "sideEffects": false
}
```
`sideEffects: false`로 설정하면 해당 패키지의 모든 파일이 사이드 이펙트가 없다고 선언하는 것이고, <br/>
이 말은 번들러에게 `사용되지 않는 export는 안전하게 제거해도 된다`는 얘기를 하는 것이다.

```json
{
  "name": "devwoodie",
  "sideEffects": [
    "./src/devwoodie.ts",
    ".css"
  ]
}
```
위처럼 설정하면 CSS파일들과 특정 파일만 사이드 이펙트가 있다고 알려주는 것이고, 나머지 파일들은 효과적으로 트리쉐이킹될 수 있다.

<br />

### 개발자가 할 수 있는 것들
1. **ESM 사용하기**
   - CommonJS(require) 대신 ES Modules(import/export) 사용
   - 동적 import는 필요한 경우에만 제한적으로 사용
2. **선택적 import 활용**
```ts
// ❌
import * as utils from './utils';
 
// ✅
import { customUtil } from './utils';
```
3. **사이드 이펙트 최소화**
   - 전역 객체 수정을 피하기
   - 순수 함수 지향하기
   - package.json에 sideEffects 필드 명시

<br />
<br />

![](2.png)

<br />
<br />


[참고]
[https://gamguma.dev](https://gamguma.dev/post/2024/11/js_treeshaking)

```toc
```
