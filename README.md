## Runnning the Application
## Setting Up

```bash
cd server
npm install
```

```bash
cd services
npm install
```

```bash
cd frontend
npm install
```

## Running/Visualizing
### Frontend

Prerequisites: Have http-server installed
```bash
cd frontend
http-server
```

### Backend/Server
```bash
cd server
npm run dev
```

### Services
```bash
cd services
npm start
```

## Runnning Tests
### Unit Tests for Backend
```bash
cd server
npm test
```
### Unit Tests for Frontend

```bash
cd frontend
npm test
```
### e2e tests
```bash
cd frontend
npx cypress open
```