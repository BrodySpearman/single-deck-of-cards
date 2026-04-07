/// General Card/Game Functions ///

// captures and returns the respective drop zone ID of a given card or space
// mainly used in playing-card.tsx for drag object detection.
export function getDropZoneId(x: number, y: number): string | null {
    const eleUnderMouse = document.elementsFromPoint(x, y);
    const dropZone = eleUnderMouse?.find(el => el.getAttribute('data-drop-zone'));
    return dropZone ? dropZone.getAttribute('data-drop-zone') : null;
}