import { useMemo, useCallback } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void,
    cleanOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder, cleanOrder }: OrderTotalProps) {

    const subTotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useCallback(() => subTotalAmount() * tip, [tip, order])

    const totalAmount = useCallback(() => subTotalAmount() + tipAmount(), [tip, order])
    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y propinas:</h2>
                <p>Subtotal a pagar:{' '}
                    <span className="font-bold">{formatCurrency(subTotalAmount())}</span>
                </p>
                <p>Propina:{' '}
                    <span className="font-bold">{formatCurrency(tipAmount())}</span>
                </p>
                <p>Total a pagar:{' '}
                    <span className="font-bold">{formatCurrency(totalAmount())}</span>
                </p>
            </div>
            <div className="flex justify-between items-center gap-10">
                <button
                    className="w-full bg-red-500 p-3 uppercase text-white font-bold mt-10 cursor-pointer  hover:bg-red-700 transition-colors ease-in-out duration-300
            disabled:cursor-not-allowed disabled:opacity-10"
                    onClick={cleanOrder}
                    disabled={totalAmount() === 0}>
                    Limpiar Orden
                </button>
                <button
                    className="w-full bg-black p-3 uppercase text-white font-bold mt-10 cursor-pointer  hover:bg-gray-800 transition-colors ease-in-out duration-300
            disabled:cursor-not-allowed disabled:opacity-10"
                    disabled={totalAmount() === 0}
                    onClick={placeOrder}>
                    Guardar Orden
                </button>
            </div>
        </>
    )
}
