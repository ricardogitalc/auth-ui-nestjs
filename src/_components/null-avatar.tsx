import { HiUser } from "react-icons/hi2";

export default function NullAvatar() {
  return (
    <div className="object-cover bg-muted-foreground/20 rounded-full w-full h-full flex items-center justify-center relative overflow-hidden">
      <HiUser className="w-full h-full fill-muted-foreground/80 translate-y-[0.4rem]" />
    </div>
  );
}
