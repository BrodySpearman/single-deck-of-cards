'use client';
import type { Card, Rank, Suit } from "../../../types/deck-types";
import styles from './playing-card.module.scss';
import { GiSwordAltar } from "react-icons/gi";
import { FaRegChessQueen, FaRegChessKing } from "react-icons/fa6";
import { PIP_LAYOUTS } from "./pipFormat";
import { motion } from "framer-motion";
import { detectDropZone } from "../../games/general-functions";
import { useRef } from "react";

const SUIT_SYMBOL: Record<Suit, string> = {
    spades: '♠',
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
};

const FACE_ICON: Record<string, React.ReactNode> = {
    'J': <GiSwordAltar />,
    'Q': <FaRegChessQueen />,
    'K': <FaRegChessKing />,
};

interface playingCardProps {
    card: Card;
    faceUp: boolean;
    onClick?: () => void;
    isPlayable?: boolean;
    draggable?: boolean;
    enableLayoutID?: boolean;
    onDrop?: (card: Card, targetZoneId: string) => void;
    children?: React.ReactNode;
}

function CardBack() {
    return (
        <div className={styles.cardBack}>
            <div className={styles.cardBackPattern} />
        </div>
    );
}

export default function PlayingCard({
    card,
    onClick,
    faceUp,
    isPlayable,
    draggable,
    enableLayoutID = true,
    onDrop,
    children }: playingCardProps) {

    // Card colors // 
    const isRedSuit = card.suit === 'hearts' || card.suit === 'diamonds';
    const faceDownBorderColor = '#202e80f1';

    const cardColor = !faceUp
        ? faceDownBorderColor
        : isRedSuit ? '#861111ff' : '#b5b5b5';

    const cardGlowColor = !faceUp
        ? faceDownBorderColor
        : isRedSuit ? '#861111ff' : '#b5b5b5b3';

    // Card renders //
    function renderPips(card: Card) {
        const pips = PIP_LAYOUTS[card.rank];
        if (!pips) return ( // skip to face card
            <span className={styles.faceIcon} style={{ gridRow: 3, gridColumn: 2, }}>
                {FACE_ICON[card.rank]}
            </span>);

        return pips.map((pip, i) => (
            <span
                key={i}
                className={styles.pip}
                style={{ gridRow: pip.row, gridColumn: pip.col, transform: pip.flip ? 'rotate(180deg)' : 'none', }}
            >
                {SUIT_SYMBOL[card.suit]}
            </span>
        ));
    };

    const cardRef = useRef<HTMLDivElement>(null); // Needed for more complex animation work

    return (
        <motion.div
            data-card-drag
            drag={draggable}
            dragMomentum={false}
            style={{ position: 'relative' }}
            whileDrag={{ zIndex: 100, pointerEvents: 'none' as any }}
            dragSnapToOrigin={true}
            layoutId={enableLayoutID ? card.id : undefined}
            layout={enableLayoutID ? "position" : false}
            transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 },
                default: { duration: 0.2 }
            }}
            onDragEnd={(e, info) => {
                const pointerEvent = e as PointerEvent;
                const dropZoneId = detectDropZone(e.target as HTMLElement, pointerEvent.clientX, pointerEvent.clientY);
                if (dropZoneId) {
                    onDrop?.(card, dropZoneId);
                }
            }}
            dragElastic={1}
            onLayoutAnimationStart={() => {
                if (cardRef.current) cardRef.current.style.zIndex = '9999';
            }}
            onLayoutAnimationComplete={() => {
                if (cardRef.current) cardRef.current.style.zIndex = '999';
            }}
        >
            <motion.div
                onClick={onClick}
                className={`${styles.playingCardContainer} no-highlight`}
                whileHover={isPlayable ? { y: -5 } : {}}
                style={{
                    border: `.1rem solid ${cardColor}`,
                    boxShadow: `0px 0px 3px 1px ${cardGlowColor}`,
                    WebkitBoxShadow: `0px 0px 3px 1px ${cardGlowColor}`,
                    MozBoxShadow: `0px 0px 3px 1px ${cardGlowColor}`,
                    color: cardGlowColor,
                }}>
                {faceUp ?
                    <>
                        <div className={styles.numberSuitCorners}>
                            <div className={`${styles.topLeft} ${styles.corner}`}>{card.rank}<br></br> {SUIT_SYMBOL[card.suit]}</div>
                            <div className={`${styles.bottomRight} ${styles.corner}`}>{card.rank}<br></br> {SUIT_SYMBOL[card.suit]}</div>
                        </div>
                        <div className={styles.centerContainer}>
                            <div className={styles.suitGrid}>
                                {renderPips(card)}
                            </div>
                        </div>
                    </>
                    : <CardBack />
                }
            </motion.div>
            {children}
        </motion.div>
    );
};