import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bot, Send, Sparkles, Upload, X, Plus, Globe, Lock,
  ChevronDown, Trash2, ArrowLeft, Check, Play,
  MessageSquare, Zap, Users, Home, TrendingUp, HelpCircle,
  Palette, Eye, EyeOff, RefreshCw, Tag,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ConversationStep = 'idle' | 'named' | 'described' | 'categorised' | 'prompted' | 'done'

interface ChatMessage {
  id: string
  role: 'assistant' | 'user'
  text: string
  followUps?: string[]
}

interface ExamplePrompt { id: string; value: string }

interface BotConfig {
  title: string
  description: string
  category: string
  visibility: 'public' | 'private'
  roles: string[]
  prompts: ExamplePrompt[]
  thumbnail: File | null
  thumbnailPreview: string | null
  iconColor: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Property Enquiry', 'Finance Assessment', 'SMSF Qualification',
  'Referral Capture', 'Property Reservation', 'Lead Nurture Sequence',
  'Subscriber Onboarding', 'Property Search Request', 'BDM Appointment Setter',
  'Wealth Creation Funnel', 'Duplex Investor Flow', 'General FAQ Bot',
]

const ROLES = ['Affiliates', 'Subscribers', 'BDMs', 'Sales Agents', 'Referral Partners', 'Developers']

