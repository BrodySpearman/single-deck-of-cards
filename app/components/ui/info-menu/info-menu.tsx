import styles from "./info-menu.module.scss";
import { TbCardsFilled, TbPlayCardKFilled } from "react-icons/tb";
import { IoIosMore } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import SolitaireHud from "../in-game-menus/solitaire/solitaire-hud";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

interface InfoMenuProps {
    handleStartGame: (drawCount: 1 | 3) => void;
    handleAbandonGame: () => void;
    gameId: number;
}

export default function InfoMenu({ handleStartGame, handleAbandonGame, gameId }: InfoMenuProps) {
    const [selectedGameType, setSelectedGameType] = useState<'1' | '3'>('3');

    const selectGameType = (gameType: '1' | '3') => {
        setSelectedGameType(gameType);
    }

    return (
        <div className={styles.menuShell}>
            <div className={styles.infoMenuContainer}>
                <AnimatePresence mode="wait">
                    {gameId === 0 ?
                        <motion.div
                            key="baseMenu"
                            className={styles.baseMenu}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: .15 }}
                        >
                            <button
                                className={styles.startBtn}
                                onClick={() => handleStartGame(Number(selectedGameType) as 1 | 3)}
                                data-tooltip-id="info-menu-start-game"
                                data-tooltip-content={`Play ${selectedGameType} card solitaire.`}
                                data-tooltip-float={true}
                            >
                                <Tooltip
                                    id="info-menu-start-game"
                                    place="top"
                                    className={styles.tooltip}
                                />
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
                                    onClick={() => selectGameType('1')}
                                    data-tooltip-id="info-menu-1-card"
                                    data-tooltip-content="1 card"
                                    data-tooltip-float={true}
                                >
                                    <Tooltip
                                        id="info-menu-1-card"
                                        place="top"
                                        className={styles.tooltip}
                                    />
                                    <span><TbPlayCardKFilled /></span>
                                </button>

                                <button
                                    className={selectedGameType === '3' ?
                                        `${styles.gameTypeBtn} ${styles.gameType3Card} ${styles.selected}` :
                                        `${styles.gameTypeBtn} ${styles.gameType3Card}`
                                    }
                                    onClick={() => selectGameType('3')}
                                    data-tooltip-id="info-menu-3-card"
                                    data-tooltip-content="3 card"
                                    data-tooltip-float={true}
                                >
                                    <Tooltip
                                        id="info-menu-3-card"
                                        place="top"
                                        className={styles.tooltip}
                                    />
                                    <span><TbCardsFilled /></span>
                                </button>
                            </div>

                            <div
                                className={`${styles.selectOtherGames} ${styles.navBtn}`}
                                data-tooltip-id="info-menu-more-games"
                                data-tooltip-content="View other games (coming soon)."
                                data-tooltip-float={true}
                            >
                                <Tooltip
                                    id="info-menu-more-games"
                                    place="top"
                                    className={styles.tooltip}
                                />
                                <IoIosMore />
                            </div>

                            <div
                                className={`${styles.gameSettings} ${styles.navBtn}`}
                                data-tooltip-id="info-menu-game-settings"
                                data-tooltip-content="Game Settings (coming soon)."
                                data-tooltip-float={true}
                            >
                                <Tooltip
                                    id="info-menu-game-settings"
                                    place="top"
                                    className={styles.tooltip}
                                />
                                <IoSettingsOutline />
                            </div>
                        </motion.div>
                        :
                        <motion.div
                            key="solitaireHud"
                            className={styles.solitaireHudWrapper}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: .15 }}
                        >
                            <SolitaireHud
                                gameId={gameId}
                                onAbandonGame={handleAbandonGame}
                                onRestartGame={() => handleStartGame(Number(selectedGameType) as 1 | 3)}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}