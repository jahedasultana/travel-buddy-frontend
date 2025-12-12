"use client";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/tables/ManagementTable";
import { IUser } from "@/types/user.interface";
import { StatusBadgeCell } from '@/components/shared/cell/StatusBadgeCell';
import { DateCell } from "@/components/shared/cell/DateCell";
import { BadgeCell } from "@/components/shared/cell/BadgeCell";

export const travelPlansColumns: Column<any>[] = [
  {
    header: "Added By",
    accessor: (travelPlan) => (
      <UserInfoCell
        name={travelPlan?.user?.name}
        photo={travelPlan?.user?.profileImage as string}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Destination",
    accessor: (travelPlan) => (
      <div className="flex flex-col">
        <span className="text-sm">{travelPlan?.destination}</span>
      </div>
    ),
  },
  {
    header: "Start Date",
    accessor: (travelPlan) => <DateCell date={travelPlan.startDate} />
  },
  {
    header: "End Date",
    accessor: (travelPlan) => <DateCell date={travelPlan.endDate} />
  },
  {
    header: "Travel Type",
    accessor: (travelPlan) => <BadgeCell badgeText={travelPlan.travelType} />,
  },
  {
    header: "Budget Range",
    accessor: (travelPlan) => <div className="flex flex-col">
      <span className="text-sm">{travelPlan?.budgetRange}</span>
    </div>,
    sortKey: "createdAt",
  },
  {
    header: "Created",
    accessor: (travelPlan) => <DateCell date={travelPlan.createdAt} />,
    sortKey: "createdAt",
  },
];