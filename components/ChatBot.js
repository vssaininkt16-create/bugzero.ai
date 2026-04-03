'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Shield, Bot, User, Loader2, Minimize2 } from 'lucide-react';

const GREETING = "Hi! I'm BugZero's AI Security Assistant. How can I help secure your business today?";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', company: '' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history,
          leadInfo: leadCaptured ? leadInfo : undefined,
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I could not get a response. Please try again.' }]);

      // Try to extract lead info from conversation
      if (!leadCaptured) {
        const emailMatch = userMsg.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
        if (emailMatch) {
          setLeadInfo(prev => ({ ...prev, email: emailMatch[0] }));
          setLeadCaptured(true);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize for the issue. Please contact us at contact@bugzero.solutions for immediate help.',
      }]);
    }
    setLoading(false);
  };

  const quickActions = [
    'What services do you offer?',
    'How much does VAPT cost?',
    'How do I get started?',
    'Tell me about your team',
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyber-blue to-cyan-500 shadow-lg shadow-cyber-blue/30 flex items-center justify-center text-white hover:shadow-cyber-blue/50 transition-shadow"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-green rounded-full border-2 border-cyber-bg animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden border border-cyber-border shadow-2xl shadow-black/40"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyber-bg via-cyber-dark to-cyber-bg border-b border-cyber-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyber-blue/20 border border-cyber-blue/30 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyber-blue" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white font-heading">BugZero AI</div>
                  <div className="text-[10px] text-cyber-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green inline-block" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-cyber-bg p-3 space-y-3" style={{ height: '370px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-cyber-blue/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-cyber-blue" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-cyber-blue/20 text-white border border-cyber-blue/20'
                        : 'bg-cyber-card border border-cyber-border text-gray-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-cyber-purple/20 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-cyber-purple" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyber-blue/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-cyber-blue" />
                  </div>
                  <div className="bg-cyber-card border border-cyber-border rounded-xl px-3 py-2">
                    <Loader2 className="w-4 h-4 text-cyber-blue animate-spin" />
                  </div>
                </div>
              )}

              {/* Quick actions (only show when few messages) */}
              {messages.length <= 2 && !loading && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickActions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => {
                          const fakeEvent = { preventDefault: () => {} };
                          setInput('');
                          setMessages(prev => [...prev, { role: 'user', content: q }]);
                          setLoading(true);
                          fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message: q, history: messages }),
                          })
                            .then(r => r.json())
                            .then(data => {
                              setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
                              setLoading(false);
                            })
                            .catch(() => {
                              setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, please try again.' }]);
                              setLoading(false);
                            });
                        }, 50);
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="bg-cyber-dark border-t border-cyber-border p-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our security services..."
                className="flex-1 px-3 py-2 rounded-lg bg-cyber-bg border border-cyber-border text-white text-sm placeholder-gray-500 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-lg bg-cyber-blue/20 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue hover:bg-cyber-blue/30 disabled:opacity-30 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
