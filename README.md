# Gemini Multimodal API (Bun + Express + TypeScript)

> ℹ️🍎 Built as part of the "AI Productivity and AI API Integration for Developers" course on PartnershipsH8" - 🦊 Hacktiv8

This project demonstrates how to build a robust RESTful API using **Bun**, **Express**, and **TypeScript** to interact with **Google Gemini 2.0 Flash**. The API is designed to handle various types of multimodal input—text, images, documents, and audio—allowing you to build smart and versatile AI applications.

<p align="center">
  <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"/>
  <img src="https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Express.js-%23404D59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js"/>
  <img src="https://img.shields.io/badge/Gemini_AI-%238E44AD.svg?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini AI"/>
</p>

---

## ✨ Key Features

-   ✅ **Quick Setup**: Built on top of Bun, Express, and TypeScript for optimal performance and developer experience.
-   🔑 **Secure API Key Handling**: Securely handles API keys using an `.env` file.
-   🧠 **Google Gemini 2.0 Flash Integration**: Leverages the latest AI model from Google.
-   🔄 **Multimodal Endpoints**:
    -   `/generate-text` for text-based prompts.
    -   `/generate-from-image` for image input.
    -   `/generate-from-document` for document processing (PDF, TXT, etc.).
    -   `/generate-from-audio` for audio transcription or analysis.
-   📁 **File Management**: Uses `multer` for easy file uploads handling.
-   🧹 **Automatic File Cleanup**: Automatically deletes uploaded files after processing to keep the server clean.
-   💡 **Smart Input**: Combines `prompt` + `file` as multimodal input for more contextual AI responses.

---

## 🏷️ Relevant Tags & Topics

<p align="center">
  <img src="https://img.shields.io/badge/AI-%23ff69b4.svg?style=for-the-badge&logo=ai&logoColor=white" alt="AI"/>
  <img src="https://img.shields.io/badge/Gemini_API-%23ff9900.svg?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini API"/>
  <img src="https://img.shields.io/badge/Bun_JS-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="Bun JS"/>
  <img src="https://img.shields.io/badge/Express_JS-%23404D59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express JS"/>
  <img src="https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/REST_API-%23ff69b4.svg?style=for-the-badge&logo=rest-api&logoColor=white" alt="REST API"/>
  <img src="https://img.shields.io/badge/File_Upload-%23ff9900.svg?style=for-the-badge&logo=file-upload&logoColor=white" alt="File Upload"/>
  <img src="https://img.shields.io/badge/Multer-%23000000.svg?style=for-the-badge&logo=multer&logoColor=white" alt="Multer"/>
  <img src="https://img.shields.io/badge/OpenAI-%23ff69b4.svg?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI"/>
  <img src="https://img.shields.io/badge/Productivity-%23ff69b4.svg?style=for-the-badge&logo=productivity&logoColor=white" alt="Productivity"/>
  <img src="https://img.shields.io/badge/Hacktiv8-%23ff9900.svg?style=for-the-badge&logo=hacktiv8&logoColor=white" alt="Hacktiv8"/>
  <img src="https://img.shields.io/badge/API_Development-%23000000.svg?style=for-the-badge&logo=api-development&logoColor=white" alt="API Development"/>
  <img src="https://img.shields.io/badge/AI_Integration-%23ff69b4.svg?style=for-the-badge&logo=ai-integration&logoColor=white" alt="AI Integration"/>
  <img src="https://img.shields.io/badge/Cloud_AI-%23ff9900.svg?style=for-the-badge&logo=cloud-ai&logoColor=white" alt="Cloud AI"/>
</p>

## 🚀 Getting Started

Follow these steps to run the project on your local machine.

### 🛠️ Prerequisites

-   **Bun**: Make sure Bun is installed. Visit [bun.sh](https://bun.sh/) for installation guidance.
-   **Google Cloud Project**: You will need an API Key from Google AI Studio or Google Cloud Console with the Gemini API enabled. Here you can generate `GEMINI_API_KEY` from https://aistudio.google.com/u/2/apikey. Just copy the key and paste to file `.env`.

### 📦 Installation

1.  **Clone This Repository:**

    ```bash
    git clone https://github.com/RifkyA911/gemini-ai-api-project
    cd gemini-ai-api-project
    ```

2.  **Install All Dependencies:**

    ```bash
    bun install
    ```

3.  **Create new file `.env`:**
    Create a file named `.env` in the root of the project and add your Gemini API Key. Rename the `.env.example` for quicker formatting.
    ```env
    PORT=3000
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

### ▶️ Run the Server

To run the development server:

```bash
bun run dev
```

or

```bash
bun dev
```

The server API will run at `http://localhost:3000` (or a different port that you configure).

---

## API Endpoints

The following endpoints are available to interact with Gemini.

📌 **Note**: This can also be tested via Postman/Insomnia as a collection file provided in the project locate in `/public/collection/`.

### 📝 Generate from Text

-   **URL**: `/generate-text`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
    	"prompt": "Tell a story about a curious cat who discovered a hidden treasure."
    }
    ```

### 🖼️ Generate from Image

-   **URL**: `/generate-from-image`
-   **Method**: `POST`
-   **Content-Type**: `multipart/form-data`
-   **Form Data**:
    -   `image`: Image file (jpg, png, webp, etc.).
    -   `prompt` (optional): Text for providing context about the image.
-   **Example cURL**:
    ```bash
    curl -X POST -F "image=@/path/to/your/image.jpg" -F "prompt=Describe this image." http://localhost:3000/generate-from-image
    ```

### 📄 Generate from Document

-   **URL**: `/generate-from-document`
-   **Method**: `POST`
-   **Content-Type**: `multipart/form-data`
-   **Form Data**:
    -   `document`: Document file (pdf, txt, etc.).
    -   `prompt` (optional): Text for providing instruction.
-   **Example cURL**:
    ```bash
    curl -X POST -F "document=@/path/to/your/document.pdf" -F "prompt=Describe this Document." http://localhost:3000/generate-from-document
    ```

### 🎧 Generate from Audio

-   **URL**: `/generate-from-audio`
-   **Method**: `POST`
-   **Content-Type**: `multipart/form-data`
-   **Form Data**:
    -   `audio`: Audio file (mp3, wav, etc.).
    -   `prompt` (optional): Text for instruction (e.g. "Transcribe this audio").
-   **Example cURL**:
    ```bash
    curl -X POST -F "audio=@/path/to/your/audio.mp3" -F "prompt=Describe this Audio." http://localhost:3000/generate-from-audio
    ```

---

## 📂 Project Structure

```
.
├── public/
│   ├── collection/         # Postman collection file
├── src/
│   ├── helper/             # Helper functions
│   │   ├── gemini.ts           # Gemini API helper
│   ├── routes/             # API route definitions
│   │   ├── route.ts            # API route definitions (generate-text, generate-from-image, etc.)
│   ├── utils/              # Utility functions
│   │   ├── upload.ts           # multer configuration
│   └── index.ts            # Main application file
├── .env                    # Environment variables (API Key)
├── .env.example            # Example: Environment variables (API Key)
├── package.json            # Project dependencies & scripts
├── bun.lockb               # Bun lock file
├── tsconfig.json           # TypeScript configuration
└── README.md               # You are currently reading this
```

---

## 🙌 Contributions

Contributions are always welcome! Feel free to create an issue or submit a pull request if you'd like to add a feature or fix a bug.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
