import React, { useState, useEffect } from "react";
import { 
  Loader2, 
  Trash2, 
  Terminal, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Clock, 
  ShieldAlert 
} from "lucide-react";

const API = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API}/contact`);
        if (!response.ok) {
          throw new Error(`Failed to fetch contacts: ${response.statusText}`);
        }
        const data = await response.json();
        const formattedData = data.map((contact) => ({
          id: contact._id,
          user: contact.user,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
          createdAt: contact.createdAt,
        }));
        formattedData.reverse();
        setContacts(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("TERMINATE_TRANSMISSION: Are you sure?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/contact/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.statusText}`);
      }
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
      setSuccessMessage("DELETED_SUCCESSFULLY");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-orange-500 animate-pulse tracking-[0.2em]">
        INTERCEPTING_MESSAGES...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-8 selection:bg-orange-500/30">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <Terminal className="text-orange-500" />
          <h1 className="text-2xl font-black uppercase text-white tracking-tighter">
            Inbound<span className="text-orange-500">_Comms</span>
          </h1>
        </div>
        {error && (
            <div className="flex items-center gap-2 text-red-500 text-[10px] bg-red-500/10 px-3 py-1 border border-red-500/20 uppercase animate-bounce">
                <ShieldAlert size={12} /> Error: {error}
            </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-l-2 border-orange-500 pl-4">
            <div>
                <h2 className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em]">Signal_Intercept</h2>
                <p className="text-xl text-white font-bold uppercase tracking-tight">Contact Submissions</p>
            </div>
            {successMessage && (
                <div className="text-green-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    {successMessage}
                </div>
            )}
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded">
            <p className="text-gray-600 text-xs uppercase tracking-widest italic">Zero Inbound Signals Detected.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded hover:bg-white/[0.02] hover:border-orange-500/30 transition-all duration-300 flex flex-col"
              >
                {/* User Info Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                        <User size={18} className="text-orange-500" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-white font-bold text-sm uppercase truncate">{contact.user}</h2>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                            <Mail size={10} />
                            <span className="truncate">{contact.email}</span>
                        </div>
                    </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <Phone size={10} className="text-orange-500/50" />
                        <span>{contact.phone || 'NO_PH_DATA'}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-400 bg-black/50 p-3 rounded border border-white/5 leading-relaxed italic">
                        <MessageSquare size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="break-words">"{contact.message}"</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1 text-[9px] text-gray-600 uppercase font-black">
                        <Clock size={10} />
                        {new Date(contact.createdAt).toLocaleString()}
                    </div>
                    <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        aria-label="Delete entry"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Aesthetic Hover Effect */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-orange-500" />
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-orange-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminContact;