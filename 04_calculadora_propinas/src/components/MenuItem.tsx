import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem,
    addItem: (item : MenuItem) => void
}
export default function MenuItem({ item, addItem }: MenuItemProps) {

    return (
        <button className="border-2 border-teal-400 transition duration-800 ease-in-out hover:bg-teal-200 w-full flex p-3 justify-between cursor-pointer"
            onClick={() => addItem(item)}>
            <p>{item.name}</p>
            <p className="font-black">$ {item.price}</p>
        </button>
    )
}
