### REACT TABLES

- [Tanstack Table](https://tanstack.com/table)
- [React Table](https://react-table.tanstack.com/)

### Tanstack Table HOOK

for using tanstack table hook, we need to use the `useReactTable` hook.
this hook takes an object as an argument and returns a table instance.

```javascript
//options is an object that contains the configuration for the table.
let options = {
  data: [],
  columns: [],
  getCoreRowModel: getCoreRowModel(),
};
const table = useReactTable(options);
```

this 3 are the most important properties in the options object. and we need to pass them to the useReactTable hook. as required.

- data: this is the data that will be displayed in the table.
- columns: this is the columns that will be displayed in the table.
- getCoreRowModel: this is the function that will be used to get the core row model.

`Give Data a "Stable" Reference`
The data array that you pass to the table instance MUST have a "stable" reference in order to prevent bugs that cause infinite re-renders (especially in React).

This will depend on which framework adapter you are using, but in React, you should often use React.useState, React.useMemo, or similar to ensure that both the data and columns table options have stable references.

data is an array of objects that will be turned into the rows of your table. Each object in the array represents a row of data (under normal circumstances). If you are using TypeScript, we usually define a type for the shape of our data. This type is used as a generic type for all of the other table, column, row, and cell instances. This Generic is usually referred to as TData throughout the rest of the TanStack Table types and APIs.

data is an array of objects that will be turned into the rows of your table. Each object in the array represents a row of data (under normal circumstances). If you are using TypeScript, we usually define a type for the shape of our data. This type is used as a generic type for all of the other table, column, row, and cell instances. This Generic is usually referred to as TData throughout the rest of the TanStack Table types and APIs.

example:

```javascript
type DATA = {
  name?: string,
  age?: number,
  email?: string,
}[];
const data: DATA = [
  { name: "John", age: 25, email: "john@example.com" },
  { name: "Jane", age: 30, email: "jane@example.com" },
];
const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Age", accessorKey: "age" },
  { header: "Email", accessorKey: "email" },
];
const options = {
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
};
const table = useReactTable(options);
```

in column we need to pass the header and the accessorKey.
header is the name of the column that will be displayed in the table which show in ui.
accessorKey is the `key` of the data that will be displayed in the table.(should exatly equal to each object key in data array)

### Deep Key Data

Deep Keyed Data
If your data is not a nice flat array of objects, that's okay! Once you get around to defining your columns, there are strategies for accessing deeply nested data in your accessors.

If your data looks something like this:

```json
[
  {
    "name": {
      "first": "Tanner",
      "last": "Linsley"
    },
    "info": {
      "age": 33,
      "visits": 100
    }
  },
  {
    "name": {
      "first": "Kevin",
      "last": "Vandy"
    },
    "info": {
      "age": 27,
      "visits": 200
    }
  }
]
```

You can define a type like this:

```typescript
type User = {
  name: {
    first: string;
    last: string;
  };
  info: {
    age: number;
    visits: number;
  };
};
```

And you will be able to access the data in your column definitions with either dot notation in an accessorKey or simply by using an accessorFn.

## column Approach 1

````typescript
const columns = [
  {
    header: "First Name",
    accessorKey: 'name.first',
  },
  {
    header: 'Last Name',
    accessorKey: 'name.last',
  },
  {
    header: 'Age',
    accessorFn: info => info.age,
  },
  //...
]
```

````

1. accessorKey
   Purpose: Used to map the column to a specific key in your data object.

Type: string

Usage: This is the simplest way to access data, especially for flat or shallowly nested objects.

Example:

```typescript
{
header: 'First Name',
accessorKey: 'firstName', // Maps to data.firstName
}
```

Nested Data: You can use dot notation to access nested properties.

```typescript
{
header: 'Last Name',
accessorKey: 'name.last', // Maps to data.name.last
}
```

2. accessorFn:(alternative of accessorKey)
   Purpose: A function to dynamically compute or extract the value for the column.

Type: (row: TData) => any

Usage: Useful for derived values, formatting, or accessing deeply nested data.

Example:

```typescript
type User = {
  name: {
    first: string;
    last: string;
  };
  info: {
    age: number;
    visits: number;
  };
};
const columns = [
  {
    header: "First Name",
    accessorKey: "name.first",
  },
  {
    header: "Last Name",
    accessorKey: "name.last",
  },
  {
    header: "Age",
    accessorFn: (info) => info.age, //same as upper child
  },
  //...
];
```

Nested Data Example:

```typescript
Copy
{
header: 'Age',
accessorFn: (row) => row.info.age, // Maps to data.info.age
}
```

---

3. header
   Purpose: Defines the header text or component for the column.

Type: string | ReactNode | (props: HeaderContext<TData>) => ReactNode

Usage: This is what users see at the top of the column.

Example:

```typescript

{
  header: 'First Name', // Simple string
}
```

Custom Header Component:

```typescript
{
  header: () => <span style={{ color: "red" }}>First Name</span>,
}
```

4. id
   Purpose: A unique identifier for the column. If not provided, it defaults to the accessorKey or a generated ID.

Type: string

Usage: Required if you don’t have an accessorKey or if you need to manually set an ID for the column.

Example:

```typescript
{
id: 'fullName',
header: 'Full Name',
accessorFn: (row) => `${row.firstName} ${row.lastName}`,
}
```

5. cell
   Purpose: Customizes the rendering of the cell content.

Type: (props: CellContext<TData>) => ReactNode

Usage: Allows you to render custom JSX or components inside the cell.

Example:

```typescript
{
  header: "Status",
  accessorKey: "status",
  cell: (props) => (
    <span
      style={{ color: props.getValue() === "Married" ? "green" : "red" }}
    >
      {props.getValue()}
    </span>
  ),
}
```

6. footer
   Purpose: Defines the footer content for the column.

Type: string | ReactNode | (props: FooterContext<TData>) => ReactNode

Usage: Useful for displaying summaries or additional information at the bottom of the table.

Example:

```typescript
{
  header: "Visits",
  accessorKey: "visits",
  footer: "Total Visits",
}
```

7. size
   Purpose: Sets the width of the column.

Type: number

Usage: Define a fixed or minimum width for the column.

Example:

```typescript
{
  header: "First Name",
  accessorKey: "firstName",
  size: 150, // Width in pixels
}
```

12. minSize and maxSize
    Purpose: Sets the minimum and maximum width of the column.

Type: number

Usage: Restrict the column's resizing behavior.

Example:

```types
cript
{
  header: "First Name",
  accessorKey: "firstName",
  minSize: 100,
  maxSize: 200,
}
```

### Performance

The main thing to avoid is defining the data array inside the same scope as the useReactTable call. That will cause the data array to be redefined on every render, which will cause an infinite loop of re-renders.

```typescript


export default function MyComponent() {
  //😵 BAD: This will cause an infinite loop of re-renders because `columns` is redefined as a new array on every render!
  const columns = [
    // ...
  ]; // ======> if use in useMemo then it will be stable reference ✅

  //😵 BAD: This will cause an infinite loop of re-renders because `data` is redefined as a new array on every render!
  const data = [
    // ...
  ];

  //❌ Columns and data are defined in the same scope as `useReactTable` without a stable reference, will cause infinite loop!
  const table = useReactTable({
    columns,
    data ?? [], //❌ Also bad because the fallback array is re-created on every render
  });

  return <table>...</table>;
}
```

```typescript


const fallbackData = []

export default function MyComponent() {
  //✅ GOOD: This will not cause an infinite loop of re-renders because `columns` is a stable reference
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ GOOD: This will not cause an infinite loop of re-renders because `data` is a stable reference
  const [data, setData] = useState(() => [
    // ...
  ]);

  // Columns and data are defined in a stable reference, will not cause infinite loop!
  const table = useReactTable({
    columns,
    data ?? fallbackData, //also good to use a fallback array that is defined outside of the component (stable reference)
  });

  return <table>...</table>;
}
```

Understanding the `accessorFn` and `Status` Column

Example Data
Here’s the initial data:

```javascript
const data = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 35 },
  { id: 3, name: "Charlie", age: 42 },
  { id: 4, name: "Diana", age: 25 },
];
```

Transformed Data with accessorFn
When the accessorFn is applied, the Status column is dynamically computed based on the conditional logic (row.age >= 30 ? 'Senior' : 'Junior'). The transformed data will look like this:

```javascript
const transformedData = [
  { id: 1, name: "Alice", age: 28, Status: "Junior" },
  { id: 2, name: "Bob", age: 35, Status: "Senior" },
  { id: 3, name: "Charlie", age: 42, Status: "Senior" },
  { id: 4, name: "Diana", age: 25, Status: "Junior" },
];
```

Explanation of Status Logic
For Alice (age 28), the status is 'Junior' because 28 < 30.

For Bob (age 35), the status is 'Senior' because 35 >= 30.

For Charlie (age 42), the status is 'Senior' because 42 >= 30.

For Diana (age 25), the status is 'Junior' because 25 < 30.

Final Table Representation
If you render this data in a table, it will look like this:

| ID  | Name    | Age | Status |
| --- | ------- | --- | ------ |
| 1   | Alice   | 28  | Junior |
| 2   | Bob     | 35  | Senior |
| 3   | Charlie | 42  | Senior |
| 4   | Diana   | 25  | Junior |

How to Refer to the Status Column

1. What is accessorFn?
   The accessorFn is a function that dynamically computes the value of a column based on the row data. In this case, it calculates the Status column based on the age property of each row.

```javascript
const columns = [
  {
    header: "Status",
    accessorFn: (row) => (row.age >= 30 ? "Senior" : "Junior"), // Conditional logic
  },
];
```

2. Accessing Status Programmatically
   If you want to access the Status value programmatically, you can compute it manually:

```javascript
const dataWithStatus = data.map((row) => ({
  ...row,
  Status: row.age >= 30 ? "Senior" : "Junior",
}));

