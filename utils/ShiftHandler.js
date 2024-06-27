// Слушатель события нажатие на кнопку Shift



class ShiftHandler {
    constructor() {
        this.isShiftPressed = false;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    init(setIsShiftPressed) {
        this.setIsShiftPressed = setIsShiftPressed;
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(event) {
        if (event.key === 'Shift') {
            this.isShiftPressed = true;
            if (this.setIsShiftPressed) {
                this.setIsShiftPressed(true);
            }
        }
    }

    handleKeyUp(event) {
        if (event.key === 'Shift') {
            this.isShiftPressed = false;
            if (this.setIsShiftPressed) {
                this.setIsShiftPressed(false);
            }
        }
    }

    cleanup() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }
}

export default new ShiftHandler();
