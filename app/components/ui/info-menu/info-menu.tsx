import styles from "./info-menu.module.scss";
import { TbCardsFilled, TbPlayCardKFilled } from "react-icons/tb";
import { IoIosMore } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";

interface InfoMenuProps {
    handleStartGame: (drawCount: 1 | 3) => void;
}

export default function InfoMenu({ handleStartGame }: InfoMenuProps) {
    const [selectedGameType, setSelectedGameType] = useState<'1' | '3'>('3');

    const selectGameType = (gameType: '1' | '3') => {
        setSelectedGameType(gameType);
    }

    return (
        <>
            <div className={styles.menuShell}>
                <div className={styles.infoMenuContainer}>

                    <button className={styles.startBtn} onClick={() => handleStartGame(Number(selectedGameType) as 1 | 3)}>
                        <span className={styles.startBtnSym}>♠</span>
                        <span className={styles.startBtnText}>
                            {`PLAY ${selectedGameType} CARD`}
                        </span>
                        <span className={styles.startBtnSym}>♠</span>
                    </button>

                    <div className={`${styles.gameTypeSelection}`}>
                        <button
                            className={selectedGameType === '1' ?
                                `${styles.gameTypeBtn} ${styles.gameType1Card} ${styles.selected}` :
                                `${styles.gameTypeBtn} ${styles.gameType1Card}`
                            }
                            onClick={() => selectGameType('1')}>
                            <span><TbPlayCardKFilled /></span>
                        </button>

                        <button
                            className={selectedGameType === '3' ?
                                `${styles.gameTypeBtn} ${styles.gameType3Card} ${styles.selected}` :
                                `${styles.gameTypeBtn} ${styles.gameType3Card}`
                            }
                            onClick={() => selectGameType('3')}>
                            <span><TbCardsFilled /></span>
                        </button>
                    </div>

                    <div className={`${styles.selectOtherGames} ${styles.navBtn}`}>
                        <IoIosMore />
                    </div>

                    <div className={`${styles.gameSettings} ${styles.navBtn}`}>
                        <IoSettingsOutline />
                    </div>

                </div>
            </div>
        </>

    );
}