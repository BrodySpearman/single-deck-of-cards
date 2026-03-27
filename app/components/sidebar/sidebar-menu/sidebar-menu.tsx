import { TbLetterX } from "react-icons/tb"
import styles from "./sidebar-menu.module.css"
import { motion } from "framer-motion"

export default function SidebarMenu({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            exit={{ x: -400, opacity: 0 }}
            style={{ position: 'fixed' }}
            key="sidebarMenuContainer"
            className={styles.sidebarMenuContainer}>

            <h1 className={`no-highlight ${styles.sidebarTitle}`}>Single Deck of Cards</h1>
            <button onClick={toggleSidebar} className={styles.sidebarCloseButton}>
                <TbLetterX size={28} color="#858585ff" />
            </button>
        </motion.div>
    )
}