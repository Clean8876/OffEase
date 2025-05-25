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
  ButtonContainer,
  CreateButton,
  SearchWrapper,
  SearchIcon,
  SearchInput,
} from "./LeaveManagement.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllLeaves } from "../../../../api/LeaveApi";
import LeaveApprovalModal from "../../Components/LeaveApprovalModal/LeaveApprovalModal";

const ITEMS_PER_PAGE = 10;

export default function LeaveManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getAllLeaves();
        console.log("Leave data:", response);
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
        (item) => item.leaveType?.name === sortOption
      );
    }

    if (searchText) {
      processedData = processedData.filter(
        (item) =>
          item.employee?.Firstname?.toLowerCase().includes(
            searchText.toLowerCase()
          ) ||
          item.employee?.Lastname?.toLowerCase().includes(
            searchText.toLowerCase()
          )
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
  }, [data, sortOption, searchText, currentPage]);

  const formatToIST = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleUpdateStatus = (leaveId, newStatus) => {
    // Update leave status logic here (API call, local state update, etc.)
    console.log(`Leave ID: ${leaveId} updated to ${newStatus}`);
  };
  

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/leaves/create")}>
          Add Leave
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>
            Leave Approval List{" "}
            <span
              style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}
            >
              ({currentItems.length}/{totalEntries})
            </span>
          </Title>
          <SortByContainer>
            <SortLabel>Sort by:</SortLabel>
            <Select
              defaultValue={sortOption}
              style={{ width: 120 }}
              onChange={(value) => setSortOption(value)}
              options={[
                { value: "all", label: "All" },
                { value: "casual", label: "Casual" },
                { value: "sick", label: "Sick" },
              ]}
            />
          </SortByContainer>
        </HeaderRow>

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
                <TableRow key={item._id}>
                  <TableCell>
                    {item.employee?.Firstname} {item.employee?.Lastname}
                  </TableCell>
                  <TableCell>{item.employee?.department}</TableCell>
                  <TableCell>{item.leaveType?.name}</TableCell>
                  <TableCell>{formatToIST(item.startDate)}</TableCell>
                  <TableCell>{formatToIST(item.endDate)}</TableCell>
                  <TableCell>{item.reason}</TableCell>
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

      {isModalOpen && selectedLeave && (
  <LeaveApprovalModal
    leave={selectedLeave}
    onClose={handleCloseModal}
    onUpdateStatus={handleUpdateStatus}
  />
)}

    </>
  );
}
