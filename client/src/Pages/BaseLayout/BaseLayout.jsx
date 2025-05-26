import React from "react";
import { Outlet } from "react-router-dom";
import { PageWrapper, ContentWrapper } from "./BaseLayout.styles";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const BaseLayout = () => {
  return (
    <PageWrapper>

      <AdminSidebar />
      <ContentWrapper>
      <AdminHeader />
        <Outlet />
        {/* <Footer /> */}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default BaseLayout;