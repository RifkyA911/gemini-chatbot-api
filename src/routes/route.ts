import express from "express";
import upload from "../utils/upload";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithFile } from "../helper/gemini";

const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY || "YOUR_KEY_HERE"
);

const route = express.Router();

// Skipped
route.get("/", (req, res) => {
	return res.send("Hello Bun with Express");
});

route.post("/post", (req, res) => {
	const body = req.body;
	return res.status(200).json({
		message: true,
		data: body,
	});
});

route.post("/api/generate-text", async (req, res, next) => {
	const { prompt } = req.body;

	if (!prompt || typeof prompt !== "string") {
		res.status(400).json({ error: "Prompt is required" });
	}

	try {
		const model = genAI.getGenerativeModel({
			model: "gemini-2.0-flash",
		});
		const result = await model.generateContent(prompt);
		const response = result.response.text();

		res.json({
			success: true,
			prompt,
			response,
		});
	} catch (err) {
		console.error("❌ Gemini error:", err);
		res.status(500).json({ error: "Gagal generate teks dari Gemini" });
	}
});

route.post(
	"/api/generate-from-image",
	upload.single("image"),
	async (req, res) => {
		try {
			const file = req.file;
			const { prompt } = req.body;

			if (!file)
				return res.status(400).json({ error: "No file uploaded" });

			const model = genAI.getGenerativeModel({
				model: "gemini-2.0-flash",
			});

			// Kirim ke Gemini
			const result = await generateWithFile({
				prompt,
				file,
				defaultPrompt: "Jelaskan gambar ini.",
			});

			const response = result.response;
			const text = response.text();
			res.json({ result: text });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
);

route.post(
	"/api/generate-from-document",
	upload.single("document"),
	async (req, res) => {
		try {
			const file = req.file;
			const { prompt } = req.body;

			if (!file)
				return res.status(400).json({ error: "No file uploaded" });

			const result = await generateWithFile({
				prompt,
				file,
				defaultPrompt: "Analisa Dokumen ini.",
			});

			const response = result.response;
			const text = response.text();
			res.json({ result: text });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
);

route.post(
	"/api/generate-from-audio",
	upload.single("audio"),
	async (req, res) => {
		try {
			const file = req.file;
			const { prompt } = req.body;

			if (!file)
				return res.status(400).json({ error: "No file uploaded" });

			const result = await generateWithFile({
				prompt,
				file,
				defaultPrompt: "Analisa suara ini.",
			});

			const response = result.response;
			const text = response.text();
			res.json({ result: text });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
);

route.post("/api/chat", async (req, res) => {
	const userMessage = req.body.message;

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash",
	});

	if (!userMessage) {
		return res.status(400).json({ reply: "Message is required." });
	}

	try {
		const result = await model.generateContent(userMessage);
		const response = await result.response;
		const text = response.text(); // Assuming .text() is a method to extract the text content

		res.json({ reply: text });
	} catch (err) {
		console.error(err);
		res.status(500).json({ reply: "Something went wrong." });
	}
});

export default route;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
