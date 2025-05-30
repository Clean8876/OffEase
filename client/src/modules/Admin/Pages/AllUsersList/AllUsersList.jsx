// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   HeaderRow,
//   Title,
//   TableWrapper,
//   StyledTable,
//   TableHead,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   DepartmentFilter,
//   SecondHero,
//   SearchWrapper,
//   SearchIcon,
//   SearchInput,
//   ModalOverlay,
//   ModalContent,
//   ModalTitle,
//   ModalButtons,
//   CancelButton,
//   DeleteButton,
// } from "./AllUsersList.styles";
// import { CiSearch } from "react-icons/ci";
// import { Select } from "antd";
// import { getAllUsers } from "../../../../api/AuthApi";
// import { deleteEmployeeById } from "../../../../api/AuthApi";
// import { Pagination } from "antd";
// import { Table } from "lucide-react";
// import { MdDeleteOutline } from "react-icons/md";
// import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Simple modal component to show image popup
// function ImageModal({ isOpen, imageUrl, onClose }) {


//   if (!isOpen) return null;
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0, left: 0, right: 0, bottom: 0,
//         backgroundColor: "rgba(0,0,0,0.6)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 1000,
//       }}
//       onClick={onClose}
//     >
//       <div
//         style={{
//           position: "relative",
//           background: "#fff",
//           padding: 20,
//           borderRadius: 8,
//           maxWidth: "90vw",
//           maxHeight: "90vh",
//         }}
//         onClick={(e) => e.stopPropagation()} // prevent modal close on image click
//       >
//         <img
//           src={imageUrl}
//           alt="Profile"
//           style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }}
//         />
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             background: "red",
//             color: "#fff",
//             border: "none",
//             borderRadius: "50%",
//             width: 30,
//             height: 30,
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontSize: 16,
//             lineHeight: 1,
//           }}
//           aria-label="Close modal"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }

// const ITEMS_PER_PAGE = 10;

// export default function AllUsersList() {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [totalEntries, setTotalEntries] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [employeeToDelete, setEmployeeToDelete] = useState(null);

//   // New state to manage image modal
//   const [modalImageUrl, setModalImageUrl] = useState(null);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);

//   // Format date helper
//   const formatToIST = (isoString) => {
//     if (!isoString) return "-";
//     const date = new Date(isoString);
//     return new Intl.DateTimeFormat("en-IN", {
//       timeZone: "Asia/Kolkata",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }).format(date);
//   };

//   // Unique department options
//   const departmentOptions = [
//     { value: "all", label: "All Departments" },
//     ...Array.from(new Set(data.map((item) => item.department).filter(Boolean)))
//       .map((dept) => ({ value: dept, label: dept })),
//   ];
//   // Open image modal
//   const openImageModal = (imageUrl) => {
//     setModalImageUrl(imageUrl);
//     setIsImageModalOpen(true);
//   };

//   // Close image modal
//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//     setModalImageUrl(null);
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   // Fetch data once on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getAllUsers();
//         console.log("Fetched Users Data:", response);

//         const users = Array.isArray(response) ? response : response.data?.data || [];
//         const employeesOnly = users.filter((user) => user.role === "employee");

//         console.log("Employees Only:", employeesOnly);
//         setData(employeesOnly);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);


//   // Reset page to 1 when filter/search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchText, selectedDepartment]);

//   // Filter and paginate data whenever dependencies change
//   useEffect(() => {
//     let processedData = [...data];

//     if (selectedDepartment !== "all") {
//       processedData = processedData.filter(
//         (item) => item.department === selectedDepartment
//       );
//     }

//     if (searchText.trim() !== "") {
//       processedData = processedData.filter((item) => {
//         const fullName = `${item.Firstname ?? ""} ${item.Lastname ?? ""}`.toLowerCase();
//         return fullName.includes(searchText.toLowerCase());
//       });
//     }

//     const total = processedData.length;
//     const pages = Math.ceil(total / ITEMS_PER_PAGE);
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;
//     const items = processedData.slice(start, end);

//     setFilteredData(processedData);
//     setTotalEntries(total);
//     setTotalPages(pages);
//     setCurrentItems(items);
//   }, [data, searchText, selectedDepartment, currentPage]);


