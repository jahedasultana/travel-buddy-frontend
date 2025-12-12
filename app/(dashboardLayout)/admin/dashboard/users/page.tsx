export const dynamic = "force-dynamic";
import UsersTable from "@/components/modules/admin/userManagement/UsersTable"
import TablePagination from "@/components/shared/tables/TablePagination"
import { queryStringFormatter } from "@/lib/formatter"
import { getAllUsers } from "@/services/admin/userManagement"

const Users = async ({searchParams}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}) => {

  const searchParamsObj = await searchParams
  const queryString = queryStringFormatter(searchParamsObj)

  const user = await getAllUsers(queryString)

  const totalPages = Math.ceil(
    (user?.meta?.total || 1) / (user?.meta?.limit || 1)
  );

  return (
    <div>
      <UsersTable users={user?.data} />
      <div className="mt-4 flex justify-start">
        <TablePagination currentPage={user?.meta?.page || 1} totalPages={totalPages || 1} />
      </div>
    </div>
  )
}

export default Users
