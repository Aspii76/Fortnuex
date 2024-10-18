// Inicialización de variables
let coins = 0;
let autoClicker = null;
let autoGainActive = false;
let upgradeCost = 10;
let manualIncrementValue = 1;
const clickSound = new Audio('sounds/click-sound.mp3');

// Función para reproducir el sonido de clic
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(console.error);
}

// Cargar el estado del juego desde localStorage
function loadGameState() {
    coins = parseInt(localStorage.getItem('coins'), 10) || coins;
    autoGainActive = localStorage.getItem('autoGainActive') === 'true';
    upgradeCost = parseInt(localStorage.getItem('upgradeCost'), 10) || upgradeCost;
    manualIncrementValue = parseInt(localStorage.getItem('manualIncrementValue'), 10) || manualIncrementValue;

    if (autoGainActive) startAutoGain();
    updateUI();
}

// Función para actualizar la interfaz de usuario
function updateUI() {
    document.getElementById('CoinsNumb').textContent = `${coins}€`;
    document.getElementById('upgradeCostText').textContent = `Cost: ${upgradeCost}€`;
    const autoGainButton = document.getElementById('AutoGainButton');
    autoGainButton.textContent = autoGainActive ? "Desactivate AutoGain" : "Activate AutoGain";
    autoGainButton.style.backgroundColor = autoGainActive ? "#dc3545" : "#28a745";
}

// Función para guardar el estado del juego en localStorage
function saveGameState() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('autoGainActive', autoGainActive);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('manualIncrementValue', manualIncrementValue);
}

// Función para reiniciar el juego
function restartGame() {
    document.getElementById('confirmDialog').classList.add('show');
}

// Función para confirmar el reinicio del juego
function confirmRestartGame() {
    coins = 0;
    autoGainActive = false;
    upgradeCost = 10;
    manualIncrementValue = 1;
    localStorage.clear();
    clearInterval(autoClicker);
    autoClicker = null;
    updateUI();
    cancelRestartGame();
}

// Función para cancelar el reinicio del juego
function cancelRestartGame() {
    document.getElementById('confirmDialog').classList.remove('show');
}

// Asignar eventos a los botones de confirmación
document.getElementById('confirmYes').addEventListener('click', confirmRestartGame);
document.getElementById('confirmNo').addEventListener('click', cancelRestartGame);

// Función para incrementar monedas manualmente
function increment() {
    coins += manualIncrementValue;
    updateUI();
    saveGameState();
}

// Función para alternar el AutoGain
function toggleAutoGain() {
    autoGainActive = !autoGainActive;
    autoGainActive ? startAutoGain() : clearInterval(autoClicker);
    updateUI();
}

// Función para iniciar AutoGain
function startAutoGain() {
    autoClicker = setInterval(increment, 1000);
}

// Función para mejorar el AutoClicker
function upgradeAutoClicker(event) {
    event.preventDefault();
    if (coins >= upgradeCost) {
        coins -= upgradeCost;
        upgradeCost *= 2;
        manualIncrementValue += 3;
        updateUI();
        saveGameState();
    }
}

// Asignar el sonido de clic a todos los botones de la página
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playClickSound);
});

// Cargar el estado del juego al inicio
loadGameState();
