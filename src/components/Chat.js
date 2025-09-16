import React from "react";

function Chat({ messages = [] }) {
  return (
    <div style={{ width: "90%", maxHeight: "200px", overflowY: "auto", margin: "1rem auto", border: "1px solid var(--azul-oscuro)", borderRadius: "1rem", padding: "0.5rem" }}>
      {messages.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No hay mensajes aún</p>
      ) : (
        messages.map(msg => (
          <div key={msg.id} style={{ padding: "0.3rem 0", borderBottom: "1px solid #ccc" }}>
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
}

export default Chat;
