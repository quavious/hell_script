/*
예외 처리
예외 처리를 활용하여 코드 실행 중 임의의 문제가 발생할 경우 
프로그램이 중단되지 않도록 할 수 있다.
코드 작성 도중 예상하지 못한 문제가 발생했을 때 전체 코드를 중단시키지 않고,
특정한 코드부터 다시 실행되도록 할 수 있다.
자바스크립트에서 에러는 총 3가지로 나눌 수 있다.
문법 에러, 런타임 에러, 논리적 에러
논리적 에러는 코드의 절차는 옳지만, 논리적인 구성이 올바르게 되지 않았을 경우에 발생한다. 
대표적으로 파이썬에서는 try - exception, 자바스크립트는 try - catch - finally로 처리할 수 있다.
*/

const { default: Axios } = require("axios")

/*
try - catch - finally ... finally는 아직 안 써봤습니다.
코드 실행 중 에러가 발생하면 실행 중인 작업이 중단된다.
try - catch - finally 문을 사용하여 에러가 발생해도 특정 시점에서부터 코드가 실행되도록 작성할 수 있다.
try - catch
에러가 없는 경우 try 스코프의 코드를 실행한다. 
에러가 발생하면 try에 있는 코드를 멈추고 catch 스코프에 작성된 코드가 실행된다.
try 스코프에서 catch 스코프로 이동할 때 실행 컨텍스트가 변경된다.
*/
try {
    anyFunc()
} catch(err) {
    console.log(err)
    // ReferenceError : anyFunc is not defined가 출력된다.
    // VSCode 기준
}
// catch 스코프의 코드를 작성할 때 에러 객체를 매개변수로 넘겨서 사용할 수 있다.
// 에러 객체는 말 그대로 에러에 관련된 정보를 담고 있다.
// 에러 정보는 console.log가 아닌 console.dir를 통해 볼 수 있다.
// console.dir 메소드는 명시된 자바스크립트 객체의 전반적인 정보를 트리 구조로 출력해준다.
// 웹에서만 정보를 볼 수 있다. NodeJS에서 실행시 log 메소드를 사용한 것과 같은 결과가 나온다.
// https://stackoverflow.com/questions/11954152/whats-the-difference-between-console-dir-and-console-log log와 dir의 차이
console.dir(["a","b","c"]) // NodeJS 환경이라 log와 같이 ["a", "b", "c"]가 출력됨
/*
에러 메시지에는 대표적으로 다음과 같은 정보를 담고 있다.
name : 해당하는 에러의 이름
message : 에러의 메시지
stack : 에러가 발생한 지점 및 에러의 자세한 내용
constructor : 에러도 엄연한 객체이므로 생성자가 있다.

에러의 종류에 따라서 각기 다른 코드가 실행되도록 할 수 있다.
*/
try {
    anyFunc()
} catch (err) {
    let rand = Math.floor(Math.random()*2)
    if(rand == 1) {
        console.dir(err.name) // rand가 1이면 에러의 이름 출력
    } else {
        console.dir(err.constructor) // 0 또는 2이면 에러의 생성자 출력
    }
}
/*
에러의 발생 여부와 관계없이 특정한 코드를 실행하고 싶을 경우
finally 스코프 내에서 코드를 작성하면 된다.
*/
try {
    let rand = Math.floor(Math.random()*2);
    const num = 0;
    if(rand == 1) { // rand가 1이면 그 전에 선언된 변수, num을 출력하도록 한다.
        console.log(num)
    } else {
        console.log(aaaaaaaa) // aaaaaaaa 변수가 선언되지 않아 오류 발생
    }
} catch(err) {
    console.log("This is Error Scope")
} finally {
    console.log("This Code would be Always Executed")
    // 에러의 유무와 관계없이 항상 실행된다.
    // 에러가 없어도 실행되므로 try, finally 만으로 작성해도 코드는 정상 작동한다.
}

/*
어떤 상황이 에러가 아닌데도 특정 조건 상에서 의도적으로 에러를 발생할 수 있다.
throw 구문 - 에러를 강제로 발생시킨다.
throw는 에러의 생성자를 새로 호출함으로써 사용할 수 있다.
원하는 메시지를 생성자에 매개변수로 입력하면 에러 메시지를 속성으로 하는 에러가 발생된다.
*/
try {
    console.log("Hello")
    throw new Error("I am a custom error which is not error : )")
} catch(e) {
    console.log(e.message)
}
/*
Promise 객체는 세 가지의 상태가 있다.
Promise의 상태가 rejected일 경우, then 메소드에 넘겨준 콜백 함수 중에서
rejected에 해당하는 콜백 함수만 실행된다. catch와 마찬가지로 에러 객체를 매개변수로 받아 활용할 수 있다.
*/
const prom = new Promise((resolve, reject) => {
    let rand = Math.floor(Math.random()*2)
    if(rand == 1) {
        resolve("GOOD")
    } else {
        reject("BAD")
    }
})

