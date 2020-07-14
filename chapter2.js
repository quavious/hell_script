/*
전역 객체
웹 브라우저에서는 window, NodeJS에서는 globalThis라는 이름으로 불린다.
전역 객체에 선언된 변수, 객체, 함수는 모든 곳에서 사용할 수 있다.
alert, console.log와 같은 전역 객체의 속성은 globalThis를 생략해도 호출 가능하다.
전역 객체에는 Array와 같은 내장 객체, 그리고 onload와 같은 브라우저 변수들이 저장된다.
let, const로 선언한 변수 및 함수는 전역 객체에 속하지 않는다.
*/

console.log(globalThis.console.log("HELLO WORLD")) // HELLO WORLD 출력
const name = "NW.LEE"
console.log(globalThis.name !== name) // true 출력

/* 
전역 변수는 사용하지 않는게 좋다. JS의 렉시컬 스코프 특성 때문에, 
함수를 어디서 선언하는지에 따라 스코프가 결정된다.
전역 변수를 사용하면 코드의 로직이 엉키지 않게 된다.
전역 객체를 사용할 경우, window.myObject와 같이 속성을 직접 정해주는게 좋다.
*/

globalThis.myObject = {
    admin : "root",
    pw : "qwerty1234"
}

console.log(myObject.admin) // root 출력됨
console.log(myObject.pw) // qwerty1234 출력됨

/*
원시 타입 = 기본 타입
객체, Object를 제외한 모든 값이다. 값이 정해져 있어 비교가 가능하다.
변수에 저장된 값은 직접 바꿀 수 없고, 다른 값의 대입만 가능하다.
Number, Boolean, String, null, undefined가 속한다.
Number 자료형은 모든 실수를 표현할 수 있다. 무한대의 값을 나타내는 +- Infinity 값도 존재한다.
String 자료형은 일부를 수정하여 다른 값을 만들 수 있다.
*/

console.log(1000000000000 < Infinity) // true
console.log("ABCDEFG".slice(0,4)) // "ABCD"

/*
참조 타입
원시 타입 변수와 다르게 참조에 의해 저장된다.
참조 값, 즉 메모리 주소 값을 다른 변수에 저장함으로써 객체 값을 복사할 수 있다.
*/

let myObject2 = {
    name : "KIM",
    career : "WHITE HAND"
}
/*
실제 값을 복사하지 않고 그 값을 참조하는 메모리 주소 값만 복사하기 때문에
한 참조 변수에서 속성 값을 변경하면 다른 참조 변수도 똑같이 변한다. 
*/

let myObject3 = myObject2;
myObject2.vehicle = "Bus, Metro, Walk(BMW)"
console.log(myObject3.vehicle) // BMW 출력됨

let arr1 = [1,2,3]
let arr2 = arr1
arr1.push(10000)
console.log(arr2) // 1, 2, 3, 10000 출력

/*
메모리 주소 값을 객체 변수에 저장하기 때문에 속성 값이 같아도 주소 값이 다르므로
비교 연산자 사용 시 false가 출력된다. 
비교 시에는 객체의 자료형이 원시형으로 변환된다. 정상적인 코드의 형태는 아니다.
*/

let temp1 = {
    temp: "ABC"
}
let temp2 = {
    temp: "ABC"
}
console.log(temp1.temp === temp2.temp) // true
console.log(temp1 === temp2) // false

/*
메모리 주소는 다르지만 속성 값이 같은 객체를 생성하기 위해서는 속성 값을 직접 순회시켜야 한다.
객체가 중첩된 경우 Structured cloning algorithm을 사용하거나 lodash 라이브러리의 _.cloneDeep(obj) 함수를 사용할 수 있다.
*/

let o1 = {
    a: "123",
    b: "!@#",
    c: 123,
    d: true
}
let o2={};
for(let element in o1){
    o2[element] = o1[element]
}
console.log(o2)

//추신
//C언어의 포인터와 비슷하다.
//int num = 3; int* ptr = &num; printf("%d\n",*ptr); => 3 출력

/*
래퍼 객체 = 원시값의 메소드 설정
값의 직접적인 변경이 불가능한 원시값을 객체로 활용할 수 있게 해 주는 객체이다.
원시 값은 그대로 둔다. 기존 값의 메소드나 속성을 사용할 때 특수한 객체를 생성한다.
이를 원시 래퍼 객체라고 부른다. 해당 줄의 코드가 실행된 후 래퍼 객체는 바로 삭제된다.
각각의 원시값의 자료형마다 제공하는 메소드가 있다.
*/

let str1 = "DRAGON";
console.log(str1.slice(0,4)) // DRAG 출력

/*
str1은 원시값이다. slice 메소드를 사용하면 원시값이 저장된 객체가 따로 생성된다.
새로운 문자열이 출력되고 나서 생성된 객체는 바로 삭제된다.
객체를 사용할수록 웹의 성능 또한 낮아질 수 있기 때문에 브라우저에서는 최대한의 최적화를 수행한다.
*/

let spam = "111"
spam.slice(0,1)
console.log(spam) // 래퍼 객체가 삭제돼서 그대로 111 출력

/*
new String으로 임시 객체가 아닌 문자열 객체를 선언할 수 있다.
생성된 문자열은 문자열처럼 보여도 자료형은 객체, Object이다.
게다가 두 개 이상 선언해서 비교하면, 주소 값이 다르므로 false가 나온다.
*/
let s1 = "ABCDEFG";
let s2 = new String(s1)
let s3 = new String(s2)

console.log(s1 === s2) // false
console.log(s1 === s3) // false