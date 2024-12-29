"use client";
import AdminContent from "@/components/layout/admin.content";
import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { Layout } from "antd";
import React, { ReactNode } from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <Layout>
      <AdminSideBar />
      <Layout>
        <AdminHeader />
        <AdminContent>{children}</AdminContent>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
