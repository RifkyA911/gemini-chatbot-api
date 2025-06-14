import express from "express";
import type { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./routes/route";

const app: Express = express();
const port = Bun.env.PORT;

declare module "bun" {
	interface Env {
		CLIENT_URL: string;
	}
}

//logger
app.use(morgan("dev"));
// Add middleware to parse JSON bodies
app.use((req, res, next) => {
	// Hanya parse body kalau method-nya POST, PUT, PATCH
	if (["POST", "PUT", "PATCH"].includes(req.method)) {
		express.json({ limit: "10mb" })(req, res, next);
	} else {
		next();
	}
});

app.use((req, res, next) => {
	if (["POST", "PUT", "PATCH"].includes(req.method)) {
		express.json({ limit: "10mb" })(req, res, (err) => {
			if (err) return next(err);
			express.urlencoded({ extended: true })(req, res, next);
		});
	} else {
		next();
	}
});

app.use(
	"*",
	cors({
		origin: Bun.env.CLIENT_URL.split(";"),
		// allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
		// allowMethods: ["POST", "GET", "OPTIONS"],
		// exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
		// maxAge: 600,
		// credentials: true,
	})
);

app.use(express.static("public"));

app.use("/", route);

// Global error handler middleware
// app.use((err, req, res) => {
// 	console.error("💥 Global Error:", err?.message || err);
// 	if (err?.type === "entity.parse.failed") {
// 		return res.status(400).json({ error: "Invalid JSON" });
// 	}
// 	return res.status(500).json({ error: "Internal Server Error" });
// });

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
