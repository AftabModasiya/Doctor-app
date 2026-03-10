import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import Loader from "@shared/components/Loader";
import type { ICategory, ICreateCategoryRequest } from "@models/category";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  getCategoriesAsyncThunk,
  createCategoryAsyncThunk,
  updateCategoryAsyncThunk,
  deleteCategoryAsyncThunk,
} from "@store/category/category-async-thunk";
import { categoryFormSchema } from "@schema/category-schema";

export default function CategoryTab() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories, isFetching, loading } = useAppSelector((s) => s.category);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<ICategory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<ICategory | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCategoryRequest>({
    resolver: yupResolver(
      categoryFormSchema,
    ) as unknown as Resolver<ICreateCategoryRequest>,
  });

  useEffect(() => {
    dispatch(getCategoriesAsyncThunk());
  }, [dispatch]);

  const openAdd = () => {
    setEditItem(null);
    reset({ name: "", companyId: 1 });
    setModalOpen(true);
  };

  const openEdit = (item: ICategory) => {
    setEditItem(item);
    reset({ name: item.name, companyId: item.companyId });
    setModalOpen(true);
  };

  const onSubmit = (data: ICreateCategoryRequest) => {
    if (editItem) {
      dispatch(
        updateCategoryAsyncThunk({ id: String(editItem.id), body: data }),
      ).then((res) => {
        if (updateCategoryAsyncThunk.fulfilled.match(res)) {
          setModalOpen(false);
          dispatch(getCategoriesAsyncThunk());
        }
      });
    } else {
      dispatch(createCategoryAsyncThunk(data)).then((res) => {
        if (createCategoryAsyncThunk.fulfilled.match(res)) {
          setModalOpen(false);
          dispatch(getCategoriesAsyncThunk());
        }
      });
    }
  };

  const handleDelete = (item: ICategory) => {
    dispatch(deleteCategoryAsyncThunk(String(item.id))).then((res) => {
      if (deleteCategoryAsyncThunk.fulfilled.match(res)) {
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
          {categories.length} {t("appSettings.category.total")}
        </p>
        <Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
          {t("appSettings.category.add")}
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
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  {t("appSettings.category.empty")}
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">
                    {c.id}
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {c.name}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(c)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <FaEdit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(c)}
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
            ? t("appSettings.category.editTitle")
            : t("appSettings.category.addTitle")
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
            placeholder={t("appSettings.category.namePlaceholder")}
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
