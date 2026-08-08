import { MdClose } from "react-icons/md";
import lineQrCode from "@/assets/images/line-qrcode.jpg";

interface LineModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountName?: string;
}

export default function LineModal({ isOpen, onClose, accountName = "吳哲瑋(J.D.I.哲哲)" }: LineModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl max-w-xs w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-lg font-bold text-gray-800">LINE 加好友</h2>
        <p className="mt-1 text-sm text-gray-500">掃描 QR Code 加入好友</p>

        <img
          src={lineQrCode}
          alt="LINE QR Code"
          className="mt-4 h-48 w-48 object-contain rounded-lg border border-gray-100"
        />

        <p className="mt-1 text-xs text-gray-400">{accountName}</p>
      </div>
    </div>
  );
}