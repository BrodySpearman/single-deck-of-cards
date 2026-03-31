'use client';
import styles from "./table.module.scss";
import PlayingCard from "../../card-deck/playing-card/playing-card";
import { useState, useEffect } from "react";
import { initializeGame, dealWaste } from "./playSolitaire";
import type { SolitaireState } from "@/app/types/solitaire";



export default function SolitaireTable() {
    const [gameState, setGameState] = useState<SolitaireState | null>(null);

    const renderWaste = () => {
        return gameState && gameState.waste.length > 0 && gameState.waste.slice(0, 3).map((card, index) => {
            return (
                <div key={index} className={`${styles.cardPlaceholder}`}>
                    <PlayingCard card={card} faceUp={true} />
                </div>
            );
        });
    }

    const handleDealWaste = () => {
        setGameState(dealWaste(gameState!));
    }

    const handleStartGame = () => {
        setGameState(initializeGame());
    }

    return (
        <div className={styles.solitaireTableContainer}>
            <div className={styles.topBoard}>
                <div className={styles.foundationsContainer}>
                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                </div>
                <div className={styles.stockAndWasteContainer}>
                    <div className={styles.waste}>
                        {gameState ? renderWaste() : null}
                    </div>
                    <div className={styles.stock}>
                        <div className={`${styles.drawPile} ${styles.cardPlaceholder}`}>
                            {gameState && gameState.stock.length > 0 && (
                                <button className={styles.drawPileBtn} onClick={handleDealWaste}>
                                    <PlayingCard card={gameState.stock[gameState.stock.length - 1]} faceUp={false} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.tableauContainer}>
                {gameState && gameState.tableau.map((column, columnIndex) => (
                    <div key={columnIndex} className={styles.tableauColumn}>
                        {column.map((card, cardIndex) => {
                            let marginTop = "0";

                            if (cardIndex > 0) {
                                const previousCardFaceUp = column[cardIndex - 1].faceUp;
                                marginTop = previousCardFaceUp ? "-7rem" : "-9rem";
                            }

                            return (
                                <div key={cardIndex} style={{ marginTop }}>
                                    <PlayingCard card={card} faceUp={card.faceUp} />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className={styles.startBtn} onClick={handleStartGame}>Start Game</button>
        </div>
    );
}