# React & JavaScript Concepts - Mobile Armour Project Interview Prep

## Table of Contents
1. [React Hooks](#react-hooks)
2. [Props & Component Communication](#props--component-communication)
3. [State Management](#state-management)
4. [Context API & useContext](#context-api--usecontext)
5. [useReducer Pattern](#usereducer-pattern)
6. [useEffect & Side Effects](#useeffect--side-effects)
7. [useRef Hook](#useref-hook)
8. [Custom Hooks](#custom-hooks)
9. [JavaScript Promises & Async/Await](#javascript-promises--asyncawait)
10. [DOM Manipulation](#dom-manipulation)
11. [Event Handling](#event-handling)
12. [TypeScript in React](#typescript-in-react)

---

## React Hooks

### What are Hooks?
Hooks are functions that let you "hook into" React state and lifecycle features from function components.

### Why Hooks?
- **Before Hooks**: Had to use class components for state and lifecycle methods
- **After Hooks**: Can use state and other React features in functional components
- Cleaner, more reusable code
- Better code organization

### Hooks Used in Mobile Armour Project:

#### 1. **useState** - State Management
```typescript
// From ChatBot.tsx
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([...]);
const [inputMessage, setInputMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

**Interview Answer:**
"I used useState extensively in the chatbot component. For example, `useState(false)` initializes `isOpen` to false, and `setIsOpen` is the updater function. When a user clicks the chat button, I call `setIsOpen(true)` which triggers a re-render with the new state."

**Key Points:**
- Returns array with [currentState, updaterFunction]
- State updates are asynchronous
- Functional updates: `setState(prev => prev + 1)`
- Can store any data type: primitives, objects, arrays

#### 2. **useEffect** - Side Effects & Lifecycle
```typescript
// From ChatBot.tsx - Auto-scroll when messages change
useEffect(() => {
  scrollToBottom();
}, [messages]); // Dependency array

// From ChatBot.tsx - Teaser bubble timer
useEffect(() => {
  const showTimer = setTimeout(() => setIsTeaserVisible(true), 1800);
  const hideTimer = setTimeout(() => setIsTeaserVisible(false), 10000);
  return () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  };
}, []); // Empty array = runs once on mount
```

**Interview Answer:**
"useEffect handles side effects. In the chatbot, I used it to auto-scroll to the latest message whenever the messages array changes. The dependency array `[messages]` means it runs only when messages change. I also used cleanup functions to clear timers, preventing memory leaks."

**Key Points:**
- Runs after render
- Dependency array controls when it runs:
  - `[]` = once on mount
  - `[dep]` = when dep changes
  - No array = every render
- Cleanup function prevents memory leaks
- Replaces componentDidMount, componentDidUpdate, componentWillUnmount

#### 3. **useRef** - DOM References & Mutable Values
```typescript
// From ChatBot.tsx
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};

// JSX
<div ref={messagesEndRef} />
```

**Interview Answer:**
"useRef creates a mutable reference that persists across renders without causing re-renders. I used it to reference the bottom of the chat messages div, so I could programmatically scroll to it when new messages arrive. Unlike state, updating a ref doesn't trigger a re-render."

**Key Points:**
- Doesn't cause re-renders when updated
- Persists across renders
- Common uses: DOM access, storing previous values, timers
- `.current` property holds the value

#### 4. **useContext** - Consuming Context
```typescript
// From useCart.tsx
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Usage in CartPage.tsx
const { state, updateQuantity, removeItem } = useCart();
```

**Interview Answer:**
"useContext lets components consume context without prop drilling. In my cart system, I created a CartContext that provides cart state and methods globally. Any component can call `useCart()` to access cart data without passing props through multiple levels."

#### 5. **useReducer** - Complex State Logic
```typescript
// From useCart.tsx
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product._id === action.payload.product._id
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { items: updatedItems, total: calculateTotal(updatedItems) };
      }
      // ... more logic
    }
    case 'REMOVE_ITEM': // ...
    case 'UPDATE_QUANTITY': // ...
    case 'CLEAR_CART': return { items: [], total: 0 };
  }
};

const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
```

**Interview Answer:**
"useReducer is like useState but for complex state logic. In my cart, I needed to handle multiple operations: add, remove, update quantity, clear. Instead of multiple useState calls, I used useReducer with a reducer function that takes current state and an action, returning new state. It's similar to Redux but built into React."

**Key Points:**
- Better for complex state logic
- Predictable state updates
- Similar to Redux pattern
- Takes reducer function and initial state
- Returns [state, dispatch]

#### 6. **useRouter & useSearchParams** (Next.js Hooks)
```typescript
// From ProductsPage
const router = useRouter();
const searchParams = useSearchParams();
const selectedCategory = searchParams.get('category');

// Navigate programmatically
router.push('/products?category=Cases');
```

**Interview Answer:**
"These are Next.js hooks for routing. useSearchParams reads URL query parameters, which I used for category filtering. useRouter provides navigation methods like `push()` for programmatic navigation. This enables bookmarkable filter states - users can share URLs with active filters."

---

## Props & Component Communication

### What are Props?
Props (properties) are how components communicate. They're read-only data passed from parent to child.

### Examples from Project:

```typescript
// Parent: ProductsPage.tsx
<FilteredProductGrid 
  category={selectedCategory || undefined} 
  filters={activeFilters}
/>

// Child: FilteredProductGrid.tsx
interface FilteredProductGridProps {
  category?: string;
  filters?: Record<string, string[]>;
}

const FilteredProductGrid: React.FC<FilteredProductGridProps> = ({ 
  category, 
  filters = {} 
}) => {
  // Use props here
}
```

**Interview Answer:**
"Props enable parent-child communication. In my products page, I pass `category` and `filters` props to FilteredProductGrid. The child component receives these as function parameters. Props are immutable - the child can't modify them. For two-way communication, I pass callback functions as props."

### Callback Props (Lifting State Up)
```typescript
// Parent: ProductsPage
const handleFiltersChange = (filters: Record<string, string[]>) => {
  setActiveFilters(filters);
};

<AdvancedProductFilter onFiltersChange={handleFiltersChange} />

// Child: AdvancedProductFilter
interface AdvancedProductFilterProps {
  onFiltersChange?: (filters: Record<string, string[]>) => void;
}

// When filter changes
onFiltersChange?.(newFilters); // Call parent's callback
```

**Interview Answer:**
"For child-to-parent communication, I pass callback functions as props. When a user selects a filter in AdvancedProductFilter, it calls `onFiltersChange(newFilters)`, which updates the parent's state. This is called 'lifting state up' - the parent manages state, children notify about changes."

---

## State Management

### Local State vs Global State

**Local State (useState):**
```typescript
// Component-specific state
const [isOpen, setIsOpen] = useState(false);
```

**Global State (Context API):**
```typescript
// Available to entire component tree
const CartContext = createContext<CartContextType | undefined>(undefined);
```

**Interview Answer:**
"I used local state for UI-specific data like modal open/close states. For data needed across multiple components like the shopping cart, I used Context API for global state. This avoids prop drilling and keeps related components in sync."

### When to Use Each?

| Local State | Global State |
|-------------|--------------|
| UI state (modals, toggles) | User authentication |
| Form inputs | Shopping cart |
| Component-specific data | Theme/language |
| Temporary data | App-wide settings |

---

## Context API & useContext

### Creating Context

```typescript
// 1. Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Create Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, ... }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Create Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

**Interview Answer:**
"Context API provides global state without prop drilling. I created a CartContext with three steps: 1) Create context with createContext, 2) Create a Provider component that wraps the app and provides values, 3) Create a custom hook (useCart) that uses useContext to consume the context. Any component can now call useCart() to access cart state and methods."

### Why Context Over Props?

**Without Context (Prop Drilling):**
```
App → Header → Nav → CartButton (needs cart count)
  ↓ pass cart
  ↓ pass cart
  ↓ pass cart
  ✓ use cart
```

**With Context:**
```
App (CartProvider wraps all)
  → CartButton (useCart() directly)
```

---

## useReducer Pattern

### Reducer Function Structure

```typescript
type Action = 
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default:
      return state;
  }
};
```

**Interview Answer:**
"A reducer is a pure function that takes current state and an action, and returns new state. It's predictable and testable. I used it for cart management because I had multiple related operations. Instead of separate setState calls, I dispatch actions like `dispatch({ type: 'ADD_ITEM', payload: product })`. The reducer handles the logic centrally."

### useState vs useReducer

| useState | useReducer |
|----------|------------|
| Simple state | Complex state logic |
| Single value | Multiple related values |
| Direct updates | Action-based updates |
| `setState(newValue)` | `dispatch({ type, payload })` |

---

## useEffect & Side Effects

### Common Use Cases

#### 1. Data Fetching
```typescript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };
  fetchData();
}, []); // Run once on mount
```

#### 2. Subscriptions & Cleanup
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer); // Cleanup
}, []);
```

#### 3. Synchronizing with External Systems
```typescript
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]); // Sync scroll position with messages
```

**Interview Answer:**
"useEffect handles side effects - operations that affect things outside the component. I used it for data fetching, setting up timers, and DOM manipulation. The cleanup function is crucial - it runs before the component unmounts or before the effect runs again, preventing memory leaks."

### Dependency Array Deep Dive

```typescript
// ❌ Infinite loop - no dependency array
useEffect(() => {
  setCount(count + 1); // Causes re-render → effect runs → re-render → ...
});

// ✅ Runs once
useEffect(() => {
  fetchData();
}, []);

// ✅ Runs when count changes
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);

