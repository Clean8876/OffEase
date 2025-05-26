import React from "react";
import { Outlet } from "react-router-dom";
import { PageWrapper, ContentWrapper } from "./UserBaselayout.styles";
import UserHeader from "../UserHeader/UserHeader";


const UserBaseLayout = () => {
    return (
        <PageWrapper>


            <UserHeader />
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </PageWrapper>
    );
}

export default UserBaseLayout;