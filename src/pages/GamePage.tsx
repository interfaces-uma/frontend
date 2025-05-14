import OnlineGame from "@/features/online/OnlineGame";
import OrientationLock from "@/features/shared/components/OrientationLock";
export default function GamePage() {
  return (
    <>
      <OrientationLock />
      <OnlineGame />
    </>
  );
}
