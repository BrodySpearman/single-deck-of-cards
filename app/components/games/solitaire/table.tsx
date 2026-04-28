'use client';
import styles from "./table.module.scss";
import PlayingCard from "../../card-deck/playing-card/playing-card";
import { useState, useEffect } from "react";
import { initializeGame, dealWaste, handleCardDrop } from "./playSolitaire";
import type { SolitaireState } from "@/app/types/solitaire";
import type { Card } from "@/app/types/deck-types";
import { motion } from "framer-motion";
import { GiCardJackClubs } from "react-icons/gi";

export default function SolitaireTable() {
    const [gameState, setGameState] = useState<SolitaireState | null>(null);

    const performCardDrop = (card: Card, originZoneId: string, targetZoneId: string) => {
        const newGameState = handleCardDrop(gameState!, card, originZoneId, targetZoneId);
        setGameState(newGameState);
    };

    const handleDealWaste = () => {
        setGameState(dealWaste(gameState!));
    };

    const handleStartGame = () => {
        setGameState(initializeGame());
    };

    const renderFoundation = () => {
        return (
            gameState!.foundations.map((foundation, foundationIndex) => {
                return (
                    <div key={foundationIndex} className={`${styles.foundation} ${styles.cardPlaceholder}`} data-drop-zone={`foundation-${foundationIndex}`}>
                        {foundation.length > 0 && foundation.map((card, index) => {
                            return (
                                <div key={card.id} className={`${styles.cardPlaceholder}`} data-drop-zone={`foundation-${foundationIndex}`}>
                                    <PlayingCard
                                        card={card}
                                        faceUp={true}
                                        isPlayable={true}
                                        draggable={true}
                                        onSolitaireDrop={(card, targetZoneId) => performCardDrop(card, `foundation-${foundationIndex}`, targetZoneId)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })
        )
    };

    const renderWaste = () => {
        return gameState!.waste.length > 0 && gameState!.waste.map((card, index) => {
            return (
                <div key={card.id} className={`${styles.cardPlaceholder}`} data-drop-zone={`waste`}>
                    <motion.div layoutId={card.id}>
                        <PlayingCard
                            card={card}
                            faceUp={true}
                            isPlayable={index === gameState!.waste.length - 1}
                            draggable={index == gameState!.waste.length - 1}
                            onSolitaireDrop={(card, targetZoneId) => performCardDrop(card, 'waste', targetZoneId)}
                        />
                    </motion.div>
                </div>
            );
        });
    };

    const renderStock = () => {
        if (gameState!.stock.length === 0) {
            return (
                <button className={`${styles.drawPile} ${styles.cardPlaceholder} ${styles.emptyPile}`} onClick={handleDealWaste}>
                    Draw
                </button>
            );
        }
        return (
            <button className={styles.drawPileBtn} onClick={handleDealWaste}>
                <PlayingCard card={gameState!.stock[gameState!.stock.length - 1]} faceUp={false} isPlayable={true} draggable={false} />
            </button>
        );
    }

    const NestedCardStack = ({ cards, currentIndex, columnIndex }:
        {
            cards: Card[],
            currentIndex: number,
            columnIndex: number
        }
    ) => {
        if (currentIndex >= cards.length) return null;
        const card = cards[currentIndex];

        let childMargin = card.faceUp ? "-10.1rem" : "-10rem";

        return (
            <div>
                <PlayingCard
                    card={card}
                    faceUp={card.faceUp}
                    isPlayable={card.faceUp}
                    draggable={card.faceUp}
                    onSolitaireDrop={(card, targetZoneId) => performCardDrop(card, `tableau-${columnIndex}`, targetZoneId)}
                >
                    <div style={{ marginTop: childMargin }}>
                        <NestedCardStack cards={cards} currentIndex={currentIndex + 1} columnIndex={columnIndex} />
                    </div>
                </PlayingCard>
            </div>
        )

    }

    const renderTableau = () => {
        return (
            gameState!.tableau.map((column, columnIndex) => (
                <div
                    key={columnIndex}
                    className={styles.tableauColumn}
                    data-drop-zone={`tableau-${columnIndex}`}>
                    {column.length === 0 ?
                        <span className={`${styles.cardPlaceholder} ${styles.tableauEmptyCol}`}></span> :
                        <NestedCardStack cards={column} currentIndex={0} columnIndex={columnIndex} />
                    }
                </div>
            ))
        )
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
                        <div
                            style={{ borderColor: gameState ? "transparent" : "#530048" }}
                            className={`${styles.drawPile} ${styles.cardPlaceholder}`}
                        >
                            {gameState ? renderStock() : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.tableauContainer}>
                {gameState && renderTableau()}
            </div>
            <button className={styles.startBtn} onClick={handleStartGame}>Start Game</button>
        </div>
    );
}