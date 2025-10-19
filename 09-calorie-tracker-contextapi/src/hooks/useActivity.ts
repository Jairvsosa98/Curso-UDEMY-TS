import { useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";


export const useActivity = () => {
    const context = useContext(ActivityContext)
    if (!context) {
        throw new Error("El hoook useActivity debe ser usado en un ActivityProvider")
    }

    return context
}