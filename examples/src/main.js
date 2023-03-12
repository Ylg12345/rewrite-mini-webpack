import { foo } from './foo.js';
import { test } from './nest/test.js';

import user from '../static/user.json';

foo();

console.log('main.js');
console.log(JSON.parse(user));