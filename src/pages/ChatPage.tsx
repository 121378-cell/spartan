
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConversationsList from './Chat/ConversationsList';
import ChatView from './Chat/ChatView';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const location = useLocation();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(location.state?.conversationId || null);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.conversationsPanel}>
        <ConversationsList onSelectConversation={handleSelectConversation} />
      </div>
      <div className={styles.chatPanel}>
        {selectedConversationId ? (
          <ChatView conversationId={selectedConversationId} />
        ) : (
          <div className={styles.noConversationSelected}>
            <div>
              <h2>Selecciona una conversación</h2>
              <p>Elige una conversación de la lista para ver los mensajes o inicia una nueva desde el perfil de un amigo.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
