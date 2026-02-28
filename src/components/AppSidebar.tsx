import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface AppSidebarProps {
  navItems: NavItem[];
}

function LogoMark() {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-2 w-2 bg-foreground" />
      ))}
    </div>
  );
}

export function AppSidebar({ navItems }: AppSidebarProps) {
  const { id, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 border-r border-border bg-background flex flex-col z-10">
      <div className="px-5 pt-5 pb-4 mb-4 border-b border-secondary">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-display text-base text-foreground">AdaptLab</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-3 py-2 transition-colors duration-150 ${
                isActive
                  ? "text-foreground font-medium bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`
            }
          >
            <item.icon size={15} strokeWidth={1.5} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-5 pb-5 pt-4 border-t border-secondary">
        <div className="text-xs text-muted-foreground truncate mb-2">{id}</div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground p-0 h-auto" onClick={logout}>
          <LogOut size={12} strokeWidth={1.5} className="mr-1" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
