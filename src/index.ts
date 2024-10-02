import cors from "cors";
require("dotenv").config();
import express from "express";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import { registerRouter } from "@/routes/register";
import { loginRouter } from "@/routes/login";
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@${process.env.Cluster_1_Link}.mongodb.net/MainDB-1?retryWrites=true&w=majority&appName=Cluster-1`;

app.get("/", (req, res) => {
	res.send("Hello world!");
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
	} finally {
		// Ensures that the client will close when you finish/error
		// await mongoose.disconnect();
	}
};
run();

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
