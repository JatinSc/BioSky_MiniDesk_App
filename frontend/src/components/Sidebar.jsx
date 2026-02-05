import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, label, icon, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          8
        </div>
        <span className="text-xl font-bold text-gray-900">Helpdesk</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavItem
          to="/tickets"
          label="Tickets"
          active={location.pathname.startsWith("/tickets")}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          }
        />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
             {/* Placeholder for avatar */}
             <img src="https://ui-avatars.com/api/?name=Help+Desk&background=random" alt="User" className="w-full h-full rounded-full" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-900 truncate">
              Help Desk
            </p>
            <p className="text-xs text-gray-500 truncate">@Hdesk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
