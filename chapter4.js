/* 
함수형 프로그래밍
High order function, 고차 함수와 Closure, 클로져가 있다.
*/
//아직 bind 함수를 이해하지 못해서 이번주까지 공부할 계획입니다.

/* 
함수를 인자로 받는 함수는 대표적으로 map, forEach, reduce, sort 함수가 있다.
*/
//map 함수 : 배열 내 모든 요소를 입력받아서 주어진 함수에서 반환된 요소로 이루어진 새로운 배열을 반환한다.
let temp = [1,2,3,4,5]
let temp2 = temp.map((element, index) => {
    return Math.pow(element, index)
})
console.log(temp2) // [1, 2, 9, 64, 625]
//forEach 함수 : 각 요소 오름차순 순서에 따라 주어진 함수를 실행한다.
temp.forEach((element, index) => {
    console.log(element*index) // 0, 2, 6, 12, 20
})
//sort 함수 : 배열을 주어진 함수에 따라 정렬한다.
temp.sort((a,b) => b-a); console.log(temp) // [5, 4, 3, 2, 1]
//reduce 함수 : 배열의 각 요소에 대해 주어진 함수를 실행하고 마지막에 하나의 값을 반환한다. 
//콜백 함수의 결과값은 누산기에 저장되어 다음 요소의 연산에 사용된다.
const resultOfReduce = temp.reduce((accumulator, currentValue, index) => {
    console.log(accumulator, index)
    return accumulator + currentValue
})
console.log(resultOfReduce)
//누산기의 초기값은 0이고, 이후 함수 연산에 따라 값이 저장된다.
//filter 함수 : 배열 각 요소 중에서 주어진 조건에 만족하는 요소 값을 모아 새로운 배열을 반환한다.
let firstArr = ["Kimchi","Banana","Egg","Hotdog","Apple","Orange","Kiwi"]
let filtered = firstArr.filter((element) => element.length > 5)
console.log(filtered) // ["Kimchi","Banana","Hotdog","Orange"]

//bind 함수 : 새로운 함수를 생성한다.
//아직 bind 함수를 이해하지 못해서 이번주까지 공부할 계획입니다.

//클로져 : 함수형 프로그래밍 패러다임의 대표적인 특성이다.
//이미 생명주기가 끝난 외부 함수의 변수를 참조할 수 있는 변수라고 한다.
const firstFunc = function() {
    let var1 = 0;
    const secondFunc = function() {
        console.log(++var1)
    }
    secondFunc()
}
//firstFunc 함수가 실행되면 var1을 1 증가시킨 후 콘솔에 출력한다.
//secondFunc 함수는 함수 내 var1이 존재하지 않으므로 스코프 체인을 통하여 상위 스코프(실행 컨텍스트)에 접근하여 값을 구할 수 있다.
//이후 firstFunc 함수가 종료되면 first, secondFunc 실행 컨텍스트가 전부 사라지게 된다.
//따라서 var1을 참조할 수 있는 방법이 사라지게 된다고 코어 자바스크립트에서 적혀있다.
//처음에는 클로져를 단순히 함수를 반환하는 함수인 줄 알았는데 함수 바깥에 있는 변수마저 접근할 수 있다는 것을 이번 과제를 통해 알게 되었다.
const outFunc = function() {
    let spam = 0
    const inFunc = function() {
        return ++spam
    };
    return inFunc()
}

const tempFunc = outFunc()
console.log(tempFunc)
/*
inFunc 함수를 실행한 결과를 리턴하므로 결국 외부함수의 생명주기가 끝나면 spam 변수를 참조할 방법이 사라지게 된다.
*/
const newOuter = function() {
    let spam = 0;
    const newInner = function() {
        return ++spam
    }
    return newInner
}
const newClosure = newOuter()
newClosure()
console.log(newClosure()) // 2
/* 
newInner 함수를 반환했다. newClosure 변수는 newInner 함수를 참조할 수 있게 되고 이후 newClosure를 호출하면
반환된 함수가 실행된다. newInner 함수는 newOuter 함수 내에서 선언되었다.
따라서 newOuter 함수의 LE 또한 유효하게 된다.
스코프 체인에 따라서 spam에 접근하여 1을 증가하게 된다.
자신을 참조하는 변수나 하나라도 존재한다면 가비지 컬렉터가 작동하지 않는다.
newInner 함수가 반환되고 newClosure 변수가 참조함으로써 함수가 실행될 조건을 갖추었다.
따라서 클로져는 외부 함수에서 선언한 변수를 참조하는 내부 함수에서 발생하는 현상이라고 할 수 있다. 
함수가 종료된 뒤에도 선언된 변수 및 함수가 수거되지 않아 메모리 누수라는 문제점이 생기기도 한다.
*/
//IIFE 자기 자신을 호출하는 함수
/*
(function() {
    let a = 0;
    let validate = null
    const inner = function() {
        if(++a >= 10){
            clearInterval(validate)
        }
        console.log(a)
    };
    validate = setInterval(inner, 1000)
})()
*/ //함수에 오류가 있다.
//setInterval의 콜백 함수에서 지역 변수 a를 참조한다.
//함수가 호출되고 생명주기가 끝났지만 inner 함수는 여전히 변수 a를 참조할 수 있다.
//메모리 누수를 막기 위해서는 잔존하는 함수를 참조하는 변수에 원시 타입을 할당하면 된다.
let fn1 = (function(){
    let a = 0;
    const fn2 = function() {
        return ++a
    }
    return fn2
})();
fn1()
console.log(fn1()) // 2
fn1 = "WOW"
console.log(fn1) // 함수 호출 불가능

