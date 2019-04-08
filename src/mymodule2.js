export const person = {
    name: 'John',
    age: 30
}

export function sayHello() {
    return `Hello ${person.name}`;
}

const greeting = 'Hello World';
export default greeting;
// If you use default, you don't have to use the curly braces