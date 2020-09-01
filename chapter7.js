const { default: Axios } = require("axios")

/*
setTimeout, setInterval 함수
각각 주어진 시간 후에 매개변수로 주어진 함수를 실행하거나, 주어진 시간의 간격으로 함수를 반복 실행할 수 있다.
*/
setTimeout(function(){
    console.log(2000)
},2000) // 2초 후에 2000이 출력된다.
/*
setInterval, setTimeout 함수는 식별자를 반환한다. clearInterval, clearTimeout을 호출함으로써 setInterval, setTimeout 함수를 끝낼 수 있다.
setInterval의 콜백 함수로 function(){...}을 넣어주면 해당 function은 setInterval 객체의 메소드가 된다.
즉, 콜백함수 내 작성된 this는 실행객체, setInterval 함수를 가리키게 되고, this를 통해 별다른 변수 선언 없이도
함수를 끝내는 것이 가능하다.
*/
let i = 0
setInterval(function(){
    i++
    console.log(i)
    if(i === 5){
        clearInterval(this)
    }
},2000)
//5까지 콘솔에 출력되고 종료된다.

/*
setTimeout은 비동기적 메소드임으로, 비동기적 메소드가 아닌 코드가 전부 끝난 다음에 setTimeout내 콜백 함수가 출력된다.
*/
function func(){
    console.log(1)
    setTimeout(function(){
        console.log(2)
    },0)
    console.log(3)
}
//func() // func 함수는 1, 2, 3을 출력하지 않는다. setTimeout에 전달된 인자가 0이라도 해당 메소드가 비동기적으로 작동하기 때문에
// 콘솔에는 1, 3, 2가 출력된다 

function func(){ // overload function
    console.log(1)
    setInterval(function(){
        console.log(100)
    },1000)
    console.log(2)
}
//func() // setInterval 또한 비동기적 메소드로 간주되어 콘솔에는 1, 2, 100, 100, 100... 이 출력된다.

function func(){
    setInterval(function(){
        console.log(1111)
    },1000)
    setTimeout(function(){
        console.log(2222)
    },1500)
}
//func()
// setInterval, setTimeout 메소드가 전부 비동기적으로 작동하기 때문에 
// 1초 후 1111, 1.5초 후 2222, 그 다음 매 초마다 1111이 출력된다.

/*
동기적 프로그래밍은 블록 내 나열된 작업을 순차적으로 처리한다.
--- Golang ---
fmt.Println("One")
time.Sleep(time.Second * 1000)
fmt.Println("Two")
-> One, 그리고 1초 후 Two가 출력된다.
---

비동기적 프로그래밍은 각 함수 및 메소드의 동작을 기다리지 않고, 실행되는 순간 바로 다음 메소드(및 함수)로 넘어간다.
*/

// 자바스크립트의 비동기 처리는 특정 연산이 끝날 때까지 기다리지 않고 바로 다음 연산을 수행하는 방식이다.
/*
이를 논블로킹 언어라고 부른다.
이러한 비동기적 처리로 웹 상에서는 다양한 형태의 정보를 하나의 화면에 출력해서 보여주거나, 여러 가지 작업을 수행할 수 있다.
예) 인터넷 사이트 게시글 에디터에 글을 작성하면서 사이드바에 띄워지는 배너를 볼 수 있다.  
*/

