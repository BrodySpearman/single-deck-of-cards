'use client';
import styles from "./table.module.scss";
import PlayingCard from "../../card-deck/playing-card/playing-card";
import { useState, useEffect } from "react";
import { initializeGame, dealWaste } from "./playSolitaire";
import type { SolitaireState } from "@/app/types/solitaire";



export default function SolitaireTable() {
    const [gameState, setGameState] = useState<SolitaireState | null>(null);

    const handleDealWaste = () => {
        setGameState(dealWaste(gameState!));
    };

    const handleStartGame = () => {
        setGameState(initializeGame());
    };

    const renderWaste = () => {
        return gameState!.waste.length > 0 && gameState!.waste.slice(-3).map((card, index) => {
            return (
                <div key={index} className={`${styles.cardPlaceholder}`}>
                    <PlayingCard card={card} faceUp={true} isPlayable={index === 2} />
                </div>
            );
        });
    };

    const renderStock = () => {
        return gameState!.stock.length > 0 && (
            <button className={styles.drawPileBtn} onClick={handleDealWaste}>
                <PlayingCard card={gameState!.stock[gameState!.stock.length - 1]} faceUp={false} isPlayable={true} />
            </button>
        );
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
                        <div style={{ borderColor: gameState ? "transparent" : "#530048" }} className={`${styles.drawPile} ${styles.cardPlaceholder}`}>
                            {gameState ? renderStock() : null}
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
                                    <PlayingCard card={card} faceUp={card.faceUp} isPlayable={card.faceUp} />
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