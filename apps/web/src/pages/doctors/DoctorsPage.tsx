import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaStar,
  FaTrash,
  FaUserMd,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
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

export default function DoctorsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { doctors, loading, isFetching } = useAppSelector(
    (state) => state.doctor,
  );
  const { specializations } = useAppSelector((state) => state.specialization);
  const { degrees } = useAppSelector((state) => state.degree);

  const [search, setSearch] = useState("");

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
        const spec = d?.specializations?.[0]?.name?.toLowerCase() ?? "";
        const q = search.toLowerCase();
        return name.includes(q) || email.includes(q) || spec.includes(q);
      }),
    [doctors, search],
  );

  const openAdd = () => {
    setEditDoctor(null);
    setAddEditOpen(true);
  };

  const openEdit = (d: IDoctor) => {
    dispatch(getDoctorByIdAsyncThunk(String(d.id))).then((res) => {
      if (getDoctorByIdAsyncThunk.fulfilled.match(res)) {
        const doctor = res.payload?.data ?? d;
        setEditDoctor(doctor as IDoctor);
        setAddEditOpen(true);
      } else {
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

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("doctors.searchPlaceholder")}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Doctor Cards Grid */}
      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="bg-gray-100 rounded-xl p-2.5 h-14" />
                ))}
              </div>
              <div className="h-8 bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card py-20 flex flex-col items-center gap-3 text-gray-400">
          <FaUserMd className="text-5xl" />
          <p className="text-sm font-medium">{t("doctors.noDoctor")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((doc) => {
            const initials =
              doc?.user?.name
                ?.split(" ")
                ?.map((n: string) => n[0])
                ?.slice(0, 2)
                ?.join("")
                ?.toUpperCase() ?? "DR";
            const specName = doc?.specializations?.[0]?.name ?? "—";
            const degreeName = doc?.degrees?.[0]?.name ?? "";

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 card-hover"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {doc?.user?.name}
                      </p>
                      <p className="text-xs text-primary-600 font-medium">
                        {specName}
                      </p>
                    </div>
                  </div>
                  <Badge variant="info" className="shrink-0">
                    {degreeName || "Dr."}
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50 rounded-xl p-2.5">
                    <p className="text-xs text-gray-500">
                      {t("doctors.experience")}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {doc?.experience ?? "—"} yrs
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5">
                    <p className="text-xs text-gray-500">
                      {t("doctors.columns.ageGender")}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {doc?.user?.age ?? "—"}y ·{" "}
                      {doc?.user?.gender
                        ? doc.user.gender.charAt(0).toUpperCase() +
                        doc.user.gender.slice(1)
                        : "—"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5">
                    <p className="text-xs text-gray-500">
                      {t("doctors.columns.phone")}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {doc?.user?.mobile ?? "—"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5">
                    <div className="flex items-center gap-1">
                      <FaStar className="h-3 w-3 text-amber-400" />
                      <p className="text-sm font-semibold text-gray-800">
                        {t("doctors.rating")}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {doc?.user?.email ?? "—"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEdit(doc)}
                    leftIcon={<FaEdit className="h-3 w-3" />}
                  >
                    {t("common.edit")}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setViewDoctor(doc)}
                    className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <FaEye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(doc)}
                    className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <FaTrash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
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
