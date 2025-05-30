// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   HeaderRow,
//   Title,
//   SortByContainer,
//   SortLabel,
//   TableWrapper,
//   StyledTable,
//   TableHead,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   ActionsContainer,
//   DepartmentFilter,
//   SecondHero,
//   SearchWrapper,
//   SearchIcon,
//   SearchInput,
// } from "./LeaveManagement.styles";
// import { CiSearch } from "react-icons/ci";
// import { IoEyeOutline } from "react-icons/io5";
// import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
// import { getAllLeaves } from "../../../../api/LeaveRequestApi";
// import { Pagination } from "antd";

// const ITEMS_PER_PAGE = 10;

// export default function LeaveManagement() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [sortOption, setSortOption] = useState("all");
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [totalEntries, setTotalEntries] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   const formatToIST = (isoString) => {
//     const date = new Date(isoString);
//     return new Intl.DateTimeFormat("en-IN", {
//       timeZone: "Asia/Kolkata",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }).format(date);
//   };

//   const departmentOptions = [
//     { value: "all", label: "All Departments" },
//     ...Array.from(
//       new Set(data.map((item) => item.employee?.department).filter(Boolean))
//     ).map((dept) => ({ value: dept, label: dept })),
//   ];

//   // Change handleView to navigate to leave details page
// const handleView = (leave) => {
//   navigate(`/admin/leave-management/leave-details/${leave._id}`);
// };

// useEffect(() => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }, [currentPage]);


//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const response = await getAllLeaves();
//         setData(response);
//       } catch (error) {
//         console.error("Error fetching leave data:", error);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   useEffect(() => {
//     let processedData = [...data];

//     if (sortOption !== "all") {
//       processedData = processedData.filter(
//         (item) => item.leaveType?.name?.toLowerCase() === sortOption.toLowerCase()
//       );
//     }

//     if (selectedDepartment !== "all") {
//       processedData = processedData.filter(
//         (item) => item.employee?.department === selectedDepartment
//       );
//     }

//     if (searchText) {
//       processedData = processedData.filter(
//         (item) =>
//           item.employee?.Firstname?.toLowerCase().includes(searchText.toLowerCase()) ||
//           item.employee?.Lastname?.toLowerCase().includes(searchText.toLowerCase())
//       );
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
//   }, [data, sortOption, searchText, selectedDepartment, currentPage]);

//   return (
//     <Container>
//       <HeaderRow>
//         <Title>
//           Leave Approval List{" "}
//           <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
//             ({currentItems.length}/{totalEntries})
//           </span>
//         </Title>
//         <SortByContainer>
//           <SortLabel>Sort by:</SortLabel>
//           <Select
//             defaultValue={sortOption}
//             style={{ width: 120 }}
//             onChange={(value) => {
//               setSortOption(value);
//               setCurrentPage(1);
//             }}
//             options={[
//               { value: "all", label: "All" },
//               { value: "casual", label: "Casual" },
//               { value: "sick", label: "Sick" },
//             ]}
//           />
//         </SortByContainer>
//       </HeaderRow>

//       <SecondHero>
//         <SearchWrapper>
//           <SearchIcon>
//             <CiSearch size={18} />
//           </SearchIcon>
//           <SearchInput
//             placeholder="Search by name"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </SearchWrapper>
//         <DepartmentFilter>
//           <Select
//             style={{ width: 180 }}
//             value={selectedDepartment}
//             onChange={(value) => {
//               setSelectedDepartment(value);
//               setCurrentPage(1);
//             }}
//             options={departmentOptions}
//           />
//         </DepartmentFilter>
//       </SecondHero>

//       <TableWrapper>
//         <StyledTable>
//           <TableHead>
//             <TableRow>
//               <TableHeader>Full Name</TableHeader>
//               <TableHeader>Department</TableHeader>
//               <TableHeader>Leave Type</TableHeader>
//               <TableHeader>Start Date</TableHeader>
//               <TableHeader>End Date</TableHeader>
//               <TableHeader>Reason</TableHeader>
//               <TableHeader>Actions</TableHeader>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentItems.map((item) => (
//               <TableRow key={item._id || Math.random()}>
//                 <TableCell>
//                   {item.employee?.Firstname || "N/A"} {item.employee?.Lastname || ""}
//                 </TableCell>
//                 <TableCell>{item.employee?.department || "N/A"}</TableCell>
//                 <TableCell>{item.leaveType?.name || "N/A"}</TableCell>
//                 <TableCell>{item.startDate ? formatToIST(item.startDate) : "N/A"}</TableCell>
//                 <TableCell>{item.endDate ? formatToIST(item.endDate) : "N/A"}</TableCell>
//                 <TableCell>{item.reason || "N/A"}</TableCell>
//                 <TableCell>
//                   <ActionsContainer>
//                     <IoEyeOutline
//                       size={20}
//                       title="View"
//                       onClick={() => handleView(item)}
//                       style={{ cursor: "pointer" }}
//                     />
//                   </ActionsContainer>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </StyledTable>
//       </TableWrapper>

// <div style={{ margin: "1rem 0", display: "flex", justifyContent: "flex-end" }}>
//   <Pagination
//     current={currentPage}
//     pageSize={ITEMS_PER_PAGE}
//     total={totalEntries}
//     onChange={(page) => setCurrentPage(page)}
//     showSizeChanger={false}
//   />
// </div>
//     </Container>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search,  Pen, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllLeaves } from '@/api/LeaveRequestApi';

const ITEMS_PER_PAGE = 10;

export default function LeaveManagement() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('all');
  const [department, setDepartment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = iso => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));

  useEffect(() => {
    async function fetchData() {
      try {
        const leaves = await getAllLeaves();
        setData(leaves);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // derive options
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...Array.from(new Set(data.map(d => d.employee?.department).filter(Boolean))).map(dep => ({ value: dep, label: dep })),
  ];

  useEffect(() => {
    let temp = [...data];
    if (sortOption !== 'all') temp = temp.filter(i => i.leaveType?.name.toLowerCase() === sortOption);
    if (department !== 'all') temp = temp.filter(i => i.employee?.department === department);
    if (searchText) {
      temp = temp.filter(i =>
        `${i.employee?.Firstname} ${i.employee?.Lastname}`.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFiltered(temp);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    setCurrentItems(temp.slice(start, start + ITEMS_PER_PAGE));
  }, [data, sortOption, department, searchText, currentPage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <Card className="max-w-7xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Leave Approval List</CardTitle>
            {!isLoading && (
              <p className="text-sm text-gray-600">Showing {currentItems.length} of {filtered.length}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortOption} onValueChange={v => { setSortOption(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="sick">Sick</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:justify-between mb-4 space-y-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <Input
                placeholder="Search by name"
                className="pl-10"
                value={searchText}
                onChange={e => { setSearchText(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <div className="w-full md:w-1/4">
              <Select value={department} onValueChange={v => { setDepartment(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, idx) => (
                  <Skeleton key={idx} className="h-8 w-full rounded" />
                ))}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Full Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Department</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Leave Type</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Start Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">End Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Reason</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map(item => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{item.employee?.Firstname} {item.employee?.Lastname}</td>
                      <td className="px-4 py-2 text-sm">{item.employee?.department || 'N/A'}</td>
                      <td className="px-4 py-2 text-sm">{item.leaveType?.name || 'N/A'}</td>
                      <td className="px-4 py-2 text-sm">{item.startDate ? formatDate(item.startDate) : 'N/A'}</td>
                      <td className="px-4 py-2 text-sm">{item.endDate ? formatDate(item.endDate) : 'N/A'}</td>
                      <td className="px-4 py-2 text-sm">{item.reason || 'N/A'}</td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#159AFF] hover:bg-[#f5f0fd]"
                          onClick={() => window.location.href = `/admin/leave-management/leave-details/${item._id}`}
                        >
                          <Pen size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-end items-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="border-[#5F259F] text-[#5F259F]"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} /> Prev
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-[#5F259F] text-[#5F259F]"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            >
              Next <ChevronRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
