import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { codeMateAgent } from "./agent.js";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.post('/a2a/agent/codeMateAgent', async (req, res) => {
  const agentRequest = req.body;
  
  // Basic JSON-RPC validation
  if (agentRequest.jsonrpc !== '2.0' || agentRequest.method !== 'tasks/send') {
    return res.status(400).json({
      jsonrpc: '2.0',
      id: agentRequest.id || null,
      error: { code: -32601, message: 'Invalid JSON-RPC request format or method.' }
    });
  }

  try {
    const userMessage = agentRequest.params.message;
    const userMessageParts = userMessage.parts;
    
    // Extract text content. Telex messages can contain multiple parts.
    const userQuery = userMessageParts
      .filter(p => p.kind === 'text')
      .map(p => p.text)
      .join('\n');
    
    if (!userQuery) {
        return res.status(400).json({
            jsonrpc: '2.0',
            id: agentRequest.id,
            error: { code: -32000, message: 'Message contains no readable text part.' }
        });
    }

    // Call the Mastra Agent 
    const agentResponse = await codeMateAgent.generate(userQuery); 

    console.log("Agent response:", agentResponse);

    // Construct the A2A Response (JSON-RPC 2.0 structure)
    const responseParts = [{
      kind: 'text',
      text: agentResponse.text, // The generated response from the LLM
    }];
    
    const a2aResponse = {
      jsonrpc: '2.0',
      id: agentRequest.id, // CRITICAL: Must match the request ID
      result: {
        message: {
          // Use the original IDs to maintain context, but a new messageId for the response
          messageId: `response-${Date.now()}`, 
          role: 'agent',
          parts: responseParts,
          contextId: userMessage.contextId, 
          taskId: userMessage.taskId,
        },
      },
    };

    // 4. Send back the valid JSON-RPC 2.0 response
    res.status(200).json(a2aResponse);

  } catch (error) {
    console.error('Agent execution error:', error.message);
    // 5. Proper error response in A2A format
    res.status(500).json({
      jsonrpc: '2.0',
      id: agentRequest.id,
      error: { code: -32603, message: `Internal agent error: ${error.message}` }
    });
  }
});

app.listen(PORT, () => {
  console.log(`CodeMate Agent server running on http://localhost:${PORT}`);
  console.log(`Ready to receive A2A requests at: /a2a/agent/codeMateAgent`);
});