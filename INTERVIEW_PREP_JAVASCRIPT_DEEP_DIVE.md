# JavaScript Deep Dive - Interview Preparation

## Core JavaScript Concepts Used in Mobile Armour

### 1. Promises & Async/Await

#### What is a Promise?
A Promise represents the eventual completion (or failure) of an asynchronous operation.

**Three States:**
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

#### Example from Project:
```javascript
// From ChatBot.tsx
const sendMessage = async () => {
  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputMessage })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setMessages(prev => [...prev, data.reply]);
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};
```

**Interview Answer:**
"Promises handle async operations. I used async/await syntax which is cleaner than .then() chains. The try-catch handles errors, and finally runs regardless of success/failure - perfect for resetting loading states."


#### Promise Methods:
```javascript
// Promise.all - Wait for all promises
const [products, categories, users] = await Promise.all([
  fetch('/api/products'),
  fetch('/api/categories'),
  fetch('/api/users')
]);

**Interview Answer:**

"I used Promise.all to wait for multiple promises to resolve. It returns an array of results when all promises are resolved, or throws an error if any promise is rejected. This is useful for loading multiple resources in parallel."


// Promise.race - First to resolve/reject
const result = await Promise.race([
  fetch('/api/data'),
  timeout(5000) // Timeout after 5s
]);

**Interview Answer:**

"I used Promise.race to wait for the first promise to resolve or reject. It's useful for setting timeouts or handling race conditions. In this case, it returns the result of the first promise to resolve or reject, or throws an error if the timeout is reached."

// Promise.allSettled - Wait for all, get all results
const results = await Promise.allSettled([
  fetch('/api/products'),
  fetch('/api/orders')
]);
```

---

### 2. Array Methods (Higher-Order Functions)

#### map() - Transform array
```javascript
// From cart
const itemsWithTotals = state.items.map(item => ({
  ...item,
  total: item.price * item.quantity
}));

**Interview Answer:**

"I used map() to transform the cart items. It's a higher-order function that takes a callback function and returns a new array with transformed elements. In this case, it returns a new array with the same items but with an additional total property that is the product of the price and quantity."
```

#### filter() - Select elements
```javascript
// Remove item from cart
const filteredItems = state.items.filter(item => item.id !== productId);
```

**Interview Answer:**
"I used filter() to remove items from the cart. It's a higher-order function that takes a callback function and returns a new array with elements that pass the test. In this case, it returns all items except the one with the matching ID."

#### reduce() - Accumulate values
```javascript
// Calculate cart total
const total = state.items.reduce((sum, item) => {
  return sum + (item.price * item.quantity);
}, 0);
```

**Interview Answer:**
"I used reduce() to calculate the total cart value. It's a higher-order function that takes a callback function and an initial value. The callback function is called for each element in the array, and the result is accumulated in the sum variable. In this case, it multiplies the price by quantity for each item and adds it to the sum."

#### find() - Find first match
```javascript
const existingItem = state.items.find(
  item => item.product._id === productId
);
```

#### some() & every()
```javascript
// Check if any item is out of stock
const hasOutOfStock = items.some(item => item.stock === 0);

**Interview Answer:**
"I used some() to check if any item is out of stock. It's a higher-order function that takes a callback function and returns true if at least one element passes the test. In this case, it returns true if any item has a stock of 0."

// Check if all required fields filled
const allFieldsFilled = fields.every(field => field.trim() !== '');
```

**Interview Answer:**

"I used every() to check if all required fields are filled. It's a higher-order function that takes a callback function and returns true if all elements pass the test. In this case, it returns true if all fields are not empty after trimming whitespace."

---

### 3. Destructuring & Spread Operator

#### Object Destructuring:
```javascript
// From useCart
const { state, addItem, removeItem } = useCart();

**Interview Answer:**

"I used object destructuring to extract the state, addItem, and removeItem properties from the useCart hook. It's a concise way to extract properties from an object and assign them to variables with the same names. In this case, it extracts the state, addItem, and removeItem properties from the useCart hook and assigns them to variables with the same names."

// With renaming
const { data: products, error: fetchError } = useSWR('/api/products');

// Nested destructuring
const { address: { street, city } } = customer;
```

**Interview Answer:**

"I used nested destructuring to extract the street and city properties from the customer object. It's a concise way to extract properties from an object and assign them to variables with the same names. In this case, it extracts the street and city properties from the customer object and assigns them to variables with the same names."

#### Array Destructuring:
```javascript
const [state, dispatch] = useReducer(cartReducer, initialState);
const [isOpen, setIsOpen] = useState(false);
```

**Interview Answer:**

"I used array destructuring to extract the state and dispatch properties from the useReducer hook. It's a concise way to extract properties from an array and assign them to variables with the same names. In this case, it extracts the state and dispatch properties from the useReducer hook and assigns them to variables with the same names."

