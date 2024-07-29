---
emoji: 🗓️
title: '날짜 계산 (며칠 전, 지정된 날짜까지 배열 반환) Feat. ApexCharts'
date: '2023-03-17'
categories: Dev JS
---

---

업무 진행을 하다가 차트 내에 날짜를 입력하는 부분이 있었다.  
입력하는 날짜 형식이 배열로 지정되어 있어서 **오늘 날짜로 부터 며칠 전까지의 날짜를 구하고 그 사이 기간을 배열로 만드는 작업**을 하였다.

### 오늘 날짜로부터 며칠 전 날짜 구하기

```js
function getFewDays(fewdays){
  let agoDate;
  let date = new Date(); //오늘 날짜 가져오기
  date.setDate(date.getDate() - fewdays); //

  let month = (date.getMonth()+1);
  month = month < 10 ? '0' + month : month;

  let day = date.getDate();
  day = day < 10 ? '0' + day : day;

  agoDate = date.getFullYear() + '-' + month + '-' +  day; // 반환 날짜 형식 yyyy-MM-dd

  return agoDate;
};

getFewDays(5); //오늘 날짜로부터 5일 전 날짜 반환
getFewDays(20); //오늘 날짜로부터 20일 전 날짜 반환
```

파라미터 값으로 며칠전의 날짜를 구할것인지 입력하게 되면 차트 옵션에 맞는 형식으로 날짜를 반환해주는 함수를 만들었다.  
이를 이용해서 오늘 날짜로부터 `getFewDays()`의 반환된 날짜까지를 배열로 만드는 함수를 만들었다.

### 파라미터 값 사이의 날짜를 배열로 반환하기

```js
// 먼저 오늘 날짜를 원하는 형식으로 만들어 준다.
let now;
let nowDate = new Date()
let month = (nowDate.getMonth()+1);
month = month < 10 ? '0' + month : month;

let day = nowDate.getDate();
day = day < 10 ? '0' + day : day;

now = nowDate.getFullYear() + '-' + month + '-' +  day; // 오늘 날짜 yyyy-MM-dd

// 파라미터 값 사이의 날짜 배열 구하기
function getDateRange(param1, param2){  
    let res_day = [];
    let ss_day = new Date(param1);
    let ee_day = new Date(param2);        
        while(ss_day.getTime() <= ee_day.getTime()){
            let month = (ss_day.getMonth()+1);
            month = month < 10 ? '0'+month : month;

            let day = ss_day.getDate();
            day = day < 10 ? '0'+day : day;
            res_day.push(ss_day.getFullYear() + '-' + month + '-' +  day);
            ss_day.setDate(ss_day.getDate() + 1);
    };

    return res_day;
};

// getDateRange() 함수를 이용해서 오늘 날짜와 getFewDays() 함수의 반환 값 까지의 배열을 구한다.
getDateRangeData(getFewDays(20), now); //오늘 날짜로 부터 20일전까지 날짜 배열
```

차트는 원하는 형태로 잘 구현이 되었다.  
여러 레퍼런스를 참고해서 작업을 했고, 차트 라이브러리는 **ApexCharts.js** 를 사용했는데 공식 문서에 레퍼런스도 잘 나와있고 js 프레임워크들에서도 쉽게 사용할 수 있어서 확장성이 넓다. (차트, 그래프 모양이 맘에 들기도 한다.)

**\[Reference\]**

[https://apexcharts.com/](https://apexcharts.com/)  
[https://lts0606.tistory.com/230](https://lts0606.tistory.com/230)

```toc
```