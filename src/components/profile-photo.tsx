import Image from "next/image";

import { profile } from "@/lib/profile";

type ProfilePhotoProps = {
  priority?: boolean;
  className?: string;
};

export function ProfilePhoto({ priority = false, className = "" }: ProfilePhotoProps) {
  return (
    <div className={`relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-white shadow-sm ${className}`}>
      <Image
        alt={`${profile.name} professional headshot`}
        className="h-full w-full object-cover object-[50%_20%]"
        height={720}
        priority={priority}
        src={profile.headshot}
        width={720}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(0,0,0,0.32))]" />
      <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/45 px-3 py-2 text-xs font-medium text-white backdrop-blur">
        {profile.location}
      </div>
    </div>
  );
}
