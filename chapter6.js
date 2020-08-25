//Class in Javascript
//소감 : Dart, 플러터 웹이 무사히 성공적으로 나왔으면 좋겠다.

/*
ES2015 이후, class 표현식을 사용하면 생성자와 같은 기능이 있는 함수를 더 간결하게 정의 가능하다.
ES5 - 생성자 : new Date()와 같이 new의 키워드를 불러옴으로써 통해 날짜 객체를 생성할 수 있다. 생성자는 함수와 같이 선언할 수 있다. 
*/
const todayDate = new Date();
console.log(todayDate);
function Person(name, gender) {
  this.name = name; // Person은 함수이다. 자바스크립트 내에선 함수 또한 객체로 취급되므로 this는 Person 함수(객체), name은 Person의 속성이 된다.
  this.gender = gender;
  this.sayHello = function () {
    console.log(this.name + " said HELLO : )");
  };
}
const kim = new Person("kim", "male"); 
const chi = new Person("bap", "female");
kim.sayHello(); // kim said HELLO : )
chi.sayHello(); // chi said HELLO : )

Person.prototype.eatLunch = function () {
  console.log(this.name + " ate the lunch");
}; // Prototype 문을 이용하여 Person 생성자의 메소드를 추가할 수 있다. 추가된 메소드는 모든 인스턴스에 적용된다.
kim.eatLunch(); // kim ate the lunch
chi.eatLunch(); // bap ate the lunch
/*
클래스는 함수나 객체와 다른 방법으로 선언할 수 있다.
클래스 내에서는 메소드 안에서 super 키워드를 통해 부모 클래스의 메소드와 변수를 사용할 수 있다.
블록 스코프로 취급되어 var로 변수를 선언하지 않는 한 호이스팅이 발생하지 않는다.
렉시컬 스코프를 따르기 때문에 스코프 체인은 적용될 수 있다. 
다시 말해서 클래스 바깥에 선언된 변수는 클래스 내부에서도 접근할 수 있다.
*/
const var1 = "Hello";
class oneClass {
  constructor(var2) {
    this.var1 = var1;
    this.var2 = var2;
  }
  log = function () {
    console.log(this.var1);
    console.log(this.var2);
  };
  concatnate = function () {
    if (typeof this.var2 == "string") {
      let { var1, var2 } = this;
      console.log(var1 + var2);
    } else {
      console.log("NONE"); // if var2 is not string
    }
  };
}

const oneInstance = new oneClass(" World!");
oneInstance.concatnate(); //Hello World!

/*
클래스는 함수 표현식과 같이 클래식 표현식으로도 선언할 수 있다.
표현식을 사용하면 익명 클래스 선언이 가능하다.
*/
const Food = class { // 익명
  constructor({ name, quantity, taste }) { // 구조 분해 할당
    this.name = name;
    this.quantity = quantity;
    this.taste = taste;
  }
  introduce = function () {
    const { name, quantity, taste } = this;
    console.log(
      `The Food is ${name}, ${quantity} items required, and you can feel ${taste} after swallowing...`
    );
  };
};
const oneFood = {
  name: "Kimbap",
  quantity: 6,
  taste: "complex",
};
const foodInstance = new Food(oneFood); //The Food is Kimbap, 6 items required, and you can feel complex after swallowing...
foodInstance.introduce();

/*
클래스를 선언하면 new 연산자와 함께, 클래스와 똑같은 이름의 생성자를 호출할 수 있다.
클래스를 선언식으로 정의하게 되면 생성자와 클래스의 이름이 같게 설정된다.
생성자를 호출할 때에는 반드시 new 연산자를 사용해야 한다.
생성자를 호출하고 매개변수에 값을 전달하면 클래스 속성에 할당된다
생성자를 따로 정의하지 않더라도, 동적으로 속성이나 메소드를 할당하는 것이 가능하다.
*/
console.log(Food === Food.prototype.constructor); //true
class Babo {}
const babo = new Babo();
babo.people = Infinity;
babo.grade = function () {
  return "F";
};
console.log(`The number of Babo people is ${babo.people}`);
console.log(`The average grade of Babo people is ${babo.grade()}`);
/*
클래스 내에서는 생성자 내를 제외하고는 변수 선언이 불가능하다.
메소드 선언하는 방법은 객체(Object)에서 선언하는 방법과 유사하다. 
*/
class Water {
  constructor({ grade, quantity, material }) {
    this.grade = grade;
    this.quantity = quantity;
    this.material = material;
  }
  inspect() {
    console.log(
      `The grade of water is ${this.grade}, ${this.quantity} is here.`
    );
  }
  add() {
    console.log("Purifing water...");
    this.grade += this.material;
    return this.grade;
  }
}
const waterInstance = new Water({
  grade: -400,
  quantity: "300L",
  material: 20,
});
const afterPurifing = waterInstance.add();
console.log(afterPurifing); // -380
/*
waterInstance, oneInstance, foodInstance, babo 전부 클래스로부터 생성된 객체이다. 
자바스크립트 객체의 속성(프로퍼티), 메소드를 보유하고 있다.
이렇게 클래스의 생성자를 통해 생성된 객체를 생성자의 인스턴스라고 부른다.
표현식을 대괄호로 감싸서 메소드를 선언하는 것도 가능하다.
*/
class moreBabo extends Babo {
  constructor(speed, books,  ...originalBabo ) {
    super(originalBabo);
    this.speed = speed;
    this.books = books;
    this.people = originalBabo.people;
    this.grade = originalBabo.grade; // grade와 people은 undefined로 뜬다. 아마도 생성자가 선언된 이후 동적으로 생성된 속성(프로퍼티)는 super로 상속받을 수 없는 것으로 보인다.
  }
  introduce() {
    const { speed, books, people, grade } = this;
    console.log(
      `This people read ${books} books once a year, the number of them is ${people}`
    );
    console.log(
      `The running speed is measured ${speed} km/s, and The bachelor grade is ${grade}`
    );
  }
  ["examine-type"]() {
    const { speed, books, people, grade } = this;
    [speed, books, people, grade].forEach((el) => {
      console.log(typeof el);
    });
  }
}

