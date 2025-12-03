import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Bell,
  Pin,
  Settings,
  Paperclip,
  Smile,
  Bookmark,
  Moon,
  Sun,
} from "lucide-react";

const groups = [
  {
    id: "g1",
    title: "JavaScript Fundamentals",
    preview: "Latest code review session tools...",
    badge: 3,
    time: "2m ago",
  },
  {
    id: "g2",
    title: "User Experience Bootcamp",
    preview: "Sara: Thanks for the help...",
    badge: 12,
    time: "13m ago",
  },
  {
    id: "g3",
    title: "Data Science Hub",
    preview: "Amit: Please check out this...",
    badge: 0,
    time: "20m ago",
  },
];

const messagesSeed = [
  {
    id: "m1",
    author: "Surya Mathur",
    role: "mentor",
    avatar: "SM",
    time: "2:30pm",
    content: "Welcome everyone! Today we'll be diving into closures and please review the materials I shared earlier. scope.",
    reactions: { likes: 5, stars: 3 },
  },
  {
    id: "m2",
    author: "Sara Khan",
    role: "student",
    avatar: "SK",
    time: "2:34pm",
    content: "Thanks Surya! Today we'll be diving into closures and please review the materials I shared earlier. scope.",
  },
  {
    id: "m3",
    author: "You",
    role: "student",
    avatar: "YK",
    time: "2:39pm",
    content: "I found this article really helpful for understanding closures. Thank you for sharing.",
  },
  {
    id: "m4",
    author: "Surya Mathur",
    role: "mentor",
    avatar: "SM",
    time: "2:50pm",
    content: "Exactly! Here's detailed guide I prepared:",
    attachment: {
      title: "JavaScript Closures Guide",
      size: "PDF • 2.4 MB",
    },
  },
];

const mentors = [
  { id: "mu1", name: "Surya Mathur", title: "Senior JavaScript Developer" },
];

const topContributors = [
  { id: "tc1", name: "Sara Khan", points: 120 },
  { id: "tc2", name: "Aryan Khanna", points: 80 },
  { id: "tc3", name: "Anup Saini", points: 60 },
];

const members = [
  { id: "mem1", name: "Sara Khan" },
  { id: "mem2", name: "Samar Kapoor", online: true },
  { id: "mem3", name: "Aryan Mishra" },
];

const resources = [
  { id: "res1", label: "JavaScript Guide.pdf" },
  { id: "res2", label: "Navigation Tutorial" },
];

