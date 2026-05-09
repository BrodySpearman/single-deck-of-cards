import styles from "./solitaire-win-modal.module.scss";

export default function SolitaireWinModal() {
    return (
        <div className={styles.solitaireWinModalWrapper}>
            <div className={styles.solitaireWinMenuContainer}>
                <h1 className={styles.menuHeader}>Nice Job!</h1>
                <p className={`${styles.thankYouText} ${styles.menuText}`}>Thank you as always for playing.</p>
                <p className={`${styles.disclaimerText} ${styles.menuText}`}>This is still a WIP, with more game statistics and analysis coming in the future.</p>

                <p className={`${styles.gameTimeText} ${styles.menuText}`}>Time: [time]</p>

                <div className={styles.menuBtnContainer}>
                    <button
                        className={`${styles.menuBtn} ${styles.menuText} ${styles.newGameBtn}`}
                        onClick={() => { }}
                    >
                        New Game
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