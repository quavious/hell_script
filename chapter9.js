/*
모듈 : 애플리케이션을 구성하는 요소로서 모듈 코드는 재사용 가능하다.
보통 파일 단위로 분리되어 있다.
애플리케이션은 코드 내 모듈을 명시함으로써 필요한 코드를 불러올 수 있다.
코드의 단위, 또는 쓰임새를 명확하게 분리할 수 있어서 코드의 유지보수를 용이하게 할 수 있다.
또한 개발에 있어 효율성을 높일 수 있다.
필요한 코드만을 불러올 수 있어서, 메모리의 사용량이 감소하는 효과도 있다.

Javascript 모듈은 ES2015부터 지원하기 시작했다.
구형 브라우저는 모듈 문법을 지원하지 않아서 Webpack, Browserify, Gulp와 같은,
서드파티 번들러를 통해 변환 과정을 거쳐, 브라우저가 사용할 수 있는 JS 파일로 만들어준다.

NodeJS에서는 CommonJS를 통해 require 문으로 모듈을 불러올 수 있고,
동시에 module.exports = "모듈"로 모듈을 타 코드에서 불러오도록 할 수 있다.
*/
const {sample} = require("./app");
// app.js에 있는 모듈을 불러오도록 했다. app.js에서는 exports 문이 없어 사실상 사용 불가능...
// module.exports.sample = moduleApp 

/*
혹은 자바스크립트 파일에 다음과 같이 명시함으로써 브라우저에서 사용할 수 있다.
ES201X부터 사용가능한지는 불명
<script src="app.mjs" type="module"></script>
이 때는 확장자가 js가 아닌 mjs이다.
웹 상에서는 확장자를 따로 구분하고 있지는 않다.
한 개의 모듈을 여러 번 불러와도 단 한 번 실행된다.
*/
import {oneLibrary} from "./lib.mjs";
/*
모듈은 기본적으로 strict 모드이다.
JS 파일로 구성되어 있으므로, HTML 주석은 사용할 수 없다.
블록(렉시컬) 스코프를 따르고 있다. 
전역 변수를 선언하더라도 모듈 스코프 내에서 선언된다. window 객체에서 접근하는 것은 불가능하다.
*/
const m = window.oneModule // 불가능

/*
VSCode 및 NodeJS 에서는 CommonJS 모듈의 규칙을 따르고 있다.
import 문을 사용하면 정상적으로 실행이 되지 않아, Babel을 통해 트랜스파일링을 거쳐 주어야 한다.
*/
/*
const module... 및 import module... 와 같은 정적 import 문은 모든 모듈을 불러오고 나서 코드가 실행된다.
반대로 유저의 특정한 동작에 모듈이 작동되도록 할 수 있다.
전체 모듈 로드 시간을 줄일 수 있다. 
*/

//<script type="module">
(async() => {
    const foo = "./lib.mjs"
    const {func1, func2} = await import(foo)
    await func2()
    func1()
    const {func3} = require("./onemodule.js")
    await func3()
    console.log("Module loaded dynamically")
})();
//</script>
//혹은 이렇게도 부분적으로 불러올 수 있지 않을까요
const button = document.getElementById("btn")
button.addEventListener("click", function(){
    const {func4} = require("./onemodule.js")
    func4()
    console.log("Module loaded dynamically...")
})
//버튼만 누를 때 onemodule 모듈을 불러옴

/*
모듈 스코프에서 정의된 변수은 export를 통해 타 코드에서 불러오도록 할 수 있다.
변수의 값이 아닌 변수의 이름을 불러오게 할 수 있다.

*/
const bar = "one"
export {bar}
// 변수를 다른 파일에서 사용할 수 있도록 한다.
// 변수의 이름을 내보냈으므로 named export라고 한다.
// import 또는 require 문을 통해 가져올 수 있다.
import {bar} from "./twomodule.js";
// 변수 뿐만 아니라 함수, 객체 또한 export 가능
const obj = {
    name: "Kim",
    career: "Doctor",
}
export {obj}
import {obj} from "./threemodule.js"
// NodeJS 내장 라이브러리 또는 npm에서 받아온 라이브러리가 아닌 직접 생성한 모듈은 경로 지정을 해주어야 한다.
const fs = require("fs")

// 선언과 동시에 export 할 수 있다.
// export default로 단 하나의 모듈만을 export 할 수 있다.
// export할 때 default가 붙은 모듈은 중괄호 없이 불러올 수 있다.

import Person from "./person.js"
// 이 경우 구조분해할당도 적용된다.
import React, {Component} from "react";
// React.Component 대신 Component만 적어도 된다.

// 모듈을 불러올 때 이름을 따로 지정해 줄 수 있다.

const var1 = 400
export {var1}
import {var1 as Var} from "./fourmodule.js";
// var1으로 export된 변수를 Var로 불러왔다.

const var2 = 400
export {var2 as Var}
import {Var} from "./fivemodule.js";
// Var로 export된 변수를 불러와서 var2의 값을 사용할 수 있다.

/*
import export는 모듈을 내보내거나 사용하도록 명시해주는 것 뿐이다.
현재 웹 브라우저는 ES6 모듈을 지원하고 있지 않다.
script 태그에 type="text/module"을 명세하거나
Webpack, Browserify 등의 라이브러리를 사용해야 한다.

예)
React도 create-react-app으로 실행해서 리액트 프로젝트를 생성 후 열어보았을 때
Webpack 라이브러리가 설치되어 있는 것을 확인할 수 있다.
*/