// ✅ Runs when any dependency changes
useEffect(() => {
  fetchProducts(category, filters);
}, [category, filters]);
```

---

## useRef Hook

### Use Cases

#### 1. DOM Access
```typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus(); // Focus input on mount
}, []);

<input ref={inputRef} />
```

#### 2. Storing Mutable Values (Without Re-renders)
```typescript
const renderCount = useRef(0);

useEffect(() => {
  renderCount.current += 1; // Doesn't cause re-render
  console.log(`Rendered ${renderCount.current} times`);
});
```

#### 3. Storing Previous Values
```typescript
const prevCountRef = useRef<number>();

useEffect(() => {
  prevCountRef.current = count;
}, [count]);

const prevCount = prevCountRef.current;
```

**Interview Answer:**
"useRef has two main uses: accessing DOM elements and storing mutable values that persist across renders without causing re-renders. In my chatbot, I used it to reference the messages container for auto-scrolling. Unlike state, updating a ref doesn't trigger a re-render, making it perfect for values you need to track but don't need to display."

### useRef vs useState

| useRef | useState |
|--------|----------|
| Doesn't cause re-render | Causes re-render |
| Mutable (.current) | Immutable |
| Synchronous updates | Asynchronous updates |
| DOM references, timers | UI data |

---

## Custom Hooks

### What are Custom Hooks?
Custom hooks are reusable functions that use React hooks. They start with "use" and can call other hooks.

### Example: useCart
```typescript
// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Usage
const CartPage = () => {
  const { state, addItem, removeItem } = useCart();
  // ...
};
```

**Interview Answer:**
"I created a custom hook `useCart` to encapsulate cart logic. It uses useContext internally and provides a clean API for components. Custom hooks promote code reuse - multiple components can use the same cart logic without duplicating code. They must start with 'use' so React can enforce hook rules."

### Benefits of Custom Hooks
- **Reusability**: Share logic across components
- **Separation of Concerns**: Extract complex logic
- **Testability**: Test logic independently
- **Composition**: Combine multiple hooks

---

## JavaScript Promises & Async/Await

### Promises Basics

```javascript
// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Success!' });
      // or reject(new Error('Failed'));
    }, 1000);
  });
};

