import styles from "./solitaire-win-modal.module.scss";
import { CgUndo } from "react-icons/cg";
import { RiCloseCircleLine } from "react-icons/ri";
import Image from "next/image";
import smile from "@/public/smile.png"

interface SolitaireWinModalProps {
    winTime: number | null;
    onNewGame: () => void;
    onClose: () => void;
    stats: {
        score: number;
        finalMoveCount: number;
    }
}

export default function SolitaireWinModal({ winTime, onNewGame, onClose, stats }: SolitaireWinModalProps) {
    const winTimeSeconds = winTime ? Math.floor(winTime / 1000) : null;

    const formatTime = (totalSeconds: number | null): string => {
        if (totalSeconds === null) return "00:00:00";
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        return [h, m, s]
            .map(unit => unit.toString().padStart(2, '0'))
            .join(':');
    }

    return (
        <div className={styles.solitaireWinModalWrapper}>
            <div className={`${styles.solitaireWinMenuContainer} no-highlight`}>
                <h1 className={styles.menuHeader}>Nice Job!</h1>

                <div className={styles.imageContainer}>
                    <Image
                        src={smile}
                        alt="Smile"
                        width={150}
                        height={150}
                    />
                </div>

                <p className={`${styles.thankYouText} ${styles.menuText}`}>Thank you as always for playing.</p>
                <p className={`${styles.disclaimerText} ${styles.menuText}`}>This is still a WIP, with more game statistics and analysis coming in the future.</p>

                <p className={`${styles.gameTimeText} ${styles.menuText}`}>
                    {formatTime(winTimeSeconds)}
                </p>
                <div className={`${styles.scoreAndMovesContainer} no-highlight`}>
                    <div className={`${styles.gameScoreDiv}`}>
                        <p className={`${styles.finalStatLabel} ${styles.menuText}`}>Score</p>
                        <p className={`${styles.gameScoreText} ${styles.menuText}`}>{stats.score}</p>
                    </div>
                    <div className={`${styles.gameMovesDiv}`}>
                        <p className={`${styles.finalStatLabel} ${styles.menuText}`}>Moves</p>
                        <p className={`${styles.gameMovesText} ${styles.menuText}`}>{stats.finalMoveCount}</p>
                    </div>
                </div>

                <div className={styles.menuBtnContainer}>
                    <button
                        className={`${styles.menuBtn} ${styles.menuText} ${styles.newGameBtn}`}
                        onClick={onNewGame}
                    >
                        <span>Restart</span>
                        <CgUndo size={22} />
                    </button>
                    <button
                        className={`${styles.menuBtn} ${styles.menuText} ${styles.closeBtn}`}
                        onClick={onClose}
                    >
                        <span>Close</span>
                        <RiCloseCircleLine size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}