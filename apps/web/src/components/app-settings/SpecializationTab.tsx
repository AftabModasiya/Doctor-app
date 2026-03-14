import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import Loader from "@shared/components/Loader";
import type {
  ISpecialization,
  ICreateSpecializationRequest,
} from "@models/specialization";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  getSpecializationsAsyncThunk,
  createSpecializationAsyncThunk,
  updateSpecializationAsyncThunk,
  deleteSpecializationAsyncThunk,
} from "@store/specialization/specialization-async-thunk";
import { specializationFormSchema } from "@schema/specialization-schema";

export default function SpecializationTab() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { specializations, isFetching, loading } = useAppSelector(
    (s) => s.specialization,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<ISpecialization | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<ISpecialization | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateSpecializationRequest>({
    resolver: yupResolver(
      specializationFormSchema,
    ) as unknown as Resolver<ICreateSpecializationRequest>,
  });

  useEffect(() => {
    dispatch(getSpecializationsAsyncThunk());
  }, [dispatch]);

  const openAdd = () => {
    setEditItem(null);
    reset({ name: "", companyId: 1 });
    setModalOpen(true);
  };

  const openEdit = (item: ISpecialization) => {
    setEditItem(item);
    reset({ name: item.name, companyId: item.companyId });
    setModalOpen(true);
  };

  const onSubmit = (data: ICreateSpecializationRequest) => {
    if (editItem) {
      dispatch(
        updateSpecializationAsyncThunk({ id: String(editItem.id), body: data }),
      ).then((res) => {
        if (updateSpecializationAsyncThunk.fulfilled.match(res)) {
          setModalOpen(false);
          dispatch(getSpecializationsAsyncThunk());
        }
      });
    } else {
      dispatch(createSpecializationAsyncThunk(data)).then((res) => {
        if (createSpecializationAsyncThunk.fulfilled.match(res)) {
          setModalOpen(false);
          dispatch(getSpecializationsAsyncThunk());
        }
      });
    }
  };

  const handleDelete = (item: ISpecialization) => {
    dispatch(deleteSpecializationAsyncThunk(String(item.id))).then((res) => {
      if (deleteSpecializationAsyncThunk.fulfilled.match(res)) {
        setDeleteConfirm(null);
      }
    });
  };

  if (isFetching) return <Loader inline />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {specializations.length} {t("appSettings.specialization.total")}
        </p>
        <Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
          {t("appSettings.specialization.add")}
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("appSettings.columns.id")}
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("appSettings.columns.name")}
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("appSettings.columns.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {specializations.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  {t("appSettings.specialization.empty")}
                </td>
              </tr>
            ) : (
              specializations.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">
                    {s.id}
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {s.name}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(s)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <FaEdit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(s)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editItem
            ? t("appSettings.specialization.editTitle")
            : t("appSettings.specialization.addTitle")
        }
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSubmit(onSubmit)} loading={loading}>
              {editItem ? t("common.save") : t("common.add")}
            </Button>
          </>
        }
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("appSettings.columns.name")}{" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder={t("appSettings.specialization.namePlaceholder")}
            className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name
                ? "border-rose-400 focus:ring-rose-400"
                : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
          )}
          <input type="hidden" {...register("companyId")} value={1} />
        </div>
      </Modal>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title={t("appSettings.modal.deleteTitle")}
          size="sm"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirm)}
                loading={loading}
              >
                {t("common.delete")}
              </Button>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            {t("appSettings.modal.deleteConfirm")}{" "}
            <strong>{deleteConfirm.name}</strong>?
          </p>
        </Modal>
      )}
    </div>
  );
}
