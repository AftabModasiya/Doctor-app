import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUserInjured,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import Table from "../../components/ui/Table";
import AddEditPatientModal from "../../components/patients/AddEditPatientModal";
import ViewPatientModal from "../../components/patients/ViewPatientModal";
import type { IPatient, ICreatePatientRequest } from "@models/patient";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  createPatientAsyncThunk,
  deletePatientAsyncThunk,
  getPatientsAsyncThunk,
  updatePatientAsyncThunk,
} from "@store/patient/patient-async-thunk";

const ITEMS_PER_PAGE = 8;
type FilterStatus = "All" | "Active" | "Inactive";

export default function PatientsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { patients, loading, isFetching } = useAppSelector(
    (state) => state.patient,
  );

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<IPatient | null>(null);
  const [viewPatient, setViewPatient] = useState<IPatient | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<IPatient | null>(null);

  useEffect(() => {
    dispatch(getPatientsAsyncThunk());
  }, [dispatch]);

  const filtered = useMemo(
    () =>
      (Array.isArray(patients) ? patients : []).filter((p) => {
        const matchSearch =
          p?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          p?.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          String(p?.id).includes(search);
        const matchStatus =
          filterStatus === "All" ||
          p?.status?.toLowerCase() === filterStatus.toLowerCase();
        return matchSearch && matchStatus;
      }),
    [patients, search, filterStatus],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openAdd = () => {
    setEditPatient(null);
    setModalOpen(true);
  };

  const openEdit = (p: IPatient) => {
    setEditPatient(p);
    setModalOpen(true);
  };

  const handleFormSubmit = (data: ICreatePatientRequest) => {
    if (editPatient) {
      dispatch(
        updatePatientAsyncThunk({ id: String(editPatient.id), body: data }),
      ).then((res) => {
        if (updatePatientAsyncThunk.fulfilled.match(res)) {
          dispatch(getPatientsAsyncThunk());
          setModalOpen(false);
          setEditPatient(null);
        }
      });
    } else {
      dispatch(createPatientAsyncThunk(data)).then((res) => {
        if (createPatientAsyncThunk.fulfilled.match(res)) {
          dispatch(getPatientsAsyncThunk());
          setModalOpen(false);
        }
      });
    }
  };

  const handleDelete = (p: IPatient) => {
    dispatch(deletePatientAsyncThunk(String(p.id))).then((res) => {
      if (deletePatientAsyncThunk.fulfilled.match(res)) {
        dispatch(getPatientsAsyncThunk());
        setDeleteConfirm(null);
      }
    });
  };

  const columns = [
    {
      key: "id",
      header: t("patients.columns.patientId"),
      render: (p: IPatient) => (
        <span className="font-mono text-xs text-gray-500">{p.id}</span>
      ),
    },
    {
      key: "name",
      header: t("patients.columns.patient"),
      render: (p: IPatient) => (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
            {p?.user?.name
              ?.split(" ")
              ?.map((n) => n[0])
              ?.slice(0, 2)
              ?.join("")}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {p?.user?.name}
            </p>
            <p className="text-xs text-gray-400">{p?.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "age",
      header: t("patients.columns.ageGender"),
      render: (p: IPatient) => (
        <span className="text-sm">
          {p?.user?.age}y · {p?.user?.gender}
        </span>
      ),
    },
    {
      key: "bloodGroup",
      header: t("patients.columns.blood"),
      render: (p: IPatient) => (
        <span className="font-mono text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
          {p?.bloodGroup}
        </span>
      ),
    },
    {
      key: "phone",
      header: t("patients.columns.phone"),
      render: (p: IPatient) => (
        <span className="text-sm text-gray-600">{p?.user?.mobile}</span>
      ),
    },
    {
      key: "status",
      header: t("patients.columns.status"),
      render: (p: IPatient) => (
        <Badge
          variant={
            p?.status?.toLowerCase() === "active" ? "success" : "neutral"
          }
          dot
        >
          {p?.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: t("patients.columns.actions"),
      render: (p: IPatient) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewPatient(p);
            }}
            className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <FaEye className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEdit(p);
            }}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <FaEdit className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(p);
            }}
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("patients.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {Array.isArray(patients) ? patients.length : 0}{" "}
            {t("patients.totalRegistered")}
          </p>
        </div>
        <Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
          {t("patients.addPatient")}
        </Button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-gray-100">
          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t("patients.searchPlaceholder")}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="h-3.5 w-3.5 text-gray-400" />
            {[
              { label: t("appointments.all"), value: "All" },
              { label: t("patients.modal.active"), value: "Active" },
              { label: t("patients.modal.inactive"), value: "Inactive" },
            ].map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  setFilterStatus(s.value as FilterStatus);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filterStatus === s.value
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <Table
          columns={columns}
          data={paged}
          emptyMessage={t("patients.noPatients")}
          emptyIcon={<FaUserInjured />}
          onRowClick={(row) => setViewPatient(row)}
          loading={isFetching}
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

      {/* Add / Edit Modal — key forces full remount to prevent stale form values */}
      <AddEditPatientModal
        key={editPatient ? `edit-${editPatient.id}` : "add"}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditPatient(null);
        }}
        onSubmit={handleFormSubmit}
        editPatient={editPatient}
        loading={loading}
      />

      {/* View Modal */}
      <ViewPatientModal
        patient={viewPatient}
        onClose={() => setViewPatient(null)}
      />

      {/* Delete Confirm */}
      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title={t("patients.modal.deleteTitle")}
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
                {t("patients.modal.deleteBtn")}
              </Button>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            {t("patients.modal.deleteConfirm")}{" "}
            <strong>{deleteConfirm?.user?.name}</strong>
            {t("patients.modal.deleteUndone")}
          </p>
        </Modal>
      )}
    </div>
  );
}
