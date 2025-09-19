---
emoji: 🥨
title: '유용하고 쓸모 있는 타입? Feat. Utility Types'
date: '2025-08-09'
categories: Dev
---

## 유틸리티 타입(Utility Types)?

TypeScript에서 유틸리티 타입은 TypeScript에서 제공하는 여러 전역 유틸리티 타입으로, 일반적인 타입 변환을 쉽게 하기 위해 사용할 수 있다.
유틸리티 타입은 이미 정의해 놓은 타입을 변환할 때 유용하게 쓰이며, 간결한 문법으로 새로운 타입을 정의할 수 있다.

![](1.png)

## 하나씩 알아보자

[타입스크립트 공식 문서](https://www.typescriptlang.org/docs/handbook/utility-types.html)

<br />

### 1. Awaited&lt;T&gt;

Promise<?> 형태의 T 타입을 전달받아, 해당 Promise가 반환하는 리턴값의 타입을 반환한다.<br />
async ~ await의 await 키워드와 유사한 기능을 담당한다.

```ts
type A = Awaited<Promise<string>>;
// type A = string
 
type B = Awaited<Promise<Promise<number>>>;
// type B = number
 
type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean
```

### 2. Partial&lt;T&gt;

T 타입의 일부 프로퍼티만 가질 수 있는 타입(subset)을 반환한다.<br />
모든 프로퍼티는 optional로 취급되며, 모든 프로퍼티를 갖지 않는 빈 객체{ }도 허용된다.

```ts
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

### 3. Required&lt;T&gt;

T 타입의 모든 프로퍼티를 필수로 갖는 타입을 반환한다.<br />
기존 타입 내의 모든 optional 프로퍼티는 필수 속성으로 변경되며, 하나의 프로퍼티라도 누락되면 에러가 발생한다.

```ts
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' 
// but required in type 'Required<Props>'.
```

### 4. Readonly&lt;T&gt;

T 타입의 모든 프로퍼티를 readonly(읽기 전용)로 변환한 타입을 반환한다.<br />
readonly 타입을 가진 값은 수정이 불가능하므로, 해당 타입의 값을 변경하게 되면 에러가 발생한다.

```ts
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello";
// Cannot assign to 'title' because it is a read-only property.
```

### 5. Record&lt;K, T&gt;

K를 key로, T를 type으로 하는 새로운 타입을 반환한다.<br />
특정 타입만 키 또는 값으로 갖는 타입을 선언하고자 할 때 사용할 수 있다.

```ts
type CatName = "miffy" | "boris" | "mordred";
 
interface CatInfo {
  age: number;
  breed: string;
}
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
 
cats.boris;
// const cats: Record<CatName, CatInfo>
```

### 6. Pick&lt;T, U&gt;

T 타입에서 2번째 인자로 전달한 타입에 지정된 키만 프로퍼티로 갖는 새로운 타입을 반환한다.<br />
2번째 인자로 지정하는 타입은 단일 타입도 가능하고 아래 예시처럼 유니온 타입으로도 지정할 수 있다.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo;
// const todo: TodoPreview
```

### 7. Omit&lt;T, K&gt;

T 타입에서 2번째 인자로 전달한 유니온에 지정된 키만 프로퍼티로 갖지 않는 새로운 타입을 반환한다.<br />
Pick<T, U> 유틸 타입과 정확히 반대의 기능을 수행한다.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
 
todo;
// const todo: TodoPreview
 
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
 
todoInfo; 
// const todoInfo: TodoInfo
```

```toc
```
