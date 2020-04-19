# ARandomBank
- Run the ARandomBank SQL export into a local mysql server (user has to be 'root' and password has to be 'password' *see the "Missing" part about this*)
- npm install && node server.js

# Done:
  - Create a company
  - Create a user
  - Create a wallet for a company
  - Create a card associated to a wallet for a user
  - List company's users' cards
  - List user's cards
  - Deposit/credit funds from a wallet towards a card
  
# Missing, due to lack of time:
  - Card (un)blocking
  - Transfers between wallets (hence fees and so on)
  - Input sanitizing (check what is sent to our server)
  - Security + config: as I'm still not finished with the dev, the mysql connection is still "raw" (localhost, "password") and does not take advantage of nodejs env or anything else (it *really* is.. meh)
  - Documentation (I used Insomnia to mock my endpoints and failed to translate the Insonmia's export to a Swagger format. You can find the Insomnia export within the git [ARandomBank-insomnia.json], for what it worth)
  - and so on (linter, Docker/mysql cloud server, CI/CD, TU/TI/E2E)..