const SUGGESTION_CARDS = [
  { label: 'Customer Support',     icon: HelpCircle,   description: 'Handle FAQs and escalate complex issues',          color: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-100',   prompt: 'Create a customer support bot that handles FAQs and escalates complex issues to the support team.' },
  { label: 'Sales Bot',            icon: TrendingUp,   description: 'Qualify leads and book discovery calls',           color: 'text-green-500',  bg: 'bg-green-50',  border: 'border-green-100',  prompt: 'Build a sales qualification bot that captures leads, qualifies prospects and books discovery calls.' },
  { label: 'Real Estate Assistant',icon: Home,         description: 'Help buyers find properties and book inspections', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100', prompt: 'Design a real estate assistant that helps buyers find properties, answers questions and books inspections.' },
  { label: 'Lead Nurture',         icon: Users,        description: 'Re-engage cold leads with automated sequences',    color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100', prompt: 'Create a 30-day lead nurture bot that sends personalised follow-ups and re-engages cold leads.' },
  { label: 'Finance Qualifier',    icon: Zap,          description: 'Assess investor readiness and collect data',       color: 'text-teal-500',   bg: 'bg-teal-50',   border: 'border-teal-100',   prompt: 'Build a finance pre-assessment bot that qualifies investors and collects financial readiness data.' },
  { label: 'Appointment Booker',   icon: MessageSquare,description: 'Book calls and send confirmation emails',          color: 'text-rose-500',   bg: 'bg-rose-50',   border: 'border-rose-100',   prompt: 'Create an appointment booking bot that checks availability and books discovery calls automatically.' },
]

const ICON_COLOR_SWATCHES = [
  { id: 'orange', dot: '#e07b39', ring: '#fed7aa', label: 'Orange', gradient: 'from-orange-400 to-orange-600' },
  { id: 'blue',   dot: '#3b82f6', ring: '#bfdbfe', label: 'Blue',   gradient: 'from-blue-400 to-blue-600'   },
  { id: 'green',  dot: '#22c55e', ring: '#bbf7d0', label: 'Green',  gradient: 'from-green-400 to-green-600' },
  { id: 'purple', dot: '#a855f7', ring: '#e9d5ff', label: 'Purple', gradient: 'from-purple-400 to-purple-600'},
  { id: 'teal',   dot: '#14b8a6', ring: '#99f6e4', label: 'Teal',   gradient: 'from-teal-400 to-teal-600'   },
  { id: 'rose',   dot: '#f43f5e', ring: '#fecdd3', label: 'Rose',   gradient: 'from-rose-400 to-rose-600'   },
]

// Progress steps for the setup indicator
const PROGRESS_STEPS = [
  { key: 'title',       label: 'Name',       check: (c: BotConfig) => c.title.trim().length > 0 },
  { key: 'description', label: 'Purpose',    check: (c: BotConfig) => c.description.trim().length > 0 },
  { key: 'category',    label: 'Category',   check: (c: BotConfig) => c.category.length > 0 },
  { key: 'prompts',     label: 'Prompts',    check: (c: BotConfig) => c.prompts.some(p => p.value.trim()) },
  { key: 'visibility',  label: 'Access',     check: (c: BotConfig) => c.visibility === 'private' || c.roles.length > 0 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Guided conversation engine
// ─────────────────────────────────────────────────────────────────────────────

function getNextStep(step: ConversationStep, config: BotConfig): ConversationStep {
  if (step === 'idle') return 'named'
  if (step === 'named') return 'described'
  if (step === 'described') return 'categorised'
  if (step === 'categorised') return 'prompted'
  if (step === 'prompted') return 'done'
  return 'done'
}

function buildAssistantReply(
  userText: string,
  step: ConversationStep,
  config: BotConfig
): { text: string; followUps?: string[]; configUpdates: Partial<BotConfig> } {
  const lower = userText.toLowerCase()

  // ── Step: idle → named (first message, detect intent) ──
  if (step === 'idle') {
    if (lower.includes('support') || lower.includes('faq') || lower.includes('help'))
      return { text: "Great choice! I've named it **Customer Support Bot**. Now, what should this bot actually do? Give me a one-sentence description of its main purpose.", followUps: ['Handle FAQs and escalate issues', 'Answer product questions 24/7', 'Reduce support ticket volume'], configUpdates: { title: 'Customer Support Bot', category: 'General FAQ Bot' } }
    if (lower.includes('sales') || lower.includes('lead') || lower.includes('qualify'))
      return { text: "Perfect! I've set the name to **Sales Qualification Bot**. What's the core job — qualifying leads, booking calls, or both? Describe it in a sentence.", followUps: ['Qualify leads and route to sales team', 'Book discovery calls automatically', 'Score prospects and send reports'], configUpdates: { title: 'Sales Qualification Bot', category: 'Lead Nurture Sequence' } }
    if (lower.includes('real estate') || lower.includes('property') || lower.includes('listing'))
      return { text: "Excellent! Named it **Real Estate Assistant**. What should it help users with — finding properties, booking inspections, or answering questions?", followUps: ['Help buyers find matching properties', 'Book property inspections', 'Answer listing questions instantly'], configUpdates: { title: 'Real Estate Assistant', category: 'Property Enquiry' } }
    if (lower.includes('nurture') || lower.includes('follow') || lower.includes('cold'))
      return { text: "Nice! I've set the name to **30-Day Nurture Sequence**. Describe what this bot should do for cold leads in one sentence.", followUps: ['Send weekly market updates', 'Re-engage with personalised content', 'Move leads down the funnel'], configUpdates: { title: '30-Day Nurture Sequence', category: 'Lead Nurture Sequence' } }
    if (lower.includes('finance') || lower.includes('assessment') || lower.includes('investor'))
      return { text: "Smart! Named it **Finance Pre-Assessment Bot**. What's the main goal — qualifying investors, collecting data, or sending reports?", followUps: ['Qualify investor readiness', 'Collect financial profile data', 'Send personalised assessment reports'], configUpdates: { title: 'Finance Pre-Assessment Bot', category: 'Finance Assessment' } }
    if (lower.includes('appointment') || lower.includes('book') || lower.includes('call'))
      return { text: "Got it! Named it **Appointment Booking Bot**. What should happen after a booking — confirmation email, Zoom link, or CRM update?", followUps: ['Send confirmation with Zoom link', 'Update CRM and notify team', 'Send reminder 24h before call'], configUpdates: { title: 'Appointment Booking Bot', category: 'BDM Appointment Setter' } }
    // Generic
    const words = userText.trim().split(' ')
    const title = words.slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Bot'
    return { text: `Got it! I've named it **${title}**. Now describe what this bot should do in one sentence — what's its main job?`, followUps: ['Capture and qualify leads', 'Answer common questions', 'Book appointments automatically'], configUpdates: { title } }
  }

  // ── Step: named → described ──
  if (step === 'named') {
    return { text: `Perfect description! I've saved that. Now let's pick a category — which best fits your bot?\n\nOr just tell me in your own words and I'll match it.`, followUps: ['Property Enquiry', 'Lead Nurture Sequence', 'Finance Assessment', 'General FAQ Bot'], configUpdates: { description: userText.charAt(0).toUpperCase() + userText.slice(1) } }
  }

  // ── Step: described → categorised ──
  if (step === 'described') {
    let category = CATEGORIES[0]
    if (lower.includes('property') || lower.includes('enquiry')) category = 'Property Enquiry'
    else if (lower.includes('finance') || lower.includes('assessment')) category = 'Finance Assessment'
    else if (lower.includes('nurture') || lower.includes('lead')) category = 'Lead Nurture Sequence'
    else if (lower.includes('faq') || lower.includes('support')) category = 'General FAQ Bot'
    else if (lower.includes('appointment') || lower.includes('bdm')) category = 'BDM Appointment Setter'
    else if (lower.includes('smsf')) category = 'SMSF Qualification'
    else {
      const match = CATEGORIES.find(c => lower.includes(c.toLowerCase()))
      if (match) category = match
    }
    return { text: `Category set to **${category}**. Now let's add some example prompts — these are starter questions users can tap to begin a conversation. What are 2–3 things users might ask your bot?`, followUps: ['What properties are available?', 'How do I get started?', 'Can I book a call?', 'What are my options?'], configUpdates: { category } }
  }

  // ── Step: categorised → prompted ──
  if (step === 'categorised') {
    const newPrompt: ExamplePrompt = { id: Date.now().toString(), value: userText }
    const existing = config.prompts.filter(p => p.value.trim())
    const updated = [...existing, newPrompt]
    if (updated.length < 3) {
      return { text: `Added! Got ${updated.length} prompt${updated.length > 1 ? 's' : ''} so far. Add another one, or say "done" to finish setup.`, followUps: ['Done, looks good!', 'Add one more prompt', 'Skip prompts'], configUpdates: { prompts: updated } }
    }
    return { text: `Great — you've got ${updated.length} example prompts. Your bot is looking solid! Review the configuration on the right and hit **Save Bot** when you're ready.`, followUps: ['Looks great, save it!', 'Let me tweak the description', 'Change the category'], configUpdates: { prompts: updated } }
  }

  // ── Step: done / follow-up edits ──
  if (lower.includes('done') || lower.includes('save') || lower.includes('looks great'))
    return { text: "Your bot is all set! Hit **Save Bot** in the top right (or the button below) to publish it. You can always edit it later from the Bot In A Box page.", followUps: [], configUpdates: {} }
  if (lower.includes('description') || lower.includes('purpose'))
    return { text: "Sure! Type a new description and I'll update it for you.", followUps: [], configUpdates: {} }
  if (lower.includes('category'))
    return { text: "No problem. Which category fits best?", followUps: CATEGORIES.slice(0, 5), configUpdates: {} }

  return { text: "Got it! I've updated your bot. Anything else you'd like to change?", followUps: ['Change the name', 'Update description', 'Add more prompts', 'Save the bot'], configUpdates: {} }
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Bar
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBar({ config }: { config: BotConfig }) {
  const completed = PROGRESS_STEPS.filter(s => s.check(config)).length
  const pct = Math.round((completed / PROGRESS_STEPS.length) * 100)

  return (
    <div className="px-4 py-2 bg-white border-b border-gray-100 shrink-0 flex items-center gap-3">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] font-semibold text-gray-400">Setup</span>
        <span className="text-[10px] font-bold text-orange-500">{pct}%</span>
      </div>
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {PROGRESS_STEPS.map(step => {
          const done = step.check(config)
          return (
            <div key={step.key} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 ${done ? 'bg-orange-500' : 'bg-gray-200'}`}>
                {done && <Check className="w-2 h-2 text-white" />}
              </div>
              <span className={`text-[9px] font-semibold transition-colors hidden sm:block ${done ? 'text-orange-500' : 'text-gray-400'}`}>{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Typing Indicator
// ─────────────────────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-end">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm shadow-orange-200">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center">
          {[0, 160, 320].map(d => (
            <span key={d} className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Chat Bubble
// ─────────────────────────────────────────────────────────────────────────────

function ChatBubble({ message, onFollowUp }: { message: ChatMessage; onFollowUp: (t: string) => void }) {
  const isUser = message.role === 'user'

  // Bold **text** renderer
  function renderText(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-bold">{part}</strong>
        : <span key={i}>{part}</span>
    )
  }

  return (
    <div className={`flex gap-2.5 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm shadow-orange-200 mb-auto mt-0.5">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className="flex flex-col gap-1.5 max-w-[80%]">
        <div className={`px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
          isUser
            ? 'bg-orange-500 text-white rounded-2xl rounded-br-sm shadow-orange-200'
            : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm'
        }`}>
          {renderText(message.text)}
        </div>
        {/* Follow-up chips */}
        {!isUser && message.followUps && message.followUps.length > 0 && (
          <div className="flex flex-wrap gap-1 pl-0.5">
            {message.followUps.map(fu => (
              <button
                key={fu}
                onClick={() => onFollowUp(fu)}
                className="px-2.5 py-1 text-[10px] font-medium bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                {fu}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Suggestion Card
// ─────────────────────────────────────────────────────────────────────────────

function SuggestionCard({
  card,
  selected,
  onSelect,
}: {
  card: typeof SUGGESTION_CARDS[0]
  selected: boolean
  onSelect: (prompt: string) => void
}) {
  const Icon = card.icon
  return (
    <button
      onClick={() => onSelect(card.prompt)}
      className={`flex items-center gap-2.5 p-3 rounded-xl text-left transition-all duration-200 group border ${
        selected
          ? 'bg-orange-50 border-orange-300 shadow-sm shadow-orange-100'
          : 'bg-white border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gray-100'
      }`}
    >
      <div className={`w-7 h-7 rounded-lg ${card.bg} border ${card.border} flex items-center justify-center shrink-0`}>
        <Icon className={`w-3.5 h-3.5 ${card.color}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <p className={`text-[11px] font-bold transition-colors ${selected ? 'text-orange-600' : 'text-gray-800 group-hover:text-orange-600'}`}>{card.label}</p>
          {selected && <div className="w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center shrink-0"><Check className="w-2 h-2 text-white" /></div>}
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight line-clamp-1">{card.description}</p>
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Chat Panel (Left)
// ─────────────────────────────────────────────────────────────────────────────

function ChatPanel({
  messages,
  isTyping,
  selectedCard,
  onSend,
}: {
  messages: ChatMessage[]
  isTyping: boolean
  selectedCard: string | null
  onSend: (text: string) => void
}) {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const showCards = messages.length === 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    onSend(trimmed)
    setInput('')
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Bot Builder</p>
            <p className="text-[10px] text-gray-400">Describe your bot and I'll configure it</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 min-h-0 pb-2">
        {/* Welcome */}
        <div className="flex gap-2.5 items-end">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm shadow-orange-200">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-700 leading-relaxed">
              Hi! I'm your <strong className="font-bold text-gray-900">Bot Builder</strong> assistant. Tell me what you'd like your bot to do and I'll configure everything automatically. Or pick a template below.
            </p>
          </div>
        </div>

        {/* Suggestion cards */}
        {showCards && (
          <div className="pl-9 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick start templates</p>
            <div className="grid grid-cols-2 gap-1.5">
              {SUGGESTION_CARDS.map(card => (
                <SuggestionCard
                  key={card.label}
                  card={card}
                  selected={selectedCard === card.label}
                  onSelect={onSend}
                />
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} onFollowUp={onSend} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 shrink-0">
        <div className={`flex items-end gap-2 bg-white rounded-xl px-3 py-2 transition-all duration-200 ${
          focused
            ? 'shadow-md shadow-orange-100 ring-2 ring-orange-300'
            : 'shadow-sm ring-1 ring-gray-100 hover:ring-gray-200'
        }`}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Describe what your bot should do..."
            rows={1}
            className="flex-1 text-xs text-gray-700 placeholder:text-gray-300 resize-none focus:outline-none bg-transparent leading-relaxed"
            style={{ maxHeight: 80 }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 ${
              input.trim() && !isTyping
                ? 'bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-200 hover:scale-105'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Send className={`w-3 h-3 ${input.trim() && !isTyping ? 'text-white' : 'text-gray-400'}`} />
          </button>
        </div>
        <p className="text-[9px] text-gray-300 mt-1.5 text-center select-none">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Preview Card (with Try Bot)
// ─────────────────────────────────────────────────────────────────────────────

function LivePreview({ config, onTryPrompt }: { config: BotConfig; onTryPrompt: (p: string) => void }) {
  const swatch = ICON_COLOR_SWATCHES.find(s => s.id === config.iconColor) ?? ICON_COLOR_SWATCHES[0]
  const filledPrompts = config.prompts.filter(p => p.value.trim())
  const [tryMode, setTryMode] = useState(false)
  const [tryInput, setTryInput] = useState('')

  return (
    <div className="rounded-xl overflow-hidden shadow-md shadow-orange-100">
      {/* Card */}
      <div
        className="p-4 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${swatch.dot} 0%, ${swatch.dot}cc 100%)` }}
      >
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-8 -left-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center shrink-0 overflow-hidden">
            {config.thumbnailPreview
              ? <img src={config.thumbnailPreview} alt="bot" className="w-full h-full object-cover" />
              : <Bot className="w-4.5 h-4.5 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold truncate">{config.title || 'Your Bot Name'}</p>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                {config.visibility === 'public' ? <Globe className="w-2.5 h-2.5 text-white/80" /> : <Lock className="w-2.5 h-2.5 text-white/80" />}
              </div>
            </div>
            {config.category && (
              <span className="inline-flex items-center gap-1 text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full mt-0.5">
                <Tag className="w-2 h-2" />{config.category}
              </span>
            )}
          </div>
        </div>

        <p className="relative text-[11px] text-white/85 leading-relaxed mt-2 line-clamp-2">
          {config.description || <span className="italic opacity-60">Your bot description will appear here...</span>}
        </p>

        {filledPrompts.length > 0 && (
          <div className="relative mt-2 flex flex-wrap gap-1">
            {filledPrompts.slice(0, 3).map(p => (
              <button key={p.id} onClick={() => onTryPrompt(p.value)}
                className="text-[9px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-lg truncate max-w-[140px] transition-colors">
                {p.value}
              </button>
            ))}
            {filledPrompts.length > 3 && <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-lg">+{filledPrompts.length - 3}</span>}
          </div>
        )}

        <button
          onClick={() => setTryMode(t => !t)}
          className="relative mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-[11px] font-semibold text-white transition-all w-full justify-center"
        >
          <Play className="w-3 h-3" />
          {tryMode ? 'Close Preview' : 'Try Bot'}
        </button>
      </div>

      {/* Try Bot mini-chat */}
      {tryMode && (
        <div className="bg-gray-50 border-t border-white/20 p-2.5 space-y-1.5">
          <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
            <p className="text-[10px] text-gray-500 leading-relaxed">
              👋 Hi! I'm <strong>{config.title || 'your bot'}</strong>. {config.description ? config.description.split('.')[0] + '.' : 'How can I help you today?'}
            </p>
          </div>
          {filledPrompts.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {filledPrompts.slice(0, 2).map(p => (
                <button key={p.id} onClick={() => setTryInput(p.value)}
                  className="text-[9px] px-2 py-0.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors">
                  {p.value}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-sm">
            <input type="text" value={tryInput} onChange={e => setTryInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-[10px] text-gray-600 placeholder:text-gray-300 focus:outline-none bg-transparent" />
            <button className="w-5 h-5 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
              <Send className="w-2.5 h-2.5 text-white" />
            </button>
          </div>
          <p className="text-[9px] text-gray-400 text-center">Preview only — responses are simulated</p>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────────────────────

function Section({ icon: Icon, title, action, helper, children }: {
  icon: React.ElementType; title: string; action?: React.ReactNode; helper?: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-orange-50 flex items-center justify-center">
            <Icon className="w-3 h-3 text-orange-500" />
          </div>
          <p className="text-xs font-bold text-gray-800">{title}</p>
          {helper && <span className="text-[10px] text-gray-400">· {helper}</span>}
        </div>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Field
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, helper, counter, maxLen, children }: {
  label: string; helper?: string; counter?: number; maxLen?: number; children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
        {maxLen !== undefined && counter !== undefined && (
          <span className={`text-[9px] font-medium tabular-nums ${counter > maxLen * 0.9 ? 'text-orange-500' : 'text-gray-300'}`}>
            {counter}/{maxLen}
          </span>
        )}
      </div>
      {children}
      {helper && <p className="text-[9px] text-gray-400">{helper}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Config Panel (Right)
// ─────────────────────────────────────────────────────────────────────────────

function ConfigPanel({ config, onChange, onSave, onTryPrompt }: {
  config: BotConfig
  onChange: (u: Partial<BotConfig>) => void
  onSave: () => void
  onTryPrompt: (p: string) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange({ thumbnail: file, thumbnailPreview: URL.createObjectURL(file) })
  }

  const removeThumbnail = () => {
    onChange({ thumbnail: null, thumbnailPreview: null })
    if (fileRef.current) fileRef.current.value = ''
  }

  const addPrompt = () => onChange({ prompts: [...config.prompts, { id: Date.now().toString(), value: '' }] })
  const updatePrompt = (id: string, value: string) => onChange({ prompts: config.prompts.map(p => p.id === id ? { ...p, value } : p) })
  const removePrompt = (id: string) => onChange({ prompts: config.prompts.filter(p => p.id !== id) })
  const toggleRole = (role: string) => {
    const next = config.roles.includes(role) ? config.roles.filter(r => r !== role) : [...config.roles, role]
    onChange({ roles: next })
  }

  const inputCls = 'w-full text-xs px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/25 focus:bg-white focus:shadow-sm transition-all placeholder:text-gray-300 text-gray-700 border border-transparent focus:border-orange-200'
  const completed = PROGRESS_STEPS.filter(s => s.check(config)).length
  const allDone = completed === PROGRESS_STEPS.length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-gray-900">Configuration</p>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-lg">
            <div className={`w-1.5 h-1.5 rounded-full ${allDone ? 'bg-green-500' : 'bg-orange-400'}`} />
            <span className="text-[9px] font-bold text-orange-600">{completed}/{PROGRESS_STEPS.length} done</span>
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3 min-h-0">

        {/* Live Preview */}
        <LivePreview config={config} onTryPrompt={onTryPrompt} />

        <Section icon={Bot} title="Essentials" helper="Core identity">
          <div className="space-y-3">
            <Field label="Title" counter={config.title.length} maxLen={60}>
              <input type="text" value={config.title} onChange={e => onChange({ title: e.target.value })}
                placeholder="e.g. Property Enquiry Bot" maxLength={60} className={inputCls} />
            </Field>
            <Field label="Description" counter={config.description.length} maxLen={200}>
              <textarea value={config.description} onChange={e => onChange({ description: e.target.value })}
                placeholder="Describe what this bot does..." rows={2} maxLength={200}
                className={`${inputCls} resize-none`} />
            </Field>
            <Field label="Category">
              <div className="relative">
                <select value={config.category} onChange={e => onChange({ category: e.target.value })}
                  className={`${inputCls} appearance-none pr-7 cursor-pointer`}>
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </Field>
          </div>
        </Section>

        {/* 2. Appearance */}
        <Section icon={Palette} title="Appearance" helper="Look & feel">
          <div className="space-y-3">
            <Field label="Thumbnail">
              {config.thumbnailPreview ? (
                <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg">
                  <img src={config.thumbnailPreview} alt="thumbnail" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-700 truncate">{config.thumbnail?.name}</p>
                    <p className="text-[9px] text-gray-400">{config.thumbnail ? (config.thumbnail.size / 1024).toFixed(1) + ' KB' : ''}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => fileRef.current?.click()} className="text-[9px] font-medium text-orange-500 hover:text-orange-600 flex items-center gap-0.5">
                        <RefreshCw className="w-2.5 h-2.5" /> Replace
                      </button>
                      <span className="text-gray-200">·</span>
                      <button onClick={removeThumbnail} className="text-[9px] font-medium text-red-400 hover:text-red-600 flex items-center gap-0.5">
                        <Trash2 className="w-2.5 h-2.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()}
                  className="w-full bg-gray-50 hover:bg-orange-50 rounded-lg py-4 flex items-center justify-center gap-3 transition-all group border-2 border-dashed border-gray-200 hover:border-orange-300">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                    <Upload className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 group-hover:text-orange-600 transition-colors">Click to upload</p>
                    <p className="text-[9px] text-gray-400">PNG, JPG, WebP up to 2MB</p>
                  </div>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnail} />
            </Field>

            <Field label="Icon Color">
              <div className="flex items-center gap-2">
                {ICON_COLOR_SWATCHES.map(swatch => (
                  <button key={swatch.id} onClick={() => onChange({ iconColor: swatch.id })} title={swatch.label}
                    className={`relative w-6 h-6 rounded-full transition-all duration-200 ${
                      config.iconColor === swatch.id ? 'scale-110 ring-2 ring-offset-1 shadow-sm' : 'hover:scale-110 opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: swatch.dot }}>
                    {config.iconColor === swatch.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </Section>

        {/* 3. Access */}
        <Section icon={Globe} title="Access" helper="Who can use this">
          <div className="space-y-3">
            <Field label="Visibility">
              <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
                {(['public', 'private'] as const).map(opt => (
                  <button key={opt} onClick={() => onChange({ visibility: opt })}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] font-bold transition-all ${
                      config.visibility === opt ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}>
                    {opt === 'public' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-gray-400 mt-1">
                {config.visibility === 'public' ? '👥 Visible to selected roles below' : '🔒 Only visible to administrators'}
              </p>
            </Field>

            {config.visibility === 'public' && (
              <Field label="Accessible Roles">
                <div className="flex flex-wrap gap-1.5">
                  {ROLES.map(role => {
                    const active = config.roles.includes(role)
                    return (
                      <button key={role} onClick={() => toggleRole(role)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          active ? 'bg-orange-500 text-white shadow-sm shadow-orange-200' : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                        }`}>
                        {active && <Check className="w-2.5 h-2.5" />}
                        {role}
                      </button>
                    )
                  })}
                </div>
              </Field>
            )}
          </div>
        </Section>

        {/* 4. Prompts */}
        <Section icon={MessageSquare} title="Example Prompts" helper="Starter questions"
          action={
            <button onClick={addPrompt} className="flex items-center gap-1 text-[10px] font-bold text-orange-500 hover:text-orange-600 transition-colors px-1.5 py-0.5 rounded-md hover:bg-orange-50">
              <Plus className="w-3 h-3" /> Add
            </button>
          }
        >
          <div className="space-y-1.5">
            {config.prompts.length === 0 ? (
              <button onClick={addPrompt}
                className="w-full bg-gray-50 hover:bg-orange-50 rounded-lg py-4 flex items-center justify-center gap-2.5 transition-all group border-2 border-dashed border-gray-200 hover:border-orange-300">
                <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 group-hover:text-orange-600 transition-colors">Add example prompts</p>
                  <p className="text-[9px] text-gray-400">Help users know what to ask</p>
                </div>
              </button>
            ) : (
              <div className="space-y-1.5">
                {config.prompts.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2 group">
                    <div className="w-4 h-4 rounded-md bg-orange-50 flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-bold text-orange-400">{i + 1}</span>
                    </div>
                    <input type="text" value={p.value} onChange={e => updatePrompt(p.id, e.target.value)}
                      placeholder="e.g. What properties are available?"
                      className="flex-1 text-xs px-3 py-1.5 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/25 focus:bg-white border border-transparent focus:border-orange-200 transition-all placeholder:text-gray-300 text-gray-700" />
                    <button onClick={() => removePrompt(p.id)}
                      className="p-1 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button onClick={addPrompt} className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 hover:text-orange-500 transition-colors mt-1 px-1">
                  <Plus className="w-3 h-3" /> Add another
                </button>
              </div>
            )}
          </div>
        </Section>

      </div>

      {/* Sticky action bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <button onClick={onSave}
          className="w-full py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-200">
          <Sparkles className="w-3.5 h-3.5" />
          {allDone ? 'Save Bot — Ready to publish!' : 'Save Bot'}
        </button>
        {!allDone && (
          <p className="text-[9px] text-gray-400 text-center mt-1.5">
            {PROGRESS_STEPS.length - completed} step{PROGRESS_STEPS.length - completed !== 1 ? 's' : ''} remaining
          </p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AddBotPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState<ConversationStep>('idle')
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [config, setConfig] = useState<BotConfig>({
    title: '', description: '', category: '',
    visibility: 'public', roles: [],
    prompts: [], thumbnail: null, thumbnailPreview: null,
    iconColor: 'orange',
  })

  const updateConfig = useCallback((updates: Partial<BotConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }, [])

  const handleSend = useCallback((text: string) => {
    // Detect which suggestion card was used
    const matchedCard = SUGGESTION_CARDS.find(c => c.prompt === text)
    if (matchedCard) setSelectedCard(matchedCard.label)

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      const { text: replyText, followUps, configUpdates } = buildAssistantReply(text, step, config)
      const nextStep = getNextStep(step, config)

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: replyText,
        followUps,
      }])
      setIsTyping(false)
      setStep(nextStep)

      // Auto-fill only empty fields
      const updates: Partial<BotConfig> = {}
      if (configUpdates.title && !config.title) updates.title = configUpdates.title
      if (configUpdates.description && !config.description) updates.description = configUpdates.description
      if (configUpdates.category && !config.category) updates.category = configUpdates.category
      if (configUpdates.prompts) updates.prompts = configUpdates.prompts
      if (Object.keys(updates).length > 0) updateConfig(updates)
    }, 900 + Math.random() * 400)
  }, [step, config, updateConfig])

  const handleTryPrompt = useCallback((prompt: string) => {
    // Scroll chat to bottom and show the prompt as a user message
    handleSend(prompt)
  }, [handleSend])

  return (
    <div className="flex flex-col -m-3 md:-m-4" style={{ height: 'calc(100vh - 56px)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/bot-in-a-box')}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-500 hover:text-orange-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-sm font-bold text-gray-900">Create New Bot</p>
            <p className="text-[10px] text-gray-400">Bot In A Box</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/bot-in-a-box')}
            className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/bot-in-a-box')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all shadow-sm shadow-orange-200 hover:shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Save Bot
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar config={config} />

      {/* Split layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Left: Chat — 60% */}
        <div className="w-full md:w-[60%] flex flex-col bg-[#f8f8f9] min-h-0 overflow-hidden">
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            selectedCard={selectedCard}
            onSend={handleSend}
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-100 shrink-0" />

        {/* Right: Config — 40%, relative for sticky bar */}
        <div className="hidden md:flex flex-col flex-1 bg-[#f4f5f7] min-h-0 overflow-hidden relative">
          <ConfigPanel
            config={config}
            onChange={updateConfig}
            onSave={() => navigate('/bot-in-a-box')}
            onTryPrompt={handleTryPrompt}
          />
        </div>

      </div>
    </div>
  )
}
