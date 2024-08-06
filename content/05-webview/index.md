---
emoji: 📲
title: 'React-Native-Webview(웹뷰)로 하이브리드 앱 만들기'
date: '2023-06-10'
categories: Dev ReactNative
---

![](1.png)

현재 진행 중인 개발동아리에서 앱을 만들기로 하였다.  
근데 우리는 앱개발자가 없는걸..?  
  
<br/>

그래서 react-native 를 이용해 웹뷰를 만들어 모바일 웹에 씌우기로 하였다.  
이를 **하이브리드앱**이라고 한다.  

<br/>

react-native-webview 를 개발하는 과정에서 엄청난 오류와 시간이 걸렸기 때문에 다음에 작업할 때 이를 방지하기 위해 기록하려고 한다. 처음에 expo를 사용하여 작업을 했지만 알 수 없는 오류들을 해결하는데 시간이 더 걸릴 것 같아서 다 지우고 **react-native-cli** 로 환경 설정을 진행했다.  
나는 mac을 사용하고 있기 때문에 `mac os` 기준으로 작업하였다.  

<br/>

### 1. Homebrew 설치

Homebrew 는 mac용 패키지 관리자이다.  
아래 명령어로 설치하면 된다.

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 설치 완료 후 버전 확인
$ brew --version
```

### 2. rbenv 설치

rbenv 는 Ruby 버전 관리자이다.  
mac에는 기본적으로 Ruby가 설치되어 있지만 버전이 안맞을 수 있기 때문에 버전 확인 후 설치해준다.

```bash
# rbenv 설치
$ brew install rbenv

# 필요한 버전 설치
$ rbenv install 3.1.4

# 설치한 버전을 기본 버전으로 설정
$ rbenv global 3.1.4
rbenv rehash

# Ruby bundler 설치
$ gem install bundler
```

### 3. Node.js 설치

간단하니 넘어가도록 하겠다.  

<br/>

### 4. Watchman 설치

Watchman은 특정 디렉터리나 파일이 변경되면 지정한 동작을 실행할 수 있게 하는 프로그램이다.  
React-Native는 디버그 모드에서, 소스코드가 변경될 때 마다 다시 컴파일해서 화면에 표시해주는데 (Hot reload) 이는 Watchman을 이용해 진행된다.

```bash
# 설치
$ brew install watchman

# 설치 후 버전 확인
$ watchman -version
```

### 5. React Native CLI 설치

```bash
# 설치
$ sudo npm install -g react-native-cli

# 설치 후 버전 확인
$ react-native --version
```

이제 ios 와 안드로이드 화면으로 확인이 가능한 시뮬레이터를 설치해보자

### 6. XCode 설치 (IOS)

react-native 를 이용해 `아이폰앱`을 개발할 것이라면 필수로 진행해야한다.  
앱스토어에서 Xcode 검색 후 설치하면 끝. (다운로드가 오래걸린다ㅎ)  

<br/>

그리고 Xcode의 npm과 같은 의존성 관리자인 cocoapods를 설치한다.

```bash
# 설치
$ sudo gem install cocoapods

# 설치 후 버전 확인
$ pod --version
```

### 7. Android Studio 설치 (Android)

react-native 를 이용해 `안드로이드앱`을 개발할 것이라면 필수로 진행해야한다.

```bash
# JDK 설치

# AdoptOpenJDK/openjdk 이름의 패키지 저장소를 추가
$ brew tap AdoptOpenJDK/openjdk

# 설치 가능한 jdk 목록 확인
$ brew search jdk

# openjdk설치, -case 뒤에 원하는 버전을 입력한다.
$ brew install --cask adoptopenjdk11

# 설치 후 버전 확인
$ javac -version
```

[https://developer.android.com/studio](https://developer.android.com/studio) 에서 **안드로이드 스튜디오**를 설치한다.

**SDK 설정**

1.  Appearance & Behavior > System Settings > Sndroid SDK
2.  SDK Platforms 에서 타깃으로 할 안드로이드 버전을 선택하여 설치한다. (나는 Android 13을 했다.)

**에뮬레이터 설정**

1.  Virual Device Manager 에서 처음엔 설정된 디바이스가 없기 때문에 Create device 버튼을 클릭한다.
2.  원하는 디바이스를 선택후 Next를 클릭한다.

각 항목에 대한 자세한 설명은 아래 안드로이드 스튜디오 공식 문서에서 확인할 수 있다.

[https://developer.android.com/studio/run/managing-avds?hl=ko#createavd](https://developer.android.com/studio/run/managing-avds?hl=ko#createavd)

### 8. 환경변수 설정

안드로이드 스튜디오 환경변수를 설정하기 위해 터미널에 아래 명령어를 입력한다.

```bash
$ vim ~/.zshrc

# 환경변수 창이 열리면 아래 내용을 입력하고 저장한다.
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# 아래 명령어를 이용해 변경사항을 반영시킨다.
$ source ~/.zshrc

# 정상적으로 반영됬는지 확인하기 위해 아래 명령어를 입력한다.
$ adb
```

### 9. React Native 프로젝트 생성

이제 react-native 프로젝트를 생성해보자  
먼저 아래 명령어를 이용하여 버전이 꼬이는 현상을 방지해준다.

```bash
$ npm config set save-exact=true
```

프로젝트를 만들 폴더로 이동하여 아래 명령어를 통해 react-native 프로젝트를 생성한다.

```bash
$ sudo npx react-native init {projectname}— version 0.68.2
```

끝에 버전은 높거나 낮으면 android 와 ios 폴더가 생성되지 않아서 넣어주었다.  
다른 방법은 React의 create-react-app 처럼

```bash
$ sudo npm install create-react-native-app {projectname}
```

CRNA로 설치하는 방법이 있다.

내 기억으로는 CRNA로 작업했던 것 같다.

`실행`

```bash
# android
$ react-native run-android
```

```bash
# ios
$ react-native run-ios

# 기기 변경
$ react-native run-ios --simulator "iphone 14"
```

이제 react-native-webview 로 모바일 웹을 띄우는 작업은 완료했다.  
하지만 웹뷰를 이용할 때 사용자의 로그인 정보를 어디에 저장해야할지, 웹뷰로만 개발했을 때 앱스토어의 심사가 통과될 것인지 등등 생각하고 찾아보고 개발해야 할 것들이 많이 남아있다.  

<br/>

해야지 어쩌겠어

```toc
```