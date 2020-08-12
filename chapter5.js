/*
iterable, iterator 프로토콜
iterable : 순회 가능한 자료구조이다. 배열 내 @@iterator 메소드
다시 말해 Symbol.iterator Symbol은 자바스크립트 내 유일한 값을 띄는 객체이다.
Symbol.iterator 속성 내 함수를 호출하여 iterator 객체를 반환할 수 있다.
*/
let items = [1,2,3,4,5];
let iterItems = items[Symbol.iterator]();
while(true){
    let {value, done} = iterItems.next();
    console.log(value)
    if(done){
        break;
    }
}
// 1, 2, 3, 4, 5, undefined가 출력되었다.
/* 
iterator 객체의 next 메소드를 호출할 때 value와 done이 반환된다.
value는 차례대로 순회된 값을 나타낸다.
done은 객체 내 순회가 끝났는지 나타내는 boolean 값이다.
위에 있는 while 문도 조건이 true이나, done이 true가 되면 순회가 끝난다.
for of 반복문으로 순회를 좀 더 쉽게 작성할 수 있다.
*/
console.log(iterItems) // 결과 없음
// 한번 iteration이 끝나면 두번 다시 순회가 불가능한 것으로 보인다.
for(let itr of iterItems){
    console.log(itr)
}
for(let itr of iterItems){
    console.log(itr)
}
/* 
맨 위에 있는 while 조건을 false로 바꾸고 for of loop을 실행하였다.
1, 2, 3, 4, 5가 순서대로 출력되었다.
for of loop 또한 한번 호출하면 다시 호출할 수 없다.

async function에서 for of loop을 실행하는 것은 전체 코드 실행에 있어 퍼포먼스 하락의 원인이 된다.
async 함수에서는 Promise all의 사용이 권장된다.
*/
items = [1,2,3,4,5]
iterItems = items[Symbol.iterator]();
async function iter(){
    await Promise.all(iterItems)
    .then(value => console.log(value))
}
iter()
// 순서대로 1, 2, 3, 4, 5가 출력되는 for loop과 next 메소드와는 다르게
// [1, 2, 3, 4, 5], 즉 배열의 형태로 출력된다.
/*
for of 반복문은 iterator 자료구조만 아니라
반복 가능한 모든 객체를 순회할 수 있다.
반복 가능한 모든 객체를 iterable 객체라 부른다.
해당 객체에 Symbol.iterator 속성에 함수가 들어있으면 반복 가능한 객체이디ㅏ.
그리고 iterable 프로토콜을 만족한다고 할 수도 있다.
iterable 객체는 배열 및 문자열, Map, Set 자료구조 또한 포함한다.
Symbol.iterator 메소드를 호출할 수 있으며, 호출함으로써 이터레이터로 만들 수 있다.
iterable 객체라면 for of 반복문, yield, 구조 분해 할당 등을 수행할 수 있다.
또한 for of 반복문으로 출력할 수 있다.
*/
// -> iterable 객체는 Symbol.iterator 속성 내 함수를 호출하여 iterator로 만들 수 있다.
let obj = {
    name: "Dankook Kim",
    age : 22,
    prop1 : "ABC",
    prop2 : "DEF"
}
/*
    let iterObj = obj[Symbol.iterator]();
    for(let o of iterObj){
        console.log(o)
    } // obj[Symbol.iterator] is not a function 오류
*/
/* 
일반 객체(Object)는 순회가 불가능하여. Object.keys(obj) 또는 Object.values(obj)를 호출하여
iterable 객체로 만들 수 있다.
*/
let str = "HELLO_WORLD";
let iterStr = str[Symbol.iterator]();
for(let s of iterStr){
    console.log(s)
} // H, E, L, L, O, _, W, O, R, L, D가 출력된다.
/*
제너레이터 Generator 함수
iterator 객체를 값으로 반환한다.
iterable 객체를 생성할 수 있는 쉬운 방법이다.
순회 과정을 잠시 멈추거나 다시 시작하는 것이 가능하다.
현재 객체의 상태를 관리할 수 있으며, 상태 관리 프레임워크 Redux-Saga에서도 Generator를 사용한다.
function*() 구문으로 generator 함수를 생성할 수 있다.
generator 함수에서 반환된 객체는 iterable 이므로, Symbol.iterator 속성 또한 보유하고 있다.
*/
function* gen(){
    yield 5;
    yield 4;
    yield 3;
    yield 2;
    yield 1;
}
console.log(gen) // [GeneratorFunction: gen]이 출력된다.
/* 
yield 키워드는 값을 반환하는 역할을 하지만 여러 개의 yield 문이 있을 경우 
한번에 출력하지 않고 순회하는 순서대로 출력해준다.
*/
let sampleGen = gen()
for(let g of sampleGen){
    console.log(g)
}
//1, 2, 3, 4, 5 출력
sampleGen = gen()
console.log(sampleGen.next()) //value: 5, done: false
console.log(sampleGen.next()) //value: 4, done: false
console.log(sampleGen.next()) //value: 3, done: false
console.log(...sampleGen) // 5, 4, 3이 이미 next 메소드로 출력되고 2, 1 만 남았다.
/*
Generator에 값 전달하는 방법
yield* 구문을 사용하여 타 generator 함수에서 반환된 값을 다른 generator 함수에 전달할 수 있다.
*/

function* innerGen(){
    yield 1
    yield 2
    yield 3
}

function* outerGen(){
    yield* innerGen()
    yield* innerGen()
}

let instanceGen = outerGen()
for(let element of instanceGen){
    console.log(element)
}
// 1, 2, 3, 1, 2, 3이 출력된다.
// generator 함수는 일반 함수를 포함한다. 일반 함수에서 작성할 수 있는 코드는 generator 함수에서도 작성할 수 있다.

function* add(start = 1, param = 2, limit = 300){
    while(start < limit){
        yield start;
        start += param
        param += 2
    }
}
let sample = add()
console.log(...sample)
// 1, 3, 7, 13, 21, 31, 43, 57, 73, 91, 111, 133, 157, 183, 211, 241, 273
// 계차수열을 생성했다.

function* reducer(elements){
    let len = elements.length;
    let index = 1;
    while(index <= len){
        yield elements.slice(0, index)
        index += 1
    }
}
let elements = [1,2,3,4,5,6,7,8,9]
let reduced = reducer(elements)
console.log(...reduced)
/* 
[ 1 ] 
[ 1, 2 ] 
[ 1, 2, 3 ] 
[ 1, 2, 3, 4 ] 
[ 1, 2, 3, 4, 5 ] 
[ 1, 2, 3, 4, 5, 6 ] 
[ 1, 2, 3, 4, 5, 6, 7 ] 
[ 1, 2, 3, 4, 5, 6, 7, 8 ] 
[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*/