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
} from "./LeaveManagement.styles";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllLeaves } from "../../../../api/LeaveRequestApi";
import { Pagination } from "antd";

const ITEMS_PER_PAGE = 10;

export default function LeaveManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const formatToIST = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...Array.from(
      new Set(data.map((item) => item.employee?.department).filter(Boolean))
    ).map((dept) => ({ value: dept, label: dept })),
  ];

  // Change handleView to navigate to leave details page
const handleView = (leave) => {
  navigate(`/admin/leave-management/leave-details/${leave._id}`);
};

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);


  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getAllLeaves();
        setData(response);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  useEffect(() => {
    let processedData = [...data];

    if (sortOption !== "all") {
      processedData = processedData.filter(
        (item) => item.leaveType?.name?.toLowerCase() === sortOption.toLowerCase()
      );
    }

    if (selectedDepartment !== "all") {
      processedData = processedData.filter(
        (item) => item.employee?.department === selectedDepartment
      );
    }

    if (searchText) {
      processedData = processedData.filter(
        (item) =>
          item.employee?.Firstname?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.employee?.Lastname?.toLowerCase().includes(searchText.toLowerCase())
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
  }, [data, sortOption, searchText, selectedDepartment, currentPage]);

  return (
    <Container>
      <HeaderRow>
        <Title>
          Leave Approval List{" "}
          <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
            ({currentItems.length}/{totalEntries})
          </span>
        </Title>
        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <Select
            defaultValue={sortOption}
            style={{ width: 120 }}
            onChange={(value) => {
              setSortOption(value);
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "All" },
              { value: "casual", label: "Casual" },
              { value: "sick", label: "Sick" },
            ]}
          />
        </SortByContainer>
      </HeaderRow>

      <SecondHero>
        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchWrapper>
        <DepartmentFilter>
          <Select
            style={{ width: 180 }}
            value={selectedDepartment}
            onChange={(value) => {
              setSelectedDepartment(value);
              setCurrentPage(1);
            }}
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
              <TableHeader>Leave Type</TableHeader>
              <TableHeader>Start Date</TableHeader>
              <TableHeader>End Date</TableHeader>
              <TableHeader>Reason</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item._id || Math.random()}>
                <TableCell>
                  {item.employee?.Firstname || "N/A"} {item.employee?.Lastname || ""}
                </TableCell>
                <TableCell>{item.employee?.department || "N/A"}</TableCell>
                <TableCell>{item.leaveType?.name || "N/A"}</TableCell>
                <TableCell>{item.startDate ? formatToIST(item.startDate) : "N/A"}</TableCell>
                <TableCell>{item.endDate ? formatToIST(item.endDate) : "N/A"}</TableCell>
                <TableCell>{item.reason || "N/A"}</TableCell>
                <TableCell>
                  <ActionsContainer>
                    <IoEyeOutline
                      size={20}
                      title="View"
                      onClick={() => handleView(item)}
                      style={{ cursor: "pointer" }}
                    />
                  </ActionsContainer>
                </TableCell>
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
  );
}
