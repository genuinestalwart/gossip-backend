# Gossip | Backend

> *A dynamic voice communication platform designed for seamless collaboration and engaging interactions. Elevate your group discussions with crystal-clear audio, real-time connectivity, and robust features tailored for effective teamwork and social engagement.*

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Bcrypt

## Documentation

If you want to create this project on your own, do the following steps:

1. Create the `packag.json` file with default config. Then, install the necessary packages.

    ```bash
    npm init -y
    npm install bcrypt cors dotenv express moment mongodb mongoose
    npm install --save-dev typescript ts-node-dev tsconfig-paths @types/node @types/express @types/cors @types/bcrypt
    ```

2. Then, add these extra scripts in there.

    ```json
    "build": "tsc",
    "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/index.ts",
    ```

3. Now, set up eslint and typescript.

    ```bash
    npm init @eslint/config@latest
    npx tsc --init
    ```

4. Finally, generate a `tsconfig.json` file with these settings.

    ```json
    {
        "compilerOptions": {
            "baseUrl": "./src",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "module": "commonjs",
            "outDir": "./dist",
            "paths": { "@/*": ["./*"] },
            "rootDir": "./src",
            "skipLibCheck": true,
            "strict": true,
            "target": "ESNext"
        },
        "exclude": ["node_modules"],
        "include": ["src/**/*"]
    }
    ```
