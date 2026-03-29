import styles from "./table.module.css";
import PlayingCard from "../../card-deck/playing-card/playing-card";
import { useState, useEffect } from "react";
import { createDeck, shuffleDeck } from "../../card-deck/deck";


export default function SolitaireTable() {
    const [shuffledDeck, setShuffleDeck] = useState(() => createDeck());

    useEffect(() => {
        setShuffleDeck(shuffleDeck(createDeck()));
    }, []);

    const card = shuffledDeck[0];
    return (
        <div className={styles.solitaireTableContainer}>
            <div className={styles.topBoard}>
                <div className={styles.foundationsContainer}>
                    <div className={styles.foundation}></div>
                    <div className={styles.foundation}></div>
                    <div className={styles.foundation}></div>
                    <div className={styles.foundation}></div>
                </div>
                <div className={styles.stockAndWasteContainer}>
                    <div className={styles.stock}></div>
                    <div className={styles.waste}></div>
                </div>
            </div>
            <div className={styles.tableauContainer}>

            </div>
            <PlayingCard card={card} faceUp={true} />
        </div>
    );
}