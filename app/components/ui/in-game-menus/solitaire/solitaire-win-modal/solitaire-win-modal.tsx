import styles from "./solitaire-win-modal.module.scss";

interface SolitaireWinModalProps {
    winTime: number | null;
}

export default function SolitaireWinModal({ winTime }: SolitaireWinModalProps) {
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
                <p className={`${styles.thankYouText} ${styles.menuText}`}>Thank you as always for playing.</p>
                <p className={`${styles.disclaimerText} ${styles.menuText}`}>This is still a WIP, with more game statistics and analysis coming in the future.</p>

                <p className={`${styles.gameTimeText} ${styles.menuText}`}>{formatTime(winTimeSeconds)}</p>

                <div className={styles.menuBtnContainer}>
                    <button
                        className={`${styles.menuBtn} ${styles.menuText} ${styles.newGameBtn}`}
                        onClick={() => { }}
                    >
                        Restart
                    </button>
                    <button
                        className={`${styles.menuBtn} ${styles.menuText} ${styles.closeBtn}`}
                        onClick={() => { }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}