// Using Promises
fetchData()
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));
```

### Async/Await (Modern Approach)

```typescript
// From ChatBot.tsx
const sendMessage = async () => {
  setIsLoading(true);
  
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
    // Handle error
  } finally {
    setIsLoading(false);
  }
};
```

**Interview Answer:**
"Promises handle asynchronous operations. I used async/await syntax, which is syntactic sugar over promises. `await` pauses execution until the promise resolves. I wrapped it in try-catch for error handling and used finally to reset loading state regardless of success or failure. This makes async code look synchronous and easier to read."

### Promise States
1. **Pending**: Initial state
2. **Fulfilled**: Operation completed successfully
3. **Rejected**: Operation failed

### Common Patterns

#### Promise Chaining
```javascript
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

#### Parallel Promises
```javascript
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
]);
```

---

## DOM Manipulation

### React's Virtual DOM

**Interview Answer:**
"React uses a Virtual DOM - a lightweight copy of the actual DOM. When state changes, React creates a new Virtual DOM tree, compares it with the previous one (diffing), and updates only the changed parts in the real DOM (reconciliation). This is much faster than manipulating the real DOM directly."

### Direct DOM Access (When Needed)

```typescript
// Using refs
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};

// Browser APIs
useEffect(() => {
  document.title = `Cart (${itemCount})`;
}, [itemCount]);
```

