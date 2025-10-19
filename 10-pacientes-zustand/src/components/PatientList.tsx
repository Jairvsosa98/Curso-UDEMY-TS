import { usePatientStore } from "../stores/store"

export default function PatientList() {
    const { patients } = usePatientStore()

    console.log(patients)

    return (
        <div>PatientList</div>
    )
}
