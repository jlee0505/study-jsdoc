// @ts-check
import { add } from "./calculate.js";

/**
 * @file index.js is the root file of this example app.
 * @author jlee0505 (Hyeonjeong Lee)
 * @see <a href="https://github.com/jlee0505/study-jsdoc"> Check more detail on her GitHub</a>
 */

/**
 * Global Variable Type Example: string
//  * @type {string}
 */

const studentName = "Jay Lee";

/**
 * Global Variable Type Example: Array<string>
 * @type {Array<number>}
 */
const grades = [98, 97.7, 76, 89];

/**
 * Global Variable Type Example: Object
 * @type {{id:number|string, text: string}}
 */
const todo = {
  id: "1",
  text: "Hello",
};

/**
 * Global Function Type Example
 * @param {number} amt - Total amount
 * @param {number} tax - Tax percentage
 * @returns {string} = Total with a dollar sign
 */
const calculate = (amt, tax) => {
  return `$${amt + tax * amt}`;
};

/**
 * Global Custom Type Example
 * @typedef {Object} Student
 * @property {number} id - Student ID
 * @property {string} name - Student name
 * @property {string|number} age - Student age (optional)
 * @property {boolean} isActive - Student ID
 */

/**
 * @type {Student}
 */
const student = {
  id: 1,
  name: "Jay Lee",
  age: 20,
  isActive: true,
};

/**
 * Class Example
 * @param {Object} personInfo - Information about the person
 */
class Person {
  /**
   * @param {{ name: any; age: any; }} personInfo
   */
  constructor(personInfo) {
    /**
     * @property {string} name Person's name
     */
    this.name = personInfo.name;
    /**
     * @property {string} age Person's age
     */
    this.age = personInfo.age;
  }

  /**
   * @property {Function} greet A greeting with the name and age
   * @returns void
   */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}

/**
 * Person one
 * See {@link Person}
 */
const person1 = new Person({
  name: "Jay Lee",
  age: 104,
});
