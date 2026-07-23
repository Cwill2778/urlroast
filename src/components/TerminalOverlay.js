'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', content: 'CRONAN OS v2.0.4 [Kernel Version: Maestro-X]' },
    { type: 'system', content: 'Authentication successful. Welcome, Guest.' },
    { type: 'system', content: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Ctrl+` or Cmd+` or Ctrl+k
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === 'k')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpenEvent = () => setIsOpen(true);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpenEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpenEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const fullCmd = input.trim();
      const args = fullCmd.toLowerCase().split(' ');
      const baseCmd = args[0];
      
      setHistory(prev => [...prev, { type: 'user', content: fullCmd }]);
      setInput('');

      const printLine = (text, delay = 0) => {
        if (delay > 0) {
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'system', content: text }]);
          }, delay);
        } else {
          setHistory(prev => [...prev, { type: 'system', content: text }]);
        }
      };

      switch (baseCmd) {
        case 'help':
          printLine("Available commands:");
          printLine("  about      - Display system architect profile");
          printLine("  skills     - List active technical dependencies");
          printLine("  projects   - Fetch deployment logs");
          printLine("  contact    - Initialize communication protocol");
          printLine("  resume     - Generate secure link to CV/Resume");
          printLine("  github     - Open external repository");
          printLine("  ls         - List system directories");
          printLine("  theme      - Change OS accent color (usage: theme [amber/green/blue/white])");
          printLine("  whoami     - Display current user identification");
          printLine("  date       - Display system time");
          printLine("  coffee     - Execute caffeine protocol");
          printLine("  reboot     - Restart Cronan OS");
          printLine("  clear      - Clear terminal output");
          printLine("  exit       - Terminate session");
          break;
        case 'about':
          printLine("Fetching profile...");
          printLine("STATUS: AI Software Engineering Student @ Maestro University.", 500);
          printLine("FOCUS: Full-Stack Architecture, Autonomous Workflows, Operations Management.", 500);
          printLine("DIRECTIVE: Bridging the gap between raw engineering and real-world execution.", 500);
          break;
        case 'skills':
          printLine("Loading dependencies...");
          printLine("> Frontend : [React, HTML5, CSS3, Tailwind]", 400);
          printLine("> Backend  : [Python, Flask, Supabase, SQLite3]", 400);
          printLine("> AI Ops   : [Model Evaluation, Kiro, Cline, Agentic Frameworks]", 400);
          printLine("> Logistics: [Process Automation, HR Ledgers, Agile]", 400);
          break;
        case 'projects':
          printLine("Accessing deployment logs...");
          printLine("1. PropFolio Local [Python/SQLite3] - Standalone property management tool.", 600);
          printLine("2. Streamlit Field App [Python] - Mobile logistics for on-site contractors.", 600);
          printLine("3. Hearts Interactive UI [React] - 3D mobile card game interface.", 600);
          break;
        case 'contact':
          printLine("Initializing communication protocol...");
          printLine("Email: ops@cronantechnology.com", 500);
          printLine("GitHub: [cronan-tech]", 500);
          printLine("Awaiting transmission...", 500);
          break;
        case 'resume':
          printLine("Accessing secured documents...");
          printLine("Document found: CRONAN_RESUME_2026.pdf", 600);
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'html', content: "<a href='#' style='color: inherit; text-decoration: underline;'>[ Click here to download payload ]</a>" }]);
          }, 600);
          break;
        case 'github':
          printLine("Establishing secure connection to GitHub...");
          printLine("Connection established. Opening repository...", 800);
          setTimeout(() => {
            window.open('https://github.com/Cwill2778', '_blank');
          }, 800);
          break;
        case 'ls':
        case 'dir':
          printLine("drwxr-xr-x  2 root  root  4096  software_ai_architecture/");
          printLine("drwxr-xr-x  2 root  root  4096  business_operations/");
          printLine("drwxr-xr-x  2 root  root  4096  remote_assistance/");
          printLine("-rw-r--r--  1 root  root  1024  sys_config.yaml");
          break;
        case 'whoami':
          printLine("guest@cronan-tech-terminal");
          printLine("Privilege Level: 0 (Visitor)");
          break;
        case 'date':
          printLine(new Date().toString());
          break;
        case 'reboot':
          printLine("Initiating system reboot sequence...");
          setTimeout(() => window.location.reload(), 1500);
          break;
        case 'coffee':
          printLine("Initializing caffeine protocol...");
          printLine("Grinding beans...", 400);
          printLine("Heating water to 94°C...", 1000);
          printLine("[████████████████████] 100%", 2000);
          printLine("Dispensing liquid intelligence. Have a great day.", 2500);
          break;
        case 'theme':
          if (args[1] === 'green') {
            document.documentElement.style.setProperty('--primary', '#00ff41');
            printLine("Theme updated to: Matrix Green");
          } else if (args[1] === 'blue') {
            document.documentElement.style.setProperty('--primary', '#00e5ff');
            printLine("Theme updated to: Cyber Blue");
          } else if (args[1] === 'white') {
            document.documentElement.style.setProperty('--primary', '#ffffff');
            printLine("Theme updated to: Monochrome Default");
          } else if (args[1] === 'amber' || args[1] === 'gold') {
            document.documentElement.style.setProperty('--primary', '#ffb700');
            printLine("Theme updated to: Industrial Amber");
          } else {
            printLine("Usage: theme [white/amber/green/blue]");
          }
          break;
        case 'sudo':
        case 'su':
          if (fullCmd.toLowerCase() === 'sudo rm -rf /') {
            printLine("CRITICAL WARNING: Unauthorized destructive command detected.");
            printLine("Initiating counter-intrusion protocols...", 800);
            printLine("Just kidding. But seriously, don't do that.", 2000);
          } else {
            printLine("Access denied. This incident will be reported.");
          }
          break;
        case 'clear':
          setHistory([]);
          break;
        case 'exit':
          printLine("Terminating session...");
          setTimeout(() => setIsOpen(false), 600);
          break;
        default:
          printLine(`Command not found: ${baseCmd}. Type "help" for available commands.`);
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: isMaximized ? 0 : '1rem',
              left: isMaximized ? 0 : '50%',
              transform: isMaximized ? 'none' : 'translateX(-50%)',
              width: isMaximized ? '100vw' : '90vw',
              maxWidth: isMaximized ? 'none' : '800px',
              height: isMaximized ? '100vh' : '500px',
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              border: isMaximized ? 'none' : '1px solid var(--primary)',
              borderRadius: isMaximized ? 0 : '12px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              overflow: 'hidden'
            }}
          >
            {/* Terminal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#111', borderBottom: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: '#d4d4d8', fontWeight: 'bold' }}>
                <TerminalIcon size={14} color="var(--primary)" />
                CRONAN OS
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setIsMaximized(!isMaximized)} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', fontFamily: 'var(--font-space), "Fira Code", "Courier New", Courier, monospace', fontSize: '1.05rem', color: '#ffffff', letterSpacing: '0.5px', lineHeight: '1.5' }}>
              {history.map((msg, i) => {
                if (msg.type === 'html') {
                  return <div key={i} style={{ marginBottom: '0.5rem', color: 'inherit' }} dangerouslySetInnerHTML={{ __html: msg.content }} />;
                }
                if (msg.type === 'user') {
                  return (
                    <div key={i} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                      <span style={{ color: '#888', marginRight: '10px' }}><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>guest@cronan</span>:<span style={{ color: '#ccc' }}>~</span>$</span>
                      {msg.content}
                    </div>
                  );
                }
                return (
                  <div key={i} style={{ marginBottom: '0.5rem', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {msg.content}
                  </div>
                );
              })}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#888', marginRight: '5px', whiteSpace: 'nowrap' }}><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>guest@cronan</span>:<span style={{ color: '#ccc' }}>~</span>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    outline: 'none',
                    caretColor: 'currentColor'
                  }}
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
