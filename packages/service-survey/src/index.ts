import { json, urlencoded } from "body-parser";
import express from "express";
import "express-async-errors";
import { client } from "./mongodb";
import { errorHandler } from "./response";
import routes from "./routes";

const app = express();
const port = 5000;

app.use(routes);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(errorHandler);

app.listen(port, async () => {
    console.log("Connecting to mongodb...");
    await client.connect();

    console.log(`🚀 service-survey ready @ http://localhost:${port}`);
    process.send && process.send("ready");
});

process.on("unhandledRejection", reason => {
    console.log(`Unhandled rejection ${reason}`);
});
