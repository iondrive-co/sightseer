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

  return (
    <div className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Link to="/" className="sidebar-home-link">
        <img src="/favicon.ico" alt="Home" />
      </Link>
      <Link to="/Chad" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Chad
      </Link>
      <Link to="/exobase/Exobase" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Exobase
      </Link>
      <Link to="/Links" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Links
      </Link>
      <Link to="/Meta" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Meta
      </Link>
      <Link to="/Recipes" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Recipes
      </Link>
      <Link to="/Reviews" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Reviews
      </Link>
      <Link to="/Solar" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Solar
      </Link>
      <Link to="/Winnow" className="text-xl underline cursor-pointer sidebar-link" onClick={handleNavClick}>
        Winnow
      </Link>
      <div
        className="sidebar-handle"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}
