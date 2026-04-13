'use client';
import type { Card, Rank, Suit } from "../../../types/deck-types";
import styles from './playing-card.module.scss';
import { GiSwordAltar } from "react-icons/gi";
import { FaRegChessQueen, FaRegChessKing } from "react-icons/fa6";
import { PIP_LAYOUTS } from "./pipFormat";
import { motion } from "framer-motion";
import { detectDropZone } from "../../games/general-functions";


const SUIT_SYMBOL: Record<Suit, string> = {
    spades: '♠',
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
};

const FACE_ICON: Record<string, React.ReactNode> = {
    'J': <GiSwordAltar size={60} />,
    'Q': <FaRegChessQueen size={60} />,
    'K': <FaRegChessKing size={60} />,
};

interface playingCardProps {
    card: Card;
    faceUp: boolean;
    onClick?: () => void;
    isPlayable?: boolean;
    draggable?: boolean;
    onSolitaireDrop?: (card: Card, targetZoneId: string) => void;
    children?: React.ReactNode;
}

export default function PlayingCard({ card, onClick, faceUp, isPlayable, draggable, onSolitaireDrop, children }: playingCardProps) {
    const faceDownBorderColor = '#222f79';

    const renderCardBack = () => {
        return (
            <div className={styles.cardBack}>
                <div className={styles.cardBackPattern}></div>
            </div>
        );
    }

    const renderPips = () => {
        const pips = PIP_LAYOUTS[card.rank];
        if (!pips) return ( // skip to face card
            <span
                style={{
                    gridRow: 3,
                    gridColumn: 2,
                }}>
                {FACE_ICON[card.rank]}
            </span>);

        return pips.map((pip, i) => (
            <span
                key={i}
                className={styles.pip}
                style={{
                    gridRow: pip.row,
                    gridColumn: pip.col,
                    transform: pip.flip ? 'rotate(180deg)' : 'none',
                }}>
                {SUIT_SYMBOL[card.suit]}
            </span>
        ));
    }

    return (
        <motion.div
            data-card-drag
            drag={draggable}
            dragMomentum={false}
            whileDrag={{ zIndex: 100, pointerEvents: 'none' as any }}
            whileHover={isPlayable ? { y: -5 } : {}}
            dragSnapToOrigin={true}
            onDragEnd={(e, info) => {
                const pointerEvent = e as PointerEvent;
                const dropZoneId = detectDropZone(e.target as HTMLElement, pointerEvent.clientX, pointerEvent.clientY);
                if (dropZoneId) {
                    onSolitaireDrop?.(card, dropZoneId);
                }
            }}
            dragElastic={1}
            transition={{ duration: 0.2 }}
        >
            <div
                onClick={onClick}
                className={`${styles.playingCardContainer} no-highlight`}
                style={{
                    border: `.1rem solid ${card.faceUp ? card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5' : faceDownBorderColor}`,
                    boxShadow: `0px 0px 3px 1px ${card.faceUp ? card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3' : faceDownBorderColor}`,
                    WebkitBoxShadow: `0px 0px 3px 1px ${card.faceUp ? card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3' : faceDownBorderColor}`,
                    MozBoxShadow: `0px 0px 3px 1px ${card.faceUp ? card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3' : faceDownBorderColor}`,
                    color: card.faceUp ? card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3' : faceDownBorderColor,
                }}>
                {faceUp ?
                    <>
                        <div className={styles.numberSuitCorners}>
                            <div className={`${styles.topLeft} ${styles.corner}`}>{card.rank}<br></br> {SUIT_SYMBOL[card.suit]}</div>
                            <div className={`${styles.bottomRight} ${styles.corner}`}>{card.rank}<br></br> {SUIT_SYMBOL[card.suit]}</div>
                        </div>
                        <div className={styles.centerContainer}>
                            <div className={styles.suitGrid}>
                                {renderPips()}
                            </div>
                        </div>
                    </> :
                    renderCardBack()
                }
            </div>
            {children}
        </motion.div>
    );
};