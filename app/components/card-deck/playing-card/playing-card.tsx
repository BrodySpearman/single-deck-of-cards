import type { Card, Rank, Suit } from "../types";
import styles from './playing-card.module.css';
import { GiSwordAltar } from "react-icons/gi";
import { FaRegChessQueen, FaRegChessKing } from "react-icons/fa6";


export default function PlayingCard({ card }: { card: Card }) {
    return (
        <div className={styles.playingCardContainer}>
            {card.rank} {card.suit}
        </div>
    );
};