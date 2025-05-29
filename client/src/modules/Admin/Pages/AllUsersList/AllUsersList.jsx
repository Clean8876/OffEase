import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  DepartmentFilter,
  SecondHero,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalButtons,
  CancelButton,
  DeleteButton,
} from "./AllUsersList.styles";
import { CiSearch } from "react-icons/ci";
import { Select } from "antd";
import { getAllUsers } from "../../../../api/AuthApi";
import { deleteEmployeeById } from "../../../../api/AuthApi";
import { Pagination } from "antd";
import { Table } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple modal component to show image popup
function ImageModal({ isOpen, imageUrl, onClose }) {


  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()} // prevent modal close on image click
      >
        <img
          src={imageUrl}
          alt="Profile"
          style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 16,
            lineHeight: 1,
          }}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
}

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

  // New state to manage image modal
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Format date helper
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

  // Unique department options
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...Array.from(new Set(data.map((item) => item.department).filter(Boolean)))
      .map((dept) => ({ value: dept, label: dept })),
  ];
  // Open image modal
  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageUrl(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Fetch data once on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Fetched Users Data:", response);

        const users = Array.isArray(response) ? response : response.data?.data || [];
        const employeesOnly = users.filter((user) => user.role === "employee");

        console.log("Employees Only:", employeesOnly);
        setData(employeesOnly);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);


  // Reset page to 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedDepartment]);

  // Filter and paginate data whenever dependencies change
  useEffect(() => {
    let processedData = [...data];

    if (selectedDepartment !== "all") {
      processedData = processedData.filter(
        (item) => item.department === selectedDepartment
      );
    }

    if (searchText.trim() !== "") {
      processedData = processedData.filter((item) => {
        const fullName = `${item.Firstname ?? ""} ${item.Lastname ?? ""}`.toLowerCase();
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


  const handleImageClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    openImageModal(e.currentTarget.href); // Open modal with image URL
  }

  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployeeById(employeeToDelete);
      const updatedData = data.filter((user) => user._id !== employeeToDelete);
      setData(updatedData);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Failed to delete employee:", error);
      alert("Error deleting employee.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  return (
    <>
      <Container>

        <ToastContainer position="top-center" autoClose={3000} />
        <HeaderRow>
          <Title>
            All Users{" "}
            <span style={{ color: "#6d6e75", fontSize: 12, fontWeight: 400 }}>
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
              onChange={setSelectedDepartment}
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
                <TableHeader>Email</TableHeader>
                <TableHeader>Date Of Birth</TableHeader>
                <TableHeader>Profile Picture</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={item._id ?? index}>
                  <TableCell>
                    {item.Firstname} {item.Lastname}
                  </TableCell>
                  <TableCell>{item.department || "-"}</TableCell>
                  <TableCell>{item.email || "-"}</TableCell>
                  <TableCell>{formatToIST(item.dob)}</TableCell>
                  <TableCell>
                    {item.profilePictureUrl ? (
                      <a
                        href={item.profilePictureUrl}
                        onClick={handleImageClick}
                        style={{ textDecoration: "none", color: "#007bff", cursor: "pointer" }}
                      >
                        view
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell
                    style={{ cursor: "pointer", color: "red", fontSize: 20 }}
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <MdDeleteOutline />
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

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={modalImageUrl}
        onClose={closeImageModal}
      />

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Are you sure you want to delete this employee?</ModalTitle>
            {/* <p>Are you sure you want to delete this employee?</p> */}
            <ModalButtons>
              <CancelButton onClick={cancelDelete}>Cancel</CancelButton>
              <DeleteButton onClick={confirmDelete}>Delete</DeleteButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

    </>
  );
}
