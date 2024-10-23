import cors from "cors";
require("dotenv").config();
import express, { Application } from "express";
const app: Application = express();

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://gs-gossip-frontend.vercel.app",
			"*",
		],
		methods: "GET,POST,PUT,DELETE,OPTIONS",
		credentials: true,
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.redirect("https://gs-gossip-frontend.vercel.app/");
});

export default app;
