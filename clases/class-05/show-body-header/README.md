## Usage
After of install serverless framework and dependencies with npm CLI, invoke the function locally with the command:
`serverless invoke local --function currentTime`

## Requirements
Using the current code, modify current endpoint that follows the next requirements.

When providing an object how to payload with multiple transactions

POST /balance
```
{
  "transactions": [
    {
      "amount": 10,         // Pick a positive number
      "currency": "string", // ARS or USD
      "vendor": "string",   // Pick a random name
      "status": "string"    // Allowed: "succeeded" or "fail"
    },
  ],
}
```

Which should result in:

Status Code 200 - OK Everything worked as expected
Status Code 400 - Bad Request due to missing a required parameter
Status Code 500 - Internal Server Error

And a response with a balance of only succeeded transactions
```
{
  "balance": {
    "amounts": {
      "ars": "number",
      "usd": "number"
    }
  }
}
```

## Dependencies used on this example
* https://www.npmjs.com/package/serverless-offline
* https://www.serverless.com/framework/docs/getting-started/