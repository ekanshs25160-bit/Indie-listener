import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Search,
  Clock, 
  Users, 
  Download,
  Smile,
  Library as LibraryIcon,
  Heart,
  Music2,
  ListMusic
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
    { path: "/recents", label: "Recents", icon: Clock },
    { path: "/followed", label: "Followed artists", icon: Users },
    { path: "/downloaded", label: "Downloaded", icon: Download },
  ];

  const libraryItems = [
    { label: "Liked Songs", desc: "Playlist • 874 songs", icon: Heart, bg: "bg-indigo-500", active: false },
    { label: "Chill Vibes", desc: "Playlist • Nick", icon: ListMusic, bg: "bg-purple-100 text-purple-600", active: false },
  ];

  return (
    <aside className="w-[280px] h-full flex flex-col gap-4 sticky top-0 select-none overflow-y-auto hidden-scrollbar pb-24">
      {/* Top Nav Block */}
      <div className="bg-[#1a1a1a] rounded-[1.5rem] p-4 flex flex-col gap-4 shadow-xl border border-white/5">
        

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all group ${
                    isActive || item.path === '/' // Home is active in mock
                      ? "bg-[#2a2a2a] text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon
                  size={20}
                  className={item.path === '/' ? "text-white" : "text-neutral-400 group-hover:text-white"}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      
      {/* Library Block */}
      <div className="bg-[#1a1a1a] rounded-[1.5rem] p-4 flex flex-col flex-1 shadow-xl border border-white/5 min-h-0">
        <div className="flex items-center justify-between px-3 py-2 mb-2">
          <div className="flex items-center gap-3 text-neutral-400 font-medium hover:text-white transition-colors cursor-pointer">
            <LibraryIcon size={20} />
            <span className="text-sm">Library</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-neutral-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>
          </button>
        </div>

        <div className="space-y-1 overflow-y-auto scrollbar-hide flex-1">
          {libraryItems.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                item.active ? "bg-[#2a2a2a]" : "hover:bg-white/5"
              }`}
            >
              {item.image ? (
                <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              ) : (
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bg}`}>
                  <item.icon size={20} className={item.bg.includes('text-') ? "" : "text-white"} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${item.active ? "text-white" : "text-neutral-200"}`}>{item.label}</p>
                <p className="text-xs text-neutral-500 truncate flex items-center gap-1">
                  {item.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  {item.desc}
                </p>
              </div>
              {item.active && <Music2 size={14} className="text-emerald-500 mr-2" />}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
