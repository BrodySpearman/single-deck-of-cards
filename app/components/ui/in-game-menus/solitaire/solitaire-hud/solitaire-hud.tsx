import { useEffect, useState, useRef } from "react";

import styles from "./solitaire-hud.module.scss";
import genStyles from "../../../info-menu/info-menu.module.scss";

import { CgUndo } from "react-icons/cg";
import { TbCircleLetterRFilled } from "react-icons/tb";
import { MdOutlineExitToApp } from "react-icons/md";

import { Tooltip } from "react-tooltip";

interface SolitaireHudProps {
    actions: {
        start: (count: 1 | 3) => void;
        abandon: () => void;
        undo: () => void;
        draw: () => void;
    }
    stats: {
        score: number;
        moves: number;
        gameId: number;
    }
    canUndo: boolean;
    gameWinTimerStop: boolean;
    selectedGameType: '1' | '3';
}

export default function SolitaireHud({ actions, stats, canUndo, gameWinTimerStop, selectedGameType }: SolitaireHudProps) {
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (stats.gameId === 0) return;

        const startTime = Date.now();
        setTime(0);

        timerRef.current = setInterval(() => {
            setTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [stats.gameId]);

    useEffect(() => {
        if (gameWinTimerStop && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [gameWinTimerStop]);

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
            <div className={`${styles.hudDisplayVal} ${styles.timer} no-highlight`}>
                <span>{formatTime(time)}</span>
            </div>
            <div className={`${styles.hudDisplayVal} ${styles.score} no-highlight`}>
                <span className={`${styles.statLabel}`}>score</span>
                <span className={`${styles.scoreCount}`}>{stats.score}</span>
            </div>
            <div className={`${styles.hudDisplayVal} ${styles.moves} no-highlight`}>
                <span className={`${styles.statLabel}`}>moves</span>
                <span className={`${styles.moveCount}`}>{stats.moves}</span>
            </div>

            <button
                className={`${genStyles.navBtn} ${styles.undoBtn} ${styles.gameBtn}`}
                data-tooltip-id="solitaire-hud-undo"
                data-tooltip-content="Undo"
                data-tooltip-float={true}
                onClick={actions.undo}
                disabled={!canUndo}
            >
                <Tooltip
                    id="solitaire-hud-undo"
                    place="top"
                    className={genStyles.tooltip}
                />
                <CgUndo />
            </button>

            <button
                className={`${genStyles.navBtn} ${styles.restartBtn} ${styles.gameBtn}`}
                data-tooltip-id="solitaire-hud-restart"
                data-tooltip-content="Restart"
                data-tooltip-float={true}
                onClick={() => actions.start(Number(selectedGameType) as 1 | 3)}
            >
                <Tooltip
                    id="solitaire-hud-restart"
                    place="top"
                    className={genStyles.tooltip}
                />
                <TbCircleLetterRFilled />
            </button>

            <button
                className={`${genStyles.navBtn} ${styles.abandonGameBtn} ${styles.gameBtn}`}
                data-tooltip-id="solitaire-hud-abandon"
                data-tooltip-content="Abandon game"
                data-tooltip-float={true}
                onClick={() => actions.abandon()}
            >
                <Tooltip
                    id="solitaire-hud-abandon"
                    place="top"
                    className={genStyles.tooltip}
                />
                <MdOutlineExitToApp />
            </button>
        </div>
    )
}