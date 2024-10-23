require("dotenv").config();
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import app from "@/app";
import registerRouter from "@/routes/register";
import loginRouter from "@/routes/login";
import userRouter from "@/routes/user";
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || "";

const connect = async () => {
	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
	} finally {
		// Ensures that the client will close when you finish/error
		// await mongoose.disconnect();
	}
};

connect();
app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", userRouter);

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
