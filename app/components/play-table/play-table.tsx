'use client';
import PlayingCard from "../card-deck/playing-card/playing-card";
import styles from "./play-table.module.css"
import { useState, useEffect } from "react";
import { createDeck, shuffleDeck } from "../card-deck/deck";

export default function PlayTable() {
    const [shuffledDeck, setShuffleDeck] = useState(() => createDeck());

    useEffect(() => {
        setShuffleDeck(shuffleDeck(createDeck()));
    }, []);

    const card = shuffledDeck[0];

    return (
        <div className={styles.playTableContainer}>
            <PlayingCard card={card} faceUp={true} />
        </div>
    );
};