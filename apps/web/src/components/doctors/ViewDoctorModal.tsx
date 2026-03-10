import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import type { IDoctor } from "@models/doctor";

interface ViewDoctorModalProps {
  doctor: IDoctor | null;
  onClose: () => void;
}

export default function ViewDoctorModal({
  doctor,
  onClose,
}: ViewDoctorModalProps) {
  const { t } = useTranslation();

  if (!doctor) return null;

  const initials = doctor?.user?.name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("");

  const specName = doctor?.specializations?.[0]?.name;
  const degreeName = doctor?.degrees?.[0]?.name;

  return (
    <Modal
      isOpen={!!doctor}
      onClose={onClose}
      title={t("doctors.modal.viewTitle")}
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
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {doctor?.user?.name}
            </p>
            <p className="text-sm text-gray-500 mb-1">ID: {doctor?.id}</p>
            {specName && <Badge variant="info">{specName}</Badge>}
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              [t("doctors.view.age"), `${doctor?.user?.age} years`],
              [t("doctors.view.gender"), doctor?.user?.gender],
              [t("doctors.view.experience"), `${doctor?.experience} yrs`],
              [t("doctors.view.phone"), doctor?.user?.mobile],
              [t("doctors.view.email"), doctor?.user?.email],
              [t("doctors.view.specialization"), specName ?? "—"],
              [t("doctors.view.degree"), degreeName ?? "—"],
              [
                t("doctors.view.graduationDate"),
                doctor?.graduationDate
                  ? new Date(doctor.graduationDate).toLocaleDateString()
                  : "N/A",
              ],
              [
                t("doctors.view.registered"),
                doctor?.createdAt
                  ? new Date(doctor.createdAt).toLocaleDateString()
                  : "N/A",
              ],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div key={label} className="bg-surface-secondary rounded-xl p-3">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