console.log(dataWithStatus);
```

## column Approach 2

column helper approach

```typescript

```

===

diff between columnHelper.accessor and columnHelper.display

columnHelper.accessor is used to define the accessor for the column.
columnHelper.display is used to define the display for the column.

تو اکسسور ستونش هست ما رفرنس میدیم
و دیسپلی نیست و ما جدید تعریف میدیم
Example Data
Let’s assume we have the following data:

```javascript
const data = [
  { id: 1, firstName: "Alice", lastName: "Smith", age: 28, status: "Junior" },
  { id: 2, firstName: "Bob", lastName: "Johnson", age: 35, status: "Senior" },
  { id: 3, firstName: "Charlie", lastName: "Brown", age: 42, status: "Senior" },
  { id: 4, firstName: "Diana", lastName: "Lee", age: 25, status: "Junior" },
];
```

Column Definitions
We’ll define columns using both columnHelper.accessor and columnHelper.display:

````javascript

import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
// Using `accessor` for direct properties
columnHelper.accessor('id', {
header: 'ID',
}),
columnHelper.accessor('firstName', {
header: 'First Name',
}),

// Using `display` for computed values
columnHelper.display({
header: 'Full Name',
cell: (row) => `${row.firstName} ${row.lastName}`,
}),

columnHelper.accessor('age', {
header: 'Age',
}),

columnHelper.accessor('status', {
header: 'Status',
}),
];
```
Output Table in Markdown
Here’s how the table would look when rendered:

