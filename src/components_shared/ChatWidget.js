import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

// Endpoint: a Vercel serverless function at /api/chat that proxies to the LLM.
// Override at build time with REACT_APP_CHAT_ENDPOINT for staging/local.
const ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT || '/api/chat';

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  // Seed greeting when first opened
  React.useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('chat.greeting') }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setError('');
    const userMsg = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setSending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(m => ({ role: m.role, content: m.content })),
          lang: i18n.language,
        }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const reply = data.reply || data.content || '';
      setMessages(prev => [...prev, { role: 'assistant', content: reply || t('chat.empty') }]);
    } catch (err) {
      setError(err.message);
      setMessages(prev => [...prev, { role: 'assistant', content: t('chat.errorReply'), isError: true }]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 1300,
            }}
          >
            <IconButton
              onClick={() => setOpen(true)}
              aria-label="Open chat"
              sx={{
                width: 56, height: 56,
                bgcolor: GOLD,
                color: '#0D0D0D',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                '&:hover': { bgcolor: CREAM },
                transition: 'background-color 0.3s ease',
              }}
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 1300,
              width: 'min(380px, calc(100vw - 32px))',
              maxHeight: 'min(580px, calc(100vh - 48px))',
            }}
          >
            <Box
              sx={{
                bgcolor: '#0F0F0F',
                border: `1px solid rgba(196,163,90,0.3)`,
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                display: 'flex', flexDirection: 'column',
                height: 'min(580px, calc(100vh - 48px))',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <Box sx={{
                px: 2.5, py: 2,
                borderBottom: '1px solid rgba(245,242,237,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <Box>
                  <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 0.25 }}>
                    {t('chat.eyebrow')}
                  </Typography>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: CREAM, lineHeight: 1.1 }}>
                    {t('chat.title')}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  sx={{ color: 'rgba(245,242,237,0.5)', '&:hover': { color: CREAM } }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                ref={scrollRef}
                sx={{
                  flex: 1, overflow: 'auto', px: 2.5, py: 2,
                  display: 'flex', flexDirection: 'column', gap: 1.5,
                  '&::-webkit-scrollbar': { width: 4 },
                  '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(245,242,237,0.15)', borderRadius: 2 },
                }}
              >
                {messages.map((m, i) => (
                  <MessageBubble key={i} message={m} />
                ))}
                {sending && (
                  <Box sx={{ alignSelf: 'flex-start', display: 'flex', gap: 0.5, p: 1.5 }}>
                    {[0, 1, 2].map(d => (
                      <Box key={d} sx={{
                        width: 6, height: 6, borderRadius: '50%', bgcolor: GOLD,
                        animation: 'chatdot 1.4s infinite',
                        animationDelay: `${d * 0.2}s`,
                        '@keyframes chatdot': {
                          '0%, 60%, 100%': { opacity: 0.3 },
                          '30%': { opacity: 1 },
                        },
                      }} />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Error banner */}
              {error && (
                <Typography sx={{ px: 2.5, py: 1, fontSize: '0.75rem', color: '#E57373', bgcolor: 'rgba(229,115,115,0.1)' }}>
                  {error}
                </Typography>
              )}

              {/* Input */}
              <Box sx={{
                p: 1.5,
                borderTop: '1px solid rgba(245,242,237,0.08)',
                display: 'flex', alignItems: 'flex-end', gap: 1,
              }}>
                <TextField
                  fullWidth multiline maxRows={4}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.placeholder')}
                  disabled={sending}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: CREAM, fontSize: '0.92rem',
                      px: 1.5, py: 0.75,
                      bgcolor: 'rgba(245,242,237,0.05)',
                      '& textarea::placeholder': { color: DIM, opacity: 1 },
                    },
                  }}
                />
                <IconButton
                  onClick={handleSend}
                  disabled={sending || !input.trim()}
                  sx={{
                    color: GOLD, bgcolor: 'rgba(196,163,90,0.1)',
                    '&:hover': { bgcolor: 'rgba(196,163,90,0.2)' },
                    '&.Mui-disabled': { color: 'rgba(245,242,237,0.2)' },
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '85%',
        px: 1.75, py: 1.25,
        bgcolor: isUser ? GOLD : 'rgba(245,242,237,0.06)',
        color: isUser ? '#0D0D0D' : (message.isError ? '#E57373' : CREAM),
        fontSize: '0.9rem',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {message.content}
    </Box>
  );
}
