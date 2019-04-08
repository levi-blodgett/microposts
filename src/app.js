//
//// CommonJS Module Syntax
//

// Also the same that you'd do with modules isntalled with NPM
// They'd be inside the node_modules folder
// const person = require('express'); No need for './' since it is an actual node_module
// const person = require('./mymodule1');

//
//// ES2015 Module Syntax
//

// 1st way
// import { person, sayHello } from './mymodule2';
// console.log(person.name);
// console.log(sayHello());

// 2nd way
// import * as mod from './mymodule2';
// console.log(mod.person.name);
// console.log(mod.sayHello());

// 3rd way
import greeting from './mymodule2';
console.log(greeting);

const getData = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
};

getData('https://jsonplaceholder.typicode.com/posts');