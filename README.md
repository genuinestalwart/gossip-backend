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

1. Create the `package.json` file with default config. Then, install the necessary packages.

    ```bash
    npm init -y
    npm i bcrypt cors dotenv express moment mongodb mongoose jsonwebtoken
    npm i -D typescript nodemon rimraf typescript-transform-paths ts-patch @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken
    ```

2. Then, add these extra scripts in there.

    ```json
    "build": "rimraf dist && tspc",
    "dev": "nodemon src/index.ts",
    "start": "nodemon src/index.ts",
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
            "allowSyntheticDefaultImports": true,
            "baseUrl": "src",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "module": "commonjs",
            "moduleResolution": "Node",
            "outDir": "dist",
            "paths": { "@/*": ["./*"] },
            "plugins": [
                { "transform": "typescript-transform-paths" },
                {
                    "transform": "typescript-transform-paths",
                    "afterDeclarations": true
                }
            ],
            "strict": true,
            "target": "ESNext"
        },
        "include": ["src/**/*"]
    }
    ```

## Hosting

For hosting on vercel, create a `vercel.json` file with these configurations.

```json
{
    "version": 2,
    "builds": [
        {
            "src": "dist/index.js",
            "use": "@vercel/node",
            "config": { "includeFiles": ["dist/**"] }
        }
    ],
    "routes": [{ "src": "/(.*)", "dest": "dist/index.js" }]
}
```

**However, vercel will expect a `/dist` folder in your project. So if you're automatically deploying from GitHub, don't forget to use `npm run build` to regenerate `/dist` folder everytime.**
