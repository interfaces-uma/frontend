import Lobby from "@/features/lobby/Lobby";
import OrientationLock from "@/features/shared/components/OrientationLock";

export default function LobbyPage() {
  return (
    <>
      <OrientationLock />
      <Lobby />
    </>
  );
}
