'use client';
import PlayingCard from "../card-deck/playing-card/playing-card";
import SolitaireTable from "../games/solitaire/table";
import styles from "./play-table.module.css";

export default function PlayTable() {

    return (
        <div className={styles.playTableContainer}>
            <SolitaireTable />
        </div>
    );
};