//객체는 보통 객체 리터럴로 생성한다.
//객체 리터럴을 사용하면 협업도 쉬워지고, 여러 속성 추가도 쉽게 할 수 있다.
//new 연산자 또는 create 메소드를 이용해서 객체를 생성하면 속성 추가할 때 일일이 할당하거나 assign 메소드를 사용해야 한다.

/*
클로져는 함수 내부 로직을 바깥에 노출시키지 않게 하기 위해 사용되기도 한다.
클로져를 사용함으로써 어떤 값을 접근할 수 있게 할지 구분할 수 있다.
*/

let outer = function() {
    let a = 1;
    let inner = function() {
        return ++a
    }
    return inner
}
let outer2 = outer()
console.log(outer2())
console.log(outer2()) // 3
//외부(전역 범위)에서 outer 함수 내부에 선언된 a의 값을 조작할 수 있다.
//outer 함수 외부 범위에서는 outer 변수로 할당된 함수만 실행 가능하다.
//내부에서 반환된 inner 변수(함수)만 접근할 수 있다.

/*
커링 함수 : 함수에 두 개 이상의 매개변수를 부여할 때 하나의 매개변수만 부여받을 수 있도록 구성한다.
함수를 전부 실행하지 않으면 나머지 인자를 받을 때까지 작동하지 않는다.
*/

const curry = function(func){
    return function(num1) {
        return function(num2) {
            return func(num1,num2)
        }
    }
}

//인자가 많아질 수록 코드가 복잡해지는 단점이 있다.
//화살표 함수를 사용하여 한 줄에 표현할 수는 있다.
const compariseTen = curry(Math.max)(10)
console.log(compariseTen) // [Function]
console.log(compariseTen(1)) // 10
const smallObj = new Object()
smallObj.height = 180;
smallObj.weight = 90;
Object.assign(smallObj, {grade : 4.3, fullHear: false})
console.log(smallObj)
/* 
원시 타입을 제외한 다른 내장 객체는 Object의 부분집합이다.
대표적으로 function, Promise, array, set이 내장 객체에 속한다.
숫자(Number), 문자열(String)도 객체의 형태로 선언 가능하다. 원시값과는 타입이 다르게 간주된다.
*/
function innerObj() {
    console.log("Hello World!")
}
innerObj.width = 300; // 속성 추가는 가능
innerObj()

let oneString = "string."
console.log(`${typeof(oneString)}` === "string") //true
console.log(oneString instanceof String) //false

oneString = new String("string???")
console.log(`${typeof(oneString)}` === "string") //false
console.log(`${typeof(oneString)}` === "object") //true
console.log(oneString instanceof String) //true

//new Object()를 통해 object, 객체가 만들어진다.

//심볼 : ECMAScript 6에 추가된 원시 타입 값.
//정의할 때 독립적인 값이 되므로, 같은 값으로 정의해도 서로 다른 값이 된다.
let symbol1 = Symbol("KEY")
let symbol2 = Symbol("KEY")
let sy = {};
sy[symbol1] = "Value1"
sy[symbol2] = "Value2"
console.log(sy[symbol1] === "Value1") //true
console.log(sy[symbol2] === "Value2") //true
console.log(symbol1 === symbol2) // false

//Symbol.iterator 메소드는 iterator 객체를 정의하는데 사용된다.
obj = {}
obj[Symbol.iterator] = function*(){} // 제너레이터
//Symbol.for로 심볼을 정의하면 전역에 걸쳐 존재하는 심볼 테이블을 참조하여 생성된다.
//Symbol.for(문자열)로 심볼을 정의할 때 해당 문자열로 정의된 심볼이 있다면 해당하는 심볼을 반환하게 된다.
//Symbol/keyFor 전역 심볼 테이블에서 심볼의 키 문자열을 반환한다.
let token = Symbol.for("strIng")
console.log(Symbol.keyFor(token))
//심볼 객체는 iterator가 아니다 그래서 for of 또는 Object.keys으로는 원하는 value를 찾을 수 없다.
//JSON stringify도 작동하지 않는다.
//속성을 찾기 위해서는 getOwnPropertySymbols로 찾아야 한다.

//출처
//클로져 : 코어 자바스크립트
//함수형 프로그래밍 : mdn 공식 문서
//객체 더 알아보기 및 Symbol : mdn 공식 문서