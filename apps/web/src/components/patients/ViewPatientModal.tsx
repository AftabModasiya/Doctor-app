import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import type { IPatient } from "@models/patient";

interface ViewPatientModalProps {
  patient: IPatient | null;
  onClose: () => void;
}

export default function ViewPatientModal({
  patient,
  onClose,
}: ViewPatientModalProps) {
  const { t } = useTranslation();

  if (!patient) return null;

  const initials = patient?.user?.name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("");

  return (
    <Modal
      isOpen={!!patient}
      onClose={onClose}
      title={t("patients.modal.viewTitle")}
      size="md"
      footer={
        <Button variant="secondary" onClick={onClose}>
          {t("common.close")}
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Header card */}
        <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
          <div className="h-14 w-14 rounded-2xl bg-primary-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {patient?.user?.name}
            </p>
            <p className="text-sm text-gray-500 mb-1">ID: {patient?.id}</p>
            <Badge
              variant={
                patient?.status?.toLowerCase() === "active"
                  ? "success"
                  : "neutral"
              }
            >
              {patient?.status}
            </Badge>
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              [t("patients.view.age"), `${patient?.user?.age} years`],
              [t("patients.view.gender"), patient?.user?.gender],
              [t("patients.view.bloodGroup"), patient?.bloodGroup],
              [t("patients.view.phone"), patient?.user?.mobile],
              [t("patients.view.email"), patient?.user?.email],
              [
                t("patients.view.registered"),
                patient?.createdAt
                  ? new Date(patient.createdAt).toLocaleDateString()
                  : "N/A",
              ],
              [t("patients.view.address"), patient?.address],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div key={label} className="bg-surface-secondary rounded-xl p-3">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
