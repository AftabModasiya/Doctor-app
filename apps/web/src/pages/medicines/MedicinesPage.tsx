import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaPills,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Badge from "@components/ui/Badge";
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import Pagination from "@components/ui/Pagination";
import Table from "@components/ui/Table";
import AddEditMedicineModal from "@components/medicines/AddEditMedicineModal";
import ViewMedicineModal from "@components/medicines/ViewMedicineModal";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  getAllMedicinesAsyncThunk,
  createMedicineAsyncThunk,
  updateMedicineAsyncThunk,
  deleteMedicineAsyncThunk,
} from "@store/medicine/medicine-async-thunk";
import { getCategoriesAsyncThunk } from "@store/category/category-async-thunk";
import type { IMedicine, ICreateMedicineRequest } from "@models/medicine";

const ITEMS_PER_PAGE = 8;

export default function MedicinesPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { medicines, isFetching, loading } = useAppSelector(
    (state) => state.medicine,
  );
  const { categories } = useAppSelector((state) => state.category);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMed, setViewMed] = useState<IMedicine | null>(null);
  const [editMed, setEditMed] = useState<IMedicine | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<IMedicine | null>(null);

  useEffect(() => {
    dispatch(getAllMedicinesAsyncThunk());
    dispatch(getCategoriesAsyncThunk());
  }, [dispatch]);

  const filtered = useMemo(
    () =>
      medicines.filter(
        (m: IMedicine) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.category?.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [medicines, search],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openAdd = () => {
    setEditMed(null);
    setModalOpen(true);
  };

  const openEdit = (m: IMedicine) => {
    setEditMed(m);
    setModalOpen(true);
  };

  const onSubmit = async (data: ICreateMedicineRequest) => {
    if (editMed) {
      const res = await dispatch(
        updateMedicineAsyncThunk({ id: editMed.id, body: data }),
      );
      if (updateMedicineAsyncThunk.fulfilled.match(res)) {
        setModalOpen(false);
        dispatch(getAllMedicinesAsyncThunk());
      }
    } else {
      const res = await dispatch(createMedicineAsyncThunk(data));
      if (createMedicineAsyncThunk.fulfilled.match(res)) {
        setModalOpen(false);
        dispatch(getAllMedicinesAsyncThunk());
      }
    }
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      const res = await dispatch(deleteMedicineAsyncThunk(deleteConfirm.id));
      if (deleteMedicineAsyncThunk.fulfilled.match(res)) {
        setDeleteConfirm(null);
        dispatch(getAllMedicinesAsyncThunk());
      }
    }
  };

  const columns = [
    {
      key: "name",
      header: t("medicines.columns.medicine"),
      render: (m: IMedicine) => (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-primary-50 flex items-center justify-center">
            <FaPills className="h-3.5 w-3.5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{m.name}</p>
            <p className="text-xs text-gray-400">ID: {m.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: t("medicines.columns.category"),
      render: (m: IMedicine) => (
        <Badge variant="info">{m.category?.name || "N/A"}</Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (m: IMedicine) => (
        <span className="text-sm text-gray-600">
          {new Date(m.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t("medicines.columns.actions"),
      render: (m: IMedicine) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMed(m)}
            className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <FaEye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => openEdit(m)}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <FaEdit className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDeleteConfirm(m)}
            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <FaTrash className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("medicines.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {medicines.length} {t("medicines.inInventory")}
          </p>
        </div>
        <Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
          {t("medicines.addMedicine")}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          {
            label: "Total Medicines",
            count: medicines.length,
            color: "bg-primary-50 text-primary-700",
          },
          {
            label: "Total Categories",
            count: new Set(medicines.map((m: IMedicine) => m.categoryId)).size,
            color: "bg-emerald-50 text-emerald-700",
          },
          {
            label: "Active Inventory",
            count: medicines.filter((m: IMedicine) => !m.deletedAt).length,
            color: "bg-violet-50 text-violet-700",
          },
        ].map((c) => (
          <div
            key={c.label}
            className={`${c.color} rounded-2xl p-4 border border-current/10`}
          >
            <p className="text-2xl font-bold">{c.count}</p>
            <p className="text-sm font-medium mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t("medicines.searchPlaceholder")}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <Table
          columns={columns}
          data={paged}
          emptyMessage={t("medicines.noMedicines")}
          emptyIcon={<FaPills />}
          loading={isFetching}
          onRowClick={(row) => setViewMed(row)}
        />
        <div className="px-4 border-t border-gray-50">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <AddEditMedicineModal
        key={editMed ? `edit-${editMed.id}` : "add"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onSubmit}
        editMed={editMed}
        categories={categories}
        loading={loading}
      />

      <ViewMedicineModal
        isOpen={!!viewMed}
        onClose={() => setViewMed(null)}
        medicine={viewMed}
      />

      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title={t("medicines.modal.deleteTitle")}
          size="sm"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirm(null)}
                disabled={loading}
              >
                {t("common.cancel")}
              </Button>
              <Button variant="danger" onClick={handleDelete} loading={loading}>
                {t("medicines.modal.deleteBtn")}
              </Button>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            {t("medicines.modal.deleteConfirm")}{" "}
            <strong>{deleteConfirm.name}</strong>{" "}
            {t("medicines.modal.fromInventory")}
          </p>
        </Modal>
      )}
    </div>
  );
}
