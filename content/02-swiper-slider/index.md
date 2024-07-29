---
emoji: 🏄‍♂️
title: 'swiper-slider 라이브러리 사용법(반응형)'
date: '2022-04-26'
categories: Dev JS
---

---

## Swiper

swiper는 slick과 같은 슬라이드 라이브러리이지만 jQuery가 아닌 `JavaScript`를 사용하며 다양한 옵션을 지원해서 사용하기 편합니다. 
그리고 하위 브라우저(IE9)에서도 동작하기 때문에 `크로스 브라우징` 측면에서도 뛰어납니다.

---

### 설치 방법

swiper를 사용하려면 여러가지 방법이 있습니다.  
원하는 방식으로 사용하시면 됩니다.

- `CDN`으로 사용하는 방식
- `swiper 파일`을 직접 다운받아 사용하는 방식
- `npm`으로 설치하여 사용하는 방식

   
**CDN**

```html
<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css"/>

<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
```

---

### 기본 사용법(구조)

사용법은 매우 간단합니다. 슬라이더를 사용하기위해 만들어 놓은 html문서 안에 swiper의 기본 구조에 맞는  
class를 넣어주면 됩니다. 주의할 점은 swiper에서 정해 놓은 `class명`을 지정해줘야 합니다.

**✔ swiper-container > swiper-wrapper > swiper-slide** 구조로 되어 있습니다.  
   
아래 작성된 태그를 보시면  
**< HTML > - 기본 구조**

```html
  <div class="swiper-container" id="my-swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
        <div class="swiper-slide">4</div>
        <div class="swiper-slide">5</div>
    </div>
  </div>
```

   
**< JavaScript >**  
swiper 사용시 `기본적`으로 사용되는 `옵션 요소`들 입니다.

```js
  const slide = new Swiper('#my-swiper', {
    slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
    spaceBetween : 6, // 슬라이드 사이 여백
    loop : false, // 슬라이드 반복 여부
    loopAdditionalSlides : 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
    pagination : false, // pager 여부
    autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
      delay : 3000,   // 시간 설정
      disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
    },
    navigation: {   // 버튼 사용자 지정
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
  })
```

---

### 커스텀 옵션

```js
  freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
  autoHeight : true, // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
  a11y : false, // 접근성 매개변수(접근성 관련 대체 텍스트 설정이 가능) - api문서 참고!
  resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide : true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
  centeredSlides : true // true시에 슬라이드가 가운데로 배치
  allowTouchMove : true, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
  watchOverflow : true // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
  slidesOffsetBefore : number, // 슬라이드 시작 부분 여백
  slidesOffsetAfter : number, // 슬라이드 시작 부분 여백

  pagination : {   // 페이저 버튼 사용자 설정
    el : '.pagination',  // 페이저 버튼을 담을 태그 설정
    clickable : true,  // 버튼 클릭 여부
    type : 'bullets', // 버튼 모양 결정 "bullets", "fraction" 
    renderBullet : function (index, className) {  // className이 기본값이 들어가게 필수 설정
      return '<a href="#" class="' + className + '">' + (index + 1) + '</a>'
    },
    renderFraction: function (currentClass, totalClass) { // type이 fraction일 때 사용
      return '<span class="' + currentClass + '"></span>' +
             '<span class="' + totalClass + '"></span>';
    }
  },
```

---

### 반응형 설정

swiper는 slick과 같이 `breakpoints`라는 객체로 반응형 설정이 가능합니다.

```js
  var swiper = new Swiper('#my-swiper', {
        slidesPerView: 1, //640~1024 해상도 외 레이아웃 뷰 개수
        spaceBetween: 10, //위 slidesPerview 여백
        breakpoints: { //반응형 조건 속성
          640: { //640 이상일 경우
            slidesPerView: 2, //레이아웃 2열
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }
  });
```

---

```toc
```