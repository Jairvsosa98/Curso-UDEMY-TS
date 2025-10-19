import { formatCurrency } from "../helpers"
import { type OrderItem, type MenuItem } from "../types"

type OrderContentsProps = {
    order: OrderItem[],
    removeItem: (id: MenuItem['id']) => void
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className="text-4xl font-black">Consumo</h2>
            <div className="space-y-3 mt-5">

                {order.map(item => (
                    <div className="flex justify-between border-t border-gray-200 py-5 last-of-type:border-b items-center" key={item.id}>
                        <div>
                            <p className="text-lg">{item.name} - {formatCurrency(item.price)}</p>
                            <p className="font-black">
                                Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
                            </p>
                        </div>
                        <button className=" bg-red-600 transition duration-300 ease-in-out hover:bg-red-800 h-8 w-8 rounded-full text-white font-black cursor-pointer"
                            onClick={() => removeItem(item.id)}>X</button>
                    </div>
                ))}

            </div>
        </div>
    )
}