**Interview Answer:**
"While React handles most DOM updates, sometimes you need direct access. I used refs to call DOM methods like `scrollIntoView()`. For browser APIs like updating document.title, I used useEffect. The key is to let React handle rendering and only use direct DOM access for operations React doesn't cover."

### Event Handling

```typescript
// Synthetic Events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  e.stopPropagation();
  // Handle click
};

<button onClick={handleClick}>Click</button>

// Keyboard Events
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

<textarea onKeyPress={handleKeyPress} />
```

**Interview Answer:**
"React uses Synthetic Events - a cross-browser wrapper around native events. They work identically across browsers. I used event handlers like onClick and onKeyPress. For the chat input, I checked if Enter was pressed without Shift to send messages, preventing default behavior to avoid newlines."

---

## TypeScript in React

### Why TypeScript?

**Interview Answer:**
"TypeScript adds static typing to JavaScript, catching errors at compile-time instead of runtime. In my project, I defined interfaces for props, state, and API responses. This provides autocomplete, prevents type errors, and makes code self-documenting."

### Common Patterns

#### 1. Component Props
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // TypeScript knows product has specific properties
};
```

#### 2. State Types
```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot'; // Union type
  timestamp: Date;
}

const [messages, setMessages] = useState<Message[]>([]);
```

#### 3. Event Types
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

#### 4. Generic Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const response: ApiResponse<Product[]> = await fetch('/api/products');
```

### Benefits
- **Type Safety**: Catch errors early
- **IntelliSense**: Better autocomplete
- **Refactoring**: Safer code changes
- **Documentation**: Types as documentation

---

## Key Interview Talking Points

### 1. Why Next.js over Create React App?
"Next.js provides SSR (Server-Side Rendering) and SSG (Static Site Generation) out of the box. For my e-commerce site, this improved SEO and initial load times. Product pages are pre-rendered, so search engines can crawl them. Next.js also has built-in routing, API routes, and image optimization."

### 2. State Management Choice
"I used Context API with useReducer for the shopping cart instead of Redux because the state management needs were moderate. Context API is built into React, reducing bundle size. For more complex apps, I'd consider Redux Toolkit or Zustand."

### 3. Performance Optimizations
- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize callback functions
- **React.memo**: Prevent unnecessary re-renders
- **Code splitting**: Dynamic imports
- **Lazy loading**: Load components on demand

### 4. Component Design Patterns
- **Container/Presentational**: Separate logic from UI
- **Compound Components**: Related components working together
- **Render Props**: Share code between components
- **Higher-Order Components**: Enhance components with additional functionality

---

## Common Interview Questions & Answers

### Q: What's the difference between useEffect and useLayoutEffect?
**A:** "useEffect runs after paint (asynchronously), while useLayoutEffect runs before paint (synchronously). I use useLayoutEffect when I need to measure DOM elements or make visual changes before the browser paints, preventing flicker. For most cases, useEffect is sufficient."

### Q: How do you prevent unnecessary re-renders?
**A:** "I use React.memo for components, useMemo for expensive calculations, and useCallback for functions passed as props. I also ensure proper dependency arrays in useEffect. In my cart, I memoized product calculations to avoid recalculating on every render."

### Q: Explain the component lifecycle
**A:** "With hooks: Mounting (useEffect with []), Updating (useEffect with dependencies), Unmounting (useEffect cleanup). For example, in my chatbot, I set up timers on mount, update scroll position when messages change, and clean up timers on unmount."

### Q: What are controlled vs uncontrolled components?
**A:** "Controlled components have their state managed by React (value={state}). Uncontrolled components manage their own state via refs. I used controlled inputs in my checkout form for validation and state management."

### Q: How do you handle forms in React?
**A:** "I use controlled components with useState for each input. onChange updates state, onSubmit handles submission. For complex forms, I'd use libraries like React Hook Form or Formik for better performance and validation."

---

## Additional Resources to Study

1. **React Official Docs**: https://react.dev
2. **TypeScript Handbook**: https://www.typescriptlang.org/docs/
3. **JavaScript Promises**: MDN Web Docs
4. **Next.js Documentation**: https://nextjs.org/docs
5. **React Patterns**: patterns.dev

---

**Remember**: Focus on explaining WHY you made certain choices, not just WHAT you did. Interviewers want to see your thought process and problem-solving approach.
