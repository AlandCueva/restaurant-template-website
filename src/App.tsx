import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// BRAND COLOR TOKENS & DATA CONSTANTS (Traducción completa a Español)
// ============================================================================

const BRAND = {
  canvas:   '#F4F4F6', // Dominant background — soft cement white, 85% of all surfaces
  card:     '#EBEBED', // Secondary card background — cool light grey
  ink:      '#1A1A1A', // Primary text, borders, buttons — matte black
  charcoal: '#4A4A4A', // Secondary text, metadata, captions
  ocean:    '#1E2A38', // Deep ocean blue — nav accents, section tags, status indicators
  chili:    '#D65A31', // Terracotta chili red — CTAs, hover states, underline reveals
} as const;

const HERO_VIDEO_POSTER  = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1280&q=85';
const SECTION2_IMAGE     = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1280&q=85';
const SECTION3_IMG1      = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85';
const SECTION3_IMG2      = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=85';
const SECTION3_BG        = 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1280&q=85';
const AMBIENCE_IMG1      = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85';
const AMBIENCE_IMG2      = 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=85';
const AMBIENCE_IMG3      = 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=85';
const UGC_IMG1           = 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80';
const UGC_IMG2           = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80';
const UGC_IMG3           = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80';
const UGC_IMG4           = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80';
const UGC_IMG5           = 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80';
const UGC_IMG6           = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80';

const MENU_CATEGORIES = [
  { slug: 'cevicheria', name: 'Cevichería\n& Entradas', tag: 'Freshness first',              active: true  },
  { slug: 'fondos', name: 'Platos\nde Fondo',       tag: 'Author\'s hot dishes',         active: false },
  { slug: 'cocteles', name: 'Cócteles\n& Tragos',     tag: 'Pisco · Chicha · Chilcano',    active: false },
] as const;

const DAILY_PLATES: Record<number, string> = {
  0: 'Seco de Cordero',
  1: 'Tacu Tacu con Seco',
  2: 'Ceviche Carretillero',
  3: 'Lomo Saltado',
  4: 'Ají de Gallina',
  5: 'Arroz con Mariscos',
  6: 'Causa Limeña Especial'
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  available?: boolean;
}

