import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import { medicineFormSchema } from "@schema/medicine-schema";
import type { IMedicine, ICreateMedicineRequest } from "@models/medicine";
import type { ICategory } from "@models/category";

interface AddEditMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateMedicineRequest) => Promise<void>;
  editMed: IMedicine | null;
  categories: ICategory[];
  loading?: boolean;
}

export default function AddEditMedicineModal({
  isOpen,
  onClose,
  onSubmit,
  editMed,
  categories,
  loading,
}: AddEditMedicineModalProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateMedicineRequest>({
    resolver: yupResolver(
      medicineFormSchema,
    ) as unknown as Resolver<ICreateMedicineRequest>,
    defaultValues: {
      companyId: 1,
      name: editMed?.name || "",
      categoryId:
        editMed?.categoryId || (categories.length > 0 ? categories[0].id : 0),
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        editMed ? t("medicines.modal.editTitle") : t("medicines.modal.addTitle")
      }
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} loading={loading}>
            {editMed
              ? t("medicines.modal.saveBtn")
              : t("medicines.modal.addBtn")}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("medicines.modal.medicineName")}
          </label>
          <input
            {...register("name")}
            placeholder={t("medicines.modal.medicineNamePlaceholder")}
            className={`w-full px-4 py-2.5 text-sm border ${
              errors.name ? "border-rose-500" : "border-gray-200"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("medicines.modal.category")}
          </label>
          <select
            {...register("categoryId")}
            className={`w-full px-4 py-2.5 text-sm border ${
              errors.categoryId ? "border-rose-500" : "border-gray-200"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="">{t("common.select")}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.categoryId.message}
            </p>
          )}
        </div>
        <input type="hidden" {...register("companyId")} />
      </form>
    </Modal>
  );
}
