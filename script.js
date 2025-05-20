const API_KEY = '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';

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  appendMessage("bot", "⏳ Mengetik...");

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "Kamu adalah Chatbot HR, asisten ramah dan membantu untuk pertanyaan seputar Papua Tengah dan kopi pegunungan." },
          
          // Pengetahuan dasar
          { role: "user", content: "Berapa provinsi di Papua Tengah?" },
          { role: "assistant", content: "Papua Tengah terdiri dari beberapa kabupaten, seperti Puncak Jaya, Puncak, dan Intan Jaya." },

          { role: "user", content: "Apa produk dari Pegunungan?" },
          { role: "assistant", content: "Kopi Wamena, Kopi Kurima, dan Kopi Lani Jaya adalah beberapa produk khas dari pegunungan Papua." },

          { role: "user", content: "Berapa suku di Papua Tengah?" },
          { role: "assistant", content: "Papua Tengah memiliki banyak suku seperti Dani, Lani, Yali, dan lainnya." },

          { role: "user", content: "Berapa jumlah masyarakat di Papua?" },
          { role: "assistant", content: "Jumlah masyarakat Papua bervariasi tiap kabupaten, secara keseluruhan jutaan jiwa tersebar di berbagai wilayah." },

          // Pertanyaan dari user langsung
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // Hapus "Mengetik..."
    document.querySelectorAll(".bot-msg").forEach(msg => {
      if (msg.textContent === "⏳ Mengetik...") msg.remove();
    });

    appendMessage("bot", botReply);

  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", "⚠️ Maaf, terjadi kesalahan saat menghubungi AI.");
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg text-right my-2 text-blue-600" : "bot-msg text-left my-2 text-gray-800";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
