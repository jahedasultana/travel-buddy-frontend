"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { usersColumns } from "./usersColumns";

const UsersTable = ({ users }: any) => {

  return (
    <>
      <ManagementTable
        data={users}
        columns={usersColumns}
        emptyMessage="No users found"
        getRowKey={(user) => user?.id}
      />
    </>
  );
};

export default UsersTable;