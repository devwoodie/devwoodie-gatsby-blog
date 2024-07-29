---
emoji: 🚣
title: 'slick-slider 라이브러리 사용법(반응형)'
date: '2022-04-20'
categories: Dev JS
---

---
## slick-slider

slick-slider 는 반응형 웹을 지원하는 jQuery 슬라이더 라이브러리입니다.  
기본 사용법과 반응형 작업방법을 설명 드리겠습니다.

---

### slick 다운로드 및 css,js 파일 로드

slick 메인 홈페이지 오른쪽 상단에 `get it now`를 클릭한 후 다운로드를 진행하거나 그 아래의 CDN주소를 복사해서 `<head>` 태그안에 넣어서 사용하면 됩니다.  
그리고 slick-slider는 jQuery 기반으로 만들어졌기 때문에 jQuery가 필요합니다.

```css
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
JS
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
```
---

### 기본 사용법

slick-slider의 기본 구성은 아래 코드 처럼 div형태로 구성되어 있는 html문서를 슬라이더 형태로 변경해줍니다.

   
**< HTML >**

```html
<div class="slider-wrap">
    <div class="cont">1</div>
    <div class="cont">2</div>
    <div class="cont">3</div>
    <div class="cont">4</div>
    <div class="cont">5</div>
</div>
```

   
**< JavaScript >**

```js
$(function(){
    $('.slider-wrap').slick({
      slide: 'div',        //슬라이드 되어야 할 태그
      infinite : true,     //무한 반복 옵션     
      slidesToShow : 2,        // 한 화면에 보여질 컨텐츠 개수
      slidesToScroll : 1,        //스크롤 한번에 움직일 컨텐츠 개수
      speed : 500,     // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
      arrows : true,         // 옆으로 이동하는 화살표 표시 여부
      dots : true,         // 스크롤바 아래 점으로 페이지네이션 여부
      autoplay : true,            // 자동 스크롤 사용 여부
      autoplaySpeed : 2000,         // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
      pauseOnHover : true,        // 슬라이드 이동    시 마우스 호버하면 슬라이더 멈추게 설정
      vertical : false,        // 세로 방향 슬라이드 옵션
      prevArrow : "<button type='button' class='slick-prev'>Previous</button>",
      nextArrow : "<button type='button' class='slick-next'>Next</button>",
      draggable : true,     //드래그 가능 여부 
      responsive: [ // 반응형 웹 구현 옵션
        {  
          breakpoint: 960, //화면 사이즈 960px
          settings: {
            slidesToShow: 4
          } 
        },
        { 
          breakpoint: 768, //화면 사이즈 768px
          settings: {    
            slidesToShow: 5
          } 
        }
      ]

    });
})
```

slick-slider 옵션 내의 `responsive` 안에 화면사이즈(breakpoint)를 지정해 놓으면 그 안에서는 `settings 값`으로 슬라이드가 변경됩니다.

---
![slick](https://velog.velcdn.com/images/woodie/post/4297932d-46bc-405a-a49b-50ab41d52a17/image.png)

### 자주 사용되는 함수

**slider에 새로운 컨텐츠 추가하기**  
이미 slick이 적용된 상태에서 슬라이더를 동적으로 추가할 때 사용됩니다.

```js
$('.slider-wrap').slick('slickAdd',"<div>새로운 컨텐츠</div>");
```

**slider에 있는 컨텐츠 삭제하기**  
이미 slick이 적용된 상태에서 슬라이더를 동적으로 추가할 때 사용됩니다.

```js
$('.slider-wrap').slick('slickRemove',0);    //특정 인덱스 번호에 있는 slider 삭제
$('.slider-wrap').slick('slickRemove',false);    //false이면 맨 마지막 슬라이더 삭제
$('.slider-wrap').slick('slickRemove',true);    // true이면 맨 앞 슬라이더 삭제
```

**현재 보여지는 슬라이드가 몇번째인지 확인하기**

```js
$('#slider-div').slick('slickCurrentSlide'); 
```

**원하는 슬라이드로 이동하기**

```js
$('#slider-div').slick('goTo', index);
```

---

```toc
```