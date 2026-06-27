import { useState, useRef, useCallback, useEffect } from 'react';

export const useAgentStream = (apiUrl, profileData) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState('');

  useEffect(() => {
    // Generate a unique session ID per visitor component mount
    setConversationId(crypto.randomUUID());
  }, []);
  
  const abortControllerRef = useRef(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    // Use current messages + new user message for the API call
    const userMessage = { role: 'user', content };
    const nextMessages = [...messages, userMessage];
    
    setMessages(nextMessages);
    setIsTyping(true);
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          conversationId,
          profileData,
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      // Add a placeholder assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              setIsTyping(false);
              return;
            }
            if (!dataStr) continue;
            
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              
              if (parsed.content) {
                setMessages(prev => {
                  const newMsgs = [...prev];
                  const lastIdx = newMsgs.length - 1;
                  if (newMsgs[lastIdx] && newMsgs[lastIdx].role === 'assistant') {
                    newMsgs[lastIdx] = {
                      ...newMsgs[lastIdx],
                      content: newMsgs[lastIdx].content + parsed.content,
                    };
                  }
                  return newMsgs;
                });
              }
            } catch (e) {
              // Ignore partial JSON parse errors if chunking splits the JSON payload incorrectly
              console.error("Failed to parse SSE JSON chunk:", dataStr);
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Chat error:', err);
        setError(err.message);
      }
    } finally {
      setIsTyping(false);
    }
  }, [messages, apiUrl, profileData]);
  const addLocalMessage = useCallback((userText, assistantText) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages(prev => [
      ...prev,
      { role: 'user', content: userText },
      { role: 'assistant', content: assistantText }
    ]);
  }, []);

  return { messages, sendMessage, isTyping, error, addLocalMessage };
};
