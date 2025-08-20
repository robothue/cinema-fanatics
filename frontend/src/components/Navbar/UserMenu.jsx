import { useAuth } from "../../Context/AuthContext";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { user, logout } = useAuth();

  // ✅ Get profile picture or fallback
  const avatar = user?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}`;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>

        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <a
                href="/profile"
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Profile
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={logout}
                className={`w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Logout
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
