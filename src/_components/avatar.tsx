import { ImUser } from "react-icons/im";

function AvatarFallbackComponent() {
  return (
    <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center relative overflow-hidden">
      <ImUser className="w-full h-full fill-muted-foreground/80 translate-y-1" />
    </div>
  );
}

export default AvatarFallbackComponent;
