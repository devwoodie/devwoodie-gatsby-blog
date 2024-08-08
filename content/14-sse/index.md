---
emoji: 🔔
title: 'SSE(Server-Sent-Events)로 실시간 알림 구현하기'
date: '2024-08-06'
categories: featured-Dev React&Next.js
---

다른 페이지에 있을 때도 알림이 오면 보여주는 기능을 만들려고 한다.
그러기 위해서는 실시간으로 데이터를 받아오는 로직이 필요하다.

`서버에서 클라이언트로 업데이트를 스트리밍 한다는 것`

SSE(Server-Sent-Events) 라는 것을 알게 되었다.

<br/>

## SSE (Server-Sent-Events) 란?

**간단하게 서버의 데이터를 실시간, 지속적으로 Streaming 하는 기술이다.**

<br/>

### SSE 특징

- 서버에서 클라이언트로 실시간 이벤트를 전송하는 웹 기술로 서버에서 발생하는 업데이트나 알림 등을 `실시간`으로 클라이언트에 전달할 수 있다.
- 단방향 통신이기 때문에 `서버에서 클라이언트로`만 데이터를 전송할 수 있다.
- 클라이언트는 HTTP 프로토콜을 통해 SSE 연결을 설정하고, 서버는 HTTP 응답을 유지한 상태에서 데이터를 전송한다.
- `재연결 기능`을 제공하기 때문에 연결이 끊어졌을 때 자동으로 다시 연결한다.

<br/>

### WebSocket과의 차이점

- 가장 큰 차이점은 데이터 흐름에 있다.
    - SSE는 서버 --> 클라이언트 (`단방향` 통신 방식)
    > 일방적인 데이터 전송이 필요한 주가 업데이트, 실시간 알림에 적합
    - WebSocket은 서버 <--> 클라이언트 (`양방향` 통신 방식)
    > 양방향 통신이 필요한 실시간 채팅에 적합
- SSE는 웹 기술이기 때문에 `HTTP 프로토콜` 위에서 동작한다. 
    - 연결된 상태에서는 재연결이나 추가 설정 없이 지속적인 데이터 스트림을 받을 수 있다.
- WebSocket은 `독립적인 프로토콜`을 사용하고 HTTP와는 별도의 연결을 만들어 데이터를 주고 받는다.

<br/>

## SSE를 활용한 실시간 알림 구현하기

![](1.png)

이제 구현해보자.

SSE를 구현하기 위해서는 클라이언트 측과 서버 측에서의 설정과 처리 로직을 구현해야 한다.

`클라이언트` - EventSource 객체 생성, 이벤트를 처리하는 로직 작성<br />
`서버` - SSE 프로토콜 생성, 클라이언트에게 전송할 이벤트 데이터 준비

나는 **Next.js 로 구현**하였다.

<br/>

### EventSource 객체 생성

진행 중인 프로젝트에서 api 호출 시 서버로 x-access-token과 org-id를 header에 담아 보내줘야 했기 때문에 `event-source-polyfill` 이라는 라이브러리를 사용하였다.
```bash
npm i event-source-polyfill
```

`heartbeatTimeout`은 SSE 연결 시간을 뜻하고 **기본 값은 45초**이다.
- 서버로부터 이벤트가 발생하지 않으면 45초마다 재연결을 시도한다.
- 나는 24시간으로 설정했다. (86400000ms)

내가 만든 기능은 **match가 되었을 때 알림을 띄우는 기능**이기 때문에 `matches`에 대한 이벤트 리스너를 작성하였다.

useEffect의 return 값으로 `eventSource.close()` 를 작성하여 컴포넌트가 언마운트 될 때 SSE 연결을 닫도록 설정할 수 있다.

```js
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export const EventComponent = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const handleEventSource = async () => {
        const accessToken = await getCookies('token');
        const org = await getCookies('org');

        const EventSource = EventSourcePolyfill || NativeEventSource;
        // event-source-polyfill 이용한 header 추가
        const eventSource = new EventSource(`${backendUrl}/matches`, {
            headers: {
                'x-access-token': accessToken?.value,
                'org-id': orgId,
                Connetction: 'keep-alive',
            },
            heartbeatTimeout: 86400000,
        });
        // matches 로 들어오는 이벤트 처리
        eventSource.addEventListener('matches', (event: any) => {
            const matchingInfo = JSON.parse(event?.data);
            setEvents(matchingInfo);
        });
        // Error 처리
        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };
        return () => {
            eventSource.close();
        };
    };

        handleEventSource();
  }, []);
}

```
<br/>

작성한 컴포넌트를 RootLayout에 import하여 사용하였다.

SSE가 HTTP프로토콜을 이용하기 때문에 **훨씬 가볍고 코드 작성이 굉장히 간편하다.**
실시간 서비스처럼 빈번한 HTTP요청이 일어나는 프로젝트는 서버의 부하가 심해질 가능성이 매우 높기 때문에 그렇지 않은 프로젝트에서는 WebSocket보다 SSE를 사용하는 것도 괜찮을 것 같다.

<br/>

아래는 Node.js 코드인데 내가 사용했던 코드는 아니지만 이런 틀로 작성하면 될 것 같다.

```js
const express = require('express');
const app = express();
app.get('/events', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  // 이벤트 발생 시 클라이언트로 데이터 전송
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  // 예시: 5초마다 이벤트 전송
  const intervalId = setInterval(() => {
    sendEvent({ message: 'Hello from server!' });
  }, 5000);
  // 클라이언트 연결 종료 시 정리
  req.on('close', () => {
    clearInterval(intervalId);
  });
});
app.listen(3000, () => console.log('Server running on port 3000'));
```



<br/>
<br/>

[참고] [https://velog.io/@mjieun](https://velog.io/@mjieun/ReactNext.js-SSE%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC-%EA%B5%AC%ED%98%84-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%94%A9-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-CSS)

```toc
```