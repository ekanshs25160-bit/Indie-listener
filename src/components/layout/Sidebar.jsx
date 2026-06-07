import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Sparkles, Library } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
    { path: "/curated", label: "Curated", icon: Sparkles },
    { path: "/library", label: "Library", icon: Library },
  ];
  return (
    <aside className="w-64 h-screen bg-[#131313] border-r border-neutral-800/60 p-6 flex flex-col justify-between sticky top-0 select-none">
      <div>
        <div className="mb-10 pl-2 gap-4">
          <h1 className="text-emerald-400 font-mono text-sm font-bold tracking-wider">
            Gay Listens
          </h1>
          <p className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase mt-1">
            Audiophile Fantasy
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between pl-4 pr-3 py-3 rounded-lg font-medium text-sm transition-all group relative ${
                      isActive
                        ? "bg-neutral-800/40 text-emerald-400"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-4">
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-emerald-400"
                              : "text-neutral-400 group-hover:text-neutral-200 transition-colors"
                          }
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-emerald-400 rounded-l-md" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
