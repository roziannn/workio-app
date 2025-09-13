"use client";

import { useState } from "react";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import ToggleSwitch from "@/components/Toggle";
import Pagination from "@/components/Pagination";

interface Unit {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

const initialUnits: Unit[] = [
  { id: 1, name: "Frontend Developer", status: "Active" },
  { id: 2, name: "Backend Developer", status: "Active" },
  { id: 3, name: "UI/UX Designer", status: "Inactive" },
  { id: 4, name: "QA Engineer", status: "Active" },
];

export default function UnitPage() {
  const [unitList, setUnitList] = useState<Unit[]>(initialUnits);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingUnitId, setEditingUnitId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [status, setStatus] = useState<Unit["status"]>("Active");
  const [errors, setErrors] = useState<{ name?: string }>({});

  const itemsPerPage = 5;
  const filterOptions = ["All", "Active", "Inactive"];
  const filteredUnits = statusFilter === "All" ? unitList : unitList.filter((u) => u.status === statusFilter);

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUnits = filteredUnits.slice(indexOfFirst, indexOfLast);

  const statusStyles: Record<Unit["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const resetForm = () => {
    setName("");
    setStatus("Active");
    setErrors({});
    setEditingUnitId(null);
    setModalMode("add");
  };

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    return newErrors;
  };

  const handleSaveUnit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === "add") {
      const newUnit: Unit = {
        id: unitList.length + 1,
        name,
        status,
      };
      setUnitList([newUnit, ...unitList]);
    } else if (modalMode === "edit" && editingUnitId !== null) {
      setUnitList(unitList.map((u) => (u.id === editingUnitId ? { ...u, name, status } : u)));
    }

    resetForm();
    setShowModal(false);
  };

  const handleEditUnit = (unit: Unit) => {
    setModalMode("edit");
    setEditingUnitId(unit.id);
    setName(unit.name);
    setStatus(unit.status);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="Units"
          total={filteredUnits.length}
          filterOptions={filterOptions}
          selectedFilter={statusFilter}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onAddNew={() => {
            resetForm();
            setModalMode("add");
            setShowModal(true);
          }}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUnits.map((unit) => (
                <tr key={unit.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{unit.name}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={statusStyles[unit.status]} icon={unit.status === "Active" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                      {unit.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button onClick={() => handleEditUnit(unit)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {currentUnits.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No units found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => {
              resetForm();
              setShowModal(false);
            }}
            title={modalMode === "add" ? "Add New Unit" : "Edit Unit"}
          >
            <InputField label="Unit Name" value={name} onChange={setName} placeholder="Unit Name" error={errors.name} />

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 text-sm font-medium">Status</span>
              <ToggleSwitch status={status} onChange={setStatus} activeColor="bg-green-500" />
            </div>

            <button onClick={handleSaveUnit} className="btn-secondary">
              {modalMode === "add" ? "Add Unit" : "Save Changes"}
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}
