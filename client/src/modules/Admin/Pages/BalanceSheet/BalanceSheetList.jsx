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
// } from "./BalanceSheetList.styles";
// import { CiSearch } from "react-icons/ci";
// import { Select } from "antd";
// import { getAllBalances } from "../../../../api/BalanceApi";
// import { Pagination } from "antd";

// const ITEMS_PER_PAGE = 10;

// export default function BalanceSheetList() {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [totalEntries, setTotalEntries] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   // Unique department options from employee data in balance sheets
//   const departmentOptions = [
//     { value: "all", label: "All Departments" },
//     ...Array.from(
//       new Set(
//         data
//           .map((item) => item.employee?.department)
//           .filter(Boolean)
//       )
//     ).map((dept) => ({ value: dept, label: dept })),
//   ];

//   useEffect(() => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }, [currentPage]);


//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const response = await getAllBalances();
//         console.log("Fetched Balance Sheet Data:", response);
//         setData(response || []);
//       } catch (error) {
//         console.error("Error fetching leave data:", error);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   useEffect(() => {
//     let processedData = [...data];

//     if (selectedDepartment !== "all") {
//       processedData = processedData.filter(
//         (item) => item.employee?.department === selectedDepartment
//       );
//     }

//     if (searchText) {
//       processedData = processedData.filter((item) =>
//         (item.employee?.name)
//           .toLowerCase()
//           .includes(searchText.toLowerCase())
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
//   }, [data, searchText, selectedDepartment, currentPage]);

//   return (
//     <>
//       <Container>
//         <HeaderRow>
//           <Title>
//             Balance Sheet{" "}
//             <span
//               style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}
//             >
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
//               onChange={(value) => setSelectedDepartment(value)}
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
//                 <TableHeader>Remaining Leaves</TableHeader>
//                 <TableHeader>Remaining Sick Leaves</TableHeader>
//                 <TableHeader>Remaining Casual Leaves</TableHeader>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentItems.map((item, index) => (
//                 <TableRow key={item._id ?? index}>
//                   <TableCell>
//                     {item.employee?.name}
//                   </TableCell>
//                   <TableCell>{item.employee?.department || "-"}</TableCell>

//                   {/* Rendering .remaining property safely */}
//                   <TableCell>
//                     {item.totalRemaining ?? "-"}
//                   </TableCell>
//                   <TableCell>{item.leaveDetails.sick?.remainingDays  ?? "-"}</TableCell>
//                   <TableCell>{item.leaveDetails.casual?.remainingDays ?? "-"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </StyledTable>
//         </TableWrapper>

// <div style={{ margin: "1rem 0", display: "flex", justifyContent: "flex-end" }}>
//   <Pagination
//     current={currentPage}
//     pageSize={ITEMS_PER_PAGE}
//     total={totalEntries}
//     onChange={(page) => setCurrentPage(page)}
//     showSizeChanger={false}
//   />
// </div>

//       </Container>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { getAllBalances } from "../../../../api/BalanceApi";

const ITEMS_PER_PAGE = 10;

export default function BalanceSheetList() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBalances();
        setData(response || []);
      } catch (err) {
        console.error("Failed to fetch balance data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...data];

    if (selectedDepartment !== "all") {
      filtered = filtered.filter((item) => item.employee?.department === selectedDepartment);
    }

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.employee?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const total = filtered.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setFilteredData(filtered);
    setTotalEntries(total);
    setTotalPages(pages);
    setCurrentItems(filtered.slice(start, end));
  }, [data, searchText, selectedDepartment, currentPage]);

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...Array.from(
      new Set(data.map((d) => d.employee?.department).filter(Boolean))
    ).map((dept) => ({ value: dept, label: dept })),
  ];

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <Card className="max-w-7xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Balance Sheet</CardTitle>
            {!isLoading && (
              <p className="text-sm text-gray-600">Showing {currentItems.length} of {totalEntries}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filter by:</span>
            <Select value={selectedDepartment} onValueChange={v => { setSelectedDepartment(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute top-3 left-3 text-gray-400" />
            <Input
              placeholder="Search by name"
              className="pl-10"
              value={searchText}
              onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
            />
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
                    <th className="px-4 py-2 text-left text-sm font-semibold">Remaining</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Sick Leave</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Casual Leave</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((item, index) => (
                    <tr key={item._id ?? index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{item.employee?.name || "N/A"}</td>
                      <td className="px-4 py-2 text-sm">{item.employee?.department || "-"}</td>
                      <td className="px-4 py-2 text-sm">{item.totalRemaining ?? "-"}</td>
                      <td className="px-4 py-2 text-sm">{item.leaveDetails?.sick?.remainingDays ?? "-"}</td>
                      <td className="px-4 py-2 text-sm">{item.leaveDetails?.casual?.remainingDays ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
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
            )}
        </CardContent>
      </Card>
    </div>
  );
}
