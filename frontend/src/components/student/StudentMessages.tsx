import { useState } from "react";
import { 
  Search, 
  Paperclip, 
  Smile, 
  Send, 
  User,
  ChevronDown,
  ChevronRight
} from "lucide-react";

// Tipos
interface Message {
  id: number;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  name: string;
  course?: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: string;
  type: "teacher" | "support" | "notification";
  messages: Message[];
}

// Datos de ejemplo
const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Prof. Juan Pérez",
    course: "Sistemas Operativos",
    lastMessage: "Recuerda entregar la tarea antes del viernes",
    timestamp: "10:30 AM",
    unreadCount: 2,
    isOnline: true,
    type: "teacher",
    messages: [
      {
        id: 1,
        senderId: "teacher",
        text: "Hola, ¿cómo vas con el proyecto?",
        timestamp: "9:15 AM",
        isRead: true
      },
      {
        id: 2,
        senderId: "student",
        text: "Hola profesor, voy bien. Tengo algunas dudas sobre la implementación",
        timestamp: "9:20 AM",
        isRead: true
      },
      {
        id: 3,
        senderId: "teacher",
        text: "Claro, dime cuáles son tus dudas",
        timestamp: "9:25 AM",
        isRead: true
      },
      {
        id: 4,
        senderId: "teacher",
        text: "Recuerda entregar la tarea antes del viernes",
        timestamp: "10:30 AM",
        isRead: false
      }
    ]
  },
  {
    id: 2,
    name: "Prof. María García",
    course: "Estadística Aplicada",
    lastMessage: "La clase del martes será virtual",
    timestamp: "Ayer",
    unreadCount: 0,
    isOnline: false,
    lastSeen: "Hace 2 horas",
    type: "teacher",
    messages: [
      {
        id: 1,
        senderId: "teacher",
        text: "La clase del martes será virtual",
        timestamp: "Ayer 3:45 PM",
        isRead: true
      }
    ]
  },
  {
    id: 3,
    name: "Prof. Carlos Rodríguez",
    course: "Redes y Comunicaciones",
    lastMessage: "Excelente presentación en clase",
    timestamp: "Hace 2 días",
    unreadCount: 0,
    isOnline: false,
    lastSeen: "Hace 1 día",
    type: "teacher",
    messages: [
      {
        id: 1,
        senderId: "teacher",
        text: "Excelente presentación en clase",
        timestamp: "Hace 2 días",
        isRead: true
      }
    ]
  },
  {
    id: 4,
    name: "Soporte Técnico",
    lastMessage: "Tu consulta ha sido resuelta",
    timestamp: "Hace 3 días",
    unreadCount: 1,
    isOnline: true,
    type: "support",
    messages: [
      {
        id: 1,
        senderId: "student",
        text: "No puedo acceder a mi evaluación",
        timestamp: "Hace 3 días",
        isRead: true
      },
      {
        id: 2,
        senderId: "support",
        text: "Tu consulta ha sido resuelta",
        timestamp: "Hace 3 días",
        isRead: false
      }
    ]
  }
];

interface StudentMessagesProps {
  initialConversationId?: number;
}

export function StudentMessages({ initialConversationId }: StudentMessagesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(
    initialConversationId || 1
  );
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [expandedSections, setExpandedSections] = useState({
    teachers: true,
    support: true,
    notifications: true
  });

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.course && conv.course.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const teacherConversations = filteredConversations.filter(c => c.type === "teacher");
  const supportConversations = filteredConversations.filter(c => c.type === "support");

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: "student",
      text: messageText,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          timestamp: "Ahora"
        };
      }
      return conv;
    }));

    setMessageText("");
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white rounded-3xl shadow-[5px_5px_10px_rgba(0,0,0,0.1)] overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
        <div className="flex h-full">
          {/* Columna izquierda: Lista de conversaciones */}
          <div className="w-[380px] border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-[#006d6f] mb-4" style={{ fontWeight: 700 }}>
                Mensajes
              </h2>
              
              {/* Barra de búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar conversación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#797979] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00bfbf]"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
              </div>
            </div>

            {/* Lista de conversaciones */}
            <div className="flex-1 overflow-y-auto">
              {/* Sección: Profesores */}
              {teacherConversations.length > 0 && (
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection("teachers")}
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600" style={{ fontWeight: 600 }}>
                      Profesores
                    </span>
                    {expandedSections.teachers ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedSections.teachers && teacherConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full px-6 py-4 flex items-start gap-3 transition-colors border-l-4 ${
                        selectedConversation === conv.id
                          ? "bg-[#00bfbf]/10 border-[#00bfbf]"
                          : "border-transparent hover:bg-gray-50"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#00bfbf]/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[#006d6f]" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-gray-900" style={{ fontWeight: 600 }}>
                            {conv.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {conv.timestamp}
                          </span>
                        </div>
                        {conv.course && (
                          <div className="text-xs text-[#00bfbf] mb-1" style={{ fontWeight: 500 }}>
                            {conv.course}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate pr-2">
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="bg-[#00bfbf] text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ fontWeight: 600 }}>
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Sección: Soporte */}
              {supportConversations.length > 0 && (
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection("support")}
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600" style={{ fontWeight: 600 }}>
                      Soporte
                    </span>
                    {expandedSections.support ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedSections.support && supportConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full px-6 py-4 flex items-start gap-3 transition-colors border-l-4 ${
                        selectedConversation === conv.id
                          ? "bg-[#00bfbf]/10 border-[#00bfbf]"
                          : "border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#00bfbf]/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[#006d6f]" />
                      </div>

                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-gray-900" style={{ fontWeight: 600 }}>
                            {conv.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {conv.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate pr-2">
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="bg-[#00bfbf] text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ fontWeight: 600 }}>
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: Chat activo */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Header del chat */}
              <div className="px-6 py-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#00bfbf]/20 flex items-center justify-center relative">
                    <User className="w-6 h-6 text-[#006d6f]" />
                    {activeConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900" style={{ fontWeight: 700 }}>
                      {activeConversation.name}
                    </h3>
                    {activeConversation.course && (
                      <p className="text-sm text-[#00bfbf]">
                        {activeConversation.course}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {activeConversation.isOnline ? "En línea" : activeConversation.lastSeen}
                    </p>
                  </div>
                </div>
              </div>

              {/* Área de mensajes */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "student" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                          message.senderId === "student"
                            ? "bg-[#00bfbf] text-white rounded-br-sm"
                            : "bg-white text-gray-900 rounded-bl-sm"
                        }`}
                      >
                        <p className="break-words" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {message.text}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "student" ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Área de escritura */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Smile className="w-5 h-5 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-[#797979] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00bfbf]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-3 bg-[#00bfbf] text-white rounded-full hover:bg-[#00a5a5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Selecciona una conversación para empezar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
