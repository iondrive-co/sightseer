import {Link, useLocation} from "react-router";
import {useState, useEffect, useCallback, useRef} from "react";

function getSidebarWidth(collapsed: boolean) {
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  if (collapsed) return isMobile ? '48px' : '48px';
  return isMobile ? '64px' : '96px';
}

function setSidebarWidth(collapsed: boolean) {
  document.documentElement.style.setProperty('--sidebar-width', getSidebarWidth(collapsed));
}

export default function Sidebar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [collapsed, setCollapsed] = useState(!isHome);
  const dragRef = useRef<{startX: number; wasCollapsed: boolean} | null>(null);

  const updateCollapsed = useCallback((value: boolean) => {
    setCollapsed(value);
    setSidebarWidth(value);
  }, []);

  // Auto-collapse/expand on navigation
  useEffect(() => {
    updateCollapsed(!isHome);
  }, [isHome, updateCollapsed]);

  // Sync on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setSidebarWidth(collapsed);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {startX: e.clientX, wasCollapsed: collapsed};
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const threshold = 40;
    if (dragRef.current.wasCollapsed && dx > threshold) {
      updateCollapsed(false);
      dragRef.current = null;
    } else if (!dragRef.current.wasCollapsed && dx < -threshold) {
      updateCollapsed(true);
      dragRef.current = null;
    }
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleNavClick = () => {
    if (!collapsed) updateCollapsed(true);
  };

  const navLinks = [
    { to: "/Chad", label: "Chad" },
    { to: "/exobase/Exobase", label: "Exobase" },
    { to: "/Links", label: "Links" },
    { to: "/Holons", label: "Holons" },
    { to: "/Meta", label: "Meta" },
    { to: "/Recipes", label: "Recipes" },
    { to: "/Reviews", label: "Reviews" },
    { to: "/Solar", label: "Solar" },
    { to: "/Winnow", label: "Winnow" },
  ];

  return (
    <nav className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`} aria-label="Site navigation">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Link to="/" className="sidebar-home-link" aria-label="Home">
        <img src="/favicon.ico" alt="" aria-hidden="true" />
      </Link>
      <ul className="sidebar-nav-list">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className="sidebar-handle"
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            updateCollapsed(!collapsed);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </nav>
  );
}