| ID  | First Name | Full Name     | Age | Status |
| --- | ---------- | ------------- | --- | ------ |
| 1   | Alice      | Alice Smith   | 28  | Junior |
| 2   | Bob        | Bob Johnson   | 35  | Senior |
| 3   | Charlie    | Charlie Brown | 42  | Senior |
| 4   | Diana      | Diana Lee     | 25  | Junior |

Explanation of Columns:
ID: Directly accessed using columnHelper.accessor('id').

First Name: Directly accessed using columnHelper.accessor('firstName').

Full Name: Computed using columnHelper.display by combining firstName and lastName.

Age: Directly accessed using columnHelper.accessor('age').

Status: Directly accessed using columnHelper.accessor('status').

Key Takeaways:
Use columnHelper.accessor for simple, direct property access.

Use columnHelper.display for custom or computed value
````

helper.dispaly is similar to accessorfn

```javascript
const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    header: "Full Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
```

| ID  | First Name | Full Name     | Age | Status |
| --- | ---------- | ------------- | --- | ------ |
| 1   | Alice      | Alice Smith   | 28  | Junior |
| 2   | Bob        | Bob Johnson   | 35  | Senior |
| 3   | Charlie    | Charlie Brown | 42  | Senior |
| 4   | Diana      | Diana Lee     | 25  | Junior |

accessorKey: Use for direct property access (similar to columnHelper.accessor).

accessorFn: Use for custom or computed values (similar to columnHelper.display).

Both approaches are flexible and achieve the same result, but accessorFn is more aligned with the object-based column definition style.
