import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import type { DraftPatient, Patient } from "../types"
import { toast } from "react-toastify"

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {
        ...patient,
        id: uuidv4()
    }
}

export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({
            patients: [],
            activeId: '',
            addPatient: (data) => {
                const newPatient = createPatient(data)
                set((state) => ({
                    patients: [...state.patients, newPatient]
                }))
                toast.success('Paciente Registrado Correctamente')
            },
            deletePatient: (id) => {
                set(state => ({
                    patients: state.patients.filter(patient => patient.id !== id)
                }))
                toast.success('Paciente Eliminado Correctamente')
            },
            getPatientById: (id) => {
                set(() => ({
                    activeId: id
                }))
            },
            updatePatient: (data) => {
                set(state => ({
                    patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                    activeId: ''
                }))
                toast.success('Paciente Actualizado Correctamente')

            }
        }), {
            name: 'patient-storage',
            storage: createJSONStorage(() => sessionStorage)
        })
    ))