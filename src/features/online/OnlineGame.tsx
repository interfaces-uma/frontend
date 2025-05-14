import { useOnlineManager } from "@/features/online/hooks/useOnlineManager";
import Game from "@/features/shared/components/Game/Game";

export default function OnlineGame() {
  const manager = useOnlineManager();
  return <Game manager={manager} />;
}
