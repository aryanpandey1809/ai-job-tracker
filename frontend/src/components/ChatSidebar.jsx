import { useState } from 'react';
import { chat } from '../api/api';

export default function ChatSidebar({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI job assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const tempInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chat(tempInput);
      const aiMessage = { id: Date.now() + 1, text: response.reply, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, text: "Sorry, I couldn't process your request. Please try again.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-40 flex flex-col">
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">AI Job Assistant</h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl"
        >
          &times;
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
              Thinking...
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about jobs, skills, or career advice..."
            className="flex-1 border rounded-l-lg p-2 resize-none h-12"
            rows="1"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-500 text-white px-4 rounded-r-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}