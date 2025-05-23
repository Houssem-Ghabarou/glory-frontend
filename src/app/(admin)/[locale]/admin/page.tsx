"use client";

import React from "react";
import Admin from "../../../../components/pages/admin/Admin";
import ProtectedAdminRoute from "@/components/pages/admin/ProtectedAdminRoute";

export default function Adminpages() {
  return (
    <ProtectedAdminRoute>
      <Admin />
    </ProtectedAdminRoute>
  );
}