#### Spread Operator:
```javascript
// Copy array
const newItems = [...state.items, newItem];

**Interview Answer:**

"I used spread operator to copy the state.items array and add the newItem to it. It's a concise way to create a new array with the same elements as the original array, but with an additional element. In this case, it copies the state.items array and adds the newItem to it."

// Copy object
const updatedCustomer = {
  ...customer,
  address: {
    ...customer.address,
    city: 'Melbourne'
  }
};

// Function arguments
const numbers = [1, 2, 3];
Math.max(...numbers); // Same as Math.max(1, 2, 3)
```

---

### 4. Arrow Functions & this Binding

#### Arrow Functions:
```javascript
// Regular function
function add(a, b) {
  return a + b;
}

**Interview Answer:**

"I used regular function to add two numbers. It's a simple function that takes two arguments and returns their sum. In this case, it adds the two numbers and returns the result."

// Arrow function
const add = (a, b) => a + b;



// With block
const processData = (data) => {
  const processed = data.map(x => x * 2);
  return processed;
};
```


#### this Binding:
```javascript
// Regular function - 'this' depends on how it's called
function regularFunc() {
  console.log(this);
}

**Interview Answer:**

"I used regular function to log the value of 'this'. It's a simple function that takes no arguments and returns the value of 'this'. In this case, it logs the value of 'this'."

// Arrow function - 'this' is lexically bound
const arrowFunc = () => {
  console.log(this); // Inherits 'this' from surrounding scope
};



// In React class components
class MyComponent extends React.Component {
  handleClick = () => {
    // Arrow function preserves 'this' context
    this.setState({ clicked: true });
  }
}
```

---

### 5. Template Literals

```javascript
// String interpolation
const greeting = `Hello, ${user.name}!`;

**Interview Answer:**

"I used template literals to interpolate the user.name into the greeting string. It's a concise way to create a string with dynamic content. In this case, it interpolates the user.name into the greeting string."

// Multi-line strings
const html = `
  <div>
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
`;

// Expression evaluation
const total = `Total: $${(price * quantity).toFixed(2)}`;

// Tagged templates (advanced)
const query = sql`SELECT * FROM products WHERE id = ${productId}`;
```

---

### 6. Optional Chaining & Nullish Coalescing

#### Optional Chaining (?.)
```javascript
// Without optional chaining
const street = user && user.address && user.address.street;

// With optional chaining
const street = user?.address?.street;

// With arrays
const firstProduct = products?.[0];

// With functions
const result = obj.method?.();

// From project
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
```

#### Nullish Coalescing (??)
```javascript
// || returns right side for ANY falsy value (0, '', false, null, undefined)
const count = 0;
const display = count || 10; // 10 (wrong!)

// ?? returns right side only for null/undefined
const display = count ?? 10; // 0 (correct!)

// From project
const price = product.newPrice ?? product.price;
```

---

### 7. Closures

#### What is a Closure?
A function that has access to variables in its outer scope, even after the outer function has returned.

```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count is not directly accessible
```

#### In React:
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    // This function closes over 'messages' from outer scope
    console.log(messages.length);
  }, 1000);
  
  return () => clearInterval(timer);
}, [messages]);
```

---

### 8. Event Loop & Asynchronous JavaScript

#### Call Stack, Web APIs, Callback Queue:
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Microtasks (Promises) execute before macrotasks (setTimeout)
```

**Interview Answer:**
"JavaScript is single-threaded. The event loop manages async operations. Synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout). This is why even setTimeout(fn, 0) doesn't run immediately."

---

### 9. Object-Oriented Concepts

#### Classes:
```javascript
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  
  getDiscountedPrice(discount) {
    return this.price * (1 - discount);
  }
  
  static comparePrice(p1, p2) {
    return p1.price - p2.price;
  }
}

const product = new Product('Phone Case', 29.99);
product.getDiscountedPrice(0.1); // 26.99
```

**Interview Answer:**

"I used classes to create a Product class with a constructor, getDiscountedPrice, and static comparePrice methods. It's a simple class that represents a product with a name and price. In this case, it creates a new Product instance with the name 'Phone Case' and price 29.99, and calls the getDiscountedPrice method with a discount of 0.1."

#### Inheritance:
```javascript
class DigitalProduct extends Product {
  constructor(name, price, downloadUrl) {
    super(name, price);
    this.downloadUrl = downloadUrl;
  }
  
  download() {
    window.location.href = this.downloadUrl;
  }
}
```

**Interview Answer:**

"I used inheritance to create a DigitalProduct class that extends the Product class. It's a simple class that represents a digital product with a name, price, and download URL. In this case, it creates a new DigitalProduct instance with the name 'Phone Case', price 29.99, and download URL 'https://example.com/download'."

---

### 10. Module System (ES6 Modules)

```javascript
// Export
export const API_URL = 'https://api.example.com';
export function fetchData() { /* ... */ }
export default MyComponent;

**Interview Answer:**

"I used ES6 modules to export and import variables, functions, and components. It's a simple way to share code between files. In this case, it exports the API_URL, fetchData, and MyComponent variables, and imports them from the utils file."

// Import
import MyComponent from './MyComponent';
import { API_URL, fetchData } from './utils';
import * as utils from './utils';

// Dynamic import
const module = await import('./heavyModule');
```

---

### 11. Error Handling

