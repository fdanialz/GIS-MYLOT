import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  RotateCcw, 
  MapPin, 
  Compass, 
  Loader2, 
  CheckCircle2, 
  ExternalLink,
  HelpCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { searchAllDatasets, fetchDaerahLayerData, ALL_LAYERS_CONFIG } from '../utils/daerahLoader';

// Districts list matching image 2 panel 2
const DISTRICT_OPTIONS = [
  { id: 'seremban', name: 'Seremban' },
  { id: 'jempol', name: 'Jempol' },
  { id: 'pd', name: 'Port Dickson' },
  { id: 'kualapilah', name: 'Kuala Pilah' },
  { id: 'jelebu', name: 'Jelebu' },
  { id: 'rembau', name: 'Rembau' },
  { id: 'tampin', name: 'Tampin' }
];

// Query types matching image 2 panel 1
const QUERY_TYPES = [
  { id: 'trm', label: 'Tanah Rizab Melayu (TRM)' },
  { id: 'pembatalan', label: 'Pembatalan TRM' },
  { id: 'penggantian', label: 'Penggantian TRM' }
];

// Sample lot suggestions per district for quick testing
const DISTRICT_SAMPLES = {
  seremban: [
    { label: 'Seremban, 112', query: 'Seremban, 112' },
    { label: 'Ampangan, Lot 3481', query: 'Ampangan, Lot 3481' },
    { label: 'Rasah, Lot 4510', query: 'Rasah, 4510' }
  ],
  jempol: [
    { label: 'Pekan Johol, 5612', query: 'Pekan Johol, 5612' },
    { label: 'Jempol, Lot 1024', query: 'Jempol, 1024' },
    { label: 'Serting Hilir, 301', query: 'Serting Hilir, 301' }
  ],
  pd: [
    { label: 'Port Dickson, PW2163', query: 'Port Dickson, PW2163' },
    { label: 'Si Rusa, Lot 412', query: 'Si Rusa, 412' }
  ],
  rembau: [
    { label: 'Rembau, Lot 502', query: 'Rembau, 502' },
    { label: 'Pedas, Lot 1204', query: 'Pedas, 1204' }
  ],
  tampin: [
    { label: 'Tampin, Lot 622', query: 'Tampin, 622' },
    { label: 'Gemas, Lot 881', query: 'Gemas, 881' }
  ],
  kualapilah: [
    { label: 'Kuala Pilah, PW1174', query: 'PW1174' },
    { label: 'Juasseh, Lot 892', query: 'Juasseh, 892' }
  ],
  jelebu: [
    { label: 'Jelebu, PW1989', query: 'PW1989' },
    { label: 'Kuala Klawang, Lot 2291', query: 'Kuala Klawang, 2291' }
  ]
};

