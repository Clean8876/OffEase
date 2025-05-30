// import React from "react";
// import {
//   HeaderContainer,
//   Title,
//   UserInfoWrapper,
//   UserDetails,
//   UserName,
//   UserEmail,
//   LogoutIconWrapper
// } from "./AdminHeader.styles";
// import { FiLogOut } from "react-icons/fi"; // logout icon
// import { useNavigate } from "react-router-dom";
// import {logout} from '../../api/AuthApi'

// const AdminHeader = () => {
//   const navigate = useNavigate();

// const handleLogout = async () => {
//   try {
//     const response = await logout(); // response is { message: 'Logout successful' }
//     console.log(response.message); // ✅ correct usage

//     localStorage.clear(); 
//     alert("Logged out successfully");
//     navigate("/"); 
//   } catch (err) {
//     console.error("Logout failed:", err.message || err);
//   }
// };


//   return (
//     <HeaderContainer>
//       <Title></Title>
//       <UserInfoWrapper>
//         <UserDetails>
//           <UserName>Admin</UserName>
//           <UserEmail>Admin@mail.com</UserEmail>
//         </UserDetails>
//         <LogoutIconWrapper onClick={handleLogout} title="Logout">
//           <FiLogOut size={24} />
//         </LogoutIconWrapper>
//       </UserInfoWrapper>
//     </HeaderContainer>
//   );
// };

// export default AdminHeader;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../api/AuthApi';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.message || err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo/Title - Using primary color */}
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-[#5F259F]">
            Admin Panel
          </span>
        </div>

        {/* User Info Section */}
        <div className="flex items-center gap-4">
          {/* Desktop View */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500 truncate max-w-[160px]">
                Admin@mail.com
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              className="bg-[#159AFF] hover:bg-[#1285e0] text-white"
              size="sm"
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full border-gray-300"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#5F259F] text-white">
                    A
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-gray-500">
                    Admin@mail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <FiLogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;