/*
Promise 객체
자바스크립트 비동기 작업에 사용되는 객체이다.
객체 내 모든 작업이 정상적으로 끝나면 resolve 메소드를 통해 값을 반환한다.
작업이 중간에 실패하면 reject 메소드로 특정 값을 반환하게 할 수 있다.
*/
/*
예) Promise로 구현한 sleep 함수
*/
function sleep(){
    return new Promise((res, rej) => {
        setTimeout(function(){
            res("SLEEP");
        },2000)
    })
}
//이 sleep 함수는 2초 후 resolve 메소드에 매개변수로 주어진, SLEEP 문자열을 반환한다. SLEEP 문자열이 반환될 때까지 다른 연산은 실행되지 않는다.
/*
Promise 객체는 then을 통해 Promise 객체 내 연산이 종료되었을 경우 다음 동작을 지정해 줄 수 있다.
그리고 catch 메소드를 통해 Promise then 체인 내 무언가 잘못되었을 경우의 동작을 지정해 줄 수 있다.
*/
function func(){
    return new Promise((res, rej) => {
        setTimeout(function(){
            res("One")
        },2000)
    })
    .then(resp => {
        return new Promise((res, rej) => {
            setTimeout(function(){
                res(resp + "Two")
            },2000)
        })
    })
    .then(resp => {
        return new Promise((res, rej) => {
            setTimeout(function(){
                res(resp + "Three")
            },2000)
        })
    })
    .then(resp => {
        return new Promise((res, rej) => {
            setTimeout(function(){
                res(resp + "Four")
            },2000)
        })
    })
    .then(resp => {
        return new Promise((res, rej) => {
            setTimeout(function(){
                console.log(resp + "Five")
                res(resp + "Five")
            },2000)
        })
    })
    .catch(err => {
        console.log(err)
        console.log("The error exists")
    })
}
//func() // 10초 후 OneTwoThreeFourFive이 출력된다. then 메소드를 통해서 resolve(여기선 res)가 반환한 값을 다음 코드로 넘겨줄 수 있었다.

/*
async await
함수 앞에 async 키워드를 붙여줌으로써 비동기 함수를 생성할 수 있다.
async 키워드로 생성된 함수는 내부에서 Promise then 체인과 같은 방식으로 Promise 객체를 반환한다.
비동기적 메소드에 await을 붙일 수 있다. 메소드 내 Promise 객체가 resolve 메소드를 통해 값을 반환하기 전까지는,
다시 말해 지정된 비동기적 메소드가 연산을 완료할 때까지 함수가 동작하지 않는다.
async 함수는 비동기적으로 작동하기 때문에 await 내 Promise 동작이 진행되는 동안 다른 작업을 처리할 수 있다.
*/
async function fetchAPI(){
    const resp = await Axios.get("https://example.com")
    console.log(resp.status)
    // example.com에 http 요청 및 값 반환이 완료될 때까지 console.log가 동작하지 않는다.
}
function withAsyncFunc(){
    fetchAPI()
    console.log(1000)
}
//withAsyncFunc()
// 1000이 먼저 출력되고 그 다음 fetchAPI, 비동기적 메소드에 있는 console.log(resp.status)가 실행된다.
// async 함수 내에선 await의 존재 덕분에 Get 요청이 완료된 직후 resp.status가 출력된다.

// async await으로 비동기식 코드를 동기식으로 작성할 수 있다.
async function withAsyncFunc(){
    await fetchAPI()
    console.log(1000)
}
withAsyncFunc()
// fetchAPI 함수에 await을 붙여줌으로써 resp.status가 콘솔에 출력된 후 1000이 출력되게 하였다.

/*
Promise.all 메소드를 통해 Iterator, Iterable한 객체의 반복문을 처리할 수 있다.
기본적으로 배열 내 요소는 병렬 처리된다.
*/

const items = [1,2,3,4,5,6,7,8,9]
const _items = items[Symbol.iterator]();
Promise.all(_items).then(value => console.log(...value))

function *gen(){
    for(let i = 0; i < items.length; i++){
        yield items[i]
    }
}
const oneIterable = gen()
console.log(oneIterable) // Object [Generator] {}가 출력된다.

Promise.all(oneIterable).then(el => console.log(el))
/*
Promise.all 메소드로 iterable한 객체, 즉 순회 가능한 객체 내 요소를 순서대로 출력할 수 있다.
Promise.all 메소드 대신 for of 반복문을 사용할 수 있지만 퍼포먼스가 떨어질 수 있다.
eslint vscode 확장 플러그인 설치 후 확인 가능
*/
const twoIterable = gen()
for(let element of twoIterable){
    console.log(element)
}