import { ToastContainer } from "react-toastify"
import PatientForm from "./components/PatientForm"
import PatientList from "./components/PatientList"

function App() {

  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="text-center text-5xl font-black md:w-2/3 mx-auto">
          Seguimiento de pacientes {''}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>
        <div className="mt-12 md:flex">
          <PatientForm />
          <PatientList />
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

export default App
