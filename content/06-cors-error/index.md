---
emoji: 💢
title: 'React 에서 CORS 에러 해결하기'
date: '2023-06-20'
categories: Dev React&Next.js
---

### API 통신이 안된다.. 왜?

**로컬에서는 잘 되는데** 서버에서는 통신이 안되는 이유는 뭘까...

먼저 오류에 대해 알아보자

`오류 내용`

> Access to XMLHttpRequest at '[https://cedarsojt.store:4000/signup/list/country/branch'](https://cedarsojt.store:4000/signup/list/country/branch') from origin '[https://cedarsojt.store](https://cedarsojt.store/)' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcZkC6q%2FbtskBDx9ube%2FPAbKE5Vtkwq2jrdSyLD0I0%2Fimg.png)

오류 내용을 해석해보면

XMLHttpRequest 요청이 CORS(Cross-Origin Resource Sharing) 정책에 의해 차단된 것을 나타냅니다. 이 에러는 요청된 리소스에 'Access-Control-Allow-Origin' 헤더가 없기 때문에 발생합니다.  
  
  
악명 높은 **CORS 에러** 메세지라고 한다.  
웹 개발을 하다 보면 **반드시 마주치는 에러**라고도 한다.  
  
  
프론트 개발자 입장에선 요청 코드를 이상하게 적은 것도 아니고, 백엔드 개발자 입장에선 서버 코드나 세팅이 이상한 것도 아닌데 요청한 자료에 대한 응답을 왜 에러로 줄까?

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FKFwmt%2FbtskAIUupoK%2FOPxQLehH2KKFF1dHuN2jK0%2Fimg.png)

### 🔍 CORS 에러란?

먼저 CORS 에러란 무엇인지 알아봐야한다.

풀어보면 **Cross-Origin Resource Sharing** 이라는 단어로 이루어져 있다.

직역하면 **“교차 출처 리소스 공유 정책”, 엇갈린 다른 출처**를 의미한다.

### 🔍 출처(Origin)란?

보통 사용자는 사이트를 접속할 때 주소 창에 **URL**을 이용해 접근한다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmCUZU%2FbtskEpTr2cr%2FCMS6ZOLC4YH2I0xBauigfk%2Fimg.png)

위 사진처럼 **출처(Origin)**라는 것은 **Protocol + Host + Port** 까지 합친 URL을 의미한다.

API 통신을 할 때 **동일한 출처에 대한 정책**이 지켜지지 않아서 나는 오류인 것이다.

### 🔍 동일 출처 정책이 필요한 이유

동일 출처 정책의 제약이 없다면,

해커가 **CSRF(Cross-Site Request Forgery)**나 **XSS(Cross-Site Scripting)** 등의 방법을 이용해서 개인 정보를 가로챌 수 있다고 한다.

아래는 **동일 출처 정책이 없는 상황**에서 악의적인 홈페이지에 접속하는 상황을 가정한 것이다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fw7K1b%2FbtskBKqtKaz%2FziN3bEu7ywauyi2QzKb6sK%2Fimg.png)

1.  사용자가 악성 사이트에 접속한다.
2.  해커가 몰래 심어놓은 악의적인 JS가 실행되어 사용자가 모르는 사이에 어느 포털 사이트에 요청을 보낸다.
3.  그럼 포털 사이트에서 해당 브라우저의 쿠키를 이용하여 로그인을 하는 등 상호 작용에 따른 개인 정보 응답 값을 받은 뒤, 사이트에서 해커 서버로 보낸다.

이 외에도 사용자가 접속 중인 내부망 IP와 Port를 가져오거나, 해커가 사용자 브라우저를 프록시처럼 악용할 수도 있다.

이를 방지하기 위해 **동일 출처 정책**으로 동일하지 않는 다른 출처의 스크립트가 실행되지 않도록 브라우저에서 사전에 방지하는 것이다.

### 🔍 출처 비교와 차단은 서버가 아닌 브라우저가 한다.

서버에 요청을 했는데 어떤 에러가 뜨면 서버가 문제라고 생각할 수 있지만 출처를 비교하는 로직은 서버에 구현된 것이 아닌 **브라우저에 구현된 스펙**이다.

