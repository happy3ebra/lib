##of

type checking

check type of value. returns capitalised name of type. e.g., 'Object', 'Function', 'Array':

```javascript
of.type(value);
```

returns true if value is an element, otherwise false:

```javascript
of.element(value);
```

returns true if value is a string, otherwise false:

```javascript
of.string(value);
```

returns true if value is an array, otherwise false:

```javascript
of.array(value);
```

returns true if value is an object, otherwise false:

```javascript
of.object(value);
```

returns true if value is a function, otherwise false:

```javascript
of['function'](value);
```

returns true if value is a boolean, otherwise false:

```javascript
of.boolean(value);
```

returns true if value is a number, otherwise false:

```javascript
of.number(value);
```

returns true if value is undefined, otherwise false:

```javascript
of['undefined'](value);
```

returns true if value is an arguments array, otherwise false:

```javascript
of['arguments'](value);
```

returns true if value is a regex, otherwise false:

```javascript
of.regex(value);
```

returns true if value is null, otherwise false:

```javascript
of['null'](value);
```

returns true if value is a date object, otherwise false:

```javascript
of.date(value);
```