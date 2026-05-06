'use client';
import styles from "./table.module.scss";
import PlayingCard from "../../card-deck/playing-card/playing-card";
import { useState, useEffect } from "react";
import { initializeGame, dealWaste, handleCardDrop, smartClick, finishWin, validWinConditionCheck } from "./playSolitaire";
import type { SolitaireState } from "@/app/types/solitaire";
import type { Card } from "@/app/types/deck-types";
import { LayoutGroup, motion } from "framer-motion";
import { TbCards } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

import useSound from "use-sound";
import InfoMenu from "../../ui/info-menu/info-menu";

export default function SolitaireTable() {
    const [gameState, setGameState] = useState<SolitaireState | null>(null);
    const [showWinModal, setShowWinModal] = useState(false);
    const [drawCount, setDrawCount] = useState<1 | 3>(3);
    const [gameId, setGameId] = useState(0);

    // Sounds // 
    const [playDropSound] = useSound('/audio/cardDrop.mp3', {
        volume: .5,
        playbackRate: 2,
    })

    const [playWasteDealSound] = useSound('/audio/cardDrop.mp3', {
        volume: .55,
        playbackRate: .9,
    })

    // User interactions //
    const performCardDrop = (card: Card, originZoneId: string, targetZoneId: string) => {
        const newGameState = handleCardDrop(gameState!, card, originZoneId, targetZoneId);
        setGameState(newGameState);
        playDropSound();
    };

    const handleDealWaste = () => {
        playWasteDealSound();
        setGameState(dealWaste(gameState!, drawCount));
    };

    const handleStartGame = (count: 1 | 3) => {
        setDrawCount(count);
        setGameState(initializeGame());
        setGameId(prev => prev + 1);
    };

    const handleAbandonGame = () => {
        setGameState(null);
        setGameId(0);
    }

    const handleSmartClick = (card: Card, originZoneId: string) => {
        setGameState(smartClick(gameState!, card, originZoneId));
        playDropSound();
    }

    // Special gameplay animations //
    useEffect(() => {
        if (!gameState) return;

        const isStockEmpty = gameState.stock.length === 0;
        const isWasteEmpty = gameState.waste.length === 0;

        const allTableauCardsFaceUp = gameState.tableau.every(
            column => column.length === 0 || column[0].faceUp
        );

        const canAutoFinish = isStockEmpty && isWasteEmpty && allTableauCardsFaceUp;
        if (canAutoFinish) {
            const isGameWon = validWinConditionCheck(gameState.foundations);
            if (!isGameWon) {
                const timer = setTimeout(() => {
                    setGameState(finishWin(gameState!));
                }, 125);

                return () => clearTimeout(timer);
            }
        }
    }, [gameState, playDropSound]);

    // Table renderers //
    const renderFoundation = () => {
        return gameState!.foundations.map((foundation, foundationIndex) => {
            const topCard = foundation.length > 0 ? foundation[foundation.length - 1] : null;
            return (
                <div
                    key={foundationIndex}
                    className={topCard ? `${styles.cardPlaceholder} no-highlight` : `${styles.foundation} ${styles.cardPlaceholder} no-highlight`}
                    data-drop-zone={`foundation-${foundationIndex}`}
                    style={{ position: 'relative' }}
                >
                    {topCard ? (
                        foundation.map((card, cardIndex) => (
                            <div
                                key={card.id}
                                style={{
                                    position: cardIndex === 0 ? 'relative' : 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: cardIndex + 10
                                }}
                            >
                                <PlayingCard
                                    card={card}
                                    faceUp={true}
                                    isPlayable={card.id === topCard.id}
                                    draggable={card.id === topCard.id}
                                    onClick={card.id === topCard.id ? () => handleSmartClick(card, `foundation-${foundationIndex}`) : undefined}
                                    onSolitaireDrop={(card, targetZoneId) => performCardDrop(card, `foundation-${foundationIndex}`, targetZoneId)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyFoundationSymbols}>
                            <span><span className={styles.redSymbol}>♥</span>♠</span>
                            <span>♣<span className={styles.redSymbol}>♦</span></span>
                        </div>
                    )}
                </div>
            );
        });
    };

    const renderWaste = () => {
        const visibleCards = gameState!.waste.slice(-3);

        return visibleCards.length > 0 && visibleCards.map((card, index) => {
            const isTopCard = index === visibleCards.length - 1;
            return (
                <motion.div
                    key={card.id}
                    className={`${styles.cardPlaceholder}`}
                    data-drop-zone={`waste`}
                    initial={{ x: 120, opacity: .25 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 50 }}
                >
                    <PlayingCard
                        card={card}
                        faceUp={true}
                        isPlayable={isTopCard}
                        draggable={isTopCard}
                        onClick={isTopCard ? () => handleSmartClick(card, 'waste') : undefined}
                        onSolitaireDrop={(card, targetZoneId) => performCardDrop(card, 'waste', targetZoneId)}
                    />
                </motion.div>
            );
        });
    };

    const renderStock = () => {
        if (gameState!.stock.length === 0) {
            return (
                <button className={`${styles.drawPile} ${styles.cardPlaceholder} ${styles.emptyPile}`} onClick={handleDealWaste}>
                    <div className={styles.emptyPileSymbOuter}>
                        <div className={styles.emptyPileSymbInner}></div>
                    </div>
                </button>
            );
        }
        return (
            <button className={styles.drawPileBtn} onClick={handleDealWaste}>
                <PlayingCard
                    enableLayoutID={false}
                    card={gameState!.stock[gameState!.stock.length - 1]}
                    faceUp={false}
                    isPlayable={false}
                    draggable={false}
                />
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
                    onClick={card.faceUp ? () => handleSmartClick(card, `tableau-${columnIndex}`) : undefined}
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
        <LayoutGroup>
            <div className={styles.solitaireTableContainer}>
                <div className={styles.boardWrapper}>
                    <div className={styles.topBoard}>
                        <div className={styles.foundationsContainer}>
                            {gameState ? renderFoundation() : (
                                <>
                                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                                    <span className={`${styles.foundation} ${styles.cardPlaceholder}`}></span>
                                </>
                            )}
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
                        {gameState ? renderTableau() : null}
                    </div>
                </div>
                <InfoMenu
                    handleStartGame={handleStartGame}
                    handleAbandonGame={handleAbandonGame}
                    gameId={gameId}
                />
            </div>
        </LayoutGroup>
    );
}