서버는 리소스 요청에 의한 응답은 말끔히 해주었다. 하지만 브라우저가 이 응답을 분석해서 동일한 출처가 아니면 에러를 보내는 것이다.

몇 가지 예외 조항을 두고 다른 출처의 리소스 요청이라도 이 조항에 해당할 경우에는 허용하기로 했는데, 그 중 하나가 바로 **CORS 정책을 지킨 리소스 요청**이다.

### 🔍 교차 출처 리소스 공유 (Cross-Origin Resource Sharing)

단어 그대로 **다른 출처의 리소스 공유에 대한 허용/비허용 정책**이다.

보안은 당연히 중요하지만, 개발을 하다 보면 기능상 어쩔 수 없이 다른 출처 간의 상호 작용을 해야하는 경우가 있다.

이와 같은 예외 사항을 두기 위해 CORS 정책을 허용하는 리소스에 한해 다른 출처라도 받아들인다는 것이다.  
  

### 🔍 에러가 아닌 해결책?

위에 첨부한 시뻘건 에러 메세지는 브라우저의 동일 출처 정책에 따라 다른 출처 리소스를 차단하면서 발생된 에러이며, CORS는 다른 출처의 리소스를 얻기 위한 해결 방안이었던 것이다.

**SOP(동일 출처)정책을 위반해도 CORS 정책에 따르면 다른 출처의 리소스라도 허용** 한다는 뜻이다.  
  

### 🔍 브라우저의 CORS 기본 동작

1.  **클라이언트에서 HTTP요청의 헤더에 Origin을 담아 전달**
    1.  웹을 HTTP 프로토콜을 이용하여 서버에 요청을 보낸다.
    2.  이때 브라우저는 요청 헤더에 Origin 이라는 필드에 출처를 함께 담아 보낸다.
    3.  ![](https://blog.kakaocdn.net/dn/bAcYAN/btskIdSIxsq/jqTMDQf2eM3X2yQ2vh6Z9k/img.png)
        
2.  **서버는 응답 헤더에 Access-Control-Allow-Origin을 담아 클라이언트로 전달한다.**
    
    ![](https://blog.kakaocdn.net/dn/bLPHvV/btskAImEswp/LvxXEuAx4c2CSfSkJ3Nfc1/img.png)
    
3.  `*은 모든 origin 허용을 뜻한다`
4.  **클라이언트에서 Origin과 서버가 보내준 Access-Control-Allow-Origin을 비교한다.**
    1.  응답을 받은 브라우저는 자신이 보냈던 요청의 Origin과 서버가 보내준 응답의 Access-Control-Allow-Origin을 비교한 후 차단 여부를 결정한다.
    2.  유효하지 않다면 응답을 사용하지 않고 버린다. **(CORS 에러!!!!!!!!!!!)**

### 🔍 CORS 해결책은 서버의 허용이 필요

결론은 **서버에서 Access-Control-Allow-Origin 헤더에 허용할 출처를 기재해서 클라이언트에 응답**하면 되는 것이다.

**첫 번째**로 백엔드 개발자 코드 express server index.js 에 헤더를 추가하여 Origin을 명시하였다.

```js
app.use(function(req, res) {
  res.header("Access-Control-Allow-Origin", "https://cedarsojt.store");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
```

**두 번째**로 어플리케이션 서버에서 CORS를 처리하는 미들웨어를 추가했다.

```js
const express = require('express');
const cors = require('cors');

const app = express();

// CORS 미들웨어 사용
app.use(cors());
```

**세 번째**로 프론트에서 처리할 수 있는 방법을 찾아본 후 적용했다.

1.  **.env 파일 이용**
    1.  .env파일 dev/product 파일 분리해서 API통신 **proxy** 작성
    2.  ![](https://blog.kakaocdn.net/dn/oIMli/btskCrjTgJa/afYJI5VyLPXJfXCwUNJeqk/img.png)
2.  **http-proxy-middleware 사용**
    1.  setupProxy.js 파일 생성
    2.  ![](https://blog.kakaocdn.net/dn/38ICS/btskA7THAt4/CKc2QN8UO12qpUAsstJvyk/img.png)

```toc
```