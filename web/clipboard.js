// copy to clipboard functionality
const clipboardBtn = document.getElementById('copy-to-clipboard');
const states = {
    default: {
        message: 'Copy to clipboard',
        class: 'btn-primary',
    },
    success: {
        message: 'Copied!',
        class: 'btn-success',
    },
    error: {
        message: 'Error!',
        class: 'btn-danger',
    },
};
const setClipboardButtonState = state => {
    clipboardBtn.classList.remove(...Object.values(states).map(state => state.class));
    clipboardBtn.classList.add(state.class);
    clipboardBtn.innerText = state.message;
}

let resetTimeout = null;
clipboardBtn.addEventListener('click', e => {
    const outputText = document.getElementById('output').value;
    let state = states.default;
    try {
        navigator.clipboard.writeText(outputText)
            .then(() => setClipboardButtonState(states.success));
    } catch (e) {
        setClipboardButtonState(states.error);
    }
    if (resetTimeout === null) {
        resetTimeout = setTimeout(() => {
            setClipboardButtonState(states.default)
            resetTimeout = null;
        }, 3000);
    }
})
