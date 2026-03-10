import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUserMd,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import Table from "../../components/ui/Table";
import AddEditDoctorModal from "../../components/doctors/AddEditDoctorModal";
import ViewDoctorModal from "../../components/doctors/ViewDoctorModal";
import type { IDoctor, ICreateDoctorRequest } from "@models/doctor";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  createDoctorAsyncThunk,
  deleteDoctorAsyncThunk,
  getDoctorByIdAsyncThunk,
  getDoctorsAsyncThunk,
  updateDoctorAsyncThunk,
} from "@store/doctor/doctor-async-thunk";
import { getSpecializationsAsyncThunk } from "@store/specialization/specialization-async-thunk";
import { getDegreesAsyncThunk } from "@store/degree/degree-async-thunk";
import Loader from "@shared/components/Loader";

const ITEMS_PER_PAGE = 8;

export default function DoctorsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { doctors, loading, isFetching } = useAppSelector(
    (state) => state.doctor,
  );
  const { specializations } = useAppSelector((state) => state.specialization);
  const { degrees } = useAppSelector((state) => state.degree);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState<"All" | "Active" | "Inactive">(
    "All",
  );

  const [addEditOpen, setAddEditOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState<IDoctor | null>(null);
  const [viewDoctor, setViewDoctor] = useState<IDoctor | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<IDoctor | null>(null);

  useEffect(() => {
    dispatch(getDoctorsAsyncThunk());
    dispatch(getSpecializationsAsyncThunk());
    dispatch(getDegreesAsyncThunk());
  }, [dispatch]);

  const filtered = useMemo(
    () =>
      (Array.isArray(doctors) ? doctors : []).filter((d) => {
        const name = d?.user?.name?.toLowerCase() ?? "";
        const email = d?.user?.email?.toLowerCase() ?? "";
        const id = String(d?.id);
        const q = search.toLowerCase();
        return name.includes(q) || email.includes(q) || id.includes(q);
      }),
    [doctors, search],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openAdd = () => {
    setEditDoctor(null);
    setAddEditOpen(true);
  };

  /** On edit: fetch latest data from API then open modal with pre-filled form */
  const openEdit = (d: IDoctor) => {
    dispatch(getDoctorByIdAsyncThunk(String(d.id))).then((res) => {
      if (getDoctorByIdAsyncThunk.fulfilled.match(res)) {
        // The slice stores the single doctor in selectedDoctor.
        // We read the payload directly so the modal gets the freshest data.
        const doctor = res.payload?.data ?? d;
        setEditDoctor(doctor as IDoctor);
        setAddEditOpen(true);
      } else {
        // Fallback: open with list-row data if the GET by ID fails
        setEditDoctor(d);
        setAddEditOpen(true);
      }
    });
  };

  const handleFormSubmit = (data: ICreateDoctorRequest) => {
    if (editDoctor) {
      dispatch(
        updateDoctorAsyncThunk({ id: String(editDoctor.id), body: data }),
      ).then((res) => {
        if (updateDoctorAsyncThunk.fulfilled.match(res)) {
          setAddEditOpen(false);
          setEditDoctor(null);
          dispatch(getDoctorsAsyncThunk());
        }
      });
    } else {
      dispatch(createDoctorAsyncThunk(data)).then((res) => {
        if (createDoctorAsyncThunk.fulfilled.match(res)) {
          setAddEditOpen(false);
          dispatch(getDoctorsAsyncThunk());
        }
      });
    }
  };

  const handleDelete = (d: IDoctor) => {
    dispatch(deleteDoctorAsyncThunk(String(d.id))).then((res) => {
      if (deleteDoctorAsyncThunk.fulfilled.match(res)) {
        setDeleteConfirm(null);
      }
    });
  };

  const columns = [
    {
      key: "id",
      header: t("doctors.columns.doctorId"),
      render: (d: IDoctor) => (
        <span className="font-mono text-xs text-gray-500">{d.id}</span>
      ),
    },
    {
      key: "name",
      header: t("doctors.columns.doctor"),
      render: (d: IDoctor) => (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
            {d?.user?.name
              ?.split(" ")
              ?.map((n) => n[0])
              ?.slice(0, 2)
              ?.join("")}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {d?.user?.name}
            </p>
            <p className="text-xs text-gray-400">{d?.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "ageGender",
      header: t("doctors.columns.ageGender"),
      render: (d: IDoctor) => (
        <span className="text-sm text-gray-600">
          {d?.user?.age}y · {d?.user?.gender}
        </span>
      ),
    },
    {
      key: "experience",
      header: t("doctors.columns.experience"),
      render: (d: IDoctor) => (
        <span className="text-sm font-medium text-gray-700">
          {d?.experience} yrs
        </span>
      ),
    },
    {
      key: "specialization",
      header: t("doctors.columns.specialization"),
      render: (d: IDoctor) => (
        <Badge variant="info">{d?.specializations?.[0]?.name ?? "—"}</Badge>
      ),
    },
    {
      key: "phone",
      header: t("doctors.columns.phone"),
      render: (d: IDoctor) => (
        <span className="text-sm text-gray-600">{d?.user?.mobile}</span>
      ),
    },
    {
      key: "actions",
      header: t("doctors.columns.actions"),
      render: (d: IDoctor) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewDoctor(d)}
            className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <FaEye className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => openEdit(d)}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <FaEdit className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeleteConfirm(d)}
            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <FaTrash className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  if (isFetching) {
    return <Loader inline />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("doctors.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {Array.isArray(doctors) ? doctors.length : 0} {t("doctors.onStaff")}
          </p>
        </div>
        <Button onClick={openAdd} leftIcon={<FaPlus className="h-3.5 w-3.5" />}>
          {t("doctors.addDoctor")}
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
              placeholder={t("doctors.searchPlaceholder")}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="h-3.5 w-3.5 text-gray-400" />
            {(["All", "Active", "Inactive"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setFilterValue(s);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filterValue === s
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Table
          columns={columns}
          data={paged}
          emptyMessage={t("doctors.noDoctor")}
          emptyIcon={<FaUserMd />}
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

      {/* Add / Edit Modal — key forces full remount so form never carries stale edit values */}
      <AddEditDoctorModal
        key={editDoctor ? `edit-${editDoctor.id}` : "add"}
        isOpen={addEditOpen}
        onClose={() => {
          setAddEditOpen(false);
          setEditDoctor(null);
        }}
        onSubmit={handleFormSubmit}
        editDoctor={editDoctor}
        loading={loading}
        specializations={specializations}
        degrees={degrees}
      />

      {/* View Modal */}
      <ViewDoctorModal
        doctor={viewDoctor}
        onClose={() => setViewDoctor(null)}
      />

      {/* Delete Confirm */}
      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title={t("doctors.modal.deleteTitle")}
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
                {t("doctors.modal.deleteBtn")}
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
