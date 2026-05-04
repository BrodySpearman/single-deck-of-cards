'use client';
import SolitaireTable from "../games/solitaire/table";
import styles from "./play-table.module.css";

export default function PlayTable() {

    return (
        <div className={styles.playTableContainer}>
            <SolitaireTable />
        </div>
    );
};