# Preview

JSDoc 기본 개념과 사용법을 익히며 정리한 레포입니다.

<hr/>

# Definition: What is JSDoc?

**JSDoc**은 JavaScript 코드를 **문서화(Document)**하기 위해 만들어진 툴입니다.
더불어 TypeScript 등장 이전 JavaScript 코드에 **타입(type)을 부여**하는 역할을 했습니다.

# Set Up

## 1. Set Up VSCode

1. Global Setting

- setting.json에서 다음 설정을 추가한다.
- `"js/ts.implicitProjectConfig.checkJs": true`

2. Local Setting

- type check 하고 싶을 파일 상단에 `@ts-check` 를 추가한다.

## 2. Install json files

1. package.json 파일

- how: `npm init -y`

2. jsdoc 설치

- how: `npm i -D jsdoc`

## 3. Set Up json files

1. package.json 설정: jsdoc 실행 명령어 추가

```
  {
    "name": "jsdoc-sample-dahye1013",
    "author": "dahye",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "docs": "jsdoc -c jsdoc.json" //jsdoc config 파일 기준으로 생성
    },
    "keywords": [],
    "license": "ISC",
    "devDependencies": {
      "jsdoc": "^3.6.10"
    },
    "type": "module"
  }
```

2. jsdoc.json 설정

- how: manually
- where: package.json 파일과 같은 라인
- what: 자세한 설정은 아래 코드 참조
  (1) 공식 웹사이트에서 제공하는 기본 세팅
  <&rarr> <a href="https://jsdoc.app/about-configuring-jsdoc.html">공식 웹사이트</a> 보러가기
  ```
  {
    "plugins": [],
    "recurseDepth": 10,
    "source": {
      "includePattern": ".+\\.js(doc|x)?$",
      "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
      "allowUnknownTags": true,
      "dictionaries": ["jsdoc", "closure"]
    },
    "templates": {
      "cleverLinks": false,
      "monospaceLinks": false
    }
  }
  ```
  (2) 이 레포에서 사용한 세팅
  <&rarr> <a href="https://www.youtube.com/watch?v=YK-GurROGIg&list=PLb8ihMFBGResk6_ybBhbwsXX5ymmecPKh&index=22">강의(2:29)</a> 보러가기
  ```
  {
    "source": {
      "include": ["src/"],
      "includePattern": ".js$",
      "excludePattern": "(node_modules/|docs)_"
    },
    "plugins": ["plugins/markdown"],
    "templates": {
      "cleverLinks": false,
      "monospaceLinks": false
    },
    "opts": {
      "encoding": "utf8",
      "recurse": true,
      "destination": "./docs/"
    }
  }
  ```

<hr/>

# Types

As mentioned above, the purpose of the JSDoc is to document JavaScript code and **to provide types** to it.

**Types** are roughly categorized **by scopes**:

1. **Global Scope**

2. **Class**

3. **Module**

The belows are the lumpy sortition of types the JSDoc provides:

## Global

`index.js` 에 설정한 변수 또는 함수는 global scope 에서 실행됩니다.

1. Variables(변수):

```
/**
* description
* @types {변수 타입 - ex.number}
*/
```

```
//예시1
/**
 * Student Name
 * @type {string}
 */

const studentName = "Jay Lee";

//예시2
/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [98, 97.7, 76, 89];

```

2. Function(함수):

```
/**
* description of the function
* @param {인자1 타입} 인자1이름 - description of the param
* @param {인자2 타입} 인자2이름 - description of the param ... / 인자 수 만큼 타입 주기
* @return {반환값 타입} -description / 없을 시 {void}
*/
```

## Class

1. Variables(변수):

```
/**
 * Class Example
 * @param {Object} personInfo - Information about the person
 */
class Person {
  constructor(personInfo) {
    /**
     * @property {string} name Person's name
     */
    this.name = personInfo.name;
    /**
     * @property {string} age Person's age
     */
    this.age = personInfo.age;
  }
}
```

2. Method(매서드):

```
//코드 생략...
class Person {
  //코드 생략...
  /**
   * @property {Function} greet A greeting with the name and age
   * @returns void
   */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}
```

아래와 같이 여러 인자를 한 번에 추가할 수도 있습니다.

```
class Person {
  /**
   * @param {{ name: any; age: any; }} personInfo
   */
  constructor(personInfo) {
    /**
    ...코드 생략
```

