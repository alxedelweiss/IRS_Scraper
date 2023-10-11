# Alexander Galev's IRS Scraper submission

Requirements:

· The backend microservice relies on `python_version = "3.8"`, as listed in `Pipfile`

## Getting Started

### install the project dependencies:

· For the frontend client:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

· For the backend microservice:

```bash
pipenv install
```

### Run the development client:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### In a separate terminal, enter a python shell with:

```bash
pipenv shell
```

Then start the `app.py` file containing the endpoint that will be exposed on `port 5555` for the client.

```bash
python app.py
```

### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
