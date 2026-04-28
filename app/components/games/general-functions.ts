/// General Card/Game Functions ///

// detects which drop zone is under dragged element at given coordinates
// temporarily hides dragged element so elementFromPoint sees through it.
export function detectDropZone(draggedEl: HTMLElement, x: number, y: number): string | null {
    const dropZones = document.querySelectorAll('[data-drop-zone]');

    for (const dropZone of dropZones) {
        const rect = dropZone.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top) {
            const zoneID = dropZone.getAttribute('data-drop-zone');
            if (zoneID?.startsWith('tableau') || y <= rect.bottom) {
                return zoneID;
            }
        }
    }
    return null;
}