//   const handleImageClick = (e) => {
//     e.preventDefault(); // Prevent default link behavior
//     openImageModal(e.currentTarget.href); // Open modal with image URL
//   }

//   const handleDeleteClick = (employeeId) => {
//     setEmployeeToDelete(employeeId);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteEmployeeById(employeeToDelete);
//       const updatedData = data.filter((user) => user._id !== employeeToDelete);
//       setData(updatedData);
//       setShowDeleteModal(false);
//       setEmployeeToDelete(null);
//       toast.success("Employee deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete employee:", error);
//       alert("Error deleting employee.");
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setEmployeeToDelete(null);
//   };

//   return (
//     <>
//       <Container>

//         <ToastContainer position="top-center" autoClose={3000} />
//         <HeaderRow>
//           <Title>
//             All Users{" "}
//             <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
//               ({currentItems.length}/{totalEntries})
//             </span>
//           </Title>
//         </HeaderRow>

//         <SecondHero>
//           <SearchWrapper>
//             <SearchIcon>
//               <CiSearch size={18} />
//             </SearchIcon>
//             <SearchInput
//               placeholder="Search by name"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </SearchWrapper>
//           <DepartmentFilter>
//             <Select
//               style={{ width: 180 }}
//               value={selectedDepartment}
//               onChange={setSelectedDepartment}
//               options={departmentOptions}
//             />
//           </DepartmentFilter>
//         </SecondHero>

//         <TableWrapper>
//           <StyledTable>
//             <TableHead>
//               <TableRow>
//                 <TableHeader>Full Name</TableHeader>
//                 <TableHeader>Department</TableHeader>
//                 <TableHeader>Email</TableHeader>
//                 <TableHeader>Date Of Birth</TableHeader>
//                 <TableHeader>Profile Picture</TableHeader>
//                 <TableHeader>Actions</TableHeader>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentItems.map((item, index) => (
//                 <TableRow key={item._id ?? index}>
//                   <TableCell>
//                     {item.Firstname} {item.Lastname}
//                   </TableCell>
//                   <TableCell>{item.department || "-"}</TableCell>
//                   <TableCell>{item.email || "-"}</TableCell>
//                   <TableCell>{formatToIST(item.dob)}</TableCell>
//                   <TableCell>
//                     {item.profilePictureUrl ? (
//                       <a
//                         href={item.profilePictureUrl}
//                         onClick={handleImageClick}
//                         style={{ textDecoration: "none", color: "#007bff", cursor: "pointer" }}
//                       >
//                         view
//                       </a>
//                     ) : (
//                       "-"
//                     )}
//                   </TableCell>

//                   <TableCell
//                     style={{ cursor: "pointer", color: "red", fontSize: 20 }}
//                     onClick={() => handleDeleteClick(item._id)}
//                   >
//                     <MdDeleteOutline />
//                   </TableCell>

//                 </TableRow>
//               ))}
//             </TableBody>
//           </StyledTable>
//         </TableWrapper>


//         <div style={{ margin: "1rem 0", display: "flex", justifyContent: "flex-end" }}>
//           <Pagination
//             current={currentPage}
//             pageSize={ITEMS_PER_PAGE}
//             total={totalEntries}
//             onChange={(page) => setCurrentPage(page)}
//             showSizeChanger={false}
//           />
//         </div>

//       </Container>

//       {/* Image Modal */}
//       <ImageModal
//         isOpen={isImageModalOpen}
//         imageUrl={modalImageUrl}
//         onClose={closeImageModal}
//       />

//       {showDeleteModal && (
//         <ModalOverlay>
//           <ModalContent>
//             <ModalTitle>Are you sure you want to delete this employee?</ModalTitle>
//             {/* <p>Are you sure you want to delete this employee?</p> */}
//             <ModalButtons>
//               <CancelButton onClick={cancelDelete}>Cancel</CancelButton>
//               <DeleteButton onClick={confirmDelete}>Delete</DeleteButton>
//             </ModalButtons>
//           </ModalContent>
//         </ModalOverlay>
//       )}

