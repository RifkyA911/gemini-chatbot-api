// script.js
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", function (e) {
	e.preventDefault();

	const userMessage = input.value.trim();
	if (!userMessage) return;

	// 1. Tampilkan pesan user
	appendMessage("user", userMessage);
	input.value = "";
	input.focus(); // Fokuskan kembali input setelah mengirim

	// 2. Tampilkan pesan loading placeholder dari bot
	const loadingMessageElement = appendMessage("bot", "Gemini is typing..."); // Simpan referensi ke elemen ini

	// 3. Kirim pesan ke backend menggunakan fetch
	fetch("/api/chat", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ message: userMessage }),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("HTTP error!, status: " + res.status);
			}
			return res.json();
		})
		.then((data) => {
			// 4. Setelah data diterima, perbarui pesan loading dengan balasan asli
			updateMessage(loadingMessageElement, data.reply);
		})
		.catch((error) => {
			// 5. Jika ada error, perbarui pesan loading dengan pesan error
			console.error("Error sending message:", error);
			updateMessage(
				loadingMessageElement,
				"Error: Could not get a response."
			);
		});
});

function appendMessage(sender, text) {
	const msg = document.createElement("div");
	msg.classList.add("message", sender);
	msg.textContent = text;
	chatBox.appendChild(msg);
	chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
	return msg; // Penting: kembalikan elemen pesan yang baru dibuat
}

function updateMessage(element, newText) {
	// Fungsi untuk memperbarui teks dari elemen pesan yang sudah ada
	element.textContent = newText;
	chatBox.scrollTop = chatBox.scrollHeight; // Pastikan tetap auto-scroll
}
