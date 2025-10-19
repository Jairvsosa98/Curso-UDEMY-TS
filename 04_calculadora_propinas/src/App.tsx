import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import TipPercentageForm from "./components/TipPercentageForm";
import OrderTotals from "./components/OrderTotals";
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder, cleanOrder } = useOrder()
  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadoras de Propinas y Consumo</h1>
      </header>
      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map(item => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-3 p-5 rounded-lg space-y-10">
          {order.length > 0 ?(
            <>
              <OrderContents order={order} removeItem={removeItem} />
              <TipPercentageForm
                tip={tip}
                setTip={setTip}
              />
              <OrderTotals
                order={order}
                tip={tip}
                placeOrder={placeOrder}
                cleanOrder={cleanOrder}
              />
            </>
          ) : (
             <p className="text-center">La orden está vacía</p>
          )}

        </div>
      </main>
    </>
  )
}

export default App
