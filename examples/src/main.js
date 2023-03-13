import { foo } from './foo.js';
import { test } from './nest/test.js'; 

import user from '../static/user.json';

const { test1 } = require('./nest/test1.cjs');

foo();
test();
test1();

console.log('main.js');
console.log(JSON.parse(user));