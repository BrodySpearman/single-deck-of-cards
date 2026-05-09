interface DebugMenuProps {
    onSimulateWinClick: () => void;
}

export default function DebugMenu({ onSimulateWinClick }: DebugMenuProps) {
    return (
        <div style={{ position: "fixed", bottom: "2rem", left: "2rem", zIndex: 100 }}>
            <button onClick={onSimulateWinClick}>Toggle win menu</button>
        </div>
    )
}