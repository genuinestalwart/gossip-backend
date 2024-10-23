require("dotenv").config();
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import app from "@/app";
import userRoutes from "@/routes/user.route";
import authRoutes from "@/routes/auth.route";
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || "";

const connect = async () => {
	try {
		await mongoose.connect(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
	} finally {
		// await mongoose.disconnect();
	}
};

connect();
app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
