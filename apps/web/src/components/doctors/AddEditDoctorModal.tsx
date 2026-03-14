import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import type { IDoctor, ICreateDoctorRequest } from "@models/doctor";
import type { ISpecialization } from "@models/specialization";
import type { IDegree } from "@models/degree";
import { doctorFormSchema } from "@schema/doctor-schema";

interface AddEditDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateDoctorRequest) => void;
  editDoctor: IDoctor | null;
  loading: boolean;
  specializations: ISpecialization[];
  degrees: IDegree[];
}

// Max date allowed for graduation — today (no future dates)
const TODAY = new Date().toISOString().split("T")[0];

export default function AddEditDoctorModal({
  isOpen,
  onClose,
  onSubmit,
  editDoctor,
  loading,
  specializations,
  degrees,
}: AddEditDoctorModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateDoctorRequest>({
    resolver: yupResolver(doctorFormSchema) as any,
  });

  // Populate form when opening for edit, reset to empty for add
  useEffect(() => {
    if (!isOpen) return;

    if (editDoctor) {
      // derive IDs from nested arrays
      const specializationId = editDoctor.specializations?.[0]?.id ?? 0;
      const degreeId = editDoctor.degrees?.[0]?.id ?? 0;

      reset({
        name: editDoctor.user.name,
        email: editDoctor.user.email,
        mobile: editDoctor.user.mobile,
        age: editDoctor.user.age,
        gender: editDoctor.user.gender,
        companyId: editDoctor.companyId,
        experience: editDoctor.experience,
        graduationDate: editDoctor.graduationDate
          ? editDoctor.graduationDate.split("T")[0]
          : "",
        specializationId,
        degreeId,
      });
    } else {
      // Reset to fully empty for add
      reset({
        name: "",
        email: "",
        mobile: "",
        age: undefined,
        gender: "male",
        companyId: 1,
        experience: undefined,
        graduationDate: "",
        specializationId: undefined,
        degreeId: undefined,
      });
    }
  }, [isOpen, editDoctor, reset]);

  const handleFormSubmit = (data: ICreateDoctorRequest) => {
    const payload: ICreateDoctorRequest = {
      ...data,
      age: Number(data.age),
      experience: Number(data.experience),
      companyId: Number(data.companyId),
      specializationId: Number(data.specializationId),
      degreeId: Number(data.degreeId),
      gender: data.gender as ICreateDoctorRequest["gender"],
      graduationDate: data.graduationDate
        ? new Date(data.graduationDate).toISOString()
        : "",
    };
    onSubmit(payload);
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
        editDoctor ? t("doctors.modal.editTitle") : t("doctors.modal.addTitle")
      }
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} loading={loading}>
            {editDoctor
              ? t("doctors.modal.saveBtn")
              : t("doctors.modal.addBtn")}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.fullName")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder={t("doctors.modal.fullNamePlaceholder")}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.email")} <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder={t("doctors.modal.emailPlaceholder")}
            className={inputClass(!!errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.phone")} <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("mobile")}
            placeholder={t("doctors.modal.phonePlaceholder")}
            className={inputClass(!!errors.mobile)}
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.age")} <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("age")}
            type="number"
            min={18}
            max={100}
            placeholder="35"
            className={inputClass(!!errors.age)}
          />
          {errors.age && (
            <p className="mt-1 text-xs text-rose-500">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.gender")} <span className="text-rose-500">*</span>
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

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.experience")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("experience")}
            type="number"
            min={0}
            max={60}
            placeholder="5"
            className={inputClass(!!errors.experience)}
          />
          {errors.experience && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Graduation Date — no future dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.graduationDate")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("graduationDate")}
            type="date"
            max={TODAY}
            className={inputClass(!!errors.graduationDate)}
          />
          {errors.graduationDate && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.graduationDate.message}
            </p>
          )}
        </div>

        {/* Specialization dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.specialization")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("specializationId")}
            className={inputClass(!!errors.specializationId)}
          >
            <option value="">— Select Specialization —</option>
            {specializations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.specializationId && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.specializationId.message}
            </p>
          )}
        </div>

        {/* Degree dropdown — renamed from "Degree ID" to "Degree" */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("doctors.modal.degree")} <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("degreeId")}
            className={inputClass(!!errors.degreeId)}
          >
            <option value="">— Select Degree —</option>
            {degrees.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.degreeId && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.degreeId.message}
            </p>
          )}
        </div>

        {/* Hidden company ID */}
        <input type="hidden" {...register("companyId")} value={1} />
      </div>
    </Modal>
  );
}