const MENU_ITEMS: Record<'cevicheria' | 'fondos' | 'cocteles', MenuItem[]> = {
  cevicheria: [
    {
      id: 'e1',
      name: 'Ceviche Clásico',
      description: 'Fresh sea bass, tiger\'s milk, red onion, Peruvian chili, cancha, and sweet potato',
      price: '$14',
      tags: ['recommended', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80',
    },
    {
      id: 'e2',
      name: 'Tiradito de Atún',
      description: 'Thin-sliced tuna, yellow chili cream, sesame oil, micro cilantro, crispy leeks',
      price: '$15',
      tags: ['recommended'],
      image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80',
    },
    {
      id: 'e3',
      name: 'Causa Limeña',
      description: 'Yellow potato terrine, spiced with ají amarillo, filled with shrimp, avocado, and lemon mayo',
      price: '$12',
      tags: ['gluten-free'],
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    },
    {
      id: 'e4',
      name: 'Papas a la Huancaína',
      description: 'Boiled yellow potatoes in a creamy spiced cheese and ají amarillo sauce, black olive, egg',
      price: '$10',
      tags: ['vegetarian', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    },
  ],
  fondos: [
    {
      id: 'f1',
      name: 'Lomo Saltado',
      description: 'Wok-tossed beef tenderloin, tomato, red onion, soy, and oyster sauce, served with white rice and fries',
      price: '$18',
      tags: ['recommended'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    },
    {
      id: 'f2',
      name: 'Ají de Gallina',
      description: 'Shredded chicken in creamy yellow chili and walnut sauce, served over white rice with black olive and egg',
      price: '$16',
      tags: ['recommended'],
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    },
    {
      id: 'f3',
      name: 'Arroz con Mariscos',
      description: 'Creole-style seafood rice, squid, shrimp, scallops, ají panca, cilantro, and salsa criolla',
      price: '$20',
      tags: ['gluten-free'],
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80',
      available: true,
    },
    {
      id: 'f4',
      name: 'Seco de Cordero',
      description: 'Northern-style lamb stew, cilantro broth, chicha de jora, canario beans, and white rice',
      price: '$19',
      tags: [],
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
      available: true,
    },
  ],
  cocteles: [
    {
      id: 'c1',
      name: 'Pisco Sour',
      description: 'Quebranta pisco, fresh lime, simple syrup, egg white, and Angostura bitters — the national ritual',
      price: '$10',
      tags: ['recommended'],
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80',
    },
    {
      id: 'c2',
      name: 'Chilcano de Pisco',
      description: 'Pisco, ginger ale, lime juice, bitters — crisp, refreshing, and effortless',
      price: '$9',
      tags: [],
      image: 'https://images.unsplash.com/photo-1560508180-03f285f67ded?w=600&q=80',
    },
    {
      id: 'c3',
      name: 'Chicha Morada',
      description: 'Slow-cooked purple corn, pineapple, cinnamon, clove, lemon — served chilled, non-alcoholic',
      price: '$6',
      tags: ['vegan', 'recommended'],
      image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&q=80',
    },
    {
      id: 'c4',
      name: 'Maracuyá Sour',
      description: 'Pisco, fresh passionfruit, lime, egg white — tropical and vibrant',
      price: '$11',
      tags: [],
      image: 'https://images.unsplash.com/photo-1506755594592-349d12a7c52a?w=600&q=80',
    },
  ],
};

const DISPLAY_CASE_INITIAL = [
  { id: 'dc1', name: 'Ceviche del Día',    available: true,  image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80' },
  { id: 'dc2', name: 'Causa de Cangrejo',  available: true,  image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  { id: 'dc3', name: 'Tiradito Nikkei',    available: false, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80' },
  { id: 'dc4', name: 'Arroz con Mariscos', available: true,  image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
  { id: 'dc5', name: 'Lomo Saltado',       available: true,  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
];

const UGC_IMAGES = [UGC_IMG1, UGC_IMG2, UGC_IMG3, UGC_IMG4, UGC_IMG5, UGC_IMG6];

const NAV_LINKS = ['Inicio', 'Menú', 'Vitrina', 'Galería', 'Historia', 'Visítanos', 'Reservar'];

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function useCustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const touchDevice = navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touchDevice);
    if (touchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const updateHoverListeners = () => {
      const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
      
      const handleMouseEnter = () => setIsHovering(true);
      const handleMouseLeave = () => setIsHovering(false);

      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateHoverListeners();

    const observer = new MutationObserver(() => {
      updateHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return { position, isHovering, isClicking, isTouch };
}

function useStaggeredReveal(count: number, threshold = 0.12) {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimStyle = (index: number): React.CSSProperties => {
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 140}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 140}ms`,
    };
  };

  return { containerRef, getAnimStyle, visible };
}

interface MaskPosition {
  x: number;
  y: number;
  sw: number;
  sh: number;
}

function useMaskPositions(
  containerRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.RefObject<(HTMLElement | null)[]>
) {
  const [positions, setPositions] = useState<MaskPosition[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePositions = () => {
      const containerRect = container.getBoundingClientRect();
      const sw = containerRect.width;
      const sh = containerRect.height;
      if (!cardRefs.current) return;
      
      const newPositions = cardRefs.current.map((card) => {
        if (!card) return { x: 0, y: 0, sw: 100, sh: 100 };
        const cardRect = card.getBoundingClientRect();
        return {
          x: cardRect.left - containerRect.left,
          y: cardRect.top - containerRect.top,
          sw: cardRect.width,
          sh: cardRect.height,
        };
      });
      setPositions(newPositions);
    };

    updatePositions();

    const observer = new ResizeObserver(updatePositions);
    observer.observe(container);

    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, true);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions, true);
    };
  }, [containerRef, cardRefs]);

  return positions;
}

function useImageWidth(src: string, sectionHeight: number) {
  const [renderWidth, setRenderWidth] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const calculated = img.naturalWidth * (sectionHeight / img.naturalHeight);
      setRenderWidth(calculated);
    };
  }, [src, sectionHeight]);

  return renderWidth;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return isMobile;
}

function useLiveStatus() {
  const [status, setStatus] = useState({ isOpen: false, closingTime: '18:00' });

  useEffect(() => {
    const getStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;
      const isWeekend = day === 0 || day === 6;
      const opens = 8;
      const closes = isWeekend ? 20 : 18;
      const isOpen = hour >= opens && hour < closes;
      return { isOpen, closingTime: `${closes}:00` };
    };
    setStatus(getStatus());
  }, []);

  return status;
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const CustomCursor: React.FC = () => {
  const { position, isHovering, isClicking, isTouch } = useCustomCursor();

  if (isTouch) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[999] rounded-full bg-[#1C1C1C]"
        style={{
          width: '8px',
          height: '8px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="fixed pointer-events-none z-[999] rounded-full border border-[#1C1C1C] transition-[width,height,border-color] duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '48px' : isClicking ? '20px' : '32px',
          height: isHovering ? '48px' : isClicking ? '20px' : '32px',
          borderColor: isHovering ? '#BC8A72' : '#1C1C1C',
        }}
      />
    </>
  );
};

interface MagneticButtonProps {
  children: React.ReactElement;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, strength = 0.3, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    setTransform({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const child = React.Children.only(children);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 && transform.y === 0
          ? 'transform 0.4s cubic-bezier(0.23,1,0.32,1)'
          : 'transform 0.15s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {React.cloneElement(child, { 'data-cursor': 'hover' })}
    </div>
  );
};

interface MaskedCardProps {
  bgImage: string;
  position?: MaskPosition;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLElement | null) => void;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const MaskedCard: React.FC<MaskedCardProps> = ({
  bgImage,
  position,
  imageWidth,
  focalX,
  className = '',
  children,
  cardRef,
  style = {},
  onClick,
}) => {
  if (!position) {
    return (
      <div ref={cardRef} className={className} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }

  const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;

  const combinedStyle: React.CSSProperties = {
    ...style,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: `auto ${position.sh}px`,
    backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={combinedStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CinematicHero: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <img
        src="https://res.cloudinary.com/du3y0n9fx/image/upload/v1782779460/heroimagearsenia.webp"
        alt="Arsenia Cocina Peruana"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT (Con soporte impecable en Español y Alturas 100VH)
// ============================================================================

export default function App() {
  const isMobile = useIsMobile();
  const liveStatus = useLiveStatus();

  // Estados de Dialogs & Cajones
  const [showSplash, setShowSplash] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);



  // Categoría Activa de Menú
  const [activeCategory, setActiveCategory] = useState<'cevicheria' | 'fondos' | 'cocteles'>('cevicheria');

  // Vitrina de Repostería y Modo Admin Secreto
  const [displayCase, setDisplayCase] = useState(DISPLAY_CASE_INITIAL);
  const [adminMode, setAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Notificaciones Toast
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Revelaciones con retardo escalonado
  const s1Reveal = useStaggeredReveal(1, 0.1);
  const s3Reveal = useStaggeredReveal(3, 0.12);
  const s4Reveal = useStaggeredReveal(3, 0.12);
  const s5Reveal = useStaggeredReveal(2, 0.12);
  const s6Reveal = useStaggeredReveal(2, 0.12);

  // Efecto de carga del Splash Screen
  const [splashCount, setSplashCount] = useState(0);
  const [splashExiting, setSplashExiting] = useState(false);

  useEffect(() => {
    if (!showSplash) return;
    const interval = setInterval(() => {
      setSplashCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setSplashExiting(true);
            setTimeout(() => {
              setShowSplash(false);
            }, 700);
          }, 200);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [showSplash]);

  // Bloqueo de scroll cuando los overlays o cajones están abiertos
  useEffect(() => {
    if (isDrawerOpen || isMobileMenuOpen || selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, isMobileMenuOpen, selectedItem]);

  // Modo Admin de Personal: 5 clicks rápidos en el título de la vitrina
  const handleHeadingClick = () => {
    setClickCount((prev) => {
      if (prev + 1 >= 5) {
        setAdminMode(!adminMode);
        triggerToast(`Modo administrador ${!adminMode ? 'activado' : 'desactivado'}`);
        return 0;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    if (clickCount === 0) return;
    const timeout = setTimeout(() => {
      setClickCount(0);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [clickCount]);

  // Formulario de Reserva
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2 personas',
    notes: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time) {
      triggerToast('Por favor completa tu nombre, fecha y hora.');
      return;
    }
    setIsDrawerOpen(false);
    triggerToast(`¡Mesa de brunch reservada para ${formData.name}! Revisa tu correo.`);
    setFormData({ name: '', date: '', time: '', guests: '2 personas', notes: '' });
  };

  // Formulario de Boletín
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    triggerToast(`¡Gracias! ${newsletterEmail} ha sido agregado a nuestra lista de brunch.`);
    setNewsletterEmail('');
  };

  // Navegación fluida y adaptada
  const handleNavClick = (link: string) => {
    setIsMobileMenuOpen(false);
    if (link === 'Reservar' || link === 'Reserve') {
      setIsDrawerOpen(true);
    } else {
      const mapping: Record<string, string> = {
        'Inicio': 'home',
        'Menú': 'menu',
        'Vitrina': 'display-case',
        'Galería': 'gallery',
        'Historia': 'story',
        'Visítanos': 'visit',
        'Home': 'home',
        'Menu': 'menu',
        'Display Case': 'display-case',
        'Gallery': 'gallery',
        'Story': 'story',
        'Visit': 'visit'
      };
      const targetId = mapping[link] || link.toLowerCase().replace(' ', '-');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const tagTranslations: Record<string, string> = {
    'recommended': 'recomendado',
    'vegan-option': 'opción vegana',
    'vegetarian': 'vegetariano',
    'gluten-free': 'sin gluten',
    'vegan': 'vegano',
    'opcion-vegana': 'opción vegana',
    'sin-gluten': 'sin gluten'
  };

  return (
    <div style={{ backgroundColor: '#F4F4F6' }} className="relative min-h-screen text-[#1A1A1A]">
      {/* CURSOR PERSONALIZADO EXCLUSIVO PARA ESCRITORIO */}
      <CustomCursor />

      {/* CONTENEDOR DE NOTIFICACIONES TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[99] bg-[#1A1A1A] text-[#F4F4F6] px-6 py-3 rounded-[6px] text-xs font-['Inter'] tracking-wider uppercase shadow-xl flex items-center gap-3 border border-[#D65A31]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D65A31]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PANTALLA DE INICIO / INTRODUCCIÓN (SPLASH SCREEN) */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[100] bg-[#F4F4F6] flex flex-col items-start justify-end p-6 md:p-10 transition-opacity duration-700 ${
            splashExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-7xl md:text-9xl font-['Cormorant_Garamond'] font-bold tabular-nums italic text-[#1A1A1A] leading-none mb-4">
            {splashCount}%
          </div>
          <div className="text-xs font-['Inter'] text-[#4A4A4A] tracking-widest uppercase pl-2">
            Preparando tu experiencia
          </div>
        </div>
      )}

      {/* NAVBAR RESPONSIVO FIJO */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-3 md:py-4 bg-[#F4F4F6]/85 backdrop-blur-md border-b border-[#1A1A1A]/8">
        {/* Logo de Marca */}
        <div
          className="flex items-center gap-3 select-none text-left cursor-pointer"
          onClick={() => handleNavClick('Inicio')}
          data-cursor="hover"
        >
          <img
            src="https://res.cloudinary.com/du3y0n9fx/image/upload/v1782778847/arsenialogo.jpg"
            alt="Arsenia Logo"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-[#1A1A1A]/10 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-['Cormorant_Garamond'] font-semibold italic text-[#1A1A1A] tracking-tight leading-none">
              Arsenia
            </span>
            <span className="text-[8px] md:text-[9px] font-['Inter'] font-medium text-[#4A4A4A] tracking-widest uppercase mt-1.5">
              Gastronomía Peruana · Loja
            </span>
          </div>
        </div>

        {/* Enlaces para Escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="text-xs font-['Inter'] font-medium text-[#4A4A4A] tracking-wide uppercase relative group hover:text-[#1A1A1A] transition-colors py-1 cursor-pointer md:cursor-none"
              data-cursor="hover"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D65A31] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Botón de Menú de Hamburguesa para Móvil (Perfeccionado y Responsivo) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center relative z-50 focus:outline-none cursor-pointer"
          aria-label="Abrir Menú Móvil"
          data-cursor="hover"
        >
          <span className={`absolute h-px w-6 bg-[#1A1A1A] rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
          <span className={`absolute h-px w-6 bg-[#1A1A1A] rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
          <span className={`absolute h-px w-6 bg-[#1A1A1A] rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
        </button>
      </nav>

      {/* Panel Desplegable de Menú Móvil */}
      <div
        className={`fixed inset-0 z-40 bg-[#1A1A1A]/40 backdrop-blur-sm md:hidden transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#F4F4F6] shadow-2xl p-8 pt-24 flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-3 pb-6 border-b border-[#1A1A1A]/10 mb-2">
              <img
                src="https://res.cloudinary.com/du3y0n9fx/image/upload/v1782778847/arsenialogo.jpg"
                alt="Arsenia Logo"
                className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A]/10"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-xl font-['Cormorant_Garamond'] font-semibold italic text-[#1A1A1A] leading-none">
                  Arsenia
                </span>
                <span className="text-[9px] font-['Inter'] font-medium text-[#4A4A4A] tracking-widest uppercase mt-1.5">
                  Gastronomía Peruana · Loja
                </span>
              </div>
            </div>
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`text-4xl font-['Cormorant_Garamond'] font-semibold italic text-[#1A1A1A] hover:text-[#D65A31] text-left transition-all duration-500 ease-out cursor-pointer ${
                  isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${150 + i * 75}ms` : '0ms'
                }}
                data-cursor="hover"
              >
                {link}
              </button>
            ))}
          </div>

          <div
            className={`pt-8 border-t border-[#EBEBED] text-left transition-all duration-500 delay-[450ms] ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xs font-['Inter'] text-[#4A4A4A] tracking-widest mb-6 italic leading-relaxed">
              "El sabor de Perú en Loja."
            </p>
            <MagneticButton strength={0.2} className="w-full">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDrawerOpen(true);
                }}
                className="w-full px-6 py-4 bg-[#1A1A1A] rounded-[6px] text-[#F4F4F6] text-sm font-['Inter'] font-medium tracking-wide hover:bg-[#D65A31] transition-colors duration-300 cursor-pointer"
              >
                Reservar una Mesa
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* BOTÓN RESERVA FLOATING WIDGET (Soporte táctil y ratón) */}
      <div className="fixed bottom-6 right-6 z-40">
        <MagneticButton strength={0.3}>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-6 py-3 bg-[#1A1A1A] text-[#F4F4F6] text-sm font-['Inter'] font-medium rounded-[6px] tracking-wide hover:bg-[#D65A31] transition-colors duration-300 shadow-xl cursor-pointer md:cursor-none"
            data-cursor="hover"
          >
            Reservar una Mesa
          </button>
        </MagneticButton>
      </div>

      {/* CAJÓN SLIDEOUT DE RESERVAS FRICCIONLESS */}
      <div
        className={`fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-sm transition-opacity duration-500 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-[#F4F4F6] shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Encabezado */}
          <div className="p-8 border-b border-[#EBEBED] text-left flex justify-between items-start">
            <div>
              <span className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-1 block">
                Comienza tu experiencia
              </span>
              <h2 className="text-3xl font-['Cormorant_Garamond'] font-semibold italic text-[#1A1A1A]">
                Reserva tu Mesa
              </h2>
              <p className="text-xs text-[#4A4A4A] font-['Inter'] mt-1">
                Confirmaremos tu reserva en menos de 2 horas.
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 border border-[#1A1A1A] rounded-[6px] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F4F6] transition-colors cursor-pointer"
              aria-label="Cerrar"
              data-cursor="hover"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleFormSubmit} className="p-8 flex-1 overflow-y-auto flex flex-col gap-5 text-left">
            <div>
              <label className="text-[10px] font-['Inter'] uppercase tracking-widest text-[#4A4A4A]/60 block mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b border-[#4A4A4A]/40 bg-transparent py-2 text-sm text-[#1A1A1A] font-['Inter'] placeholder:text-[#4A4A4A]/60 focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-['Inter'] uppercase tracking-widest text-[#4A4A4A]/60 block mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border-b border-[#4A4A4A]/40 bg-transparent py-2 text-sm text-[#1A1A1A] font-['Inter'] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-['Inter'] uppercase tracking-widest text-[#4A4A4A]/60 block mb-1">Hora</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full border-b border-[#4A4A4A]/40 bg-transparent py-2 text-sm text-[#1A1A1A] font-['Inter'] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-['Inter'] uppercase tracking-widest text-[#4A4A4A]/60 block mb-1">Invitados</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full border-b border-[#4A4A4A]/40 bg-transparent py-2 text-sm text-[#1A1A1A] font-['Inter'] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              >
                <option value="1 persona">1 persona</option>
                <option value="2 personas">2 personas</option>
                <option value="3 personas">3 personas</option>
                <option value="4 personas">4 personas</option>
                <option value="5 personas">5 personas</option>
                <option value="6 personas">6 personas</option>
                <option value="7 personas">7 personas</option>
                <option value="8+ personas">8+ personas</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-['Inter'] uppercase tracking-widest text-[#4A4A4A]/60 block mb-1">Preferencias</label>
              <textarea
                placeholder="Necesidades dietéticas, ocasión o cualquier detalle que debamos saber"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full border-b border-[#4A4A4A]/40 bg-transparent py-2 text-sm text-[#1A1A1A] font-['Inter'] placeholder:text-[#4A4A4A]/60 focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
              />
            </div>

            <div className="mt-auto pt-6">
              <MagneticButton strength={0.2} className="w-full">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] text-[#F4F4F6] text-sm font-['Inter'] font-medium rounded-[6px] tracking-wide hover:bg-[#D65A31] transition-colors duration-300 cursor-pointer"
                >
                  Confirmar mi Reserva
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>

      {/* ============================================================================
          SECCIÓN 1 — HERO / PORTADA (100VH Exacto)
          ============================================================================ */}
      <section
        id="home"
        ref={s1Reveal.containerRef}
        className="h-screen w-full overflow-hidden flex flex-col pt-20 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        {/* Tarjeta Hero Principal (con Imagen de Fondo de Alta Calidad y Slogan de Perú) */}
        <div
          className="w-full flex-1 min-h-0 rounded-[6px] md:rounded-xl overflow-hidden relative"
          style={s1Reveal.getAnimStyle(0)}
        >
          <CinematicHero />

          <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 text-[#F4F4F6]/90 text-[10px] xs:text-xs sm:text-sm md:text-lg font-['Inter'] font-medium tracking-wide text-left select-none max-w-[45%] leading-snug">
            "El Sabor de Perú en Loja"
          </div>

          {/* Plato del Día */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex flex-col items-end bg-[#1A1A1A]/85 backdrop-blur-md px-2.5 py-1 md:px-3.5 md:py-2 rounded-[6px] border border-[#F4F4F6]/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] select-none text-right max-w-[50%]">
            <span className="text-[#D65A31] text-[8px] md:text-[10px] font-['Inter'] font-bold tracking-widest uppercase mb-0.5 md:mb-1">
              Plato del día:
            </span>
            <span className="text-[#F4F4F6] text-[10px] xs:text-xs md:text-sm font-['Cormorant_Garamond'] font-semibold italic tracking-wide truncate max-w-full">
              {DAILY_PLATES[new Date().getDay()] || 'Lomo Saltado'}
            </span>
          </div>

          {/* Contenedor Inferior Responsivo */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-8 md:right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 select-none">
            <div className="text-left">
              <img
                src="https://res.cloudinary.com/du3y0n9fx/image/upload/v1782778847/arsenialogo.jpg"
                alt="Arsenia Logo"
                className="w-12 h-12 xs:w-14 xs:h-14 md:w-18 md:h-18 rounded-full object-cover border-2 border-[#F4F4F6]/35 shadow-xl mb-2 md:mb-4"
                referrerPolicy="no-referrer"
              />
              <span className="block text-[#D65A31] text-[9px] xs:text-[10px] md:text-xs font-['Inter'] font-medium tracking-widest uppercase mb-1 md:mb-2">
                Loja, Ecuador
              </span>
              <h1 className="font-['Cormorant_Garamond'] font-semibold italic text-[#F4F4F6] text-[clamp(2.0rem,8vw,8.5rem)] leading-[0.85] tracking-tight">
                Arsenia<br />
                <span className="not-italic font-normal text-[#F4F4F6]/70">Cocina</span>
              </h1>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end justify-start sm:justify-end w-full sm:w-auto">
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="px-3 py-2 xs:px-5 xs:py-3 bg-[#F4F4F6] text-[#1A1A1A] text-[10px] xs:text-xs md:text-sm font-['Inter'] font-semibold rounded-[6px] tracking-wide hover:bg-[#D65A31] hover:text-[#F4F4F6] transition-colors duration-300 shadow-md cursor-pointer whitespace-nowrap"
                >
                  Reservar una Mesa
                </button>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => {
                    const el = document.getElementById('display-case');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-2 xs:px-5 xs:py-3 border border-[#F4F4F6]/60 text-[#F4F4F6] text-[10px] xs:text-xs md:text-sm font-['Inter'] font-medium rounded-[6px] tracking-wide hover:border-[#F4F4F6] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                >
                  Explorar la Vitrina
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          SECCIÓN 2 — LA CARTA / COMPACT MENU TEASER (100VH Sin Scroll)
          ============================================================================ */}
      <section
        id="menu"
        className="h-screen w-full bg-[#F4F4F6] flex flex-col justify-between px-5 md:px-8 pt-12 pb-4 md:pt-16 md:pb-6 overflow-hidden relative"
      >
        {/* Encabezado */}
        <div className="text-left select-none shrink-0">
          <span className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-1.5 md:mb-2 block">
            Nuestra Propuesta
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-[clamp(2.0rem,5vw,3.5rem)] leading-[0.9] text-[#1A1A1A] mb-2">
            La Carta de Arsenia
          </h2>
          <p className="text-xs xs:text-[13px] font-['Inter'] text-[#4A4A4A] max-w-xl leading-relaxed">
            Una esmerada selección de la gastronomía peruana. Un puente de sabores entre la frescura del mar y la calidez de la cocina tradicional.
          </p>
        </div>

        {/* Las 3 Categorías Teaser */}
        <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4 my-2 overflow-hidden max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full">
            {[
              {
                id: 'cevicheria',
                title: 'Cevichería & Entradas',
                desc: 'Frescura del mar en cada bocado.',
                items: 'Ceviche Clásico · Tiraditos · Causas',
                bg: 'https://res.cloudinary.com/du3y0n9fx/image/upload/v1782779460/heroimagearsenia.webp'
              },
              {
                id: 'fondos',
                title: 'Platos de Fondo',
                desc: 'La calidez y fuego del Perú.',
                items: 'Lomo Saltado · Ají de Gallina · Arroz con Mariscos',
                bg: AMBIENCE_IMG1
              },
              {
                id: 'cocteles',
                title: 'Cócteles & Tragos',
                desc: 'Brindis con espíritu peruano.',
                items: 'Pisco Sour · Chicha Morada · Chilcano de Kion',
                bg: SECTION3_BG
              }
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setIsMenuDrawerOpen(true);
                }}
                className="group relative rounded-[6px] md:rounded-xl overflow-hidden h-24 xs:h-28 md:h-52 bg-[#EBEBED] border border-[#1A1A1A]/5 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer flex flex-col justify-end p-4 text-left"
                data-cursor="hover"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${cat.bg})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:via-black/50 transition-colors duration-300" />
                <div className="relative z-10">
                  <span className="text-[#D65A31] text-[9px] font-['Inter'] font-bold tracking-widest uppercase block mb-1">
                    Ver Categoría
                  </span>
                  <h3 className="text-[#F4F4F6] text-sm md:text-lg font-['Cormorant_Garamond'] font-semibold italic leading-none mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-[#F4F4F6]/70 text-[10px] md:text-xs font-['Inter'] leading-tight hidden md:block mb-1">
                    {cat.desc}
                  </p>
                  <p className="text-[#D65A31]/90 text-[9px] font-mono tracking-wider uppercase">
                    {cat.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Botón Principal */}
        <div className="flex flex-col items-center gap-2 select-none shrink-0 mb-1">
          <MagneticButton strength={0.3}>
            <button
              onClick={() => setIsMenuDrawerOpen(true)}
              className="px-6 py-3.5 bg-[#1A1A1A] text-[#F4F4F6] text-xs md:text-sm font-['Inter'] font-semibold rounded-[6px] tracking-wide hover:bg-[#D65A31] hover:text-[#F4F4F6] transition-colors duration-300 cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>Explorar Menú Completo</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </MagneticButton>
          <span className="text-[10px] font-['Inter'] text-[#4A4A4A]/60">
            * Disponible para servirse o retirar en el local.
          </span>
        </div>
      </section>

      {/* CAJÓN SLIDEOUT / MODAL FULLSCREEN DE MENÚ INTERACTIVO */}
      <AnimatePresence>
        {isMenuDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1A1A1A]/55 backdrop-blur-md flex items-center justify-center md:p-6"
            onClick={() => setIsMenuDrawerOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full h-full md:max-w-5xl md:h-[90vh] bg-[#F4F4F6] md:rounded-xl shadow-2xl flex flex-col overflow-hidden text-left relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Encabezado Fijo del Menú */}
              <div className="bg-[#F4F4F6] px-5 md:px-8 pt-6 pb-4 shrink-0 flex justify-between items-center border-b border-[#EBEBED]">
                <div>
                  <span className="text-[10px] font-['Inter'] text-[#D65A31] tracking-widest uppercase mb-1 block font-bold">
                    Carta Completa de Arsenia
                  </span>
                  <h2 className="text-2xl md:text-3xl font-['Cormorant_Garamond'] font-semibold italic text-[#1A1A1A]">
                    Explorar la Cocina
                  </h2>
                </div>
                <button
                  onClick={() => setIsMenuDrawerOpen(false)}
                  className="px-4 py-2 border border-[#1A1A1A]/15 rounded-[6px] text-xs font-['Inter'] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-[#F4F4F6] transition-colors cursor-pointer flex items-center gap-2"
                  aria-label="Cerrar Menú"
                  data-cursor="hover"
                >
                  <span>Cerrar</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Pestañas de Categoría Fijas */}
              <div className="bg-[#F4F4F6] border-b border-[#EBEBED] px-5 md:px-8 shrink-0">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {(Object.keys(MENU_ITEMS) as Array<keyof typeof MENU_ITEMS>).map((slug) => {
                    const category = MENU_CATEGORIES.find((c) => c.slug === slug);
                    const isActive = activeCategory === slug;
                    return (
                      <button
                        key={slug}
                        onClick={() => setActiveCategory(slug)}
                        className={`px-4 py-3 text-[11px] font-['Inter'] font-medium tracking-widest uppercase whitespace-nowrap transition-all duration-300 border-b-2 cursor-pointer ${
                          isActive ? 'text-[#1A1A1A] border-[#D65A31]' : 'text-[#4A4A4A] border-transparent hover:text-[#1A1A1A]'
                        }`}
                        data-cursor="hover"
                      >
                        {category ? category.name.replace('\n', ' · ') : slug}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contenedor de Desplazamiento de Platos */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8 bg-[#EBEBED]/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {MENU_ITEMS[activeCategory].map((item) => {
                      const isSoldOut = item.available === false;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.25 }}
                          onClick={() => setSelectedItem(item)}
                          className="rounded-[6px] md:rounded-xl overflow-hidden bg-[#F4F4F6] flex flex-col cursor-pointer group relative shadow-sm hover:shadow-md transition-all duration-300"
                          data-cursor="hover"
                        >
                          <div className="w-full h-40 md:h-44 overflow-hidden relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {isSoldOut && (
                              <div className="absolute inset-0 bg-[#F4F4F6]/85 flex items-center justify-center">
                                <span className="text-xs font-['Inter'] font-semibold text-[#4A4A4A] tracking-widest uppercase">
                                  Agotado por hoy
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-4 flex flex-col gap-1.5 text-left bg-[#F4F4F6]">
                            <div className="flex justify-between items-start">
                              <h3 className="font-['Cormorant_Garamond'] font-semibold italic text-base md:text-lg text-[#1A1A1A] leading-tight">
                                {item.name}
                              </h3>
                              <span className="text-xs md:text-sm font-['Inter'] font-semibold text-[#1A1A1A] whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                            <p className="text-[11px] md:text-xs font-['Inter'] text-[#4A4A4A] leading-relaxed flex-1">
                              {item.description}
                            </p>
                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {item.tags.map((tag) => {
                                  const translatedTag = tagTranslations[tag] || tag;
                                  const isRecommended = tag === 'recommended';
                                  const isOlive = tag === 'vegan' || tag === 'vegetarian' || tag === 'vegan-option' || tag === 'opcion-vegana';
                                  return (
                                    <span
                                      key={tag}
                                      className={`px-2 py-0.5 text-[8px] font-['Inter'] tracking-widest uppercase rounded-full ${
                                        isRecommended
                                          ? 'bg-[#D65A31]/15 text-[#D65A31]'
                                          : isOlive
                                          ? 'bg-[#1E2A38]/15 text-[#1E2A38]'
                                          : 'bg-[#4A4A4A]/10 text-[#4A4A4A]'
                                      }`}
                                    >
                                      {isRecommended && '★ '}
                                      {translatedTag}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Detalle de Plato */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-[70] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-[480px] bg-[#F4F4F6] rounded-xl overflow-hidden shadow-2xl flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#F4F4F6]/80 backdrop-blur-sm border border-[#1A1A1A] rounded-[6px] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#F4F4F6] transition-colors cursor-pointer z-10"
                aria-label="Cerrar modal"
                data-cursor="hover"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-48 md:h-56 object-cover"
              />

              <div className="p-6 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-['Cormorant_Garamond'] font-semibold italic text-2xl text-[#1A1A1A]">
                    {selectedItem.name}
                  </h3>
                  <span className="text-base font-['Inter'] font-semibold text-[#1A1A1A]">
                    {selectedItem.price}
                  </span>
                </div>
                <p className="text-sm font-['Inter'] text-[#4A4A4A] leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 text-[8px] font-['Inter'] tracking-widest uppercase rounded-full ${
                        tag === 'recommended'
                          ? 'bg-[#D65A31]/15 text-[#D65A31]'
                          : 'bg-[#1E2A38]/15 text-[#1E2A38]'
                      }`}
                    >
                      {tagTranslations[tag] || tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <MagneticButton strength={0.2} className="w-full">
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        triggerToast(`Se agregó ${selectedItem.name} a tu selección.`);
                      }}
                      className="w-full py-4 bg-[#1A1A1A] text-[#F4F4F6] text-sm font-['Inter'] font-medium rounded-[6px] tracking-wide hover:bg-[#D65A31] transition-colors duration-300 cursor-pointer"
                    >
                      Agregar a mi Selección
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================================
          SECCIÓN 3 — VITRINA REPOSTERA DE HOY (100VH Exacto)
          ============================================================================ */}
      <section
        id="display-case"
        ref={s3Reveal.containerRef}
        className="h-screen w-full bg-[#EBEBED] flex flex-col justify-between px-5 md:px-8 pt-12 pb-4 md:pt-16 md:pb-6 transition-all duration-300 overflow-hidden"
      >
        {/* Encabezado */}
        <div className="text-left select-none shrink-0">
          <span className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-2 block">
            Preparado esta mañana
          </span>
          <h2
            onClick={handleHeadingClick}
            className="font-['Cormorant_Garamond'] font-semibold italic text-[clamp(2.0rem,5vw,3.5rem)] leading-[0.9] text-[#1A1A1A] mb-2 cursor-pointer md:cursor-none"
            data-cursor="hover"
          >
            Fresco en Nuestra<br />
            Vitrina de Hoy
          </h2>
          <p className="text-xs font-['Inter'] text-[#4A4A4A] max-w-md">
            Cuando se acaban, se acaban. Reserva temprano para asegurar tus especialidades favoritas.
          </p>
        </div>

        {/* Modo Staff Admin Oculto */}
        {adminMode && (
          <div className="my-2 px-4 py-2 bg-[#1A1A1A] rounded-[6px] flex items-center gap-2 animate-pulse text-left shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#D65A31]" />
            <p className="text-[11px] font-['Inter'] text-[#F4F4F6]">
              Modo administrador — toca un producto para alternar disponibilidad
            </p>
          </div>
        )}

        {/* Carrusel Horizontal (Elegante y No Verticalizable) */}
        <div className="flex-1 flex items-center my-4 overflow-hidden">
          <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 w-full">
            {displayCase.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (adminMode) {
                      setDisplayCase((prev) =>
                        prev.map((dc) => (dc.id === item.id ? { ...dc, available: !dc.available } : dc))
                      );
                      triggerToast(`Disponibilidad de ${item.name} actualizada.`);
                    }
                  }}
                  className={`flex-shrink-0 w-44 md:w-52 rounded-[6px] md:rounded-xl overflow-hidden bg-[#F4F4F6] flex flex-col relative transition-all duration-300 shadow-sm ${
                    adminMode ? 'cursor-pointer border-2 border-[#D65A31]' : ''
                  }`}
                  data-cursor={adminMode ? 'hover' : undefined}
                >
                  <div className="w-full h-36 md:h-40 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {!item.available && (
                      <div className="absolute inset-0 bg-[#F4F4F6]/75 flex flex-col items-center justify-center p-2 text-center">
                        <span className="px-2 py-1 bg-[#1A1A1A] rounded-full text-[#F4F4F6] text-[8px] font-['Inter'] tracking-widest uppercase">
                          Agotado por hoy
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="p-3 text-sm font-['Cormorant_Garamond'] font-semibold italic text-[#1A1A1A] text-left">
                    {item.name}
                  </h3>

                  {adminMode && (
                    <div className="mx-3 mb-3 text-[8px] font-['Inter'] tracking-widest uppercase text-[#D65A31] text-left font-semibold">
                      {item.available ? "Marcar agotado" : "Marcar disponible"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs de la sección */}
        <div className="flex flex-col sm:flex-row gap-3 items-start select-none shrink-0">
          <MagneticButton strength={0.3}>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-6 py-4 bg-[#1A1A1A] text-[#F4F4F6] text-sm font-['Inter'] font-medium rounded-[6px] tracking-wide hover:bg-[#D65A31] transition-colors duration-300 cursor-pointer"
            >
              Reservar una Mesa
            </button>
          </MagneticButton>
          <button
            onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-['Inter'] text-[#4A4A4A] self-start sm:self-center uppercase tracking-wider hover:text-[#1A1A1A] transition-colors p-2 cursor-pointer"
            data-cursor="hover"
          >
            O explora el menú completo ↑
          </button>
        </div>
      </section>

      {/* ============================================================================
          SECCIÓN 4 — GALERÍA Y PRUEBA SOCIAL (100VH Exacto)
          ============================================================================ */}
      <section
        id="gallery"
        ref={s4Reveal.containerRef}
        className="h-screen w-full bg-[#F4F4F6] flex flex-col px-5 md:px-8 pt-12 pb-4 md:pt-16 md:pb-6 justify-between overflow-hidden relative"
      >
        {/* Encabezado */}
        <div className="text-left select-none shrink-0" style={s4Reveal.getAnimStyle(0)}>
          <span className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-2 block">
            Momentos reales, personas reales
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-[clamp(2.0rem,5vw,3.5rem)] leading-[0.9] text-[#1A1A1A] mb-1">
            Momentos<br />
            Arsenia
          </h2>
          <div className="inline-flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-xs font-['Inter'] text-[#4A4A4A]">
              Comparte tu momento usando
            </span>
            <span className="text-xs font-['Cormorant_Garamond'] font-semibold italic text-[#D65A31]">
              #ArseniaMoments
            </span>
          </div>
        </div>

        {/* Grilla de UGC con Contenedor Desplazable */}
        <div className="flex-1 flex items-center justify-center my-2 overflow-hidden w-full">
          <div className="grid grid-cols-3 gap-1.5 md:gap-2 w-full max-w-4xl" style={s4Reveal.getAnimStyle(1)}>
            {UGC_IMAGES.map((imgUrl, i) => (
              <div
                key={i}
                className="rounded-[6px] md:rounded-xl overflow-hidden aspect-square group cursor-pointer md:cursor-none bg-[#EBEBED] shadow-sm relative"
                data-cursor="hover"
              >
                <img
                  src={imgUrl}
                  alt={`Invitado de Arsenia ${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA de Instagram */}
        <div className="flex items-center gap-4 text-left select-none shrink-0" style={s4Reveal.getAnimStyle(2)}>
          <div className="w-px h-10 bg-[#D65A31]" />
          <div>
            <p className="text-xs font-['Inter'] text-[#4A4A4A] tracking-wide">
              Síguenos para conocer especiales del día, nuevos menús y nuestra cotidianidad.
            </p>
            <p className="mt-0.5 text-xs font-['Inter'] font-semibold text-[#1A1A1A]">
              @arsenia.pe
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================================
          SECCIÓN 5 — HISTORIA Y FILOSOFÍA (100VH Con Scroll Interno)
          ============================================================================ */}
      <section
        id="story"
        ref={s5Reveal.containerRef}
        className="h-screen w-full bg-[#EBEBED] flex flex-col px-5 md:px-8 pt-12 pb-4 md:pt-16 md:pb-6 overflow-hidden relative"
      >
        <div className="flex-1 my-auto py-2 md:py-4 flex items-center overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-left w-full max-w-6xl mx-auto">
            {/* Columna Izquierda — Historia */}
            <div style={s5Reveal.getAnimStyle(0)} className="flex flex-col justify-center select-none">
              <span className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-2 block font-semibold">
                La filosofía
              </span>
              <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-[clamp(1.8rem,5vw,3.2rem)] leading-[0.9] text-[#1A1A1A] mb-3">
                Un Espacio<br />
                para Disfrutar
              </h2>
              <p className="text-xs md:text-sm font-['Inter'] text-[#4A4A4A] leading-relaxed mb-2.5 font-light">
                Arsenia nace con el propósito de fusionar la riqueza y tradición de la gastronomía peruana con la calidez del corazón de Loja. Un rincón diseñado para disfrutar de sabores auténticos sin prisas.
              </p>
              <p className="text-xs md:text-sm font-['Inter'] text-[#4A4A4A] leading-relaxed mb-2.5 font-light">
                Nuestros ceviches y platos de fondo se preparan con ingredientes de la más alta calidad, trayendo el sazón original de las costas y tierras peruanas, acompañados de cócteles de autor que celebran esta herencia culinaria única.
              </p>
              <div className="mt-2 pl-4 border-l-2 border-[#D65A31]">
                <p className="font-['Cormorant_Garamond'] font-semibold italic text-base md:text-lg text-[#1A1A1A] leading-normal">
                  "Cada plato es un viaje de sabores, preparado con el respeto y la pasión que caracterizan a nuestra cocina."
                </p>
              </div>
            </div>

            {/* Columna Derecha — Galería Revista (Oculta en móviles para evitar colapso visual) */}
            <div style={s5Reveal.getAnimStyle(1)} className="hidden md:flex flex-col gap-3 md:gap-4 justify-center">
              <div className="rounded-xl overflow-hidden h-52 lg:h-60 bg-[#F4F4F6]">
                <img
                  src={AMBIENCE_IMG1}
                  alt="Atmósfera de café filtrado lento"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3 md:gap-4 h-32 lg:h-40">
                <div className="flex-1 rounded-xl overflow-hidden bg-[#F4F4F6]">
                  <img
                    src={AMBIENCE_IMG2}
                    alt="Horneado orgánico de masa madre"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 rounded-xl overflow-hidden bg-[#F4F4F6]">
                  <img
                    src={AMBIENCE_IMG3}
                    alt="Luz cálida y rincones"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          SECCIÓN 6 — UBICACIÓN Y HORARIOS (100VH Sin Scroll)
          ============================================================================ */}
      <section
        id="visit"
        ref={s6Reveal.containerRef}
        className="h-screen w-full bg-[#1A1A1A] flex flex-col px-5 md:px-8 pt-12 pb-4 md:pt-16 md:pb-6 text-[#F4F4F6] overflow-hidden relative"
      >
        <div className="flex-1 my-auto py-2 md:py-4 flex items-center overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-left w-full max-w-6xl mx-auto">
            {/* Columna Izquierda — Información */}
            <div style={s6Reveal.getAnimStyle(0)} className="flex flex-col justify-center">
              <span className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-1.5 block font-semibold">
                Encuéntranos
              </span>
              <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.9] text-[#F4F4F6] mb-3 select-none">
                Visita Nuestro Espacio
              </h2>
 
              {/* Distintivo de Estado Abierto/Cerrado */}
              <div className="inline-flex items-center gap-2 mb-3 select-none bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/10 shrink-0">
                <span className={`w-2 h-2 rounded-full ${liveStatus.isOpen ? 'bg-[#1E2A38] animate-pulse' : 'bg-[#D65A31]'}`} />
                <span className="text-[10px] font-['Inter'] font-medium text-[#F4F4F6]/85">
                  {liveStatus.isOpen
                    ? `Abierto ahora · Cerramos a las ${liveStatus.closingTime}`
                    : 'Cerrado · Abrimos a las 8:00 AM'}
                </span>
              </div>
 
              {/* Dirección y Horarios */}
              <div className="text-xs font-['Inter'] text-[#F4F4F6]/70 leading-relaxed mb-4 select-none">
                <p className="font-semibold text-[#F4F4F6] mb-1.5 text-xs md:text-sm">Calle Bolívar s/n (Centro Histórico) · Loja, Ecuador</p>
                <div className="flex flex-col gap-1 text-xs max-w-xs mt-2">
                  <div className="flex justify-between border-b border-white/5 pb-0.5">
                    <span>Lunes a Viernes:</span>
                    <span className="text-[#F4F4F6]">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-0.5">
                    <span>Sábado y Domingo:</span>
                    <span className="text-[#F4F4F6]">8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
 
              {/* Botones de Acción */}
              <div className="flex flex-wrap gap-2">
                <MagneticButton strength={0.2}>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#F4F4F6] text-[#1A1A1A] text-[10px] font-['Inter'] font-semibold rounded-[6px] tracking-wide hover:bg-[#D65A31] hover:text-[#F4F4F6] transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Cómo llegar en Google Maps</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <a
                    href="tel:+5937123456"
                    className="px-4 py-2.5 border border-[#F4F4F6]/30 text-[#F4F4F6] text-[10px] font-['Inter'] font-medium rounded-[6px] tracking-wide hover:border-[#F4F4F6] transition-colors duration-300 cursor-pointer"
                  >
                    +593 7 123 4567
                  </a>
                </MagneticButton>
              </div>
            </div>
 
            {/* Columna Derecha — Mapa Abstracto/Estilizado (Perfectamente dimensionado) */}
            <div style={s6Reveal.getAnimStyle(1)} className="flex flex-col justify-center">
              <div className="rounded-[6px] md:rounded-xl overflow-hidden min-h-[160px] md:min-h-[220px] bg-[#4A4A4A]/20 flex flex-col items-center justify-center p-4 text-center select-none border border-white/10 relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${SECTION3_BG})` }} />
                <div className="relative z-10">
                  <svg className="mx-auto mb-2 text-[#D65A31]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 0 0-10 10c0 5.25 10 10 10 10s10-4.75 10-10A10 10 0 0 0 12 2z" />
                    <ellipse cx="12" cy="12" rx="3" ry="3" />
                  </svg>
                  <p className="text-[9px] font-['Inter'] text-[#F4F4F6]/60 tracking-widest uppercase mb-0.5">
                    Mapa de Nuestro Espacio
                  </p>
                  <p className="text-[8px] md:text-[9px] font-['Inter'] text-[#F4F4F6]/40 leading-relaxed max-w-xs mx-auto">
                    Intersección Bolívar y Mercadillo, Loja. Un rincón pacífico y acogedor dentro del centro histórico lojano.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          SECCIÓN 7 — FOOTER / CIERRE (100VH Con Scroll Interno)
          ============================================================================ */}
      <footer className="h-screen w-full bg-[#F4F4F6] border-t border-[#EBEBED] px-5 md:px-8 pt-12 pb-4 md:pt-16 md:pb-6 flex flex-col justify-between overflow-hidden relative">
        <div className="flex-1 flex items-center justify-center py-2 md:py-4 overflow-hidden">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-left">
            {/* Columna 1 — Marca y Redes */}
            <div className="flex flex-col gap-3 select-none">
              <div className="flex items-center gap-3">
                <img
                  src="https://res.cloudinary.com/du3y0n9fx/image/upload/v1782778847/arsenialogo.jpg"
                  alt="Arsenia Logo"
                  className="w-10 h-10 rounded-full object-cover border border-[#1A1A1A]/10"
                  referrerPolicy="no-referrer"
                />
                <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-2xl text-[#1A1A1A]">
                  Arsenia
                </h2>
              </div>
              <p className="text-xs font-['Inter'] text-[#4A4A4A] italic leading-relaxed max-w-[240px]">
                "La riqueza de la gastronomía peruana en Loja."
              </p>
              {/* Iconos de Redes Sociales */}
              <div className="flex gap-2.5 mt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-[#1A1A1A]/15 rounded-[6px] flex items-center justify-center hover:border-[#D65A31] transition-colors duration-300 cursor-pointer text-[#1A1A1A]"
                  aria-label="Instagram"
                  data-cursor="hover"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-[#1A1A1A]/15 rounded-[6px] flex items-center justify-center hover:border-[#D65A31] transition-colors duration-300 cursor-pointer text-[#1A1A1A]"
                  aria-label="TikTok"
                  data-cursor="hover"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Columna 2 — Navegación */}
            <div className="flex flex-col text-left select-none">
              <h3 className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-3 font-semibold">
                Navegar
              </h3>
              <div className="grid grid-cols-1 gap-y-2 max-w-[140px]">
                {[
                  { name: 'Nuestro Menú', target: 'Menú' },
                  { name: 'Vitrina de Hoy', target: 'Vitrina' },
                  { name: 'Nuestra Historia', target: 'Historia' },
                  { name: 'Reservar Mesa', target: 'Reservar' },
                  { name: 'Política de Privacidad', target: 'Inicio' }
                ].map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.target)}
                    className="text-left text-xs font-['Inter'] text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors relative group w-fit cursor-pointer"
                    data-cursor="hover"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D65A31] group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Columna 3 — Suscripción al Boletín */}
            <div className="flex flex-col text-left">
              <h3 className="text-[10px] font-['Inter'] text-[#1E2A38] tracking-widest uppercase mb-2 font-semibold select-none">
                Únete al club Arsenia
              </h3>
              <p className="text-xs font-['Inter'] text-[#4A4A4A] mb-4 font-light select-none leading-relaxed">
                Recibe noticias de nuestros platos de temporada, degustaciones exclusivas y eventos especiales.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 border-b border-[#4A4A4A]/30 bg-transparent py-2 text-xs text-[#1A1A1A] font-['Inter'] placeholder:text-[#4A4A4A]/50 focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-[#F4F4F6] text-xs font-['Inter'] font-medium rounded-[6px] hover:bg-[#D65A31] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                  data-cursor="hover"
                >
                  Unirse
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Derechos de autor y Créditos finales */}
        <div className="max-w-6xl mx-auto w-full mt-6 pt-5 border-t border-[#EBEBED] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-['Inter'] text-[#4A4A4A]/60 select-none shrink-0">
          <p>© {new Date().getFullYear()} Arsenia · Gastronomía Peruana · Loja, Ecuador</p>
          <p>Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
