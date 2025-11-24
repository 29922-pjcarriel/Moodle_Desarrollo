import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { useState } from "react";
import { Send, Paperclip, Search } from "lucide-react";

interface MessagesPanelProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Student {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: number;
  sender: "student" | "teacher";
  text: string;
  time: string;
}

const students: Student[] = [
  { id: 1, name: "Ana García Pérez", lastMessage: "Profesor, tengo una duda sobre...", time: "10:30", unread: 2 },
  { id: 2, name: "Carlos Mendoza", lastMessage: "Gracias por la explicación", time: "Ayer", unread: 0 },
  { id: 3, name: "María Rodríguez", lastMessage: "¿Podría revisar mi tarea?", time: "Ayer", unread: 1 },
  { id: 4, name: "Juan Fernández", lastMessage: "Buenos días profesor", time: "2 días", unread: 0 },
  { id: 5, name: "Laura Martínez", lastMessage: "Consulta sobre el examen", time: "3 días", unread: 0 },
];

const initialMessages: Message[] = [
  { id: 1, sender: "student", text: "Hola profesor, tengo una duda sobre el tema de procesos", time: "10:25" },
  { id: 2, sender: "teacher", text: "Hola Ana, claro que sí. ¿Qué necesitas saber?", time: "10:27" },
  { id: 3, sender: "student", text: "No entiendo bien la diferencia entre proceso e hilo", time: "10:28" },
  { id: 4, sender: "teacher", text: "Excelente pregunta. Un proceso es una instancia de un programa en ejecución, mientras que un hilo es una unidad de ejecución dentro de un proceso.", time: "10:30" },
];

export function MessagesPanel({ teacherName, currentView, onNavigate, onLogout }: MessagesPanelProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "teacher",
        text: newMessage,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <TeacherNavbar 
        teacherName={teacherName} 
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
            Mensajería
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Comunícate con tus estudiantes
          </p>
        </div>

        <div
          className="bg-white rounded-2xl border border-[#797979] overflow-hidden grid grid-cols-1 lg:grid-cols-3"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)', height: '600px' }}
        >
          {/* Students List */}
          <div className="border-r border-[#ececec] flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-[#ececec]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#797979]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar estudiante..."
                  className="w-full rounded-lg border border-[#797979] bg-[#ececec] pl-10 pr-3 py-2 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  style={{ fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Students */}
            <div className="flex-1 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 cursor-pointer border-b border-[#ececec] hover:bg-[#ececec] transition-colors ${
                    selectedStudent.id === student.id ? "bg-[#ececec]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
                      {student.name}
                    </h4>
                    <span className="text-[#797979]">{student.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#797979] truncate flex-1" style={{ fontWeight: 500 }}>
                      {student.lastMessage}
                    </p>
                    {student.unread > 0 && (
                      <span
                        className="ml-2 bg-[#006d6f] text-white rounded-full w-6 h-6 flex items-center justify-center"
                        style={{ fontWeight: 600 }}
                      >
                        {student.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-[#ececec] bg-[#006d6f] text-white">
              <h3 style={{ fontWeight: 600 }}>
                {selectedStudent.name}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "teacher" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === "teacher"
                        ? "bg-[#006d6f] text-white"
                        : "bg-[#ececec] text-[#333333]"
                    }`}
                  >
                    <p style={{ fontWeight: 500 }}>{message.text}</p>
                    <p
                      className={`mt-1 ${
                        message.sender === "teacher" ? "text-white/70" : "text-[#797979]"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#ececec]">
              <div className="flex gap-3">
                <button
                  className="rounded-xl border border-[#797979] bg-white text-[#006d6f] p-3 hover:bg-[#ececec] transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  style={{ fontWeight: 500 }}
                />
                <button
                  onClick={handleSendMessage}
                  className="rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
