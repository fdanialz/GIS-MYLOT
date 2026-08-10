import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  MapPin, 
  CheckCircle2, 
  Loader2, 
  RotateCcw, 
  Compass, 
  Filter,
  Sparkles
} from 'lucide-react';
import { searchAllDatasets } from '../utils/daerahLoader';

const DAERAH_OPTIONS = [
  { id: 'all', name: 'Semua Daerah (N.S.)' },
  { id: 'seremban', name: 'Seremban' },
  { id: 'jempol', name: 'Jempol' },
  { id: 'pd', name: 'Port Dickson' },
  { id: 'rembau', name: 'Rembau' },
  { id: 'tampin', name: 'Tampin' }
];

const LAYER_CATEGORIES = [
  { id: 'all', name: 'Semua Lapisan' },
  { id: 'warta', name: 'Warta Lot' },
  { id: 'rizab_melayu', name: 'Rizab Melayu' },
  { id: 'hutan', name: 'Hutan Simpan Kekal' },
  { id: 'orang_asli', name: 'Rizab Orang Asli' },
  { id: 'ndcdb', name: 'NDCDB Lot Kadaster' }
];

const GUIDED_QUESTIONS = [
  { label: 'PW2163 (Port Dickson)', query: 'PW2163', daerah: 'pd' },
  { label: 'Lot 3481 (Seremban)', query: 'Lot 3481', daerah: 'seremban' },
  { label: 'PA73315 (Warta)', query: 'PA73315', daerah: 'seremban' },
  { label: 'Rizab Melayu Jempol', query: 'Jempol', daerah: 'jempol', cat: 'rizab_melayu' },
  { label: 'Lot Tampin', query: 'Tampin', daerah: 'tampin' }
];

