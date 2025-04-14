async function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value;
  
    // Verifica se o campo de mensagem está vazio
    if (!text.trim()) return;
  
    try {
      // Envia a requisição para o backend
      const res = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
  
      // Verifica se a requisição foi bem-sucedida
      if (!res.ok) {
        throw new Error('Erro ao enviar a mensagem');
      }
  
      // Limpa o campo de texto
      input.value = '';
      
      // Carrega as mensagens novamente após enviar
      loadMessages();
    } catch (error) {
      console.error('Erro no envio da mensagem:', error);
    }
  }
  
  async function loadMessages() {
    try {
      // Carrega as mensagens do backend
      const res = await fetch('http://localhost:3000/messages');
      
      // Verifica se a resposta foi bem-sucedida
      if (!res.ok) {
        throw new Error('Erro ao carregar as mensagens');
      }
  
      const messages = await res.json();
  
      // Atualiza o conteúdo do chat com as mensagens
      const chat = document.getElementById('chat-messages');
      chat.innerHTML = '';
  
      messages.forEach(msg => {
        const div = document.createElement('div');
        div.textContent = msg.text;
        chat.appendChild(div);
      });
    } catch (error) {
      console.error('Erro ao carregar as mensagens:', error);
    }
  }
  
  // Carrega as mensagens ao iniciar
  loadMessages();
  
  // Atualiza as mensagens a cada 3 segundos
  setInterval(loadMessages, 3000);