const moreBaboInstance = new moreBabo(3, 1, BigInt(1000), "D");
moreBaboInstance.introduce(); //grade와 people은 undefined로 뜬다.
console.log(BigInt(100)); //100이 아니라, 100n이 출력된다. BigInt 자료형
//BigInt 객체는 Number 원시 자료형의 정수 값의 범위보다 더 큰 정수를 표현할 수 있다.
moreBaboInstance["examine-type"](); //number, number, undefined, undefined

/*
제너레이터로 메소드를 정의할 수 있다.
함수 표현식과 비슷하게 메소드 이름 앞에 *기호를 붙인다.
특히, Symbol.iterator 메소드를 제너레이터로 지정해주면 클래스의 인스턴스를 iterable로 설정할 수 있다.
constructor는 제너레이터로 만들 수 없다.
*/
class GenClass {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}
for (let n of new GenClass()) {
  console.log(n);
}
class StarClass {
  constructor(num) {
    this.num = num;
  }
  makeGen = function* () {
    for (let j = 0; j < this.num; j++) {
      yield j;
    }
  };
}
const genInstance = new StarClass(10);
const twoGen = genInstance.makeGen();
for (let g of twoGen) {
  console.log(g);
}
console.log(...twoGen); // 없음
//메소드를 제너레이터로 생성해서 하나씩 출력한 후 올바르게 순회된 것을 확인
//제너레이터로 생성되었으므로 twoGen 객체는 iterable임과 동시에 iterator일 것이다. (추측... 비판 환영합니다.)
const threeGen = genInstance.makeGen();
console.log(threeGen.next()); //value : 0, done: false
/*
이미 정의된 클래스를 prototype문으로 속성을 동적으로 할당할 수 있다.
그 외에도 할당 연산자를 이용해서 속성을 지정하는 것도 가능하다.
정식적으로 브라우저가 지원하지 않아서 바벨과 같은 트랜스파일러를 통해 사용할 수 있다.
이를 클래스 필드라고 한다.
*/
StarClass.addOne = 100;
const fourGen = new StarClass(20);
console.log(fourGen.addOne); //undefined. 바벨을 사용하지 않았다.

class RandInt {
  constructor(){
    this._number = Math.floor(Math.random()*100);
  }
  get number(){
    console.log(this._number);
    return this._number;
  }
  set number(newNumber){
    this._number = newNumber;
  }
}
const randInt = new RandInt();
randInt.number; // Random Number
randInt.number = 10000; //undefined
randInt.number // 10000

//Getter와 Setter를 정의한 모습이다.

/*
클래스 상속을 통해서 한 클래스의 메소드와 속성을 다른 클래스에서 받아와서 사용할 수 있다.
extends 키워드를 사용한다. 
클래스 A가 B를 상속받으면, B의 일반적인 메소드와 속성을 A에서도 사용할 수 있다.
super 키워드를 통해서 상위 클래스의 속성과 메소드에 접근한다.
상속을 통해서 클래스의 구조를 구체화할 수 있다.
자바스크립트의 클래스는 최대 하나의 클래스를 상속할 수 있다.
*/
class Parent {
  constructor({name, age, career}){
    this.name = name;
    this.age = age;
    this.career = career;
  }
  introduce(){
    const {name: n, age : a, career: c} = this
    return `My name is ${n}, now i am ${a} years old, and i am a ${c}...`
  }
}
class Children extends Parent{
  constructor({grade, hobby, ...props}){ // 부모 속성을 가져오기 위해 임의의 객체 변수 props를 사용한다.
    super(props) // super 문을 통해 부모 속성을 받아올 수 있다.
    this.grade = grade;
    this.hobby = hobby;
    this.name = props.name;
    this.age = props.age;
    this.career = props.career;
  }
  introduce(){
    const {grade: g, hobby:h} = this
    return super.introduce() + `and I also have got ${g} grade, I like ${h}`
  }
}
const james = new Children({grade : 3, hobby : "watching youtube", name : "James", age : 14, career : "middle school student"})
const str = james.introduce() ///super 문으로 메소드를 정상적으로 상속받기 위해서는 함수 선언문을 사용해야 한다. 이유는 아직 알지 못했다.
console.log(str)
//메소드를 선언할 때는 화살표 함수를 사용하지 않는다.