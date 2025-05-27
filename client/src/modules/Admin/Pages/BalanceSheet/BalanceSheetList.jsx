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
import { IoEyeOutline } from "react-icons/io5";
import { Select } from "antd";
import { getAllBalances } from "../../../../api/BalanceApi";
import LeaveApprovalModal from "../../Components/LeaveApprovalModal/LeaveApprovalModal";

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
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date helper, keep it in case you want timestamps somewhere
  const formatToIST = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

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

  // View modal open
  const handleView = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  // Modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getAllBalances();
        console.log("Fetched Balance Sheet Data:", response.data);
        setData(response.data || []);
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
        (item.employee?.Firstname + " " + item.employee?.Lastname)
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
                <TableHeader>Sick Leaves</TableHeader>
                <TableHeader>Casual Leaves</TableHeader>
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
                    {item.totalRemainingLeaves ?? "-"}
                  </TableCell>
                  <TableCell>{item.remainingLeaves?.sick ?? "-"}</TableCell>
                  <TableCell>{item.remainingLeaves?.casual ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Container>
    </>
  );
}
