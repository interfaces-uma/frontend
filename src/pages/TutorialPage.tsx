import TutorialGame from "@/features/tutorial/TutorialGame";
import OrientationLock from "@/features/shared/components/OrientationLock";

export default function TutorialPage() {
  return (
    <>
      <OrientationLock />
      <TutorialGame />
    </>
  );
}
