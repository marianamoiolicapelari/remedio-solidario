import { IoPersonCircleSharp, IoReceipt } from "react-icons/io5"
import { GiMedicines } from "react-icons/gi"

interface SubmenuItem {
    title: string
    path: string
}

interface MenuItem {
    title: string
    icon?: React.ReactElement
    submenu: boolean
    submenuItems: SubmenuItem[]
}

export const ItemsMenu: MenuItem[] = [
    {
        title: "Paciente",
        icon: <IoPersonCircleSharp />,
        submenu: true,
        submenuItems: [
            { title: "Novo Paciente", path: "/home/paciente" }
        ]
    },
    {
        title: "Medicamento",
        icon: <GiMedicines />,
        submenu: true,
        submenuItems: [
            { title: "Novo Medicamento", path: "/home/medicamento" }           
        ]
    },
    {
        title: "Dispensação",
        icon: <IoReceipt />,
        submenu: true,
        submenuItems: [    
            { title: "Dispensação", path: "/home/dispensacao" }     
        ]
    }    
]