```javascript
// Try-catch
try {
  const data = JSON.parse(jsonString);
  processData(data);
} catch (error) {
  console.error('Parsing failed:', error.message);
} finally {
  cleanup();
}

**Interview Answer:**

"I used try-catch to handle errors. It's a simple way to catch and handle errors. In this case, it catches the error and logs it to the console."

// Custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

throw new ValidationError('Invalid email');

// Promise error handling
fetch('/api/data')
  .then(res => res.json())
  .catch(error => console.error(error));

// Async/await error handling
try {
  const data = await fetchData();
} catch (error) {
  handleError(error);
}
```

---

### 12. Regular Expressions

```javascript
// From chatbot - extract email
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const email = text.match(emailRegex)?.[0];

// Phone number
const phoneRegex = /(\+?\d{9,15})/;

// Test
const isValid = /^\d{10}$/.test(phoneNumber);

// Replace
const cleaned = text.replace(/[^\d]/g, ''); // Remove non-digits

// Match all
const urls = text.match(/https?:\/\/[^\s]+/g);
```

---

### 13. Local Storage & Session Storage

```javascript
// Set item
localStorage.setItem('cart', JSON.stringify(cartItems));

// Get item
const cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Remove item
localStorage.removeItem('cart');

// Clear all
localStorage.clear();

// Session storage (cleared when tab closes)
sessionStorage.setItem('tempData', 'value');

// From project - storing order data
localStorage.setItem('lastOrder', JSON.stringify(orderData));
```

---

### 14. JSON Methods

```javascript
// Parse JSON string to object
const obj = JSON.parse('{"name":"John","age":30}');

// Convert object to JSON string
const jsonString = JSON.stringify(obj);

// Pretty print
const formatted = JSON.stringify(obj, null, 2);

// Custom serialization
const json = JSON.stringify(obj, (key, value) => {
  if (key === 'password') return undefined; // Exclude password
  return value;
});
```

---

### 15. Fetch API

```javascript
// GET request
const response = await fetch('/api/products');
const data = await response.json();

// POST request
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData)
});

// Error handling
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

// With timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);

const response = await fetch('/api/data', {
  signal: controller.signal
});
```

---

## Common Interview Questions

### Q: Explain event delegation.
**A:** "Event delegation uses event bubbling to handle events at a parent level instead of individual children. Useful for dynamic lists."

```javascript
// Instead of adding listener to each item
document.querySelector('.product-list').addEventListener('click', (e) => {
  if (e.target.matches('.add-to-cart')) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }
});
```

### Q: What's the difference between == and ===?
**A:** 
- `==` compares values with type coercion
- `===` compares values and types (strict equality)

```javascript
'5' == 5   // true (coercion)
'5' === 5  // false (different types)
null == undefined  // true
null === undefined // false
```

### Q: Explain hoisting.
**A:** "Variable and function declarations are moved to the top of their scope during compilation."

**Interview Answer:**

"I used hoisting to move variable and function declarations to the top of their scope during compilation. It's a simple way to move declarations to the top of their scope. In this case, it moves the variable and function declarations to the top of their scope."


```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Equivalent to:
var x;
console.log(x);
x = 5;

// let/const are hoisted but not initialized (Temporal Dead Zone)
console.log(y); // ReferenceError
let y = 5;
```

### Q: What's the difference between var, let, and const?
**A:**
- `var`: Function-scoped, hoisted, can redeclare
- `let`: Block-scoped, not hoisted (TDZ), can reassign
- `const`: Block-scoped, not hoisted (TDZ), cannot reassign

**Interview Answer:**

"I used var, let, and const to declare variables. var is function-scoped, hoisted, and can be redeclared. let is block-scoped, not hoisted (TDZ), and can be reassigned. const is block-scoped, not hoisted (TDZ), and cannot be reassigned."

```javascript
if (true) {
  var x = 1;
  let y = 2;
  const z = 3;
}
console.log(x); // 1
console.log(y); // ReferenceError
console.log(z); // ReferenceError
```

### Q: Explain call, apply, and bind.
**A:** "Methods to set 'this' context:"

```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}

const user = { name: 'John' };

// call - invoke immediately with arguments
greet.call(user, 'Hello'); // "Hello, John"

// apply - invoke immediately with array of arguments
greet.apply(user, ['Hi']); // "Hi, John"

// bind - return new function with bound context
const boundGreet = greet.bind(user);
boundGreet('Hey'); // "Hey, John"
```

---

## Advanced Concepts

### Debouncing & Throttling

```javascript
// Debounce - wait for pause in events
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage: Search input
const handleSearch = debounce((query) => {
  fetchResults(query);
}, 300);

// Throttle - limit execution frequency
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage: Scroll event
const handleScroll = throttle(() => {
  console.log('Scrolled');
}, 1000);
```

### Memoization

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // Heavy computation
  return n * n;
});
```

**Interview Answer:**

"I used memoize to cache results of expensive functions. It's a simple way to cache results of expensive functions. In this case, it caches the results of the expensiveCalc function."

---

**Study these concepts thoroughly - they form the foundation of React development!**