prom.then(resp => {
    console.log(resp)
}).catch(err => {
    const e = new Error(err) 
    console.log(err) // reject 메소드에 넘겨준 매개변수가 출력된다.
    console.log(e) // err 문자열을 메시지로 하는 에러 객체 출력
})

// then에 두 번째 매개변수에 콜백 함수를 전달함으로써 에러가 출력되도록 할 수도 있다.
prom.then(resp => {
    console.log(resp)
}, e => {
    console.log(e) // reject에 넘겨준 값이 실행된다.
})


// then 메소드에는 두 개의 콜백 함수를 넣을 수 있다.
/*
여러 개의 then 메소드가 작성된 상황에서 두 번째 콜백함수가 일부에만 선언되었을 경우,
에러가 발생할 때 두 번째 콜백 함수, 즉 에러 처리 함수가 선언된 then 메소드의 에러 콜백 함수부터 코드가 실행된다.
해당하는 then 메소드의 첫 번째 콜백 함수는 실행되지 않는다.
*/

prom.then(resp => {
    console.log(resp, "그리고 하나")
    return "둘"
}).then(resp => {
    console.log(resp)
    return "셋"
}).then(resp => {
    console.log(resp)
}, err => {
    console.log(err) // 에러 발생 시 여기서부터 실행된다.
}).then(resp => {
    console.log("넷") // reject에 넘겨준 에러 값 그리고 "넷"만 출력된다.
})

/*
catch 메소드로 에러 처리할 경우
그 전에 에러 처리 코드가 실행되면 catch 메소드는 실행되지 않는다.
catch 문 이전의 코드가 에러 처리 포함하여 "정상적으로" 실행되었기 때문으로 보인다.
*/

/*
Promise 객체는 에러 처리에 콜백을 사용하여 자칫하면 코드가 복잡해질 수 있다.
async - await을 사용하여 try - catch 에러 처리와 비슷하게 예외 처리가 가능하다.
await 상태에서 받은 데이터의 상태가 rejected일 경우 catch 문이 작동하도록 할 수 있다.
*/

// async 함수로 비동기 함수를 명시할 수 있다.
/*
async 함수 내에서 비동기 코드를 작성할 때 await을 작성하여
해당 비동기 코드의 실행이 완료되어 값이 전달될 때까지 async 함수의 실행을 멈출 수 있다.
*/
async function noFetch() {
    try {
        const resp = await Axios.get("https://nodomain.nowhere")
        console.log(resp)
    } catch(err) {
        console.log(err.message) // getaddrinfo ENOTFOUND nodomain.nowhere
    }
}
noFetch()
//await을 작성하지 않을 경우 then 메소드를 사용해야 정상적인 에러 처리가 가능하다.

// 추가
/*
비동기 함수의 콜백 내에서 발생한 에러는 콜백 외부에 선언된 try - catch 문에서 포착할 수 없다.
비동기 함수 내 선언된 콜백 함수가 실행될 때에는 try - catch 문 또한 같이 실행된다.
콜백 함수가 실행될 때에는 try - catch 문은 이미 실행이 끝난 상태이다.
따라서 에러가 발생하더라도 catch 문이 없어 에러 처리가 되지 않는다.
비동기 콜백 내부에 try - catch 문을 선언하여 정상적인 에러 처리가 진행되도록 할 수 있다.
*/

// 추가
/*
C, C++과 다르게 자바스크립트는 세미콜론(;)을 붙이지 않아도 에러가 발생하지 않는다.
세미콜론이 적혀 있지 않아도 개행문자를 세미콜론으로 간주하기 때문에 따로 오류가 발생하지 않는다.
*/
try {  
    console.log("하나")
    console.log("둘");
    console.log("셋"); console.log("넷") //오류 발생하지 않음
    //console.log("다섯") console.log("여섯") //오류가 발생한다.
} catch(err) {
    console.log(err.name)
}
/*
Error() 생성자를 사용하여 특정한 에러 객체를 새로 생성할 수 있다.
에러 처리시 흔히 볼 수 있는 ReferenceError, SyntaxError 와 같은 에러 구문은
Error() 생성자에서 상속된 생성자이다.
*/
const customError = new Error() // 새로운 에러 객체 생성
/*
Golang에서는 예외 처리 작성 방법이 따로 존재하지 않는 대신 에러 변수를 따로 선언하여 에러 내용을 확인할 수 있다.
req, err := http.NewRequest("GET", url, nil)
if err != nil {
    log.Fatalln(err) - NewRequest 메소드 실행에 오류가 생기면 err 변수에 에러 정보가 담기게 된다.
}
client := &http.Client{}
resp, err := client.Do(req)
if err != nil {
    log.Fatalln(err) // GET 요청이 실패할 때 err 변수에 에러 정보가 담겨진다.
}
defer resp.Body.Close()
....
이 다음부터 GET으로 받은 데이터를 사용할 수 있다.
*/