export default function ChatbotSorting({ onSelectSearchResult, onSelectLocation }) {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lotInput, setLotInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Selamat datang! Saya **MyRizab Assistant**. Sila pilih contoh carian di bawah atau taip nombor **Lot / NOPW / PA / Mukim** untuk menavigasi lokasi terus ke peta.',
      guidedQuestions: GUIDED_QUESTIONS,
      results: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  // Execute spatial search
  const processQuery = async (queryText, forceDistrict, forceCategory) => {
    const q = (queryText !== undefined ? queryText : lotInput).trim();
    const district = forceDistrict !== undefined ? forceDistrict : selectedDistrict;
    const category = forceCategory !== undefined ? forceCategory : selectedCategory;

    if (!q && district === 'all' && category === 'all') {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'user',
          text: 'Jana carian lokasi',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Sila taip nombor Lot, NOPW, PA, atau pilih daerah untuk carian (cth: **Lot 3481**, **PW2163**).',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    const dObj = DAERAH_OPTIONS.find(d => d.id === district);
    const userMsgText = q 
      ? `Cari "${q}" ${district !== 'all' ? `(${dObj?.name})` : ''}`
      : `Senarai lot Daerah ${dObj?.name || 'Semua'}`;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      let searchKeyword = q;
      if (!searchKeyword && district !== 'all') {
        searchKeyword = dObj?.name || '';
      }

      let rawResults = await searchAllDatasets(searchKeyword || 'Seremban');

      if (district !== 'all') {
        rawResults = rawResults.filter(r => {
          const dName = (r.daerah || '').toLowerCase();
          if (district === 'seremban') return dName.includes('seremban');
          if (district === 'jempol') return dName.includes('jempol');
          if (district === 'pd') return dName.includes('pd') || dName.includes('port dickson');
          if (district === 'rembau') return dName.includes('rembau');
          if (district === 'tampin') return dName.includes('tampin');
          return true;
        });
      }

      if (category !== 'all') {
        rawResults = rawResults.filter(r => {
          const lId = (r.layerId || '').toLowerCase();
          const lName = (r.layerName || '').toLowerCase();
          if (category === 'warta') return lId.includes('warta');
          if (category === 'rizab_melayu') return lId.includes('malay') || lName.includes('rizab melayu');
          if (category === 'hutan') return lId.includes('forest') || lName.includes('hutan');
          if (category === 'orang_asli') return lId.includes('aborigine') || lName.includes('orang asli');
          if (category === 'ndcdb') return lId.includes('ndcdb');
          return true;
        });
      }

      let botReplyText = '';
      if (rawResults.length > 0) {
        botReplyText = `Dijumpai **${rawResults.length} lot**. Klik **"Paparkan Lokasi"** untuk menonjolkan lot di peta.`;
      } else {
        botReplyText = `Tiada lot ditemui untuk "${searchKeyword}". Sila cuba sampel carian lain di bawah.`;
      }

      const botReply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReplyText,
        results: rawResults.slice(0, 10),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processQuery();
  };

  const handlePromptClick = (prompt) => {
    setLotInput(prompt.query);
    setSelectedDistrict(prompt.daerah || 'all');
    if (prompt.cat) setSelectedCategory(prompt.cat);
    processQuery(prompt.query, prompt.daerah || 'all', prompt.cat || selectedCategory);
  };

  const handleLocationGenerate = (item) => {
    if (onSelectSearchResult) {
      onSelectSearchResult(item);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.5rem' }}>
      {/* Compact Filter Bar */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.45rem 0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showFilters ? '0.4rem' : '0' }}>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            style={{ background: 'transparent', border: 'none', color: '#f59e0b', fontSize: '0.72rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', padding: 0 }}
          >
            <Filter size={13} /> {showFilters ? 'Sembunyi Tapisan' : 'Buka Tapisan Daerah/Lapisan'}
          </button>

          {(selectedDistrict !== 'all' || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={() => { setSelectedDistrict('all'); setSelectedCategory('all'); }}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}
            >
              <RotateCcw size={11} /> Reset Filter
            </button>
          )}
        </div>

        {showFilters && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.3rem' }}>
            <select 
              className="form-select" 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.4rem' }}
            >
              {DAERAH_OPTIONS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <select 
              className="form-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.4rem' }}
            >
              {LAYER_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Clean Single Scrollable Chat History */}
      <div 
        className="chat-messages-container"
        style={{
          flex: 1,
          overflowY: 'auto',
          background: 'rgba(15, 23, 42, 0.4)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          padding: '0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}
      >
        {messages.map(msg => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {/* Sender Subtitle */}
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {msg.sender === 'bot' ? (
                <><Bot size={12} color="#60a5fa" /> <strong style={{ color: '#60a5fa' }}>Assistant</strong></>
              ) : (
                <strong>Anda</strong>
              )}
              <span>• {msg.timestamp}</span>
            </div>

            {/* Bubble Container */}
            <div 
              style={{
                maxWidth: '92%',
                background: msg.sender === 'user' ? '#1e40af' : 'rgba(30, 41, 59, 0.95)',
                color: '#f8fafc',
                padding: '0.55rem 0.75rem',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                fontSize: '0.76rem',
                lineHeight: '1.4',
                border: msg.sender === 'user' ? '1px solid #3b82f6' : '1px solid var(--border-color)'
              }}
            >
              <div>{msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#f59e0b' }}>{part}</strong> : part)}</div>

              {/* Clean Clickable Quick Prompts */}
              {msg.guidedQuestions && (
                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {msg.guidedQuestions.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => handlePromptClick(q)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '6px',
                        padding: '0.4rem 0.6rem',
                        color: '#f8fafc',
                        fontSize: '0.72rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'background 0.15s'
                      }}
                    >
                      <Sparkles size={11} color="#60a5fa" />
                      <span>{q.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Lot Results List */}
              {msg.results && msg.results.length > 0 && (
                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {msg.results.map((res) => (
                    <div
                      key={res.id}
                      style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '6px',
                        padding: '0.45rem 0.55rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#38bdf8' }}>
                        {res.title}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {res.subtitle}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLocationGenerate(res)}
                        style={{
                          marginTop: '0.15rem',
                          fontSize: '0.68rem',
                          padding: '0.25rem 0.45rem',
                          background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          gap: '0.25rem',
                          fontWeight: 600
                        }}
                      >
                        <Compass size={11} /> Paparkan Lokasi Peta
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#60a5fa', fontSize: '0.72rem', padding: '0.2rem' }}>
            <Loader2 size={13} className="animate-spin" /> Menjana carian spasial lot...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
        <input 
          type="text"
          className="form-input"
          placeholder="Taip No. Lot, NOPW, PA, Mukim..."
          value={lotInput}
          onChange={(e) => setLotInput(e.target.value)}
          disabled={isProcessing}
          style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
        />
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isProcessing}
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'auto' }}
        >
          {isProcessing ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
          <span>Jana</span>
        </button>
      </form>
    </div>
  );
}
