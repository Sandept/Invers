import React, { useState, useEffect, useMemo, forwardRef, useRef, useCallback, useImperativeHandle } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  CheckCircle2, 
  Moon, 
  Sun, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Bitcoin, 
  Coins, 
  Palette,
  Save,
  FileText,
  Camera,
  User,
  LineChart,
  Database,
  Trash2,
  Lock,
  Unlock,
  Bell,
  Clock,
  Gamepad2,
  Play,
  Car,
  Siren
} from 'lucide-react';

// --- Utility Functions ---

const cn = (...classes) => classes.filter(Boolean).join(' ');

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

// --- Mock Data & Constants ---
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_IN_MONTH = (monthIndex, year = 2025) => new Date(year, monthIndex + 1, 0).getDate();

// --- Theme Configurations ---
const THEMES = {
  green: {
    name: 'Emerald',
    primary: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    textDark: 'text-emerald-500',
    lightBg: 'bg-emerald-500/10',
    border: 'border-emerald-400',
    shadow: 'shadow-emerald-500/30',
    infoBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    infoText: 'text-emerald-800 dark:text-emerald-200',
    blob: 'bg-emerald-400/20',
    dot: 'bg-emerald-500'
  },
  pink: {
    name: 'Rose',
    primary: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    textDark: 'text-rose-500',
    lightBg: 'bg-rose-500/10',
    border: 'border-rose-400',
    shadow: 'shadow-rose-500/30',
    infoBg: 'bg-rose-50 dark:bg-rose-900/20',
    infoText: 'text-rose-800 dark:text-rose-200',
    blob: 'bg-rose-400/20',
    dot: 'bg-rose-500'
  }
};

// --- Animated Icon Components ---

// 1. ChartColumnIncreasingIcon (New Brand Logo)
const LINE_VARIANTS = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const ChartColumnIncreasingIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await controls.start((i) => ({
            pathLength: 0,
            opacity: 0,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
          await controls.start((i) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
        },
        stopAnimation: () => controls.start('visible'),
      };
    });

    const handleMouseEnter = useCallback(
      async (e) => {
        if (!isControlledRef.current) {
          await controls.start((i) => ({
            pathLength: 0,
            opacity: 0,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
          await controls.start((i) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3 },
          }));
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('visible');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("select-none flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            variants={LINE_VARIANTS}
            initial="visible"
            animate={controls}
            custom={1}
            d="M13 17V9"
          />
          <motion.path
            variants={LINE_VARIANTS}
            initial="visible"
            animate={controls}
            custom={2}
            d="M18 17V5"
          />
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <motion.path
            variants={LINE_VARIANTS}
            initial="visible"
            animate={controls}
            custom={0}
            d="M8 17v-3"
          />
        </svg>
      </div>
    );
  }
);
ChartColumnIncreasingIcon.displayName = 'ChartColumnIncreasingIcon';


// 2. CalendarCheckIcon
const CHECK_VARIANTS = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      pathLength: { duration: 0.4, ease: 'easeInOut' },
      opacity: { duration: 0.4, ease: 'easeInOut' },
    },
  },
};

const CalendarCheckIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <motion.path
            animate={controls}
            initial="normal"
            variants={CHECK_VARIANTS}
            d="m9 16 2 2 4-4"
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      </div>
    );
  }
);
CalendarCheckIcon.displayName = 'CalendarCheckIcon';

// 3. CogIcon
const CogIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
          variants={{
            normal: {
              rotate: 0,
            },
            animate: {
              rotate: 180,
            },
          }}
          animate={controls}
        >
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 2v2" />
          <path d="M12 22v-2" />
          <path d="m17 20.66-1-1.73" />
          <path d="M11 10.27 7 3.34" />
          <path d="m20.66 17-1.73-1" />
          <path d="m3.34 7 1.73 1" />
          <path d="M14 12h8" />
          <path d="M2 12h2" />
          <path d="m20.66 7-1.73 1" />
          <path d="m3.34 17 1.73-1" />
          <path d="m17 3.34-1 1.73" />
          <path d="m11 13.73-4 6.93" />
        </motion.svg>
      </div>
    );
  }
);
CogIcon.displayName = 'CogIcon';

// 4. DatabaseIcon (New Animated Icon for Storage)
const DATABASE_VARIANTS = {
    normal: { pathLength: 1, opacity: 1 },
    hidden: { pathLength: 0, opacity: 0 }
};
  
const DatabaseIcon = forwardRef(
({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
        startAnimation: async () => {
            await controls.start("hidden");
            await controls.start((i) => ({
                pathLength: 1, 
                opacity: 1, 
                transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
            }));
        },
        stopAnimation: () => controls.start('normal'),
    };
    });

    const handleMouseEnter = useCallback(
    async (e) => {
        if (!isControlledRef.current) {
            await controls.start("hidden");
            await controls.start((i) => ({
                pathLength: 1, 
                opacity: 1, 
                transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
            }));
        } else {
            onMouseEnter?.(e);
        }
    },
    [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
    (e) => {
        if (!isControlledRef.current) {
            controls.start('normal');
        } else {
            onMouseLeave?.(e);
        }
    },
    [controls, onMouseLeave]
    );

    return (
    <div
        className={cn("flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
        {/* Top Ellipse */}
        <motion.ellipse 
            cx="12" cy="5" rx="9" ry="3" 
            variants={DATABASE_VARIANTS}
            initial="normal"
            animate={controls}
            custom={0}
        />
        {/* Middle Divider Curve */}
        <motion.path 
            d="M3 12A9 3 0 0 0 21 12" 
            variants={DATABASE_VARIANTS}
            initial="normal"
            animate={controls}
            custom={1}
        />
        {/* Main Body */}
        <motion.path 
            d="M3 5V19A9 3 0 0 0 21 19V5" 
            variants={DATABASE_VARIANTS}
            initial="normal"
            animate={controls}
            custom={2}
        />
        </svg>
    </div>
    );
}
);
DatabaseIcon.displayName = 'DatabaseIcon';

// 5. GamepadIcon (New Animated Icon for Games)
const GAMEPAD_VARIANTS = {
  normal: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 }
};

const GamepadIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          await controls.start("hidden");
          await controls.start((i) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.4 }
          }));
        },
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      async (e) => {
        if (!isControlledRef.current) {
          await controls.start("hidden");
          await controls.start((i) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.4 }
          }));
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Body */}
          <motion.rect 
            x="2" y="6" width="20" height="12" rx="2" 
            variants={GAMEPAD_VARIANTS}
            initial="normal"
            animate={controls}
            custom={0}
          />
          {/* D-Pad */}
          <motion.path 
            d="M6 12h4m-2-2v4" 
            variants={GAMEPAD_VARIANTS}
            initial="normal"
            animate={controls}
            custom={1}
          />
          {/* Buttons */}
          <motion.path 
            d="M15 11h.01" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={GAMEPAD_VARIANTS}
            initial="normal"
            animate={controls}
            custom={2}
          />
          <motion.path 
            d="M18 13h.01" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={GAMEPAD_VARIANTS}
            initial="normal"
            animate={controls}
            custom={3}
          />
        </svg>
      </div>
    );
  }
);
GamepadIcon.displayName = 'GamepadIcon';


// --- Layout Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg rounded-2xl p-5 ${className} transition-all duration-300 text-gray-900 dark:text-white`}>
    {children}
  </div>
);

const Toggle = ({ active, onToggle, themeColor = 'bg-green-500' }) => (
  <button 
    onClick={onToggle}
    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${active ? themeColor : 'bg-gray-300 dark:bg-gray-600'}`}
  >
    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

// --- NEW THEME SWITCH COMPONENT ---
const ThemeSwitch = ({ checked, onChange }) => (
    <label className="theme-switch" style={{ '--toggle-size': '12px' }}>
      <input 
        type="checkbox" 
        className="theme-switch__checkbox" 
        checked={checked}
        onChange={onChange}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds"></div>
        <div className="theme-switch__stars-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="10" fill="currentColor"/>
                <circle cx="80" cy="10" r="8" fill="currentColor"/>
                <circle cx="120" cy="40" r="9" fill="currentColor"/>
                <path fill="currentColor" d="M108.86 35.7876C109.523 35.7876 110.06 35.2505 110.06 34.5876C110.06 33.9247 109.523 33.3876 108.86 33.3876C108.198 33.3876 107.66 33.9247 107.66 34.5876C107.66 35.2505 108.198 35.7876 108.86 35.7876Z"/>
            </svg>
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    </label>
);

// --- NEW NOTIFICATION SWITCH COMPONENT ---
const NotificationSwitch = ({ checked, onChange }) => (
    <label className="switch" style={{ fontSize: '12px' }}>
      <input 
        type="checkbox" 
        className="cb" 
        checked={checked}
        onChange={onChange}
      />
      <span className="toggle">
        <span className="left">off</span>
        <span className="right">on</span>
      </span>
    </label>
);

const IconButton = ({ Icon, active, onClick, theme }) => (
  <button 
    onClick={onClick}
    // FIX: Removed sticky hover states on mobile by using 'md:hover'. 
    // Added 'active:bg-gray-100' for immediate touch feedback.
    className={`flex-1 p-2 rounded-xl transition-all duration-200 group flex flex-col items-center justify-center gap-1 focus:outline-none ${active ? `${theme.lightBg} ${theme.text}` : 'text-gray-400 md:hover:bg-gray-100 dark:md:hover:bg-white/5 active:bg-gray-100 dark:active:bg-gray-800'}`}
  >
    <Icon size={24} className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
    <span className="text-[9px] font-medium tracking-wide">{active && <span className={`w-1 h-1 ${theme.dot} rounded-full inline-block mt-1`}></span>}</span>
  </button>
);

// --- Escape Road Game Component ---
// Incorporates High-DPI scaling and Focus management
const EscapeRoadGame = () => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Resize logic
  useEffect(() => {
     if (!isPlaying) return;

     const resizeGame = () => {
        if (!iframeRef.current || !containerRef.current) return;
        
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // High-DPI Scaling Logic adapted from user provided script
        const dpr = window.devicePixelRatio || 1;
        const scale = Math.min(dpr, 2.5);
        
        // Apply styles to iframe
        iframeRef.current.style.width = `${width * scale}px`;
        iframeRef.current.style.height = `${height * scale}px`;
        iframeRef.current.style.transform = `scale(${1 / scale})`;
        iframeRef.current.style.transformOrigin = 'top left';
     };

     // Initial resize
     // Short delay to ensure iframe is rendered in DOM
     setTimeout(resizeGame, 50);
     
     // Resize observer is better than window resize for responsive containers
     const observer = new ResizeObserver(resizeGame);
     if (containerRef.current) observer.observe(containerRef.current);

     return () => observer.disconnect();
  }, [isPlaying]);

  // Focus logic
  const handleFocus = () => {
      if (iframeRef.current) {
          iframeRef.current.contentWindow.focus();
      }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#1a1a1a]" onClick={isPlaying ? handleFocus : undefined}>
       {!isPlaying ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20 overflow-hidden group cursor-pointer" onClick={() => setIsPlaying(true)}>
               {/* 1. Image Background */}
               <div className="absolute inset-0 bg-gray-900">
                  <img 
                    src="https://m.media-amazon.com/images/I/81CaNyaWp2L.png" 
                    alt="Escape Road Thumbnail" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 hover:scale-105 transform"
                    onError={(e) => {
                      e.target.style.display = 'none'; // Hide if broken
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
               </div>

               {/* 2. The Scene (Overlay) */}
               <div className="relative z-10 flex flex-col items-center gap-6 mt-20">
                   {/* Title */}
                   <div className="text-center space-y-2">
                       <h2 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] stroke-black">
                           ESCAPE <span className="text-red-500">ROAD</span>
                       </h2>
                       <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold tracking-widest text-xs uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                           <Siren size={14} className="text-red-500 animate-bounce" />
                           Wanted Level: ✯✯✯✯✯
                           <Siren size={14} className="text-blue-500 animate-bounce" />
                       </div>
                   </div>

                   {/* Play Button */}
                   <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-12 px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-xl italic rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] flex items-center gap-2 border-2 border-white/20 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] transition-all"
                   >
                        <Play size={24} fill="currentColor" />
                        PLAY NOW
                   </motion.button>
               </div>
           </div>
       ) : (
           <>
               {loading && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                    <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                 </div>
               )}
               <iframe 
                   ref={iframeRef}
                   src="https://raw.githack.com/abisdbest/classroom.google.com/85146ac051b67a3c32ebdf898bb0144d818d580b/drive.google.com/escape%20road/index.html"
                   className="block border-none"
                   onLoad={() => {
                       setLoading(false);
                       handleFocus();
                   }}
                   allowFullScreen
                   scrolling="no"
               />
               
           </>
       )}
    </div>
  );
};

// --- Splash Screen Component ---
const SplashScreen = () => {
    const iconRef = useRef(null);

    useEffect(() => {
        // Trigger the specific chart animation on mount
        const timer = setTimeout(() => {
            if (iconRef.current) {
                iconRef.current.startAnimation();
            }
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
    <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950 text-white overflow-hidden h-[100dvh]"
    >
        {/* Animated Background Elements - Optimized for Performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3], 
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/20 blur-[120px] rounded-full" 
                style={{ willChange: "transform, opacity" }}
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, -45, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-yellow-500/10 blur-[120px] rounded-full" 
                style={{ willChange: "transform, opacity" }}
            />
        </div>

        {/* Splash Content */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
        >
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-[40px] rounded-full animate-pulse" />
                
                {/* Brand Logo Container */}
                <div className="relative flex items-center justify-center w-28 h-28 bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <ChartColumnIncreasingIcon 
                            ref={iconRef}
                            size={56} 
                            className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                        />
                    </div>
                </div>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl font-black tracking-tight mb-3 bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                    In<span className="text-emerald-400">vers</span>
                </h1>
                <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">Wealth Visualized</p>
            </motion.div>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 160, opacity: 1 }}
            transition={{ delay: 0.5, duration: 7 }} 
            className="absolute bottom-24 h-1 bg-gray-800 rounded-full overflow-hidden"
        >
            <motion.div 
                animate={{ x: [-160, 160] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 blur-sm"
            />
        </motion.div>
    </motion.div>
    );
};

// --- Main App Component ---

const VIEWS = ['dashboard', 'planner', 'storage', 'game', 'settings'];

export default function App() {
  // --- State ---
  const [view, setView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true); 
  const [colorTheme, setColorTheme] = useState('green');
  const [prices, setPrices] = useState({ btc: 8500000, gold: 7200 });
  const [investments, setInvestments] = useState({}); 
  const [monthlyData, setMonthlyData] = useState({}); 
  const [profile, setProfile] = useState({ name: 'San • dept', image: null });
  const [selectedMonth, setSelectedMonth] = useState(0); 
  const [saveStatus, setSaveStatus] = useState('');
  // New Notification State
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState('09:00');
  const [notificationStatus, setNotificationStatus] = useState(''); // '' | 'saved' | 'checking'
  const lastNotificationDate = useRef(null);

  // Swipe Gesture State
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentTheme = THEMES[colorTheme] || THEMES.green;

  // --- Effects ---

  // Splash Screen Effect
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowSplash(false);
    }, 8000); 
    return () => clearTimeout(timer);
  }, []);

  // Load from LocalStorage
  useEffect(() => {
    const savedData = localStorage.getItem('investmentApp_v4'); 
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setInvestments(parsed.investments || {});
      setMonthlyData(parsed.monthlyData || {});
      setProfile(parsed.profile || { name: 'Bit ◦ Gold', image: null });
      setDarkMode(parsed.darkMode || false);
      const savedTheme = parsed.colorTheme;
      setColorTheme(THEMES[savedTheme] ? savedTheme : 'green');
      // Load Notification Settings
      setNotificationsEnabled(parsed.notificationsEnabled || false);
      setNotificationTime(parsed.notificationTime || '09:00');
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('investmentApp_v4', JSON.stringify({
        investments,
        monthlyData,
        profile,
        darkMode,
        colorTheme,
        notificationsEnabled,
        notificationTime
      }));
    } catch (e) {
      console.warn("Storage quota exceeded or error saving data", e);
    }
  }, [investments, monthlyData, profile, darkMode, colorTheme, notificationsEnabled, notificationTime]);

  // Live Price Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        btc: prev.btc * (1 + (Math.random() * 0.002 - 0.001)),
        gold: prev.gold * (1 + (Math.random() * 0.001 - 0.0005))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Notification Checker Logic
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkTime = () => {
        const now = new Date();
        const currentTimeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const todayDateString = now.toDateString();

        // Check if current time matches set time AND we haven't notified today yet
        if (currentTimeString === notificationTime && lastNotificationDate.current !== todayDateString) {
            
            // Try to send notification
            if (Notification.permission === "granted") {
                new Notification("Invers Wealth Reminder", {
                    body: "Time to track your daily investments! 🚀",
                    icon: "/favicon.ico" // Placeholder
                });
                lastNotificationDate.current = todayDateString;
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("Invers Wealth Reminder", {
                            body: "Time to track your daily investments! 🚀"
                        });
                        lastNotificationDate.current = todayDateString;
                    }
                });
            }
        }
    };

    // Check every 30 seconds to be safe
    const interval = setInterval(checkTime, 30000);
    return () => clearInterval(interval);
  }, [notificationsEnabled, notificationTime]);

  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // Notification Status Timer
  useEffect(() => {
    if (notificationStatus) {
        const timer = setTimeout(() => setNotificationStatus(''), 3000);
        return () => clearTimeout(timer);
    }
  }, [notificationStatus]);

  // --- Calculations ---

  const stats = useMemo(() => {
    let totalDays = 0;
    let btcInvested = 0;
    let goldInvested = 0;

    Object.values(investments).forEach(status => {
      if (status) {
        totalDays++;
        btcInvested += 100;
        goldInvested += 10;
      }
    });

    const btcUnits = btcInvested / prices.btc;
    const goldUnits = goldInvested / prices.gold;

    return { totalDays, btcInvested, goldInvested, btcUnits, goldUnits };
  }, [investments, prices]);

  // --- Actions ---

  const toggleDay = (dayIndex) => {
    const key = `${selectedMonth}-${dayIndex}`;
    setInvestments(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateMonthData = (field, value) => {
    setMonthlyData(prev => ({
      ...prev,
      [selectedMonth]: {
        ...prev[selectedMonth],
        [field]: value
      }
    }));
  };

  const handleSaveMonthData = () => {
    setMonthlyData(prev => ({
      ...prev,
      [selectedMonth]: {
        ...prev[selectedMonth],
        isSaved: true 
      }
    }));
    setSaveStatus('saved');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        console.warn("Image is too large. Please select an image under 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNotificationTime = () => {
      if (!notificationsEnabled) return;
      
      // Request permission immediately when saving if not granted
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
          Notification.requestPermission();
      }
      
      setNotificationStatus('saved');
  };

  const handleTestNotification = async () => {
      if (!("Notification" in window)) {
          console.warn("This browser does not support desktop notifications");
          return;
      }

      try {
          let permission = Notification.permission;

          if (permission !== "granted" && permission !== "denied") {
              permission = await Notification.requestPermission();
          }

          if (permission === "granted") {
              try {
                  new Notification("Invers Wealth Test", {
                      body: "This is how your reminder will look! 🔔",
                      // Using a simple placeholder icon if available, or browser default
                      icon: "/favicon.ico" 
                  });
              } catch (e) {
                  // Fallback for sandboxed environments where Notification object exists but constructor fails
                  console.warn("System notification blocked:", e);
                  console.log("Test Successful! (Note: The actual system popup was blocked by this preview environment, but the logic is working).");
              }
          } else {
              console.warn("Please enable notifications in your browser settings (Privacy & Security) to use this feature.");
          }
      } catch (error) {
          console.error("Notification Error:", error);
          console.error("Unable to trigger notification.");
      }
  };

  // --- Swipe Gesture Handlers ---
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Disabled restriction: Now swipes work on Game page too

    if (isLeftSwipe || isRightSwipe) {
        const currentIndex = VIEWS.indexOf(view);
        if (isLeftSwipe) {
            // Next View
            if (currentIndex < VIEWS.length - 1) {
                setView(VIEWS[currentIndex + 1]);
            }
        } else {
            // Previous View
            if (currentIndex > 0) {
                setView(VIEWS[currentIndex - 1]);
            }
        }
    }
  };

  // --- Render Views ---

  const renderDashboard = () => (
    <div className="space-y-6 pb-40 animate-fade-in text-gray-900 dark:text-white">
      {/* Header Profile & Summary */}
      <div className="flex justify-between items-start mb-4 px-2">
        <div className="flex flex-col gap-4 items-start">
            {/* Profile Image with Upload Trigger */}
            <div className="relative group w-28 h-28">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
                    {profile.image ? (
                        <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <User size={48} />
                        </div>
                    )}
                </div>
                <label className={`absolute bottom-1 right-1 p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform bg-white dark:bg-gray-800 ${currentTheme.text}`}>
                    <Camera size={18} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>
            
            {/* Editable Name */}
            <div className="text-left">
                <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-transparent border-none p-0 text-2xl font-black text-gray-900 dark:text-white w-56 focus:ring-0 placeholder-gray-400 outline-none text-left tracking-tight"
                    placeholder="Enter Name"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold text-left uppercase tracking-wide">Portfolio Owner</p>
            </div>
        </div>

        <div className="text-right pt-4">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Total Invested</div>
          <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{formatCurrency(stats.btcInvested + stats.goldInvested)}</div>
        </div>
      </div>

      {/* Live Prices Widgets - Grid updated for mobile readability */}
      <div className="grid grid-cols-2 gap-3">
        {/* BTC Widget */}
        <Card className="relative overflow-hidden group p-4">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Bitcoin size={60} />
          </div>
          <div className="flex flex-col items-start gap-2 mb-2">
            <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30">
              <Bitcoin className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Bitcoin</h3>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-gray-900 dark:text-white transition-all duration-500">
              {formatCurrency(prices.btc)}
            </div>
            <div className="flex items-center text-[10px] font-medium text-green-500 bg-green-500/10 w-fit px-1.5 py-0.5 rounded-md">
              <TrendingUp size={10} className="mr-0.5" /> +2.4%
            </div>
          </div>
        </Card>

        {/* Gold Widget */}
        <Card className="relative overflow-hidden group p-4">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Coins size={60} />
          </div>
          <div className="flex flex-col items-start gap-2 mb-2">
            <div className="p-2 bg-yellow-500 rounded-xl shadow-lg shadow-yellow-500/30">
              <Coins className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Gold</h3>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-gray-900 dark:text-white transition-all duration-500">
              {formatCurrency(prices.gold)}
            </div>
            <div className="flex items-center text-[10px] font-medium text-red-500 bg-red-500/10 w-fit px-1.5 py-0.5 rounded-md">
              <TrendingDown size={10} className="mr-0.5" /> -0.4%
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Summary */}
      <Card>
        <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">Investment Progress</h3>
        <div className="space-y-5">
          
          {/* BTC Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500 dark:text-gray-400">Bitcoin Goal (Daily ₹100)</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(stats.btcInvested)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min((stats.totalDays / 365) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-right mt-1 text-gray-400">Est: {stats.btcUnits.toFixed(8)} BTC</p>
          </div>

          {/* Gold Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500 dark:text-gray-400">Gold Goal (Daily ₹10)</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(stats.goldInvested)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min((stats.totalDays / 365) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-right mt-1 text-gray-400">Est: {stats.goldUnits.toFixed(4)} Grams</p>
          </div>

        </div>
      </Card>
    </div>
  );

  const renderPlanner = () => {
    const isLocked = monthlyData[selectedMonth]?.isSaved;

    return (
    <div className="animate-fade-in flex flex-col pb-40 text-gray-900 dark:text-white">
      <div className="flex items-center justify-between mb-4 px-1">
        <button 
          onClick={() => setSelectedMonth(prev => Math.max(0, prev - 1))}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-transform"
          disabled={selectedMonth === 0}
        >
          <ChevronLeft size={20} className={selectedMonth === 0 ? "text-gray-300" : "text-gray-900 dark:text-white"} />
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white w-32 text-center">{MONTHS[selectedMonth]}</h2>
        <button 
          onClick={() => setSelectedMonth(prev => Math.min(11, prev + 1))}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-transform"
          disabled={selectedMonth === 11}
        >
          <ChevronRight size={20} className={selectedMonth === 11 ? "text-gray-300" : "text-gray-900 dark:text-white"} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 px-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-gray-400">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-6">
        {Array.from({ length: DAYS_IN_MONTH(selectedMonth) }).map((_, i) => {
          const isChecked = investments[`${selectedMonth}-${i + 1}`];
          return (
            <button
              key={i}
              onClick={() => toggleDay(i + 1)}
              className={`
                relative aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-200
                border shadow-sm
                ${isChecked 
                  ? `${currentTheme.primary} ${currentTheme.border} text-white ${currentTheme.shadow} transform scale-95` 
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:shadow-md'
                }
              `}
            >
              <span className="text-xs font-bold">{i + 1}</span>
              {isChecked && (
                <CheckCircle2 size={12} className="mt-0.5 animate-bounce-short" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Monthly Report Section */}
      <Card className="animate-fade-in relative transition-all duration-500">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className={currentTheme.text} />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Monthly Report</h3>
          {isLocked && <Lock size={12} className="text-gray-400 ml-auto" />}
        </div>
        
        {isLocked ? (
            <div className="flex flex-col items-center justify-center py-4 text-center animate-fade-in">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-2">
                    <CheckCircle2 size={24} className={currentTheme.text} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Month Ended</h4>
                <p className="text-xs text-gray-500 mt-0.5">Report Saved.</p>
            </div>
        ) : (
            <>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 ml-1">Profit</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 font-bold text-emerald-600 text-sm">₹</span>
                      <input 
                        type="number" 
                        placeholder="0"
                        className="w-full border rounded-xl pl-6 pr-2 py-1.5 font-bold outline-none transition-all bg-emerald-5 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                        value={monthlyData[selectedMonth]?.profit || ''}
                        onChange={(e) => updateMonthData('profit', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-rose-600 dark:text-rose-400 ml-1">Loss</label>
                      <div className="relative">
                      <span className="absolute left-3 top-2 font-bold text-rose-600 text-sm">₹</span>
                      <input 
                        type="number" 
                        placeholder="0"
                        className="w-full border rounded-xl pl-6 pr-2 py-1.5 font-bold outline-none transition-all bg-rose-5 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 focus:ring-2 focus:ring-rose-500 text-sm"
                        value={monthlyData[selectedMonth]?.loss || ''}
                        onChange={(e) => updateMonthData('loss', e.target.value)}
                      />
                      </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <label className="text-[10px] font-bold text-gray-400 ml-1">Note : </label>
                  <textarea 
                    placeholder={`Notes for ${MONTHS[selectedMonth]}...`}
                    className="w-full border rounded-xl px-3 py-2 text-xs font-medium outline-none resize-none h-20 bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gray-400"
                    value={monthlyData[selectedMonth]?.note || ''}
                    onChange={(e) => updateMonthData('note', e.target.value)}
                  />
                </div>

                <button 
                onClick={handleSaveMonthData}
                className={`w-full py-2.5 rounded-xl font-bold text-sm text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${currentTheme.primary} ${currentTheme.shadow} ${saveStatus === 'saved' ? 'opacity-80' : ''}`}
                >
                {saveStatus === 'saved' ? (
                    <>
                    <CheckCircle2 size={16} /> Saved!
                    </>
                ) : (
                    <>
                    <Save size={16} /> Save Summary
                    </>
                )}
                </button>
            </>
        )}
      </Card>
    </div>
    );
  };

  const renderStorage = () => {
    // Calculate totals only for SAVED/LOCKED months
    const savedRecords = Object.values(monthlyData).filter(data => data && data.isSaved);
    const totalProfit = savedRecords.reduce((acc, curr) => acc + (Number(curr.profit) || 0), 0);
    const totalLoss = savedRecords.reduce((acc, curr) => acc + (Number(curr.loss) || 0), 0);
    const net = totalProfit - totalLoss;
    
    return (
      <div className="animate-fade-in space-y-5 pb-40 text-gray-900 dark:text-white">
         <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Data Storage</h2>
  
         {/* Net Summary Card */}
         <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white p-5">
            <div className="flex justify-between items-center mb-1">
               <span className="text-indigo-100 text-xs font-medium uppercase tracking-wider">Net Balance</span>
               <Database size={18} className="text-indigo-200" />
            </div>
            <div className="text-2xl font-bold mb-3 text-white">
               {formatCurrency(net)}
            </div>
            <div className="flex gap-3 text-xs text-white">
               <div className="bg-white/20 px-2 py-1 rounded-md flex items-center backdrop-blur-md">
                  <TrendingUp size={12} className="mr-1 text-emerald-300" /> {formatCurrency(totalProfit)}
               </div>
               <div className="bg-white/20 px-2 py-1 rounded-md flex items-center backdrop-blur-md">
                  <TrendingDown size={12} className="mr-1 text-rose-300" /> {formatCurrency(totalLoss)}
               </div>
            </div>
         </Card>
  
         {/* Database Entries */}
         <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Monthly Records</h3>
            {savedRecords.length === 0 ? (
               <div className="text-center py-8 text-gray-400">
                  <Database size={40} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No locked data recorded yet.</p>
               </div>
            ) : (
               MONTHS.map((month, index) => {
                  const data = monthlyData[index];
                  if (!data) return null; 
                  
                  // CRITICAL CHECK: Only show if saved/locked
                  if (!data.isSaved) return null;
  
                  return (
                      <Card key={month} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{month}</h4>
                            <button 
                              onClick={() => {
                                 const newData = { ...monthlyData };
                                 delete newData[index]; // Effectively deletes the record
                                 setMonthlyData(newData);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                           >
                              <Trash2 size={14} />
                           </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-2">
                           <div className="bg-emerald-50 dark:bg-emerald-900/20 p-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                              <label className="text-[10px] text-emerald-600 font-bold block">Profit</label>
                              <span className="font-mono font-bold text-sm text-emerald-700 dark:text-emerald-400">
                                  {data.profit ? `+${data.profit}` : '-'}
                              </span>
                           </div>
                           <div className="bg-rose-50 dark:bg-rose-900/20 p-1.5 rounded-lg border border-rose-100 dark:border-rose-800/30">
                               <label className="text-[10px] text-rose-600 font-bold block">Loss</label>
                               <span className="font-mono font-bold text-sm text-rose-700 dark:text-rose-400">
                                  {data.loss ? `-${data.loss}` : '-'}
                               </span>
                           </div>
                        </div>
  
                        {data.note && (
                           <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                              <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                                  "{data.note}"
                              </p>
                           </div>
                        )}
                      </Card>
                  );
               })
            )}
         </div>
      </div>
    );
  }

  const renderSettings = () => (
    <div className="animate-fade-in space-y-5 pb-24 text-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>

      {/* Theme Picker */}
      <Card className="p-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Color Theme</h3>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg text-white ${currentTheme.primary}`}>
                    <Palette size={18} />
                </div>
                <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{currentTheme.name}</p>
                    <p className="text-[10px] text-gray-500">Select your accent color.</p>
                </div>
            </div>
            
            <div className="flex gap-2">
                {Object.keys(THEMES).map(key => (
                    <button
                        key={key}
                        onClick={() => setColorTheme(key)}
                        className={`w-5 h-5 rounded-full ${THEMES[key].primary} transition-transform duration-200 ${colorTheme === key ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-110'}`}
                        aria-label={`Select ${THEMES[key].name} theme`}
                    />
                ))}
            </div>
        </div>
      </Card>

      {/* Daily Reminders - NEW SECTION */}
      <Card className="p-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Daily Reminder</h3>
          <div className="space-y-4">
              {/* Enable Toggle */}
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-white ${notificationsEnabled ? 'bg-orange-500' : 'bg-gray-400'}`}>
                          <Bell size={18} />
                      </div>
                      <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">Enable Notifications</p>
                          <p className="text-[10px] text-gray-500">Get reminded to invest daily.</p>
                      </div>
                  </div>
                  <NotificationSwitch 
                      checked={notificationsEnabled} 
                      onChange={() => {
                          if (!notificationsEnabled) {
                              // Ask for permission when enabling
                              Notification.requestPermission();
                          }
                          setNotificationsEnabled(!notificationsEnabled);
                      }}
                  />
              </div>

              {/* Time Picker */}
              {notificationsEnabled && (
                <div className="animate-fade-in bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Set Reminder Time</label>
                        </div>
                        
                        <div className="flex gap-2">
                            <input 
                                type="time" 
                                value={notificationTime}
                                onChange={(e) => setNotificationTime(e.target.value)}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />
                            
                            <button 
                                onClick={handleSaveNotificationTime}
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs text-white transition-all active:scale-95 ${currentTheme.primary} ${notificationStatus === 'saved' ? 'opacity-80' : ''}`}
                            >
                                {notificationStatus === 'saved' ? 'Saved' : 'Save'}
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-[9px] text-gray-400 italic">
                                * Browser notification must be allowed.
                            </p>
                            <button 
                                onClick={handleTestNotification}
                                className="text-[9px] font-bold px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Test
                            </button>
                        </div>
                    </div>
                </div>
              )}
          </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Appearance</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg text-white ${darkMode ? 'bg-purple-500' : 'bg-yellow-500'}`}>
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
              <p className="text-[10px] text-gray-500">{darkMode ? "Easier on the eyes at night" : "Bright and clear for day"}.</p>
            </div>
          </div>
          <ThemeSwitch 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
      </Card>
    </div>
  );

  return (
    <div className={`h-[100dvh] w-full transition-colors duration-500 font-inter ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      
      {/* Background Ambience - Dynamic */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ${currentTheme.blob} blur-[100px] transition-colors duration-700`} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gray-400/10 blur-[100px]" />
      </div>

      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {/* Main Layout Container - Mobile Optimized */}
      <div className="relative h-full w-full sm:max-w-md sm:mx-auto sm:bg-white/50 dark:sm:bg-gray-900/50 sm:shadow-2xl sm:h-[95vh] sm:mt-[2.5vh] sm:rounded-[40px] sm:border-[8px] sm:border-gray-200 dark:sm:border-gray-800 flex flex-col backdrop-blur-sm overflow-hidden">
        
        {/* Content Area with Swipe Detection */}
        <div 
            className="flex-1 overflow-y-auto p-4 scrollbar-hide touch-pan-y" 
            onTouchStart={onTouchStart} 
            onTouchMove={onTouchMove} 
            onTouchEnd={onTouchEnd}
        >
           {view === 'dashboard' && renderDashboard()}
           {view === 'planner' && renderPlanner()}
           {view === 'storage' && renderStorage()}
           {view === 'settings' && renderSettings()}
           
           {/* Game View - Persisted State */}
           {/* Using CSS visibility instead of conditional rendering to keep the iframe alive */}
           <div className={cn("flex-col items-center justify-center h-full pb-32", view === 'game' ? "flex" : "hidden")}>
               <div className="relative w-full h-full max-w-[501px] shadow-2xl rounded-[32px] overflow-hidden border-4 border-gray-200 dark:border-gray-700 bg-black">
                 <EscapeRoadGame />
               </div>
           </div>
        </div>

        {/* Bottom Navigation Dock - Fixed on mobile, contained on desktop */}
        <div className="absolute bottom-0 left-0 right-0 sm:static p-4 z-50 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent dark:from-gray-900 dark:via-gray-900/95 sm:from-transparent sm:via-transparent sm:to-transparent transition-all duration-300">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-1.5 flex justify-between items-center shadow-lg shadow-gray-200/50 dark:shadow-black/50">
            <IconButton 
              key="dashboard"
              Icon={ChartColumnIncreasingIcon} 
              active={view === 'dashboard'} 
              onClick={() => setView('dashboard')}
              theme={currentTheme}
            />
            <IconButton 
              key="planner"
              Icon={CalendarCheckIcon} 
              active={view === 'planner'} 
              onClick={() => setView('planner')}
              theme={currentTheme}
            />
            <IconButton 
              key="storage"
              Icon={DatabaseIcon} 
              active={view === 'storage'} 
              onClick={() => setView('storage')}
              theme={currentTheme}
            />
            <IconButton 
              key="game"
              Icon={GamepadIcon} 
              active={view === 'game'}
              onClick={() => setView('game')}
              theme={currentTheme}
            />
            <IconButton 
              key="settings"
              Icon={CogIcon} 
              active={view === 'settings'} 
              onClick={() => setView('settings')}
              theme={currentTheme}
            />
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-inter {
            font-family: 'Inter', sans-serif;
        }

        .touch-pan-y {
            touch-action: pan-y;
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20%); }
        }
        .animate-bounce-short {
          animation: bounce-short 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* --- Theme Switch CSS (Provided by User) --- */
        .theme-switch {
          --toggle-size: 30px;
          --container-width: 5.625em;
          --container-height: 2.5em;
          --container-radius: 6.25em;
          --container-light-bg: #3D7EAE;
          --container-night-bg: #1D1F2C;
          --circle-container-diameter: 3.375em;
          --sun-moon-diameter: 2.125em;
          --sun-bg: #ECCA2F;
          --moon-bg: #C4C9D1;
          --spot-color: #959DB1;
          --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
          --stars-color: #fff;
          --clouds-color: #F3FDFF;
          --back-clouds-color: #AACADF;
          --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
          --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
        }

        .theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: var(--toggle-size);
        }

        .theme-switch__container {
          width: var(--container-width);
          height: var(--container-height);
          background-color: var(--container-light-bg);
          border-radius: var(--container-radius);
          overflow: hidden;
          cursor: pointer;
          -webkit-box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
          box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
          position: relative;
        }

        .theme-switch__container::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          -webkit-box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
          box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
          border-radius: var(--container-radius)
        }

        .theme-switch__checkbox {
          display: none;
        }

        .theme-switch__circle-container {
          width: var(--circle-container-diameter);
          height: var(--circle-container-diameter);
          background-color: rgba(255, 255, 255, 0.1);
          position: absolute;
          left: var(--circle-container-offset);
          top: var(--circle-container-offset);
          border-radius: var(--container-radius);
          -webkit-box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-transition: var(--circle-transition);
          -o-transition: var(--circle-transition);
          transition: var(--circle-transition);
          pointer-events: none;
        }

        .theme-switch__sun-moon-container {
          pointer-events: auto;
          position: relative;
          z-index: 2;
          width: var(--sun-moon-diameter);
          height: var(--sun-moon-diameter);
          margin: auto;
          border-radius: var(--container-radius);
          background-color: var(--sun-bg);
          -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
          box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
          -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
          filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
          overflow: hidden;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
        }

        .theme-switch__moon {
          -webkit-transform: translateX(100%);
          -ms-transform: translateX(100%);
          transform: translateX(100%);
          width: 100%;
          height: 100%;
          background-color: var(--moon-bg);
          border-radius: inherit;
          -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
          box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
          position: relative;
        }

        .theme-switch__spot {
          position: absolute;
          top: 0.75em;
          left: 0.312em;
          width: 0.75em;
          height: 0.75em;
          border-radius: var(--container-radius);
          background-color: var(--spot-color);
          -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
          box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
        }

        .theme-switch__spot:nth-of-type(2) {
          width: 0.375em;
          height: 0.375em;
          top: 0.937em;
          left: 1.375em;
        }

        .theme-switch__spot:nth-last-of-type(3) {
          width: 0.25em;
          height: 0.25em;
          top: 0.312em;
          left: 0.812em;
        }

        .theme-switch__clouds {
          width: 1.25em;
          height: 1.25em;
          background-color: var(--clouds-color);
          border-radius: var(--container-radius);
          position: absolute;
          bottom: -0.625em;
          left: 0.312em;
          -webkit-box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
          box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
          -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
          -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
          transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
        }

        .theme-switch__stars-container {
          position: absolute;
          color: var(--stars-color);
          top: -100%;
          left: 0.312em;
          width: 2.75em;
          height: auto;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
        }

        /* actions */

        .theme-switch__checkbox:checked + .theme-switch__container {
          background-color: var(--container-night-bg);
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
          left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
          left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em)
        }

        .theme-switch__circle-container:hover {
          left: calc(var(--circle-container-offset) + 0.187em);
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
          -webkit-transform: translate(0);
          -ms-transform: translate(0);
          transform: translate(0);
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
          bottom: -4.062em;
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }

        /* --- 3D Switch CSS (Added) --- */
        .switch {
          font-size: 17px;
          position: relative;
          display: inline-block;
          width: 5em;
          height: 2.5em;
          user-select: none;
        }

        .switch .cb {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle {
          position: absolute;
          cursor: pointer;
          width: 100%;
          height: 100%;
          background-color: #373737;
          border-radius: 0.1em;
          transition: 0.4s;
          text-transform: uppercase;
          font-weight: 700;
          overflow: hidden;
          box-shadow: -0.3em 0 0 0 #373737, -0.3em 0.3em 0 0 #373737,
            0.3em 0 0 0 #373737, 0.3em 0.3em 0 0 #373737, 0 0.3em 0 0 #373737;
        }

        .toggle > .left {
          position: absolute;
          display: flex;
          width: 50%;
          height: 88%;
          background-color: #f3f3f3;
          color: #373737;
          left: 0;
          bottom: 0;
          align-items: center;
          justify-content: center;
          transform-origin: right;
          transform: rotateX(10deg);
          transform-style: preserve-3d;
          transition: all 150ms;
        }

        .left::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(206, 206, 206);
          transform-origin: center left;
          transform: rotateY(90deg);
        }

        .left::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(112, 112, 112);
          transform-origin: center bottom;
          transform: rotateX(90deg);
        }

        .toggle > .right {
          position: absolute;
          display: flex;
          width: 50%;
          height: 88%;
          background-color: #f3f3f3;
          color: rgb(206, 206, 206);
          right: 1px;
          bottom: 0;
          align-items: center;
          justify-content: center;
          transform-origin: left;
          transform: rotateX(10deg) rotateY(-45deg);
          transform-style: preserve-3d;
          transition: all 150ms;
        }

        .right::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(206, 206, 206);
          transform-origin: center right;
          transform: rotateY(-90deg);
        }

        .right::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(112, 112, 112);
          transform-origin: center bottom;
          transform: rotateX(90deg);
        }

        .switch input:checked + .toggle > .left {
          transform: rotateX(10deg) rotateY(45deg);
          color: rgb(206, 206, 206);
        }

        .switch input:checked + .toggle > .right {
          transform: rotateX(10deg) rotateY(0deg);
          color: #487bdb;
        }
      `}</style>
    </div>
  );
}