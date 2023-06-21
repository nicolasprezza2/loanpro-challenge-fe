Technologies used:

- NPM 9.5.1
- Node 18.16.0

Other technologies: Reactjs

- In a terminal, go to project <rootFolder>/challenge
- Run npm install
- Run npm start

App credentials:
- Username:          test@loanpro.com
- Password:          challenge

How to use:
- Follow Startup section in this file to start the BE
- Go to: http://localhost:3000/
- You should see a login screen, enter the App credentials declared in this file 
- Once logged in you should see the calculator and you can start using it.
- The user "test@loanpro.com" has 100 points to use. Each calculation has a cost:
  Addition, subtraction, multiplication and division cost 1 point
  Square root costs 2.5 and Random String costs 2 points
- Once you are out of balance you should restart the backend so the balance for the user is restarted


Note: this project uses a h2 DB, so DB is re-created on startup therefore restarting the user's balance

API details:
- Login
      Endpoint: /v1/login
      POST
      Body: {
        username: String,
        password: String
      }

Run operation:

      Endpoint: /v1/operation
      POST
      Body: {
        type: String,
        firstNumber: BigDecimal,
      second: BigDecimal
      }

Get records

     Endpoint: /v1/record
     GET
     URL params:
          page: int
          size: int

Delete record

    Endpoint: v1/record/{id}
    DELETE
    URL params:
        id: Long















