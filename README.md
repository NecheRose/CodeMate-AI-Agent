# 🤖 CodeMate AI Agent

CodeMate AI is a **developer-focused coding assistant** built using **Mastra** and **OpenAI**.  
It integrates with **Telex.im** to help developers write, debug, and explain code directly from their workspace.

**Example conversations:**

* “Write a Python function to reverse a string.”
* “Fix this JavaScript code: `if (a = b)`.”
* “Refactor this React component for readability.”

---

## 🚀 Features

- 💬 **AI-Powered Code Assistance** — Generate, fix, and refactor code.
- 🧩 **Telex Integration** — Communicates via the Telex A2A endpoint.
- ⚙️ **Backend-Ready** — Built with Express.js and Mastra for easy deployment and scalability.
- 🛡️ **Safe & Reliable** — Follows strong coding practices and never outputs unsafe or fabricated APIs.

---

## ⚙️ Tech Stack

| Component             | Description                                |
| --------------------- | ------------------------------------------ |
| **Node.js (Express)** | Web framework for handling requests        |
| **Mastra**            | AI Agent framework                         |
| **OpenAI API**        | LLM used for intelligent responses         |
| **Telex.im**          | Platform that interacts with your AI agent |
| **Railway**           | Deployment platform                        |

---

## 🏗️ Project Structure
```
CodeMate-AI-Agent/
│
├── src/
├── agent.js          # Mastra agent setup (OpenAI)
├── server.js         # Express server and Telex A2A endpoint
├── workflow.json     # Telex workflow definition
├── .env              # Environment variables (API keys, ports)
└── README.md         # Project documentation
```

## 🪜 Step-by-Step Setup Guide

### 🧩 1. Create Project Folder

```bash
mkdir codemate-ai-agent
cd codemate-ai-agent
```

Initialize the project:

```bash
npm init -y
```

---

### 📦 2. Install Dependencies

```bash
npm install express body-parser dotenv mastra axios
```

---

### 🧩 3. Set Up `.env`

Create a `.env` file:

```env
OPENAI_API_KEY=sk-your-key-here
PORT=8080
```

---

### 💡 4. Run Locally (Testing)

```bash
node server.js
```

or

```bash
npx nodemon server.js
```

---

### 🧪 5. Test with postmanor or LocalTunnel

To get a public URL for Telex testing:

#### LocalTunnel:

```bash
npx localtunnel --port 8080
```

---

### 🌍 6. Deploy to Railway

1. Push your project to GitHub.
2. Go to [https://railway.app](https://railway.app)
3. Create new project → “Deploy from GitHub”
4. Add environment variable:

   ```
   OPENAI_API_KEY=sk-your-key
   ```
5. Click **Deploy** 

Railway gives you a public URL — update it in your `workflow.json`.

---

### 🧑‍💻 7. Add to Telex.im

1. Log in to [https://telex.im](https://telex.im)
2. Go to **Colleagues → Add New**
3. Fill in:

   * **Name:** CodeMate AI
   * **Category:** Utilities
   * **Description:** A coding assistant that generates, fixes, and refactors code.
   * **A2A URL:** Your deployed Railway URL
4. Save 

Now it’s live — test your agent in any Telex channel!

---

## 💬 Example Prompts

```
Write a Python function to check if a number is prime.
```

```
Fix this JavaScript: const a == 10;
```

```
Refactor this code for readability:
def add(a,b):return a+b
```

```
Explain how React useEffect works.
```

