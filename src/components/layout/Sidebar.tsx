import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { navigation } from "../../config/navigation";
import type { NavItem } from "../../types";
import logoFull from "../../../logo.png";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

function NavItemRow({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const location = useLocation();
  const isChildActive = item.children?.some(
    (c) => location.pathname === c.path,
  );
  const [open, setOpen] = useState(
    () => item.children?.some((c) => location.pathname === c.path) ?? false,
  );
  const Icon = item.icon;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={clsx(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
            isChildActive
              ? "bg-orange-50 text-orange-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
          )}
        >
          <Icon
            className={clsx(
              "w-4 h-4 shrink-0",
              isChildActive
                ? "text-orange-500"
                : "text-gray-400 group-hover:text-gray-600",
            )}
          />
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              {open ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </>
          )}
        </button>
        {!collapsed && open && (
          <div className="ml-6 mt-0.5 space-y-0.5 border-l border-gray-100 pl-3">
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  clsx(
                    "block px-2 py-1.5 rounded-md text-xs font-medium transition-colors truncate",
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path!}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={clsx(
              "w-4 h-4 shrink-0",
              isActive
                ? "text-orange-500"
                : "text-gray-400 group-hover:text-gray-600",
            )}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, onToggle }: Props) {
  return (
    <aside
      className={clsx(
        "h-screen bg-white border-r border-gray-100 flex flex-col shrink-0 transition-all duration-200",
        collapsed ? "w-14" : "w-56",
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-gray-100 shrink-0">
        {!collapsed && (
          <>
            <img
              src={logoFull}
              alt="Fusion CRM"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-500 transition-colors shrink-0"
              title="Collapse sidebar"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </>
        )}
        {collapsed && (
          <img
            src={logoFull}
            alt="Fusion CRM"
            className="h-7 w-7 object-contain mx-auto"
          />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navigation.map((group, gi) => (
          <div key={gi}>
            {group.group && !collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {group.group}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItemRow
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle at bottom */}
      {collapsed && (
        <div className="p-2 border-t border-gray-100">
          <button
            onClick={onToggle}
            className="w-full py-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-500 flex items-center justify-center transition-colors"
            title="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
}
