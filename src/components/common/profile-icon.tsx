import { useAppSelector } from "@/lib/store/hooks";
import { User } from "lucide-react";
import Image from "next/image";

interface ProfileIconProps {
  className?: string;
}

export default function ProfileIcon({ className }: ProfileIconProps) {
  const profile = useAppSelector((state) => state.profile);
  return (
    <div className={`bg-elevation-button relative overflow-hidden border-1 border-border flex-row items-center rounded-lg px-2 py-2 hover:cursor-pointer md:flex ${className || ""}`}>
      <User className="text-text-secondary h-[16px] w-[16px]" />

      {profile.profileImage && <Image src={profile.profileImage} alt="Profile" width={40} height={40} className="absolute top-0 left-0 z-20 h-full w-full object-cover" />}
    </div>
  );
}

