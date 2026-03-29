'use client';
import type { Card, Rank, Suit } from "../types";
import styles from './playing-card.module.scss';
import { GiSwordAltar } from "react-icons/gi";
import { FaRegChessQueen, FaRegChessKing } from "react-icons/fa6";
import { PIP_LAYOUTS } from "./format";
import { motion } from "framer-motion";


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
    onClick?: () => void;
    faceUp: boolean;
}

export default function PlayingCard({ card, onClick, faceUp }: playingCardProps) {

    const renderPips = () => {
        const pips = PIP_LAYOUTS[card.rank];
        if (!pips) return (// skip to face card
            <div
                style={{
                    gridRow: 3,
                    gridColumn: 2,
                }}>
                {FACE_ICON[card.rank]}
            </div>);

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
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className={`${styles.playingCardContainer} no-highlight`}
            style={{
                border: `.1rem solid ${card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5'}`,
                boxShadow: `0px 0px 5px 1px ${card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3'}`,
                WebkitBoxShadow: `0px 0px 5px 1px ${card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3'}`,
                MozBoxShadow: `0px 0px 5px 1px ${card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3'}`,
                color: card.suit === 'hearts' || card.suit === 'diamonds' ? '#861111ff' : '#b5b5b5b3',
                filter: faceUp ? 'none' : 'brightness(0) invert(1)',
            }}>
            <div className={styles.numberSuitCorners}>
                <div className={`${styles.topLeft} ${styles.corner}`}>{card.rank}<br></br> {SUIT_SYMBOL[card.suit]}</div>
                <div className={`${styles.bottomRight} ${styles.corner}`}>{card.rank}<br></br> {SUIT_SYMBOL[card.suit]}</div>
            </div>
            <div className={styles.centerContainer}>
                <div className={styles.suitGrid}>
                    {faceUp ? renderPips() : null}
                </div>
            </div>
        </motion.div>
    );
};