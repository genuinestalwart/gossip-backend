"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || "";
const connect = async () => {
    try {
        await mongoose_1.default.connect(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
    }
    finally {
        // await mongoose.disconnect();
    }
};
connect();
app_1.default.use("/auth", auth_route_1.default);
app_1.default.use("/", user_route_1.default);
app_1.default.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
