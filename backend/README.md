# typescript-graphql-backend-example

This is a demo of a GraphQL Backend using Apollo Server. The code is written in TypeScript with GraphQL type generation using `graphql-codegen` package.

## Usage

Install dependencies:
```
$ npm install
```

Run in develop mode, using `ts-node-dev` to restart server on `.ts` file changes automatically:
```
$ npm run dev
```

Compile TypeScript to JavaScript and run in production mode:
```
$ npm run build
$ npm start
```

When server is running, you can try the API in GraphQL's Playground: http://localhost:4000/

## API Examples

Get a list of payments from all contracts between `2016-12-01T00:00:00.000Z` and `2016-12-24T00:00:00.000Z`:
```graphql

query {
  payments(startDate: "2016-12-01T00:00:00.000Z", endDate: "2016-12-24T00:00:00.000Z") {
    sum
    items {
      id
      contractId
      description
      value
      time
      isImported
      createdAt
      updatedAt
      isDeleted
    }
  }
}

```

Get all payments of contract `17689`:
```graphql

query {
  payments(contractId:17689) {
    sum
    items {
      id
      contractId
      description
      value
      time
      isImported
      createdAt
      updatedAt
      isDeleted
    }
  }
}

```

Update description of payment `1366`:
```graphql

mutation {
  updatePayment(payment: {id: 1366, description: "New description"}) {
    id
    contractId
    createdAt
    updatedAt
    value
    time
    description
    isDeleted
    isImported
  }
}

```

Add a new payment to contract `17689`:
```graphql

mutation {
  addPayment(payment: {contractId:17689, description: "Rent payment for December", value:100.0, time: "2016-12-17T00:00:00.000Z"}) {
    id
    contractId
    createdAt
    updatedAt
    value
    time
    description
    isDeleted
    isImported
  }
}

```

Delete payment `1366`:
```graphql

mutation {
  deletePayment(paymentId: 1366) {
    id
    contractId
    createdAt
    updatedAt
    value
    time
    description
    isDeleted
    isImported
  }
}

```
