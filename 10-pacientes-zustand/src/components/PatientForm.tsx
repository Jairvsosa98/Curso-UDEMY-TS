import { useForm, type FieldErrors, type FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../stores/store";
import { useEffect } from "react";

export default function PatientForm() {
  const { addPatient, updatePatient, activeId, patients } = usePatientStore();
  const { register, handleSubmit, reset, setValue } = useForm<DraftPatient>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0]

      setValue('name', activePatient.name)
      setValue('caretaker', activePatient.caretaker)
      setValue('date', activePatient.date)
      setValue('email', activePatient.email)
      setValue('symptoms', activePatient.symptoms)

    }
  }, [activeId])

  const onInvalid = (formErrors: FieldErrors<FieldValues>) => {
    Object.entries(formErrors).forEach(([field, err]) => {
      if (!err) return;
      if (err.types) {
        Object.values(err.types).forEach((msg) =>
          toast.warning(String(msg), {
            position: "bottom-right",
            toastId: `${field}-${msg}`,
          })
        );
      } else if (err.message) {
        toast.warning(String(err.message), {
          position: "bottom-right",
          toastId: field,
        });
      }
    });
  };

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data);
    } else {
      addPatient(data);
    }

    reset();
  };


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento Pacientes {activeId}
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        {activeId ? 'Actualiza Pacientes' : 'Añade Pacientes'} y {""}
        <span className={`${activeId ? 'text-emerald-600' : 'text-indigo-600'} font-bold`}>Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient, onInvalid)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El Propietario es obligatorio",
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Correo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El formato del correo no es válido",
              },
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "La fecha de alta es obligatoria",
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Los sintomas son obligatorios",
            })}
          ></textarea>
        </div>

        <input
          type="submit"
          className={`${activeId ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'} w-full p-3 text-white uppercase font-bold  cursor-pointer transition-colors`}
          value={activeId ? 'Actualizar Paciente' : 'Guardar Paciente'}
        />
      </form>
    </div>
  );
}
