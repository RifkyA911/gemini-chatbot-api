import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY || "YOUR_KEY_HERE"
);

export function fileToGenerativePart(buffer: string, mimeType: string) {
	return {
		inlineData: {
			data: buffer,
			mimeType,
		},
	};
}

export async function generateWithFile({
	prompt,
	file,
	defaultPrompt = "Analisa file ini.",
	geminiModel,
}: {
	prompt?: string;
	file: Express.Multer.File;
	defaultPrompt?: string;
	geminiModel?: string;
}) {
	console.log(`Accept file: ${file.originalname}, size: ${file.size} bytes`);
	console.log(`With prompt: "${prompt || "No prompt provided"}"`);

	const model = genAI.getGenerativeModel({
		model: geminiModel || "gemini-2.0-flash",
	});

	const base64 = file.buffer.toString("base64");

	const result = await model.generateContent({
		contents: [
			{
				role: "user",
				parts: [
					{ text: prompt?.trim() || defaultPrompt },
					// {
					// 	inlineData: {
					// 		mimeType: file.mimetype,
					// 		data: base64,
					// 	},
					// },
					{ ...fileToGenerativePart(base64, file.mimetype) },
				],
			},
		],
	});

	return result;
}
