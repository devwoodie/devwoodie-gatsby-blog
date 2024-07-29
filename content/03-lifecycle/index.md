---
emoji: 🚴
title: 'Component Lifecycle'
date: '2023-03-14'
categories: Dev JS
---

**모든 React Component에는 Lifecycle(수명 주기)이 존재합니다.**  
Component의 수명은 페이지에 렌더링되기 전 준비 과정에서 시작하여 페이지에서 사라질 때 끝납니다.  
라이프 사이클 메서드는 **클래스형 컴포넌트**에서만 사용할 수 있습니다.

라이프 사이클 메서드의 종류는 총 아홉 가지입니다.  
**Will** 접두사가 붙은 메서드는 어떤 작업을 작동하기 **전**에 실행되는 메서드이고, **Did** 접두사가 붙은 메서드는 어떤 작업을 작동한 **후**에 실행되는 메서드입니다.

라이프 사이클은 총 세가지, **Mount, Update, Unmount** 로 나눕니다.

![](https://velog.velcdn.com/images/woodie/post/f25ecd18-82dc-4191-8c61-6e9e087ddb66/image.png)

### Mount

-   DOM이 생성되고 웹 브라우저상에 나타나는 것을 **마운트(Mount)**라고 합니다.

이때 호출하는 메서드는 다음과 같습니다.

![](https://velog.velcdn.com/images/woodie/post/29027a21-6bbd-4e59-91bd-385edeb402bd/image.png)

-   **constructor :** 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
-   **getDerivedStateFromProps :** props에 있는 값을 state에 넣을 때 사용하는 메서드
-   **render :** 준비한 다음 UI를 렌더링하는 메서드
-   **componentDidMount :** 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드

### Update

컴포넌트는 아래 네 가지의 경우 **업데이트(Update)**를 합니다.

-   props가 바뀔 때
-   state가 바뀔 때
-   부모 컴포넌트가 리렌더링될 때
-   this.forceUpdates로 강제로 렌더링을 트리거할 때

이렇게 컴포넌트를 업데이트할 때는 다음 메서드를 호출합니다.

![](https://velog.velcdn.com/images/woodie/post/41640b7d-2579-4e18-b205-2a69a42fa8a5/image.png)

-   **getDerivedStateFromProps :** 이 메서드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출됩니다. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용합니다.
-   **shouldComponentUpdated :** 컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드입니다. 이 메서드에서는 true 혹은 false 값을 반환해야 하며, true를 반환하면 다음 라이프사이클 메서드를 계속 실행하고, false를 반환하면 작업을 중지합니다. 즉, 컴포넌트가 리렌더링 되지 않습니다.
-   **render :** 컴포넌트를 `리렌더링`합니다.
-   **getSnapshotBeforeUpdate :** 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드입니다.
-   **componenetDidUpdate :** 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드입니다.

### Unmount

마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 **언마운트(Unmount)**라고 합니다.

![](https://velog.velcdn.com/images/woodie/post/dc1c6664-9d7c-47ee-b8f3-8ecc4c5d94c6/image.png)

-   **componentWillUnmount :** 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드입니다.


```toc
```