const Chatroom = () => {
  const [selectedGroup] = useState(groups[0]);
  const [messages, setMessages] = useState(messagesSeed);
  const [input, setInput] = useState("");
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isBrowseMenuOpen, setIsBrowseMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [emojiTab, setEmojiTab] = useState(0);
  const [emojiQuery, setEmojiQuery] = useState("");
  const messageEndRef = useRef(null);
  const fileImageInputRef = useRef(null);
  const fileDocInputRef = useRef(null);
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const objectUrlsRef = useRef(new Set());

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !pendingAttachment) return;
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        author: "You",
        role: "student",
        avatar: "YK",
        time: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        content: input.trim(),
        attachment: pendingAttachment || undefined,
      },
    ]);
    setInput("");
    setIsEmojiOpen(false);
    if (pendingAttachment) {
      // Keep message blob alive for current session; revoke only pending preview
      setPendingAttachment(null);
    }
  };

  const handleAttachClick = () => {
    setIsBrowseMenuOpen((v) => !v);
  };

  const handleFileSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Revoke previous pending blob URL if any
    if (pendingAttachment && pendingAttachment.url && pendingAttachment.url.startsWith("blob:")) {
      try { URL.revokeObjectURL(pendingAttachment.url); } catch {}
      objectUrlsRef.current.delete(pendingAttachment.url);
    }
    const isImage = file.type.startsWith("image/");
    const objectUrl = URL.createObjectURL(file);
    objectUrlsRef.current.add(objectUrl);
    const attachment = isImage
      ? { type: "image", url: objectUrl, title: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }
      : { type: "file", url: objectUrl, title: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` };
    setPendingAttachment(attachment);
    e.target.value = "";
    setIsBrowseMenuOpen(false);
  };

  const insertEmoji = (emoji) => {
    setInput((prev) => `${prev}${emoji}`);
  };

  const EMOJI_CATEGORIES = useMemo(() => ([
    // Smileys
    ['😀','😃','😄','😁','😆','😅','😂','🙂','🙃','😉','😊','😍','😘','😗','😙','😚','😜','🤪','😎','🤩','🥳','😏','😒','😞','😔','😢','😭','😡','🤬','🤯','🤗','🤔','🤨','😴','🥱','🤤','🤒','🤕','🤧','🥶','🥵','🤮','🥲'],
    // Animals
    ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🐣','🦉','🦄','🐝','🦋'],
    // Food
    ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥕','🌽','🍞','🥐','🥨','🥞','🧇','🧀','🍔','🍟','🌭','🍕','🥪','🌮','🌯','🍝','🍣','🍩','🍪','🎂','🍫','🍿','🧋'],
    // Activities
    ['⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','🥅','🎳','🏒','🥊','⛳','🎮','🎲','🧩','♟️','🎯','🎻','🎹','🥁'],
    // Travel
    ['🚗','🚕','🚌','🚎','🏎️','🚓','🚑','🚒','🚚','✈️','🚀','🛳️','⛵','🚁','🗺️','🗽','🗼','🏰','🏝️','🏜️','🌋','🏞️'],
    // Symbols
    ['💡','🔥','🎉','✨','⭐','🌟','✅','❌','⚠️','❓','❗','❤️','💙','💚','💛','💜','🖤','🤍','🤎','👍','🙏','👏','💪','🧠','📎','📚','💻','🧰','🧪']
  ]), []);

  const filteredEmojis = useMemo(() => {
    const list = EMOJI_CATEGORIES[Math.min(Math.max(emojiTab,0), EMOJI_CATEGORIES.length-1)] || [];
    if (!emojiQuery.trim()) return list;
    const q = emojiQuery.trim().toLowerCase();
    // naive filter: show all since we don't map names; keep UX by returning list
    return list.filter(() => true);
  }, [emojiTab, emojiQuery, EMOJI_CATEGORIES]);

  // Cleanup all created object URLs on unmount
  useEffect(() => {
    return () => {
      try {
        if (pendingAttachment && pendingAttachment.url && pendingAttachment.url.startsWith("blob:")) {
          URL.revokeObjectURL(pendingAttachment.url);
        }
        objectUrlsRef.current.forEach((url) => {
          try { URL.revokeObjectURL(url); } catch {}
        });
        objectUrlsRef.current.clear();
      } catch {}
    };
  }, []);

  const badgeColor = useMemo(
    () => ({
      mentor: "bg-purple-500/20 text-purple-200",
      student: "bg-indigo-500/10 text-indigo-200",
    }),
    []
  );

  const theme = useMemo(() => {
    if (isDark) {
      return {
        rootBg: "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100",
        blob1: "bg-indigo-600/30",
        blob2: "bg-purple-600/25",
        panelBg: "bg-slate-800/60",
        ring: "ring-slate-700/40",
        headerBorder: "border-slate-700/50",
        primary: "text-slate-100",
        secondary: "text-slate-300/80",
        chipHover: "hover:bg-slate-700/40",
        inputBg: "bg-slate-900/60",
        toolbarBtn: "bg-slate-900/50 hover:bg-slate-800/80",
        gradient: "from-indigo-600 to-purple-600",
      };
    }
    return {
      rootBg: "bg-gradient-to-b from-white via-slate-50 to-white text-slate-900",
      blob1: "bg-indigo-400/30",
      blob2: "bg-purple-400/25",
      panelBg: "bg-white/80",
      ring: "ring-slate-200",
      headerBorder: "border-slate-200",
      primary: "text-slate-900",
      secondary: "text-slate-600",
      chipHover: "hover:bg-slate-100",
      inputBg: "bg-white/90",
      toolbarBtn: "bg-white/80 hover:bg-white",
      gradient: "from-indigo-600 to-purple-600",
    };
  }, [isDark]);

  // Determine role (fallback to 'student' if not set)
  const userRole = (typeof window !== "undefined" && localStorage.getItem("role")) || "student";
  const canCreateGroup = userRole === "mentor" || userRole === "admin";

  return (
    <div className={`relative h-screen overflow-hidden ${theme.rootBg}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-32 -left-32 h-72 w-72 rounded-full ${theme.blob1} blur-3xl`} />
        <div className={`absolute bottom-0 right-0 h-80 w-80 rounded-full ${theme.blob2} blur-3xl`} />
      </div>

      {/* Mobile header with sidebar toggles */}
      <div className="mx-auto w-full max-w-none px-4 pt-4 lg:px-8 xl:hidden">
        <div className="mb-2 flex items-center justify-between">
          <button
            aria-label="Open communities"
            className={`rounded-xl ${theme.toolbarBtn} px-3 py-2 text-sm`}
            onClick={() => setIsLeftOpen(true)}
          >
            <Users className="mr-2 inline h-4 w-4" /> Communities
          </button>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              className={`rounded-xl ${theme.toolbarBtn} px-3 py-2 text-sm`}
              onClick={() => setIsDark((v) => !v)}
              title={isDark ? "Switch to light" : "Switch to dark"}
            >
              {isDark ? <Sun className="inline h-4 w-4" /> : <Moon className="inline h-4 w-4" />}
            </button>
            {canCreateGroup && (
              <button
                aria-label="Create group"
                className={`rounded-xl bg-gradient-to-r ${theme.gradient} px-3 py-2 text-sm font-semibold text-white shadow md:px-4 md:py-2`}
                onClick={() => setIsLeftOpen(true)}
              >
                <Plus className="mr-2 inline h-4 w-4" /> Create Group
              </button>
            )}
            <button
              aria-label="Open group details"
              className={`rounded-xl ${theme.toolbarBtn} px-3 py-2 text-sm`}
              onClick={() => setIsRightOpen(true)}
            >
              Details <Settings className="ml-2 inline h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-none flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 lg:px-6 lg:py-6 xl:flex-row">
        {/* Left column */}
        {/* Overlay + Drawer (mobile) */}
        {isLeftOpen && (
          <div className="xl:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsLeftOpen(false)}
            />
          </div>
        )}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className={`flex w-full flex-col rounded-2xl sm:rounded-3xl ${theme.panelBg} backdrop-blur-xl p-4 sm:p-6 shadow-2xl ring-1 ${theme.ring} xl:w-72 ${
            isLeftOpen ? "fixed inset-y-4 left-4 right-4 z-50 xl:static" : ""
          } xl:static max-h-full overflow-y-auto`}
          role="complementary"
          aria-label="Communities"
        >
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${theme.primary}`}>Communities</h2>
            {canCreateGroup && (
              <button className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${theme.gradient} px-3 py-2 text-xs md:text-sm font-semibold text-white shadow md:px-4`}>
                <Plus className="h-4 w-4" /> Create Group
              </button>
            )}
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search communities..."
                className={`w-full rounded-2xl ${theme.inputBg} py-3 pl-11 pr-4 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20`}
              />
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {groups.map((group) => (
              <li
                key={group.id}
                className={`flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 transition ${theme.chipHover} ${
                  group.id === selectedGroup.id ? "bg-slate-700/40" : theme.panelBg
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${theme.primary}`}>{group.title}</p>
                  <p className={`text-xs ${theme.secondary}`}>{group.preview}</p>
                </div>
                <div className={`text-right text-xs ${theme.secondary}`}>
                  {group.badge > 0 && (
                    <span className="mb-1 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full bg-purple-600/80 px-2 text-[10px] font-semibold text-white">
                      {group.badge}
                    </span>
                  )}
                  <p>{group.time}</p>
                </div>
              </li>
            ))}
          </ul>
          {/* Close button for mobile drawer */}
          <div className="mt-4 xl:hidden">
            <button
              aria-label="Close communities"
              className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
              onClick={() => setIsLeftOpen(false)}
            >
              Close
            </button>
          </div>
        </motion.aside>

        {/* Middle column */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className={`flex h-full flex-1 flex-col rounded-2xl sm:rounded-3xl ${theme.panelBg} backdrop-blur-2xl shadow-2xl ring-1 ${theme.ring}`}
        >
          <header className={`flex items-center justify-between border-b ${theme.headerBorder} px-4 py-3 sm:px-6 sm:py-4`}>
            <div>
              <h1 className={`text-xl font-semibold ${theme.primary}`}>{selectedGroup.title}</h1>
              <p className={`text-xs ${theme.secondary}`}>24 Members · 3 online</p>
            </div>
            <div className="flex items-center gap-3">
              <button className={`rounded-xl ${theme.toolbarBtn} p-2`}>
                <Bell className="h-4 w-4" />
              </button>
              <button className={`rounded-xl ${theme.toolbarBtn} p-2`}>
                <Bookmark className="h-4 w-4" />
              </button>
              <button className={`rounded-xl ${theme.toolbarBtn} p-2`}>
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-indigo-500/30 bg-indigo-600/15 px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs text-indigo-100 flex items-start gap-2 sm:gap-3">
            <Pin className="mt-0.5 h-4 w-4" />
            <p>
              <span className="font-semibold">Welcome!</span> Please check the pinned resources before asking questions.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-3"
              >
                <div className="mt-1 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-xs sm:text-sm font-semibold text-white">
                  {msg.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-100">{msg.author}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${badgeColor[msg.role]}`}>
                      {msg.role}
                    </span>
                    <span className="text-slate-300/80">{msg.time}</span>
                  </div>
                  <div className={`mt-2 rounded-xl sm:rounded-2xl ${theme.inputBg} px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}` }>
                    {msg.content}
                    {msg.attachment && (
                      <div className={`mt-3 rounded-xl border ${isDark ? 'border-slate-700/40 bg-slate-800/50 text-slate-200' : 'border-slate-200 bg-white/90 text-slate-700'} p-3 text-xs`}>
                        {msg.attachment.type === "image" ? (
                          <div>
                            <img src={msg.attachment.url} alt={msg.attachment.title} className="max-h-56 rounded-lg object-contain" />
                            <div className="mt-2 flex items-center justify-between">
                              <div>
                                <p className={`font-semibold ${theme.primary}`}>{msg.attachment.title}</p>
                                <p className={`text-[11px] ${theme.secondary}`}>{msg.attachment.size}</p>
                              </div>
                              <a href={msg.attachment.url} download className="rounded-lg bg-indigo-600/60 px-3 py-1 text-[11px] font-semibold text-white">Download</a>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className={`truncate font-semibold ${theme.primary}`}>{msg.attachment.title}</p>
                              <p className={`text-[11px] ${theme.secondary}`}>{msg.attachment.size}</p>
                            </div>
                            <a href={msg.attachment.url} target="_blank" rel="noreferrer" className="rounded-lg bg-indigo-600/60 px-3 py-1 text-[11px] font-semibold text-white">Open</a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {msg.reactions && (
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-300">
                      <span>❤️ {msg.reactions.likes}</span>
                      <span>⭐ {msg.reactions.stars}</span>
                      <button className="text-slate-300/80 hover:text-slate-100">Reply</button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={`border-t px-3 sm:px-6 py-3 sm:py-4 ${theme.headerBorder} sticky bottom-0 [padding-bottom:calc(env(safe-area-inset-bottom)_+_0.25rem)]`}>
            <div className={`flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl ${theme.inputBg} px-3 sm:px-4 py-2.5 sm:py-3 ring-1 ${theme.ring}`}>
              <div className="relative group">
                <button type="button" aria-label="Attach file" className="rounded-xl bg-slate-800/80 p-2 text-slate-200 hover:bg-slate-700/70" onClick={handleAttachClick}>
                  <Paperclip className="h-4 w-4" />
                </button>
                {(isBrowseMenuOpen) && (
                  <div className="absolute bottom-12 left-0 z-50 w-40 rounded-xl bg-slate-900/95 p-2 ring-1 ring-slate-700/50 text-sm shadow-lg">
                    <button type="button" className="w-full text-left rounded-md px-3 py-2 hover:bg-slate-800/80" onClick={() => fileImageInputRef.current && fileImageInputRef.current.click()}>Photos</button>
                    <button type="button" className="w-full text-left rounded-md px-3 py-2 hover:bg-slate-800/80" onClick={() => fileDocInputRef.current && fileDocInputRef.current.click()}>Documents</button>
                  </div>
                )}
                {/* Also reveal on hover for desktop users */}
                <div className="pointer-events-none absolute bottom-12 left-0 z-40 w-40 rounded-xl bg-slate-900/95 p-2 ring-1 ring-slate-700/50 text-sm shadow-lg opacity-0 transition group-hover:opacity-100">
                  <div className="pointer-events-auto">
                    <button type="button" className="w-full text-left rounded-md px-3 py-2 hover:bg-slate-800/80" onClick={() => fileImageInputRef.current && fileImageInputRef.current.click()}>Photos</button>
                    <button type="button" className="w-full text-left rounded-md px-3 py-2 hover:bg-slate-800/80" onClick={() => fileDocInputRef.current && fileDocInputRef.current.click()}>Documents</button>
                  </div>
                </div>
                <input
                  ref={fileImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelected}
                />
                <input
                  ref={fileDocInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.csv,.json,.zip,.rar"
                  className="hidden"
                  onChange={handleFileSelected}
                />
              </div>
              <div className="relative">
                <button type="button" aria-label="Add emoji" className={`rounded-xl ${theme.toolbarBtn} p-2`} onClick={() => setIsEmojiOpen((v) => !v)}>
                  <Smile className="h-4 w-4" />
                </button>
                {isEmojiOpen && (
                  <div className={`absolute bottom-12 left-0 z-50 w-64 sm:w-80 rounded-xl ${isDark ? 'bg-slate-900/95 ring-1 ring-slate-700/50' : 'bg-white shadow'} p-3`}> 
                    <div className="mb-2 flex items-center gap-2 overflow-x-auto">
                      {['😀','🐱','🍔','⚽','🚗','💡','🏁'].map((tab,i)=> (
                        <button key={i} type="button" className={`px-2 py-1 rounded-md text-sm ${isDark ? 'hover:bg-slate-800/80' : 'hover:bg-slate-100'}`} onClick={() => setEmojiTab(i)} aria-label="Emoji category">
                          {tab}
                        </button>
                      ))}
                    </div>
                    <div className="mb-2">
                      <input placeholder="Search emoji" value={emojiQuery} onChange={(e)=>setEmojiQuery(e.target.value)} className={`w-full rounded-md px-3 py-2 text-sm ${isDark ? 'bg-slate-800/80 text-slate-100 placeholder:text-slate-400' : 'bg-white border border-slate-200'}`} />
                    </div>
                    <div className="grid grid-cols-7 sm:grid-cols-8 gap-1 text-xl max-h-52 overflow-y-auto">
                      {filteredEmojis.map((emj)=> (
                        <button key={emj} type="button" className={`${isDark ? 'hover:bg-slate-800/80' : 'hover:bg-slate-100'} rounded-md`} onClick={() => insertEmoji(emj)} aria-label={`Insert ${emj}`}>
                          {emj}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-[13px] sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                aria-label="Message input"
              />
              {pendingAttachment && (
                <div className="absolute -top-24 left-6 right-6 rounded-xl bg-slate-900/80 ring-1 ring-slate-700/50 p-3 text-xs text-slate-200">
                  {pendingAttachment.type === 'image' ? (
                    <div className="flex items-center gap-3">
                      <img src={pendingAttachment.url} alt={pendingAttachment.title} className="h-12 w-12 rounded object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-slate-100">{pendingAttachment.title}</div>
                        <div className="text-[11px] text-slate-300/80">{pendingAttachment.size}</div>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-slate-800/70 px-2 py-1 text-[11px] hover:bg-slate-700/80"
                        onClick={() => {
                          if (pendingAttachment && pendingAttachment.url && pendingAttachment.url.startsWith('blob:')) {
                            try { URL.revokeObjectURL(pendingAttachment.url); } catch {}
                            objectUrlsRef.current.delete(pendingAttachment.url);
                          }
                          setPendingAttachment(null);
                        }}
                      >Remove</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-slate-100">{pendingAttachment.title}</div>
                        <div className="text-[11px] text-slate-300/80">{pendingAttachment.size}</div>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-slate-800/70 px-2 py-1 text-[11px] hover:bg-slate-700/80"
                        onClick={() => {
                          if (pendingAttachment && pendingAttachment.url && pendingAttachment.url.startsWith('blob:')) {
                            try { URL.revokeObjectURL(pendingAttachment.url); } catch {}
                            objectUrlsRef.current.delete(pendingAttachment.url);
                          }
                          setPendingAttachment(null);
                        }}
                      >Remove</button>
                    </div>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500"
              >
                Send
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.section>

        {/* Right column */}
        {/* Overlay + Drawer (mobile) */}
        {isRightOpen && (
          <div className="xl:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsRightOpen(false)}
            />
          </div>
        )}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className={`flex w-full flex-col gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl bg-slate-800/60 backdrop-blur-xl p-4 sm:p-6 shadow-2xl ring-1 ring-slate-700/40 xl:w-80 ${
            isRightOpen ? "fixed inset-y-4 left-4 right-4 z-50 xl:static" : ""
          } xl:static max-h-full overflow-y-auto`}
          role="complementary"
          aria-label="Group details"
        >
          <section>
            <h3 className="text-sm font-semibold text-white">Group Description</h3>
            <p className="mt-2 text-xs text-slate-300/90">
              Learn JavaScript from basics to advanced concepts with hands-on projects and mentor guidance.
            </p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Mentors</h4>
            <div className="mt-3 space-y-3 text-sm text-slate-100">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="flex items-center justify-between rounded-2xl bg-slate-900/50 ring-1 ring-slate-700/40 px-4 py-3">
                  <div>
                    <p className="font-semibold">{mentor.name}</p>
                    <p className="text-[11px] text-slate-300/80">{mentor.title}</p>
                  </div>
                  <span className="text-[10px] text-green-300">● Online</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Top Contributors</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-100">
              {topContributors.map((contributor, index) => (
                <li key={contributor.id} className="flex items-center justify-between rounded-2xl bg-slate-900/50 ring-1 ring-slate-700/40 px-3 py-2">
                  <span>
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"} {contributor.name}
                  </span>
                  <span className="text-xs text-slate-300/80">{contributor.points} pts</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">All Members ({members.length})</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-100">
              {members.map((member) => (
                <li key={member.id} className="flex items-center justify-between rounded-2xl bg-slate-900/40 ring-1 ring-slate-700/30 px-3 py-2">
                  <span>{member.name}</span>
                  {member.online && <span className="text-[10px] text-green-300">● Online</span>}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pinned Resources</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300/90">
              {resources.map((resource) => (
                <li key={resource.id} className="flex items-center gap-2 rounded-xl bg-slate-900/50 ring-1 ring-slate-700/40 px-3 py-2">
                  <Paperclip className="h-3.5 w-3.5 text-slate-300" />
                  <span>{resource.label}</span>
                </li>
              ))}
            </ul>
          </section>
          {/* Close button for mobile drawer */}
          <div className="xl:hidden">
            <button
              aria-label="Close group details"
              className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
              onClick={() => setIsRightOpen(false)}
            >
              Close
            </button>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default Chatroom;

