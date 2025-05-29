import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ActionsContainer,
  DepartmentFilter,
  SecondHero,
  SearchWrapper,
  SearchIcon,
  SearchInput,
} from "./BalanceSheetList.styles";
import { CiSearch } from "react-icons/ci";
import { Select } from "antd";
import { getAllBalances } from "../../../../api/BalanceApi";
import { Pagination } from "antd";

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
  // Unique department options from employee data in balance sheets
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...Array.from(
      new Set(
        data
          .map((item) => item.employee?.department)
          .filter(Boolean)
      )
    ).map((dept) => ({ value: dept, label: dept })),
  ];

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);


  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getAllBalances();
        console.log("Fetched Balance Sheet Data:", response);
        setData(response || []);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  useEffect(() => {
    let processedData = [...data];

    if (selectedDepartment !== "all") {
      processedData = processedData.filter(
        (item) => item.employee?.department === selectedDepartment
      );
    }

    if (searchText) {
      processedData = processedData.filter((item) =>
        (item.employee?.name)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
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

  return (
    <>
      <Container>
        <HeaderRow>
          <Title>
            Balance Sheet{" "}
            <span
              style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}
            >
              ({currentItems.length}/{totalEntries})
            </span>
          </Title>
        </HeaderRow>

        <SecondHero>
          <SearchWrapper>
            <SearchIcon>
              <CiSearch size={18} />
            </SearchIcon>
            <SearchInput
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchWrapper>
          <DepartmentFilter>
            <Select
              style={{ width: 180 }}
              value={selectedDepartment}
              onChange={(value) => setSelectedDepartment(value)}
              options={departmentOptions}
            />
          </DepartmentFilter>
        </SecondHero>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>Full Name</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Remaining Leaves</TableHeader>
                <TableHeader>Remaining Sick Leaves</TableHeader>
                <TableHeader>Remaining Casual Leaves</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={item._id ?? index}>
                  <TableCell>
                    {item.employee?.name}
                  </TableCell>
                  <TableCell>{item.employee?.department || "-"}</TableCell>

                  {/* Rendering .remaining property safely */}
                  <TableCell>
                    {item.totalRemaining ?? "-"}
                  </TableCell>
                  <TableCell>{item.leaveDetails.sick?.remainingDays  ?? "-"}</TableCell>
                  <TableCell>{item.leaveDetails.casual?.remainingDays ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

<div style={{ margin: "1rem 0", display: "flex", justifyContent: "flex-end" }}>
  <Pagination
    current={currentPage}
    pageSize={ITEMS_PER_PAGE}
    total={totalEntries}
    onChange={(page) => setCurrentPage(page)}
    showSizeChanger={false}
  />
</div>

      </Container>
    </>
  );
}