//     </>
//   );
// }
import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Trash2, User, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Mock API calls
const mockUsers = Array.from({ length: 45 }, (_, i) => ({
  id: `user-${i + 1}`,
  firstName: `User${i + 1}`,
  lastName: `Last${i + 1}`,
  department: i % 5 === 0 ? "Marketing" : 
              i % 5 === 1 ? "Engineering" : 
              i % 5 === 2 ? "Sales" : 
              i % 5 === 3 ? "HR" : "Finance",
  email: `user${i + 1}@company.com`,
  dob: new Date(1990 + (i % 20), i % 12, i % 28 + 1).toISOString(),
  profilePictureUrl: `https://picsum.photos/200/200?random=${i}`,
  role: "employee"
}));

const getAllUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { data: mockUsers } });
    }, 800);
  });
};

const deleteEmployeeById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

const ITEMS_PER_PAGE = 10;

export default function AllUsersList() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatToIST = (isoString) => {
    if (!isoString) return "-";
    return format(new Date(isoString), 'dd MMM yyyy');
  };

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Sales", label: "Sales" },
    { value: "HR", label: "Human Resources" },
    { value: "Finance", label: "Finance" },
  ];

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageUrl(null);
  };

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllUsers();
      const users = Array.isArray(response.data.data) 
        ? response.data.data 
        : [];
      const employeesOnly = users.filter(user => user.role === "employee");
      setData(employeesOnly);
    } catch (error) {
      toast.error("Failed to fetch users", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedDepartment]);

  useEffect(() => {
    let processedData = [...data];

    if (selectedDepartment !== "all") {
      processedData = processedData.filter(
        item => item.department === selectedDepartment
      );
    }

    if (searchText.trim() !== "") {
      processedData = processedData.filter(item => {
        const fullName = `${item.firstName ?? ""} ${item.lastName ?? ""}`.toLowerCase();
        return fullName.includes(searchText.toLowerCase());
      });
    }

    const total = processedData.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = processedData.slice(start, end);

    setFilteredData(processedData);
    setTotalEntries(total);
    setTotalPages(pages);
    setCurrentItems(items);
  }, [data, searchText, selectedDepartment, currentPage]);

  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    
    try {
      await deleteEmployeeById(employeeToDelete);
      const updatedData = data.filter(user => user.id !== employeeToDelete);
      setData(updatedData);
      toast.success("Employee deleted successfully", {
        description: "The employee record has been permanently removed.",
      });
    } catch (error) {
      toast.error("Failed to delete employee", {
        description: error.message || "Please try again.",
      });
    } finally {
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-40" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
            <p className="text-sm text-gray-500 mt-2">
              {isLoading ? (
                <Skeleton className="h-4 w-48" />
              ) : (
                `Showing ${currentItems.length} of ${totalEntries} employees`
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name..."
              className="pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Full Name</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Date of Birth</TableHead>
                <TableHead className="font-semibold">Profile</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                renderSkeletonRows()
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {item.firstName} {item.lastName}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.department || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.email || "-"}</TableCell>
                    <TableCell>{formatToIST(item.dob)}</TableCell>
                    <TableCell>
                      {item.profilePictureUrl ? (
                        <Button 
                          variant="link" 
                          className="text-blue-600 p-0 h-auto"
                          onClick={() => openImageModal(item.profilePictureUrl)}
                        >
                          View
                        </Button>
                      ) : (
                        <div className="flex items-center text-gray-400">
                          <User className="h-4 w-4 mr-1" />
                          No image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <User className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">
                        No employees found
                      </h3>
                      <p className="text-gray-500 mt-1">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={pageNum === currentPage}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </motion.div>

      {/* Image Preview Dialog */}
      <Dialog open={isImageModalOpen} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
          <div className="relative">
            {modalImageUrl && (
              <img 
                src={modalImageUrl} 
                alt="Profile" 
                className="rounded-lg max-h-[80vh] w-full object-contain"
              />
            )}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 rounded-full bg-gray-800/50 hover:bg-gray-800 text-white"
              onClick={closeImageModal}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone and will permanently remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-[#159AFF] hover:bg-[#1288e6]"
            >
              Delete Employee
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}