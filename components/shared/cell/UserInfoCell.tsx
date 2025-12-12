"use client";

import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

interface UserInfoCellProps {
  name?: string;
  email?: string;
  photo?: string | null;
  gender?: string
}

export function UserInfoCell({ name, email, photo, gender }: UserInfoCellProps) {

    let userPlaceholderImage = gender?.toUpperCase() === 'MALE' ? '/images/man.png' : '/images/woman.png' 

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <Image src={photo ? photo : userPlaceholderImage} alt={name || 'user'} width={40} height={40} />
      </Avatar>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}