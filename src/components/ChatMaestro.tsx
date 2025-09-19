import { useState } from 'react';
import './ChatMaestro.css';

interface Message {
  text: string;
  sender: 'user' | 'maestro';
}

const ChatMaestro = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulate Maestro response
    setTimeout(() => {
      const maestroResponse: Message = {
        text: `Consulta "${input}" recibida. Espera el análisis estratégico.`,
        sender: 'maestro',
      };
      setMessages((prevMessages) => [...prevMessages, maestroResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="chat-maestro-container">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Consulta al Maestro..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatMaestro;
