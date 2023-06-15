import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [messageInput, setMessageInput] = useState("");
  const [response, setResponse] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResponse(data.response);
      setMessageInput("");
    } catch(error) {
     
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>My_BOT</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3> How can I assist you today?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Ask me anything"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
        <div className={styles.response}>{response}</div>
      </main>
    </div>
  );
}
