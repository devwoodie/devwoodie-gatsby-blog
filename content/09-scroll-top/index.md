---
emoji: 🏋️
title: 'React Router 페이지 이동 시 스크롤 상단으로 끌어 올리기'
date: '2024-05-19'
categories: Dev React&Next.js
---

![](1.png)

React Router와 같은 라우팅 라이브러리를 사용하여 페이지를 이동할 때
React Router는 React 컴포넌트의 라이프사이클과 히스토리 API를 이용하여 스크롤 위치를 관리하고,<br/>
페이지 간 전환 시 스크롤 위치를 초기화하지 않도록하기 때문에 스크롤 위치가 유지된 채로 페이지가 이동된다.
<br/>
<br/>
이를 해결하기 위해 아래와 같이 컴포넌트를 생성해서 사용하였다.

### ScrollToTop Component

```js
// ScrollToTop.tsx

import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
    children: ReactNode;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{props.children}</>;
}
```

> useLocation을 이용하여 현재 페이지의 경로를 가져오고, useEffect를 이용하여 경로가 변경될 때마다 window.scrollTo(0,0)을 호출하여 스크롤을 페이지의 맨 위로 이동시킨다.

<br/>
<br/>

생성한 ScrollToTop 컴포넌트를 BrowserRouter의 내부에 포함시킨다.

### Router Component

````js
// Router.tsx
...
return(
    <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/project' element={<Project />} />
                    <Route path='/contact' element={<Contact />} />
                </Route>
            </Routes>
        </ScrollToTop>
    </BrowserRouter>
)
...
````

> BrowserRouter는 라우트를 처리하고 URL과 연결된 컴포넌트를 렌더링하는 역할을 합니다. 
따라서 ScrollToTop 컴포넌트를 BrowserRouter내에 배치함으로써 페이지 전환 시 스크롤 위치를 관리하는 데 필요한 동작을 수행할 수 있습니다.

<br/>
<br/>

[출처] [https://velog.io/@blueapple99](https://velog.io/@blueapple99/React-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99-%EC%8B%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%83%81%EB%8B%A8%EC%9C%BC%EB%A1%9C-%EB%81%8C%EC%96%B4-%EC%98%AC%EB%A6%AC%EA%B8%B0)

```toc
```