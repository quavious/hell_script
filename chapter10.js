//UMD 예제 코드 이해가 안돼서 추후에 다시 공부하겠습니다.
/*
모듈의 발자취
자바스크립트는 애니메이션, 여러 효과와 같은 웹 디자인을 위해 제작되었다.
초창기에는 HTML 파일에 JS 코드를 작성하는 것만 가능했다.
*/
//<script>
// 참고로 let, const가 없어서 var로만 변수 선언 가능했다.
function sum(array) {
    var index = 0;
    var length = array.length;
    var result = 0;
    for(index=0;index<length;index++){
        result += array[index]
    }
    return result
}
var arr = [1,2,3,4,5,6]
document.getElementById("#wrapper").innerHTML = sum(arr);   
//</script>
/*
HTML 파일에 JS 코드를 삽입하게 되면 외부 파일을 따로 사용하지 않아도 된다.
하지만 script 태그 내 작성된 변수와 객체들은 모두 전역 변수, 객체로 취급된다.
코드를 재사용할 수 없어, 다른 프로젝트에서 사용하려면 코드를 그대로 복사해서 사용해야 했다.

자바스크립트 코드를 임의의 JS 파일에 저장한 뒤 HTML 파일에서 불러오는 방법도 있었다.
*/
// <script src="./sum.js"></script> - 위의 sum 함수 코드를 나타냄

//<script>
function multiple(array) {
    var index = 0;
    var length = array.length;
    var result = 1;
    for(index=0;index<length;index++){
        result = result * array[index]
    }
    return result
}
var arr = [1,2,3,4,5];
document.getElementById("#main") = multiple(arr)
//</script>
/*
따로 JS 코드를 작성해도 HTML에서 불러왔을 땐 모든 함수와 변수들이 전역 객체에 선언되어 있다.
그리고 불러오는 파일들의 순서가 변경되면 코드에 오류가 생길 수 있다.
그 외에도 IIFE, 즉시실행함수를 선언해서 전역 공간을 해치지 않는 방법도 있었지만,
로드 순서가 변경되면 코드에 오류가 발생하는 것은 잔존해있었다.
*/
(function print(){
    var num = 0;
    for(var index =0; index<100;index++) {
        num += index;
    }
    console.log(index);
})()
/*
AJAX, Jquery가 탄생한 후에는 프로젝트를 수행할 때 많은 JS 파일을 가져다 쓰게 되었다.
그로 인해 의존성 관리, 로드 시간 지연 문제가 발생했다.
JS 파일을 script 태그로 전부 불러오는 만큼, 
파일의 갯수에 비례하여 웹 페이지의 로딩 시간도 늘어났다.
HTTP 통신을 통해 JS 코드를 다운받을 때 파일을 한 개 씩 불러오기 때문이다.
이는 곧 사용자의 불편함을 초래할 수 있다.
*/

/*
CommonJS가 탄생했다.
CommonJS를 통해 일반적인 프로그래밍 언어와 같이 모듈화 표준을 명세할 수 있게 되었다.
스코프를 전역 객체에서 분리하고, 의존성 관리를 할 수 있게 되었다.
하지만 CommonJS는 서버사이드, 즉 백엔드 개발에만 적용되었고 프론트에서는 사용되지 못했다.
지금 사용하는 NodeJS 또한 CommonJS 기반에서 구축되었다.
모듈 파일마다 각자의 스코프가 설정되어 있으므로, 전역 변수 충돌이 발생하지 않는다.
또한 script 태그와 달리, 필요한 함수나 객체, 변수만을 가지고 올 수 있게 되었다.
모듈은 불러오거나 내보내는 데 CommonJS의 설명을 따르게 된다.
*/
import moduleFunc from "./module.js"
moduleFunc() 
// To load an ES module, set "type": "module" in the package.json or use the .mjs extension. 메시지 발생
// package.json 파일에 "type": "module", 문을 추가해주면 import 문 사용 가능.

// CommonJS는 동기적으로 작동하여, 웹 브라우저에서 사용할 수 없었다.
// 파일을 여전히 한 개 씩 불러와서 웹 페이지의 로딩 속도가 느려지게 되었다.
/*
AMD는 비동기적으로 작동하는 브라우저의 환경에 맞게 모듈을 정의하고 불러올 수 있게 해준다.

웹 페이지 구동에 필수적인 JS 파일만 불러오고 이후 사용자에 필요성에 따라 점차 추가적으로 불러오도록 하는,
lazy-load 기법을 사용할 수 있다.
또한 define 함수를 호출하여 모듈을 한번에 불러올 수 있다.
*/
const mod = define(["./module.js"],["./app.js"], function(moduleFunc, app){
    // moduleFunc, app 이라는 매개변수를 통해 module.js, 및 app.js 모듈에 접근할 수 있다.
    moduleFunc()
    console.log(app)
    return {
        firstModule : moduleFunc,
        secondModule : app,
    }
})
// return 한 객체는 다른 JS 파일에서 불러올 수 있다.
const amdModule = require(mod)

/*
CommonJS 및 AMD 각 모듈이 서로 호환되도록 하기 위해 UMD가 정의되었다.
Webpack 및 Browserify와 같은 번들러를 사용하면 UMD를 지원하는 모듈로 만들 수 있다.
번들러를 따로 사용하지 못하는 경우에는 직접 UMD 모듈을 만들 수 있다.
*/


