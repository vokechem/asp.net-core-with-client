import React from 'react';
import Wrapper from "../Components/wrapper";
import PageHeader from "../Components/header";
import SideBar from "../Components/sidebar";
import Content from "../Components/content";
import BreadCrump from "../Components/breadcrump";

const BaseRoute = (props) => {

    return <div>
        <Wrapper>
            <PageHeader />
            <SideBar />
            <Content>
                <BreadCrump />
                {props.children}
            </Content>
        </Wrapper>
    </div>
}

export default BaseRoute;