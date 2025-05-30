// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import {
//   SidebarContainer,
//   SidebarTitle,
//   MenuList,
//   StyledNavLink,
//   HamburgerIcon,
//   Backdrop,
// } from "./AdminSidebar.styles";

// const AdminSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Flat list of all menu items combined
//   const menuItems = [
//     { path: "/admin", label: "Dashboard" },
//     { path: "/admin/all-users", label: "All Users" },
//     { path: "/admin/leave-management", label: "Leave Management" },
//     { path: "/admin/event-mamgement", label: "Event Management" },
//     { path: "/admin/balance-sheet", label: "Balance Sheet" },
//   ];

//   return (
//     <>
//       <HamburgerIcon onClick={toggleSidebar}>
//         <FaBars size={24} />
//       </HamburgerIcon>

//       <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />

//       <SidebarContainer isOpen={isOpen}>
//         <SidebarTitle>OffEase</SidebarTitle>
//         <MenuList>
//           {menuItems.map(({ path, label }, index) => (
//             <StyledNavLink
//               to={path}
//               key={index}
//               onClick={() => setIsOpen(false)}
//               end={path === "/admin"}
//               $isDropdownChild={false}
//             >
//               {label}
//             </StyledNavLink>
//           ))}
//         </MenuList>
//       </SidebarContainer>
//     </>
//   );
// };

// export default AdminSidebar;



import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  
} from "../ui/sheet";
import { Button } from "@/components/ui/button"


import { 
  LayoutDashboard,
  Users,
  CalendarDays,
  CalendarCheck2,
  BarChart4,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/all-users", label: "All Users", icon: Users },
    { path: "/admin/leave-management", label: "Leave Management", icon: CalendarDays },
    { path: "/admin/event-management", label: "Event Management", icon: CalendarCheck2 },
    { path: "/admin/balance-sheet", label: "Leave Entries", icon: BarChart4 },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full bg-[#5F259F] text-white hover:bg-[#4a1d7c]"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-white border-r">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h1 className="text-2xl font-bold text-[#5F259F]">OffEase</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    to={item.path}
                    key={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all",
                      isActive 
                        ? "bg-[#5F259F]/10 text-[#5F259F] font-medium" 
                        : "hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <div className="flex items-center justify-center h-16 px-4 border-b">
          <h1 className="text-2xl font-bold text-[#5F259F]">OffEase</h1>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                to={item.path}
                key={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all",
                  isActive 
                    ? "bg-[#5F259F]/10 text-[#5F259F] font-medium" 
                    : "hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      
      </div>
    </>
  );
};

export default AdminSidebar;