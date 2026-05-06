import { useState, useEffect } from "react";
import styles from "./solitaire-hud.module.scss";
import genStyles from "../../info-menu/info-menu.module.scss";

import { CgUndo } from "react-icons/cg";
import { TbCircleLetterRFilled } from "react-icons/tb";
import { MdOutlineExitToApp } from "react-icons/md";

interface SolitaireHudProps {
    gameId: number;
    onRestartGame: () => void;
    onAbandonGame: () => void;
}

export default function SolitaireHud({ gameId, onAbandonGame, onRestartGame }: SolitaireHudProps) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (gameId === 0) return;

        const startTime = Date.now();
        setTime(0);

        const timer = setInterval(() => {
            setTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000)

        return () => clearInterval(timer);
    }, [gameId])

    const formatTime = (totalSeconds: number): string => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        return [h, m, s]
            .map(unit => unit.toString().padStart(2, '0'))
            .join(':');
    }

    return (
        <div className={styles.solitaireHud}>
            <div className={`${styles.timer} no-highlight`}>
                <span>{formatTime(time)}</span>
            </div>

            <button className={`${genStyles.navBtn} ${styles.undoBtn} ${styles.gameBtn}`}>
                <CgUndo />
            </button>

            <button
                className={`${genStyles.navBtn} ${styles.restartBtn} ${styles.gameBtn}`}
                onClick={onRestartGame}
            >
                <TbCircleLetterRFilled />
            </button>

            <button
                className={`${genStyles.navBtn} ${styles.abandonGameBtn} ${styles.gameBtn}`}
                onClick={() => onAbandonGame()}
            >
                <MdOutlineExitToApp />
            </button>
        </div>
    )
}