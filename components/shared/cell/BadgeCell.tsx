"use client";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
    badgeText?: boolean;
}

export function BadgeCell({
    badgeText
}: StatusBadgeCellProps) {
    return (
        <>
            <Badge
                variant="outline"
                className="bg-blue-500 text-white dark:bg-blue-600"
            >
                {badgeText}
            </Badge>
        </>
    );
}