3. 인스턴스 생성 예제

```
/**
 * Person one
 * See {@link Person}
 */
const person1 = new Person({
  name: "Jay Lee",
  age: 104,
});
```

## Modules

- How:
  `모듈명.js` 생성
  -> 상단에 아래 추가

  ```
  /**
  * 모듈 설명
  * @module 모듈명
  */
  ```

  -> 변수/함수 생성: global scope 에서 다뤘던 것과 같다.

  ```
  //예제
  /**
  * Add two numbers
  * @param {number} n1 - first number
  * @param {number} n2 - second number
  * @returns  {number} - sum of n1 and n2
  */
  export const add = (n1, n2) => n1 + n2;
  ```

  -> `export`/`import`: 방법은 기존 ES6/node.js 와 같다.

  ```
  import {add} from "./calculate.js";
  ```

# Etc

## template 커스터마이징하기

- node_modules 안의 기본 template 설정 파일을 복사하여 내 방식대로 커스텀해 보자. (내 방식대로 홈페이지 화면(view) 꾸미기)

- how:
  `node_modules` -> `jsoc` -> `templates` -> `default` 폴더 통째로 복사
  -> root 에 `default` 폴더 통째로 붙이기(& 폴더명 원한다면 수정) -> root 의 `jsdoc.json`파일 열기 -> 아래와 같이 template 속성 추가 -> 마지막으로 폴더 안의 `public.js` 에서 원하는대로 화면 수정

```

// jsdoc.json
{
"source": {
"include": ["src/"],
"includePattern": ".js$",
"excludePattern": "(node*modules/|docs)*"
},
"plugins": ["plugins/markdown"],
"templates": {
"cleverLinks": false,
"monospaceLinks": false
},
"opts": {
"encoding": "utf8",
"recurse": true,
"destination": "./docs/",
"template": "내 커스텀 템플릿 폴더명" //template 프로퍼티 추가
}
}

```

- **주의!** node_modules 안의 폴더는 대부분의 경우 절대 건드리지 않아야 한다.

## 또다른 Scope 제작하기 (feat. tutorial 페이지 제작)

- 1. `tutorials` 폴더 생성: root 에 또다른 scope 이 될 폴더 추가를 추가해 보자.

  예시로 프로그램을 어떻게 사용하면 좋을지 `tutorial` 페이지를 작성해 보자. 사용자의 편의성을 위해 이러한 `tutorial` 페이지는 만들어 주는 것이 좋다.

- 2. `jsdoc.json` 설정 변경:

  잊지 말자. root 에 또다른 `폴더`을 추가할 때는 항상 root 의 `jsdoc.json`의 `opts`에 추가해 줘야 한다.

  ```
  // jsdoc.json
  //코드 생략
   "opts": {
    "encoding": "utf8",
    "recurse": true,
    "destination": "./docs/",
    "template": "./custom-template",
    "tutorials": "./tutorials"      //tutorial 폴더  추가
  }
  }
  ```

- 3. 파일 생성: `~.js` 또는 `~.md` 등, 원하는 목차대로 파일 생성

- 4. `~.json` 생성: 새로운 scope 안에는 새로운 설정이 존재해야 한다. 새로 만든 `tutorials` 폴더 안에 `tutorials.jso` 을 추가해 보자.

- 5. 다른 페이지에서 새로운 폴더 링크 걸기

```
// 예시
/**
 * Calculator module - See {@tutorial calculator-tutorial}
 * @module calculator
 */

```

## document 꾸미기

다양한 Block tags 을 이용해 페이지의 얼굴이 될 index.js 를 꾸며보자.
<&rarr> <a href="https://jsdoc.app/index.html">더 다양한 Block Tags 보러가기</a>

```
//index.js

/**
 * @file index.js is the root file of this example app.
 * @author jlee0505 (Hyeonjeong Lee)
 * @see <a href="https://github.com/jlee0505/study-jsdoc"> Check more detail on her GitHub</a>
 */
```

<hr/>

# Reference

<a href="https://jsdoc.app/">JSDoc 공식 웹사이트</a>

<a href="https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html">TS Handbook - JSDoc Reference</a>

<a href="https://www.youtube.com/watch?v=YK-GurROGIg">Documenting Your JavaScript | JSDoc Crash Course</a>

<a href="https://github.com/dahye1013/crash-jsdoc-custom-template"> dahye1013
/ crash-jsdoc-custom-template </a>