export default function ChatbotSorting({ onSelectSearchResult, onSelectLocation, onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('type_selection'); // 'type_selection', 'district_selection', 'lot_input', 'result'
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      type: 'text',
      text: 'Selamat datang ke Bot Sembang Malay Reserve Intelligence Solution.',
      timestamp: '9:46 AM'
    },
    {
      id: 'msg-step-1',
      sender: 'bot',
      type: 'query_type_prompt',
      text: 'Apakah jenis pertanyaan anda?',
      timestamp: '9:46 AM'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing, currentStep]);

  // Current time formatted
  const getNowTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Step 1: User selects Query Type (TRM / Pembatalan TRM / Penggantian TRM)
  const handleSelectQueryType = (typeObj) => {
    const time = getNowTime();
    setSelectedType(typeObj);
    setCurrentStep('district_selection');

    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        type: 'text',
        text: typeObj.label,
        timestamp: time
      },
      {
        id: `bot-district-${Date.now()}`,
        sender: 'bot',
        type: 'district_prompt',
        text: 'Lokasi tanah anda',
        timestamp: time
      }
    ]);
  };

  // Step 2: User selects District
  const handleSelectDistrict = (districtObj) => {
    const time = getNowTime();
    setSelectedDistrict(districtObj);
    setCurrentStep('lot_input');

    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        type: 'text',
        text: districtObj.name,
        timestamp: time
      },
      {
        id: `bot-lot-prompt-${Date.now()}`,
        sender: 'bot',
        type: 'lot_prompt',
        text: 'Masukkan maklumat Mukim,No Lot (contoh: Pekan Johol,5612)',
        districtId: districtObj.id,
        timestamp: time
      }
    ]);
  };

  // Step 3: Execute search for Lot & Mukim
  const handleProcessLotSearch = async (queryText) => {
    const q = (queryText || inputValue).trim();
    if (!q) return;

    const time = getNowTime();
    setInputValue('');

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        type: 'text',
        text: q,
        timestamp: time
      }
    ]);

    setIsProcessing(true);

    try {
      // Clean query and extract lot number/mukim
      // e.g. "Seremban, 112" -> search keyword "112" or "Seremban"
      let searchKeyword = q;
      const parts = q.split(/[,;\/]+/).map(p => p.trim()).filter(Boolean);
      
      let rawResults = [];

      // 1. First try searching directly with the entire string
      rawResults = await searchAllDatasets(q);

      // 2. If no results and multiple parts exist, search each part
      if ((!rawResults || rawResults.length === 0) && parts.length > 1) {
        for (const p of parts) {
          const res = await searchAllDatasets(p);
          if (res && res.length > 0) {
            rawResults = res;
            break;
          }
        }
      }

      // 3. If still no results, search by district or lot digits
      if (!rawResults || rawResults.length === 0) {
        const lotNumberMatch = q.match(/\d+/);
        if (lotNumberMatch) {
          const res = await searchAllDatasets(lotNumberMatch[0]);
          if (res && res.length > 0) {
            rawResults = res;
          }
        }
      }

      // Filter by district if a district was selected
      let finalResults = rawResults;
      if (selectedDistrict && selectedDistrict.id !== 'all' && rawResults.length > 0) {
        const dId = selectedDistrict.id;
        const filtered = rawResults.filter(r => {
          const dName = (r.daerah || '').toLowerCase();
          if (dId === 'pd') return dName.includes('pd') || dName.includes('port dickson');
          if (dId === 'kuala_pilah') return dName.includes('pilah');
          if (dId === 'jelebu') return dName.includes('jelebu');
          return dName.includes(dId);
        });
        if (filtered.length > 0) {
          finalResults = filtered;
        }
      }

      // Format Bot Reply matching Image 2 Panel 3
      const firstMatch = finalResults && finalResults.length > 0 ? finalResults[0] : null;

      if (firstMatch) {
        // Determine status text based on layer/category
        const lId = (firstMatch.layerId || '').toLowerCase();
        const lName = (firstMatch.layerName || '').toLowerCase();
        let statusText = 'Tanah anda berada di dalam kawasan Rizab Melayu';
        
        if (selectedType?.id === 'pembatalan' || lId.includes('pembatalan') || lName.includes('pembatalan')) {
          statusText = 'Tanah anda berada di dalam kawasan Pembatalan TRM';
        } else if (selectedType?.id === 'penggantian' || lId.includes('gantian') || lName.includes('gantian')) {
          statusText = 'Tanah anda berada di dalam kawasan Penggantian TRM';
        } else if (lId.includes('forest') || lName.includes('hutan')) {
          statusText = 'Tanah anda berada di dalam kawasan Hutan Simpan Kekal';
        } else if (lId.includes('aborigine') || lName.includes('orang asli')) {
          statusText = 'Tanah anda berada di dalam kawasan Rizab Orang Asli';
        }

        setMessages(prev => [
          ...prev,
          {
            id: `bot-status-${Date.now()}`,
            sender: 'bot',
            type: 'result_status',
            text: statusText,
            timestamp: getNowTime()
          },
          {
            id: `bot-action-${Date.now() + 1}`,
            sender: 'bot',
            type: 'result_action',
            text: 'Klik di sini untuk ke Lokasi Lot anda',
            matchedItem: firstMatch,
            allResults: finalResults.slice(0, 5),
            timestamp: getNowTime()
          }
        ]);
      } else {
        // Not found feedback
        setMessages(prev => [
          ...prev,
          {
            id: `bot-notfound-${Date.now()}`,
            sender: 'bot',
            type: 'not_found',
            text: `Maklumat lot "${q}" tidak dijumpai dalam rekod pangkalan data kawasan Rizab Melayu. Sila pastikan ejaan Mukim dan No. Lot adalah tepat.`,
            timestamp: getNowTime()
          }
        ]);
      }

      setCurrentStep('result');
    } catch (err) {
      console.error('Error during lot search:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-error-${Date.now()}`,
          sender: 'bot',
          type: 'text',
          text: 'Ralat semasa memproses carian spasial lot. Sila cuba sekali lagi.',
          timestamp: getNowTime()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Click on "Klik di sini untuk ke Lokasi Lot anda"
  const handleNavigateToLot = (item) => {
    if (!item) return;
    if (onSelectSearchResult) {
      onSelectSearchResult(item);
    }
    if (onSelectLocation && item.center) {
      onSelectLocation(item.center[0], item.center[1], 17, item.title || 'Lot Terpilih');
    }
  };

  // Reset dialogue to start fresh
  const handleResetChat = () => {
    setCurrentStep('type_selection');
    setSelectedType(null);
    setSelectedDistrict(null);
    setInputValue('');
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'bot',
        type: 'text',
        text: 'Selamat datang ke Bot Sembang Malay Reserve Intelligence Solution.',
        timestamp: getNowTime()
      },
      {
        id: `msg-step-1-${Date.now() + 1}`,
        sender: 'bot',
        type: 'query_type_prompt',
        text: 'Apakah jenis pertanyaan anda?',
        timestamp: getNowTime()
      }
    ]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    handleProcessLotSearch(inputValue);
  };

  return (
    <div className="mris-chat-container">
      {/* Scrollable Conversation Stream */}
      <div className="mris-chat-messages" id="mrisChatScrollArea">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';

          return (
            <div 
              key={msg.id || index}
              className={`mris-message-row ${isUser ? 'user-row' : 'bot-row'}`}
            >
              {/* Bot Avatar & Label on the Left */}
              {!isUser && (
                <div className="mris-bot-avatar-wrap">
                  <img 
                    src={`${import.meta.env.BASE_URL}mr_mris_avatar.svg`} 
                    alt="Mr. MRIS" 
                    className="mris-bot-avatar-img"
                  />
                </div>
              )}

              <div className="mris-bubble-wrapper">
                {/* Timestamp / Sender Subtitle */}
                {!isUser && (
                  <div className="mris-message-meta">
                    <span className="mris-meta-sender">Instabot</span>
                    <span className="mris-meta-dot">•</span>
                    <span className="mris-meta-time">{msg.timestamp || '9:46 AM'}</span>
                  </div>
                )}

                {/* Primary Message Bubble */}
                <div className={`mris-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
                  {msg.text}
                </div>

                {/* Step 1: Query Type Buttons (TRM / Pembatalan / Penggantian) */}
                {msg.type === 'query_type_prompt' && currentStep === 'type_selection' && (
                  <div className="mris-options-stack">
                    {QUERY_TYPES.map(qt => (
                      <button
                        key={qt.id}
                        type="button"
                        onClick={() => handleSelectQueryType(qt)}
                        className="mris-option-btn"
                      >
                        {qt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: District Selection Buttons Grid */}
                {msg.type === 'district_prompt' && currentStep === 'district_selection' && (
                  <div className="mris-districts-grid">
                    {DISTRICT_OPTIONS.map(d => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleSelectDistrict(d)}
                        className="mris-district-btn"
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Sample lot quick buttons */}
                {msg.type === 'lot_prompt' && currentStep === 'lot_input' && msg.districtId && (
                  <div className="mris-samples-wrap">
                    <div className="mris-samples-title">Contoh carian cepat:</div>
                    <div className="mris-samples-list">
                      {(DISTRICT_SAMPLES[msg.districtId] || DISTRICT_SAMPLES.seremban).map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleProcessLotSearch(s.query)}
                          className="mris-sample-chip"
                        >
                          <Sparkles size={11} className="mr-1 inline text-amber-500" />
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Clickable Action Link to Lot Location */}
                {msg.type === 'result_action' && msg.matchedItem && (
                  <div className="mris-result-card">
                    <button
                      type="button"
                      onClick={() => handleNavigateToLot(msg.matchedItem)}
                      className="mris-lot-action-btn"
                    >
                      <MapPin size={15} color="#1d4ed8" />
                      <span className="mris-underline-link">
                        Klik di sini untuk ke Lokasi Lot anda
                      </span>
                    </button>

                    {/* Lot Detail Meta Pill */}
                    <div className="mris-lot-meta-badge">
                      <strong>{msg.matchedItem.title}</strong>
                      <span className="text-xs opacity-80">{msg.matchedItem.subtitle}</span>
                    </div>

                    {/* Multiple Results List if available */}
                    {msg.allResults && msg.allResults.length > 1 && (
                      <div className="mris-additional-results">
                        <div className="text-[11px] font-semibold text-gray-600 mb-1">
                          Lot berdekatan lain:
                        </div>
                        {msg.allResults.slice(1, 4).map(res => (
                          <button
                            key={res.id}
                            type="button"
                            onClick={() => handleNavigateToLot(res)}
                            className="mris-sub-lot-btn"
                          >
                            <Compass size={12} /> {res.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Not Found / Reset helper */}
                {msg.type === 'not_found' && (
                  <div className="mris-reset-options">
                    <button
                      type="button"
                      onClick={handleResetChat}
                      className="mris-reset-btn"
                    >
                      <RotateCcw size={12} /> Cuba Carian Lain
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="mris-message-row bot-row">
            <div className="mris-bot-avatar-wrap">
              <img 
                src={`${import.meta.env.BASE_URL}mr_mris_avatar.svg`} 
                alt="Mr. MRIS" 
                className="mris-bot-avatar-img" 
              />
            </div>
            <div className="mris-bubble bot-bubble mris-loading-bubble">
              <Loader2 size={15} className="animate-spin" /> Sedang mencari data lot spasial...
            </div>
          </div>
        )}

        {/* After results show reset option */}
        {currentStep === 'result' && !isProcessing && (
          <div className="mris-chat-footer-actions">
            <button
              type="button"
              onClick={handleResetChat}
              className="mris-restart-btn"
            >
              <RotateCcw size={13} /> Pertanyaan Baharu / Mula Semula
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar Matching Design: "Type here..." with Paper Plane Send Button */}
      <form onSubmit={handleFormSubmit} className="mris-input-bar">
        <input 
          type="text"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isProcessing}
          className="mris-input-field"
        />
        <button 
          type="submit" 
          disabled={!inputValue.trim() || isProcessing}
          className="mris-send-btn"
          aria-label="Hantar Mesej"
        >
          {isProcessing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </form>
    </div>
  );
}
