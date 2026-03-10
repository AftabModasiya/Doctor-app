import { useTranslation } from "react-i18next";
import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import Badge from "@components/ui/Badge";
import type { IMedicine } from "@models/medicine";

interface ViewMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: IMedicine | null;
}

export default function ViewMedicineModal({
  isOpen,
  onClose,
  medicine,
}: ViewMedicineModalProps) {
  const { t } = useTranslation();

  if (!medicine) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Medicine Details"
      size="md"
      footer={
        <Button variant="secondary" onClick={onClose}>
          {t("common.close")}
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-2xl border border-primary-100/50">
          <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-primary-100">
            <span className="text-3xl">💊</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{medicine.name}</h3>
            <p className="text-sm text-gray-500">ID: {medicine.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t("medicines.modal.category")}
            </p>
            <Badge variant="info">{medicine.category?.name || "N/A"}</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Created At
            </p>
            <p className="text-sm font-medium text-gray-700">
              {new Date(medicine.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Last Updated
            </p>
            <p className="text-sm font-medium text-gray-700">
              {new Date(medicine.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
