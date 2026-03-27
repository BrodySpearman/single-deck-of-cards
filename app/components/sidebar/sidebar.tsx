'use client';
import { TfiMenu } from "react-icons/tfi";
import { TbLetterX } from "react-icons/tb";
import styles from "./sidebar.module.css"
import { useState } from "react";

import SidebarMenu from "./sidebar-menu/sidebar-menu";

import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div>
            <AnimatePresence>
                {sidebarOpen ? <SidebarMenu toggleSidebar={toggleSidebar} /> :
                    <motion.div
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'fixed' }}
                        key="sidebarIconContainer"
                        className={styles.sidebarIconContainer}>

                        <button onClick={toggleSidebar} className={styles.sidebarOpenButton}>
                            <TfiMenu size={30} color="#c5c5c5" />
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};