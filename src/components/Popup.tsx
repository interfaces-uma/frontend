import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  description?: string;
};

function Popup(props: PopupProps) {
  if (!props.isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cartas p-6 rounded shadow-lg max-w-sm w-full">
        <div className="self-start top-2 left-2 ">
          <Button onClick={props.onClose} inversed circular>
            <BackIcon />
          </Button>
        </div>
        <p className="mb-4 mt-4 text-center text-2xl">{props.message}</p>
      </div>
    </div>
  );
}

export default Popup;
