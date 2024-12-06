---
emoji: 🍝
title: 'Expo로 React-Native 시작하기, 근데 이제 웹뷰를 곁들인..'
date: '2024-11-13'
categories: Dev ReactNative
---

React-Native cli 환경 설정은 항상 한번에 된 적이 없다.

![](1.png)

그래서 이번엔 Expo를 이용해서 환경 설정을 진행했다.

지금까지 Expo를 사용하지 않은 이유는 장단점이 극명하기 때문이었다.

<br/>

## Expo CLI의 장단점을 가볍게 알아보자

<br/>

### 장점
- 개발 환경 구축이 용이하다.
- Android Studio와 XCode `설치가 불필요`하다.
- 안드로이드 앱과 ios 앱을 `동시에 개발 가능`하다.
- 개발 중 내 실제 디바이스로 개발 과정을 바로 확인할 수 있다.

### 단점
- 빌드 시간이 길다.
- Expo에서 제공해주는 모듈만 사용 가능하다.
- 개발시 `자유도가 낮다.`(Native 모듈의 사용에 제한적)
- 프리티어로 1개월 기준 `최대 30회` 빌드만 가능하다.

<br/>

## 그럼 React-Native CLI의 장단점은?

<br/>

### 장점
- Expo로 사용하지 못하는 `Native 기능`에 접근이 가능하다.
- 빌드 시간이 `상대적으로 짧다.`

### 단점
- Android Studio와 XCode `설치가 필요`하다.
- 초기 개발환경 구축과 앱 개발 시 상대적으로 시간 소요된다.
- Mac일 경우에만 ios 개발 및 배포가 가능하다.

<br/>

![](2.png)

<br/>

## 그럼 Expo로 세팅을 해보자

React-Native CLI 설정만 해오다가 Expo로 세팅하려니까 생각보다 할게 없어서 놀라움..

> 나는 Mac

### 1. expo-cli, watchman install

먼저 expo-cli와 watchman을 설치해준다. (watchman은 mac이라)

```bash
npm install --global expo-cli
```
```bash
brew install watchman
```

### 2. expo init

작업 폴더로 이동한 뒤 프로젝트를 생성해준다.

```bash
expo init projectName
```

### 3. expo login

expo 사이트에서 회원가입을 진행한 후에 아래 명령어로 로그인을 해준다.

앱스토어에서 Expo Go 어플을 다운로드한다.

```bash
expo login
```

### 4. 프로젝트 실행

아래 명령어로 프로젝트를 실행시키고 핸드폰에 앱을 켜면 진행 중인 프로젝트가 나온다.

> 수정할 때마다 변경되는 점이 참 좋은

```bash
npm start

yarn start
```

![](3.png)

<br />

나는 웹뷰로 앱을 만들 것이기 때문에 webview 세팅까지 진행했다. 

### 번외 1. React-Native-Webview 설치

```bash
npx expo install react-native-webview
```

### 번외 2. React-Native-Webview 기본 설정

아래는 내가 설정한 Webview 설정들이다. 

따라해도 되고 안해도 되고

```js
  <WebView
    style={styles.webview}
    source={{ uri: WEB_URI }}
    ref={webviewRef}
    pullToRefreshEnabled={true}
    startInLoadingState={true}
    allowsBackForwardNavigationGestures={false}
    sharedCookiesEnabled={true}
    originWhitelist={['https://*', 'http://*']}
    overScrollMode={'never'}
  />
```

### 이제 개발을 시작해볼까

![](4.png)

```toc
```
