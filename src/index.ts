import cors from "cors";
require("dotenv").config();
import express from "express";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import userRouter from "./routes/user";
const app = express();
const port = process.env.PORT || 5000;

const corsOptions: cors.CorsOptions = {
	origin: [
		"http://localhost:3000",
		"https://gs-gossip-frontend.vercel.app",
		"*",
	],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
const uri = process.env.DB_URI || "";

app.get("/", (req, res) => {
	res.redirect("https://gs-gossip-frontend.vercel.app/");
});

const run = async () => {
	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});

		app.use("/register", registerRouter);
		app.use("/login", loginRouter);
		app.use("/user", userRouter);
	} finally {
		// Ensures that the client will close when you finish/error
		// await mongoose.disconnect();
	}
};
run();

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});

export default app;
