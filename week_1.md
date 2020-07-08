let 변수는 재대입이 가능하다.  
const 변수는 최대 1회의 대입이 가능하다.  
둘 다 같은 이름의 변수 선언을 허용하지 않는다.  
블록 스코프 내에서 작동한다.  
스코프는 현재 접근할 수 있는, 다시 말해서 현재 변수들이 사용될 수 있는 범위이다.
var 변수의 경우 함수 단위로 지정되는 함수 스코프에서 작동한다. 함수 스코프에서 선언되더라도 상위 스코프에서 또한 사용될 수 있다. 이를 호이스팅이라고 한다.  
let, const는 호이스팅이 일어나지 않는다.  

const 변수는 재대입이 불가능하지만, const로 선언된 객체나 배열의 요소를 변경할 수 있다. 다시 말해서 데이터의 주소값이 고정된다.

let a = [1,2];
let b = a;
a.push(1000);
console.log(b) **[1,2,1000]**  
a와 b는 같은 주소값을 보유하고 따라서 하나의 배열을 참조하는 형태로 이루어져 있다.  
a의 데이터가 변하면 b의 데이터도 똑같이 변하게 된다.  
이는 파이썬도 같다.  

<hr/>

sayHello()  
function sayHello() {  
    console.log("hello")  
}  

sayBye()
const sayBye = () => {
    console.log("Bye")
}

sayHello 함수는 정상 작동하나, sayBye 함수는 선언되기 전에 호출되었으므로 작동하지 않는다.  

함수가 다른 함수의 내부에서 정의되었다면, 내부 함수는 외부 함수의 변수에 접근할 수 있다.  
이를 렉시컬 스코핑이라고 부른다.

function bigger() {
    const big = "Bigger";
    function smaller() {
        const small = "smaller";
        console.log(big) **big 변수가 정상 출력된다.**
    }
    console.log(small) **호이스팅이 불가능하여 오류가 발생한다.**
}

렉시컬 스코프는 함수가 호출될 때가 아닌, 정의될 때에 정해진다.  
var name = "aaa"
function log(){
    console.log(name)
}

function wrapper(){
    var name = "bbb"
    log()
}

wrapper() **aaa**가 출력된다.
log 함수가 선언될 당시 console.log의 name 변수는 앞에서 선언된 aaa를 나타내고 있다.  
함수가 선언될 때 함수 내부의 변수는 함수의 상위 스코프에서 제일 가까운 쪽을 참조하게 된다.  
log 함수에서는 console.log의 name은 함수가 호출될 때까지 **aaa**를 참조하게 된다.  
이미 전역변수가 선언되었으므로 다른 값으로 바꾸는 것은 불가능하다.  
이것 때문에 자바스크립트에서 전역 변수를 사용하는 것은 금지되어있다.  
전역 변수를 사용하게 되면 변수를 다시 선언해서 값을 덮어버릴 수 있고, 반대로 다시 선언된 값을 무시할 수도 있다.  
이를 해결하기 위해 함수 내 지역 변수를 선언하거나, 객체에 삽입한다.  

var temp = (function(){
    var x = "local";
    return {
        y: function(){
            console.log(x)
        }
    }
})()

변수 x와 함수 y를 선언함으로써 console.log 함수의 y가 "local" 문자열을 계속 참조하게 한다.  
**IIFE** 표현식을 사용함으로써 함수가 선언되자마자 바로 호출되게 할 수 있다.  
라이브러리 제작에 있어 필수적이라고도 불린다.  
이를 통해 자바스크립트에서 비공개 변수를 선언하는 것이 가능하다.  

제로초 블로그 참조.
<https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e>