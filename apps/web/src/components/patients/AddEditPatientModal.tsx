import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import type { IPatient, ICreatePatientRequest } from "@models/patient";
import { patientFormSchema } from "@schema/patient-schema";

interface AddEditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ICreatePatientRequest) => void;
  editPatient: IPatient | null;
  loading: boolean;
}

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export default function AddEditPatientModal({
  isOpen,
  onClose,
  onSubmit,
  editPatient,
  loading,
}: AddEditPatientModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreatePatientRequest>({
    resolver: yupResolver(patientFormSchema) as any,
  });

  useEffect(() => {
    if (!isOpen) return;

    if (editPatient) {
      reset({
        name: editPatient.user.name,
        email: editPatient.user.email,
        mobile: editPatient.user.mobile,
        address: editPatient.address,
        age: editPatient.user.age,
        gender: editPatient.user.gender,
        bloodGroup: editPatient.bloodGroup,
        status: editPatient.status,
        companyId: editPatient.companyId,
      });
    } else {
      reset({
        name: "",
        email: "",
        mobile: "",
        address: "",
        age: undefined,
        gender: "male",
        bloodGroup: "A+",
        status: "active",
        companyId: 1,
      });
    }
  }, [isOpen, editPatient, reset]);

  const handleFormSubmit = (data: ICreatePatientRequest) => {
    onSubmit({
      ...data,
      age: Number(data.age),
      companyId: 1,
      gender: data.gender as ICreatePatientRequest["gender"],
      status: data.status as ICreatePatientRequest["status"],
    });
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
      hasError ? "border-rose-400 focus:ring-rose-400" : "border-gray-200"
    }`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        editPatient
          ? t("patients.modal.editTitle")
          : t("patients.modal.addTitle")
      }
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} loading={loading}>
            {editPatient
              ? t("patients.modal.saveBtn")
              : t("patients.modal.addBtn")}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.fullName")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder={t("patients.modal.fullNamePlaceholder")}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.email")} <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder={t("patients.modal.emailPlaceholder")}
            className={inputClass(!!errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.phone")} <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("mobile")}
            placeholder={t("patients.modal.phonePlaceholder")}
            className={inputClass(!!errors.mobile)}
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.address")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("address")}
            placeholder={t("patients.modal.addressPlaceholder")}
            className={inputClass(!!errors.address)}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.age")} <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("age")}
            type="number"
            min={0}
            max={120}
            placeholder="30"
            className={inputClass(!!errors.age)}
          />
          {errors.age && (
            <p className="mt-1 text-xs text-rose-500">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.gender")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("gender")}
            className={inputClass(!!errors.gender)}
          >
            <option value="male">{t("patients.modal.male")}</option>
            <option value="female">{t("patients.modal.female")}</option>
            <option value="other">{t("patients.modal.other")}</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.bloodGroup")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("bloodGroup")}
            className={inputClass(!!errors.bloodGroup)}
          >
            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("patients.modal.status")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("status")}
            className={inputClass(!!errors.status)}
          >
            <option value="active">{t("patients.modal.active")}</option>
            <option value="inactive">{t("patients.modal.inactive")}</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.status.message}
            </p>
          )}
        </div>

        <input type="hidden" {...register("companyId")} value={1} />
      </div>
    </Modal>
  );
}
