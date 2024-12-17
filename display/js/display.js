document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript verbunden!");
  
    const elements = {
        maxMinutesInput: document.getElementById("max-minutes"),
        maxSecondsInput: document.getElementById("max-seconds"),
        setMaxTimeButton: document.querySelector('[data-action="set-max-time"]'),
        toggle: document.querySelector('[data-action="toggle"]'),
        reset: document.querySelector('[data-action="reset"]'),
        toggleMode: document.querySelector('[data-action="toggle-mode"]'),
        increaseMinutes: document.querySelector('[data-action="increase-minutes"]'),
        decreaseMinutes: document.querySelector('[data-action="decrease-minutes"]'),
        increaseSeconds: document.querySelector('[data-action="increase-seconds"]'),
        decreaseSeconds: document.querySelector('[data-action="decrease-seconds"]'),
        minutes: document.querySelector('.minutes'),
        seconds: document.querySelector('.seconds'),
        dynamicTimers: document.getElementById("dynamic-timers"),
        teamAInput: document.getElementById("team-a-name"),
        teamBInput: document.getElementById("team-b-name"),
        setTeamAButton: document.querySelector('[data-action="set-team-a"]'),
        setTeamBButton: document.querySelector('[data-action="set-team-b"]'),
        teamAScore: document.getElementById("team-a-score"),
        teamBScore: document.getElementById("team-b-score"),
        increaseTeamAScore: document.querySelector('[data-action="increase-team-a-score"]'),
        decreaseTeamAScore: document.querySelector('[data-action="decrease-team-a-score"]'),
        increaseTeamBScore: document.querySelector('[data-action="increase-team-b-score"]'),
        decreaseTeamBScore: document.querySelector('[data-action="decrease-team-b-score"]'),
        addPenaltyTimerTeamA: document.querySelector('[data-action="add-penalty-team-a"]'),
        addPenaltyTimerTeamB: document.querySelector('[data-action="add-penalty-team-b"]'),
        helperMinutes: document.querySelector('.helper-minutes'),
        helperSeconds: document.querySelector('.helper-seconds'),
        currentPeriod: document.getElementById("current-period"),
        nextPeriodButton: document.querySelector('[data-action="next-period"]'),
        previousPeriodButton: document.querySelector('[data-action="previous-period"]'),
        shootoutTeamA: document.getElementById('team-a-shootout'),
        shootoutTeamB: document.getElementById('team-b-shootout'),
        shootoutMissTeamA: document.querySelector('[data-action="shootout-miss-team-a"]'),
        shootoutScoreTeamA: document.querySelector('[data-action="shootout-score-team-a"]'),
        shootoutMissTeamB: document.querySelector('[data-action="shootout-miss-team-b"]'),
        shootoutScoreTeamB: document.querySelector('[data-action="shootout-score-team-b"]'),
        shootoutAddTeamA: document.querySelector('[data-action="shootout-add-team-a"]'),
        shootoutAddTeamB: document.querySelector('[data-action="shootout-add-team-b"]'),
        breakMinutesInput: document.getElementById("break-minutes"),
        breakSecondsInput: document.getElementById("break-seconds"),
        setBreakTimeButton: document.querySelector('[data-action="set-break-time"]'),
        breakMinutes: document.querySelector('.break-minutes'),
        breakSeconds: document.querySelector('.break-seconds'),
        resetBreakTimerButton: document.querySelector('[data-action="reset-break-timer"]'),
        toggleDelayedPenaltyTeamA: document.querySelector('[data-action="toggle-delayed-penalty-team-a"]'),
        toggleDelayedPenaltyTeamB: document.querySelector('[data-action="toggle-delayed-penalty-team-b"]'),
        toggleEmptyNetTeamA: document.querySelector('[data-action="toggle-empty-net-team-a"]'),
        toggleEmptyNetTeamB: document.querySelector('[data-action="toggle-empty-net-team-b"]'),
        statusTeamA: document.getElementById("status-team-a"),
        statusTeamB: document.getElementById("status-team-b"),
        csvInputTeamA: document.getElementById("csv-input-team-a"),
        csvInputTeamB: document.getElementById("csv-input-team-b"),
        lineupTeamA: document.querySelector("#lineup-team-a tbody"),
        lineupTeamB: document.querySelector("#lineup-team-b tbody"),
        resetAllButton: document.querySelector('[data-action="reset-all"]'),
        fullStrengthDisplay: document.getElementById("full-strength-display"),
        championshipInput: document.getElementById("championship"),
        setChampionshipButton: document.querySelector('[data-action="set-championship"]'),
        teamAColor: document.getElementById("team-a-color"),
        teamBColor: document.getElementById("team-b-color"),
        teamAPlacement: document.getElementById("team-a-placement"),
        teamBPlacement: document.getElementById("team-b-placement"),
        venueInput: document.getElementById("venue"),
        setVenueButton: document.querySelector('[data-action="set-venue"]'),
        dateTimeInput: document.getElementById("date-time"),
        setDateTimeButton: document.querySelector('[data-action="set-date-time"]'),
        associationLogo: document.getElementById("association-logo"),
        associationLogoPreview: document.getElementById("association-logo-preview"), // Vorschau für Verband
        teamALogo: document.getElementById("team-a-logo"),
        teamALogoPreview: document.getElementById("team-a-logo-preview"), // Vorschau für Team A
        teamBLogo: document.getElementById("team-b-logo"),
        teamBLogoPreview: document.getElementById("team-b-logo-preview"), // Vorschau für Team B
        fullStrengthGlobal: document.getElementById("full-strength-global"),
        slideshowContainer: document.getElementById("slideshow-container"),
        scoreboard: document.querySelector(".scoreboard"),
        toggleSlideshowButton: document.getElementById("toggle-slideshow"),
        toggleScoreboardButton: document.getElementById("toggle-scoreboard"),
        slideshowImage: document.getElementById("slideshow-image"),
      };      
  
    let MAX_TIME = 20 * 60; // Standardwert: 20 Minuten in Sekunden
    let timerTime = 20 * 60; // Standardwert: 20 Minuten in Sekunden
    let breakTime = 10 * 60; // Pausenzeit: 10 Minuten in Sekunden
    let interval = null;
    let breakInterval = null;
    let isRunning = false;
    let isCountingUp = false; // Modus: false = Abwärts, true = Aufwärts
    let teamAScore = 0;
    let teamBScore = 0;
    let penaltyTimerCounterA = 0; // Zähler für Team A
    let penaltyTimerCounterB = 0; // Zähler für Team B
    const penaltyTimersTeamA = []; // Liste der Penalty-Timer für Team A
    const penaltyTimersTeamB = []; // Liste der Penalty-Timer für Team B
    const periods = ["1st Period", "2nd Period", "3rd Period", "Overtime", "Shootout"]; // Periodenliste
    let currentPeriodIndex = 0; // Start bei "1st"
    let shootoutIndexTeamA = 0; // Fortschritt für Team A
    let shootoutIndexTeamB = 0; // Fortschritt für Team B
    const maxShootoutRounds = 5; // Maximale Anzahl von Runden
    let isDelayedPenaltyTeamA = false;
    let isEmptyNetTeamA = false;
    let isDelayedPenaltyTeamB = false;
    let isEmptyNetTeamB = false;
    let images = [];
    let currentIndex = 0;
    let slideshowInterval;

    // **Hilfsfunktionen**
    const log = (message) => {
      const [mins, secs] = [Math.floor(timerTime / 60), timerTime % 60];
      console.log(`[LOG] [Haupttimer: ${pad(mins)}:${pad(secs)}] - ${message}`);
    };
  
    const pad = (number) => (number < 10 ? '0' + number : number);
  
    const updateDisplay = () => {
        // Haupttimer-Anzeige
        const [mainMins, mainSecs] = [Math.floor(timerTime / 60), timerTime % 60];
        elements.minutes.innerText = pad(mainMins);
        elements.seconds.innerText = pad(mainSecs);
    
        // Hilfstimer-Anzeige (Umgekehrte Richtung)
        const helperTime = isCountingUp
            ? MAX_TIME - timerTime // Bei Aufwärts zählt der Hilfstimer abwärts
            : MAX_TIME - timerTime; // Bei Abwärts zählt der Hilfstimer aufwärts
        const [helperMins, helperSecs] = [Math.floor(helperTime / 60), helperTime % 60];
        elements.helperMinutes.innerText = pad(helperMins);
        elements.helperSeconds.innerText = pad(helperSecs);
    };
    
    const toggleMode = () => {
        isCountingUp = !isCountingUp;
        log(`Modus geändert zu: ${isCountingUp ? "Aufwärts" : "Abwärts"}`);
        elements.toggleMode.innerText = isCountingUp ? "Modus: Aufwärts" : "Modus: Abwärts";
        updateDisplay();
    };
    
    const resetHelperTimer = () => {
        helperTime = isCountingUp ? MAX_TIME : 0;
    };
    
    // **PenaltyTimer**
    const createPenaltyTimer = (team) => {
        const isTeamA = team === "A";
        const lineupData = isTeamA ? elements.lineupTeamA : elements.lineupTeamB;
    
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Penalty-Timer für ${isTeamA ? "Team A" : "Team B"} wählen:</h3>
                <p>Bitte wählen Sie die Penalty-Dauer:</p>
                <button data-time="120">2 Min (02:00)</button>
                <button data-time="240">2+2 Min (04:00)</button>
                <button data-time="300">5 Min (05:00)</button>
                <button data-action="cancel">Abbrechen</button>
            </div>
        `;
        document.body.appendChild(modal);
    
        modal.addEventListener("click", (e) => {
            const action = e.target.getAttribute("data-action");
            const time = e.target.getAttribute("data-time");
    
            if (action === "cancel") {
                modal.remove();
            } else if (time) {
                const timeValue = parseInt(time, 10);
                modal.innerHTML = `
                    <div class="modal-content">
                        <h3>Penalty-Timer für ${isTeamA ? "Team A" : "Team B"} (${timeValue / 60} Minuten) wählen:</h3>
                        <p>Bitte wählen Sie einen Spieler:</p>
                        ${Array.from(lineupData.querySelectorAll("tr")).map(row => {
                            const number = row.cells[0].innerText;
                            const name = row.cells[1].innerText;
                            return `<button data-player="${number}" data-name="${name}">${name} (Nr. ${number})</button>`;
                        }).join("")}
                        <button data-player="none">Keinen Spieler auswählen</button>
                        <button data-action="cancel">Abbrechen</button>
                    </div>
                `;
    
                modal.addEventListener("click", (e) => {
                    const player = e.target.getAttribute("data-player");
                    const playerName = e.target.getAttribute("data-name");
                    const action = e.target.getAttribute("data-action");
    
                    if (action === "cancel") {
                        modal.remove();
                    } else if (player) {
                        if (player === "none") {
                            if (!confirm("Sind Sie sicher, dass Sie keinen Spieler auswählen möchten?")) {
                                return;
                            }
                            log(`Kein Spieler ausgewählt.`);
                            addPenaltyTimer(team, timeValue, "Kein Spieler", "N/A");
                        } else {
                            log(`Spieler ausgewählt: ${playerName} (Nr. ${player})`);
                            addPenaltyTimer(team, timeValue, playerName, player);
                        }
                        modal.remove();
                    }
                });
            }
        });
    };
    
    // Angepasste Funktion zum Hinzufügen eines Penalty-Timers
    const addPenaltyTimer = (team, time, player = "Kein Spieler", number = "N/A") => {
        const isTeamA = team === "A";
        const penaltyTimers = isTeamA ? penaltyTimersTeamA : penaltyTimersTeamB;
        const penaltyType = time === 120 ? "2" : time === 240 ? "2+2" : "5";
        const timerId = isTeamA
            ? `A-${++penaltyTimerCounterA}-${penaltyType}`
            : `B-${++penaltyTimerCounterB}-${penaltyType}`;
        const containerId = isTeamA ? "team-a-penalties" : "team-b-penalties";
    
        const container = document.getElementById(containerId);
        const timerElement = document.createElement("div");
        timerElement.classList.add("penalty-timer");
        timerElement.setAttribute("data-id", timerId);
        timerElement.innerHTML = `
            <span class="penalty-time">${pad(Math.floor(time / 60))}:${pad(time % 60)}</span>
            <button data-action="delete-${timerId}">Löschen</button>
        `;
    
        container.appendChild(timerElement);
    
        penaltyTimers.push({
            id: timerId,
            time,
            player,
            number,
            type: penaltyType,
            element: timerElement.querySelector(".penalty-time"),
            container: timerElement,
        });
    
        log(`PenaltyTimer hinzugefügt: ${timerId} (${time}s) - Spieler: ${player} (Nr. ${number})`);
        calculateCurrentStrength();
    
        timerElement.querySelector(`[data-action="delete-${timerId}"]`).addEventListener("click", () => {
            deletePenaltyTimer(timerId, penaltyTimers);
        });
    };
    
    const deletePenaltyTimer = (timerId, penaltyTimers, isAutomatic = false) => {
        const index = penaltyTimers.findIndex((timer) => timer.id === timerId);
        if (index !== -1) {
            const timer = penaltyTimers[index];
            const penaltyType = timer.id.split("-")[2]; // Strafenart aus der ID extrahieren
            const { player, number } = timer; // Spielerinformationen extrahieren
    
            if (isAutomatic) {
                // Automatische Löschung bei 00:00
                log(`PenaltyTimer automatisch gelöscht: ID=${timerId}, Spieler: ${player} (Nr. ${number})`);
                timer.container.remove();
                penaltyTimers.splice(index, 1);
            } else {
                // Manuelle Löschung basierend auf Strafenart
                if (penaltyType === "2") {
                    log(`PenaltyTimer (2 Min) wird gelöscht: ID=${timerId}, Spieler: ${player} (Nr. ${number})`);
                    timer.container.remove();
                    penaltyTimers.splice(index, 1);
                } else if (penaltyType === "2+2") {
                    if (timer.time <= 120) {
                        log(`PenaltyTimer (2+2 Min) wird gelöscht: ID=${timerId}, Spieler: ${player} (Nr. ${number})`);
                        timer.container.remove();
                        penaltyTimers.splice(index, 1);
                    } else {
                        log(`PenaltyTimer (2+2 Min) wird auf 02:00 reduziert: ID=${timerId}, Spieler: ${player} (Nr. ${number})`);
                        timer.time = 120;
                        timer.element.innerText = `${pad(Math.floor(timer.time / 60))}:${pad(timer.time % 60)}`;
                    }
                } else if (penaltyType === "5") {
                    if (confirm("Möchten Sie den 5-Minuten-Timer wirklich löschen?")) {
                        log(`PenaltyTimer (5 Min) wird gelöscht: ID=${timerId}, Spieler: ${player} (Nr. ${number})`);
                        timer.container.remove();
                        penaltyTimers.splice(index, 1);
                    } else {
                        log(`Löschen des 5-Minuten-Timers abgebrochen: ID=${timerId}, Spieler: ${player} (Nr. ${number})`);
                    }
                }
            }
        }
        calculateCurrentStrength();
    };
    
    const updatePenaltyTimers = () => {
        const processTimers = (timers) => {
            timers.forEach((timer) => {
                if (timer.time > 0) {
                    timer.time--; // Zeit reduzieren
                    timer.element.innerText = `${pad(Math.floor(timer.time / 60))}:${pad(timer.time % 60)}`;
                } else if (timer.time === 0) {
                    log(`Penalty-Timer beendet: ${timer.id}`);
                    deletePenaltyTimer(timer.id, timers, true);
                }
            });
        };
    
        // Timer für beide Teams aktualisieren
        processTimers(penaltyTimersTeamA);
        processTimers(penaltyTimersTeamB);
    
        // Full Strength nach Penalty-Anpassungen berechnen
        calculateCurrentStrength();
    };
    
    const adjustTime = (amount) => {
        const newTime = timerTime + amount;
    
        // Nur aktive Penalty-Timer (die zwei niedrigsten IDs) prüfen
        const allPenaltyTimers = [
            ...penaltyTimersTeamA.slice(0, 2), 
            ...penaltyTimersTeamB.slice(0, 2),
        ];
    
        // Prüfe, ob eine Anpassung einen aktiven Timer ungültig macht
        const anyBlocked = allPenaltyTimers.some((timer) => {
            const maxTime = parseInt(timer.id.split("-")[2], 10) * 60; // MaxTime aus ID in Sekunden
            const newPenaltyTime = timer.time + amount;
            return newPenaltyTime < 0 || newPenaltyTime > maxTime; // Zeit darf nicht unter 0 oder über MaxTime gehen
        });
    
        if (anyBlocked) {
            log("Haupttimer-Anpassung blockiert: Mindestens ein aktiver Penalty-Timer würde ungültig.");
            alert("Anpassung blockiert: Mindestens ein aktiver Penalty-Timer würde ungültig.");
            return;
        }
    
        // Haupttimer anpassen
        if (newTime >= 0 && newTime <= MAX_TIME) {
            timerTime = newTime;
            updateDisplay();
            log(`Haupttimer angepasst: Neue Zeit=${pad(Math.floor(timerTime / 60))}:${pad(timerTime % 60)}`);
        } else {
            log(`Haupttimer-Anpassung blockiert. Zeit wäre außerhalb der Grenzen: ${newTime}`);
            alert("Haupttimer kann nicht angepasst werden (Grenzen erreicht)!");
            return;
        }
    
        // Nur aktive Penalty-Timer anpassen
        allPenaltyTimers.forEach((timer) => {
            const maxTime = parseInt(timer.id.split("-")[2], 10) * 60; // MaxTime aus ID in Sekunden
            const newPenaltyTime = timer.time + amount;
            if (newPenaltyTime >= 0 && newPenaltyTime <= maxTime) {
                timer.time = newPenaltyTime;
                timer.element.innerText = `${pad(Math.floor(timer.time / 60))}:${pad(timer.time % 60)}`;
                log(`PenaltyTimer angepasst: ID=${timer.id}, Neue Zeit=${pad(Math.floor(timer.time / 60))}:${pad(timer.time % 60)}`);
            }
        });
    };
    
    const start = () => {
        // Überprüfen, ob der Break-Timer noch läuft
        if (breakTime > 0 && breakInterval !== null) {
            alert("Der Haupttimer kann nicht gestartet werden, solange der Pausentimer läuft. Bitte setzen Sie den Pausentimer zurück.");
            return;
        }
    
        isRunning = true;
        elements.toggle.innerText = "Stop";
        log("Haupttimer gestartet.");
    
        // Haupttimer-Intervall starten
        interval = setInterval(() => {
            if (isCountingUp) {
                if (timerTime < MAX_TIME) {
                    timerTime++;
                    updateDisplay(); // Haupt- und Hilfstimer aktualisieren
                } else {
                    stopAllTimers();
                }
            } else {
                if (timerTime > 0) {
                    timerTime--;
                    updateDisplay(); // Haupt- und Hilfstimer aktualisieren
                } else {
                    stopAllTimers();
                }
            }
    
            // Penalty-Timer aktualisieren
            updatePenaltyTimers();
        }, 1000);
    };
    
    const stop = () => {
      isRunning = false;
      clearInterval(interval);
      elements.toggle.innerText = "Start";
      log("Haupttimer gestoppt.");
    };
  
    const stopAllTimers = () => {
        stop();
        log("Alle Timer wurden gestoppt.");
        alert("Haupttimer gestoppt! Pausenzeit beginnt.");
        startBreakTimer(); // Starte den Pausen-Timer
    };    
    
    const reset = () => {
        stop();
        timerTime = isCountingUp ? 0 : MAX_TIME;
        updateDisplay();
        log("Haupttimer zurückgesetzt.");
    };
    
    // **Teamnamen bearbeiten oder anzeigen**
    const toggleTeamNameEdit = (team) => {
        const inputElement = team === "Team A" ? elements.teamAInput : elements.teamBInput;
        const buttonElement = team === "Team A" ? elements.setTeamAButton : elements.setTeamBButton;

        if (buttonElement.innerText === "OK") {
            const teamName = inputElement.value.trim();
            if (teamName === "") {
                alert(`${team} Name darf nicht leer sein.`);
                return;
            }
            inputElement.disabled = true;
            buttonElement.innerText = "Change";
            log(`${team} Name gesetzt: ${teamName}`);
        } else {
            inputElement.disabled = false;
            buttonElement.innerText = "OK";
        }
    };

    // **Score-Anpassungen**
    const adjustScore = (team, delta) => {
        if (team === "Team A") {
            teamAScore = Math.max(0, teamAScore + delta);
            elements.teamAScore.innerText = teamAScore;
            log(`Team A Score geändert: ${teamAScore}`);
        } else if (team === "Team B") {
            teamBScore = Math.max(0, teamBScore + delta);
            elements.teamBScore.innerText = teamBScore;
            log(`Team B Score geändert: ${teamBScore}`);
        }
    };

    const updatePeriodDisplay = () => {
        elements.currentPeriod.innerText = periods[currentPeriodIndex];
        log(`Periode gewechselt zu: ${periods[currentPeriodIndex]}`);
        
        if (currentPeriodIndex === 4) { // Shootout
            document.querySelectorAll('.team-shootout').forEach(section => {
                section.style.display = 'block'; // Zeige Shootout-Felder an
            });
            resetShootout();
        } else {
            document.querySelectorAll('.team-shootout').forEach(section => {
                section.style.display = 'none'; // Verstecke Shootout-Felder
            });
        }
    };
    
    const nextPeriod = () => {
        currentPeriodIndex = (currentPeriodIndex + 1) % periods.length; // Zyklisch vorwärts
        updatePeriodDisplay();
    };
    
    const previousPeriod = () => {
        currentPeriodIndex = (currentPeriodIndex - 1 + periods.length) % periods.length; // Zyklisch rückwärts
        updatePeriodDisplay();
    };    

    const resetShootout = () => {
        shootoutIndexTeamA = 0;
        shootoutIndexTeamB = 0;
        elements.shootoutTeamA.innerHTML = '';
        elements.shootoutTeamB.innerHTML = '';
        for (let i = 0; i < maxShootoutRounds; i++) {
            elements.shootoutTeamA.innerHTML += '<span class="shootout-round">-</span>';
            elements.shootoutTeamB.innerHTML += '<span class="shootout-round">-</span>';
        }
    };

    const addShootoutField = (team) => {
        const shootoutField = team === 'A' ? elements.shootoutTeamA : elements.shootoutTeamB;
        const roundElement = document.createElement('span');
        roundElement.className = 'shootout-round';
        roundElement.innerText = '-'; // Standardanzeige
        shootoutField.appendChild(roundElement);
    };
    
    const updateShootout = (team, result) => {
        const shootoutField = team === 'A' ? elements.shootoutTeamA : elements.shootoutTeamB;
        const currentIndex = team === 'A' ? shootoutIndexTeamA : shootoutIndexTeamB;
    
        const shootoutRounds = shootoutField.children;
    
        if (currentIndex < shootoutRounds.length) {
            const roundElement = shootoutRounds[currentIndex];
            if (result === 'M') {
                roundElement.className = 'shootout-round miss';
                roundElement.innerText = 'X';
            } else if (result === 'S') {
                roundElement.className = 'shootout-round score';
                roundElement.innerText = '●';
            }
    
            if (team === 'A') shootoutIndexTeamA++;
            else shootoutIndexTeamB++;
        }
    };

    const updateBreakTimerDisplay = () => {
        const [mins, secs] = [Math.floor(breakTime / 60), breakTime % 60];
        elements.breakMinutes.innerText = pad(mins);
        elements.breakSeconds.innerText = pad(secs);
    };     

    const startBreakTimer = () => {
        log("Pausentimer gestartet.");
        toggleMainTimerButtons(true); // Haupttimer-Buttons deaktivieren
        breakInterval = setInterval(() => {
            if (breakTime > 0) {
                breakTime--;
                updateBreakTimerDisplay();
            } else {
                clearInterval(breakInterval);
                log("Pausenzeit abgelaufen.");
                alert("Pausenzeit ist abgelaufen!");
                resetBreakTimer(); // Automatisch zurücksetzen
            }
        }, 1000);
    };
    
    const resetBreakTimer = () => {
        breakTime = parseInt(elements.breakMinutesInput.value, 10) * 60 || 10 * 60; // Standard auf 10 Minuten
        clearInterval(breakInterval);
        breakInterval = null;
        toggleMainTimerButtons(false); // Haupttimer-Buttons aktivieren
        updateBreakTimerDisplay();
        log("Pausentimer zurückgesetzt.");
    };    
    
    const toggleMainTimerButtons = (disable) => {
        elements.toggle.disabled = disable;
        elements.reset.disabled = disable;
        elements.toggleMode.disabled = disable;
        elements.increaseMinutes.disabled = disable;
        elements.decreaseMinutes.disabled = disable;
        elements.increaseSeconds.disabled = disable;
        elements.decreaseSeconds.disabled = disable;
    };    

    // Funktionen zum Status-Management
    const toggleEmptyNet = (team) => {
        const statusElement = team === "A" ? elements.statusTeamA : elements.statusTeamB;
    
        if (statusElement.innerText.includes("Empty Net")) {
            statusElement.innerText = statusElement.innerText.replace("Empty Net", "").trim();
            log(`Empty Net für Team ${team} entfernt.`);
        } else {
            if (!statusElement.innerText.includes("Empty Net")) {
                statusElement.innerText += (statusElement.innerText ? " " : "") + "Empty Net";
            }
            log(`Empty Net für Team ${team} aktiviert.`);
        }
    };
    
    const toggleDelayedPenalty = (team) => {
        const statusElement = team === "A" ? elements.statusTeamA : elements.statusTeamB;
    
        if (statusElement.innerText.includes("Delayed Penalty")) {
            statusElement.innerText = statusElement.innerText.replace("Delayed Penalty", "").trim();
            log(`Delayed Penalty für Team ${team} entfernt.`);
        } else {
            if (!statusElement.innerText.includes("Delayed Penalty")) {
                statusElement.innerText += (statusElement.innerText ? " " : "") + "Delayed Penalty";
            }
            log(`Delayed Penalty für Team ${team} aktiviert.`);
        }
    };

    // CSV-Datei parsen
    const parseCSV = (csvString) => {
        const rows = csvString.split("\n").filter(row => row.trim() !== ""); // Entferne leere Zeilen
        const header = rows.shift(); // Entferne die erste Zeile (Header)
        
        return rows.map(row => {
            const columns = row.split(";").map(col => col.trim()); // Spalten mit `;` trennen
            if (columns.length !== 3) {
                throw new Error(`Ungültige CSV-Zeile: ${row}`);
            }
            const [number, name, position] = columns;
            return { number, name, position };
        });
    };
    
    // Tabelle mit Lineup-Daten füllen
    const populateLineup = (lineupData, tbody) => {    
        lineupData.forEach(player => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${player.number}</td>
                <td>${player.name}</td>
                <td>${player.position}</td>
            `;
            tbody.appendChild(tr);
        });
    };      

    const handleFileUpload = (event, targetElement) => {
        if (!event || !event.target || !event.target.files) {
            console.error("Ungültiges Event-Objekt:", event);
            alert("Es ist ein Fehler beim Datei-Upload aufgetreten. Bitte erneut versuchen.");
            return;
        }
    
        const file = event.target.files[0];
        if (!file) {
            console.warn("Keine Datei ausgewählt.");
            return;
        }
    
        const inputId = event.target.id; // ID des Inputs identifizieren
        const fileType = file.type;
    
        if (inputId === "csv-input-team-a" || inputId === "csv-input-team-b") {
            // **Nur CSV-Verarbeitung für Lineup**
            if (fileType === "text/csv" || file.name.endsWith(".csv")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const csvData = parseCSV(e.target.result);    
                        if (inputId === "csv-input-team-a") {
                            populateLineup(csvData, document.querySelector("#lineup-team-a tbody"));
                        } else if (inputId === "csv-input-team-b") {
                            populateLineup(csvData, document.querySelector("#lineup-team-b tbody"));
                        }
                    } catch (error) {
                        console.error("Fehler beim CSV-Parsing:", error);
                        alert("Fehlerhafte CSV-Datei. Bitte überprüfen.");
                    }
                };
                reader.readAsText(file);
            } else {
                alert("Bitte laden Sie eine gültige CSV-Datei hoch.");
            }
        } else if (inputId === "team-a-logo" || inputId === "team-b-logo" || inputId === "association-logo") {
            // **Nur Bildverarbeitung für Logos**
            if (fileType.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resizeImage(e.target.result, 50, 50, (resizedDataUrl) => {
                        if (targetElement.tagName === "IMG") {
                            targetElement.src = resizedDataUrl;
                            console.log("Bild erfolgreich skaliert und gesetzt.");
                        } else {
                            console.error("Das Ziel-Element unterstützt keine Bilder:", targetElement);
                        }
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert("Bitte laden Sie eine gültige Bilddatei hoch.");
            }
        } else {
            alert("Ungültiger Datei-Upload. Bitte überprüfen.");
            console.warn("Nicht unterstützter Dateityp oder Eingabefeld:", inputId, fileType);
        }
    };
    
    const resetAll = () => {
        // Alle Timer stoppen
        clearInterval(interval);
        clearInterval(breakInterval);
        interval = null;
        breakInterval = null;
    
        // Timer-Werte zurücksetzen
        timerTime = 20 * 60; // Standardwert: 20 Minuten
        breakTime = 10 * 60; // Standardwert: 10 Minuten
        isRunning = false;
        isCountingUp = false;
    
        // Punktestände zurücksetzen
        teamAScore = 0;
        teamBScore = 0;
        elements.teamAScore.innerText = teamAScore;
        elements.teamBScore.innerText = teamBScore;
    
        // Penalty-Timer zurücksetzen
        penaltyTimersTeamA.length = 0;
        penaltyTimersTeamB.length = 0;
        document.getElementById("team-a-penalties").innerHTML = "";
        document.getElementById("team-b-penalties").innerHTML = "";
    
        // Perioden zurücksetzen
        currentPeriodIndex = 0;
        updatePeriodDisplay();
    
        // Shootout zurücksetzen
        resetShootout();
    
        // Status zurücksetzen
        isDelayedPenaltyTeamA = false;
        isEmptyNetTeamA = false;
        isDelayedPenaltyTeamB = false;
        isEmptyNetTeamB = false;
        elements.statusTeamA.innerText = "";
        elements.statusTeamB.innerText = "";
    
        // Eingabefelder für Teamnamen zurücksetzen
        elements.teamAInput.value = "";
        elements.teamBInput.value = "";
        elements.teamAInput.disabled = false;
        elements.teamBInput.disabled = false;
        elements.setTeamAButton.innerText = "OK";
        elements.setTeamBButton.innerText = "OK";
    
        // CSV-Lineups zurücksetzen
        elements.lineupTeamA.innerHTML = "";
        elements.lineupTeamB.innerHTML = "";
        elements.csvInputTeamA.value = "";
        elements.csvInputTeamB.value = "";
    
        // Farben und Platzierungen zurücksetzen
        elements.teamAColor.value = "#000000"; // Standardfarbe (Schwarz)
        elements.teamBColor.value = "#000000"; // Standardfarbe (Schwarz)
        elements.teamAPlacement.value = "";
        elements.teamBPlacement.value = "";
    
        // Meisterschaft, Spielort und Datum/Zeit zurücksetzen
        elements.championshipInput.value = "";
        elements.championshipInput.disabled = false;
        elements.setChampionshipButton.innerText = "OK";
        elements.venueInput.value = "";
        elements.venueInput.disabled = false;
        elements.setVenueButton.innerText = "OK";
        elements.dateTimeInput.value = "";
        elements.dateTimeInput.disabled = false;
        elements.setDateTimeButton.innerText = "OK";
    
        // Logos zurücksetzen
        elements.associationLogo.value = "";
        elements.teamALogo.value = "";
        elements.teamBLogo.value = "";
        elements.associationLogoPreview.src = ""; // Vorschau für Verband entfernen
        elements.teamALogoPreview.src = ""; // Vorschau für Team A entfernen
        elements.teamBLogoPreview.src = ""; // Vorschau für Team B entfernen
        
        if (elements.associationLogoPreview) {
            elements.associationLogoPreview.src = ""; // Setze das Vorschaubild zurück
        }
    
        // Timer-Display aktualisieren
        updateDisplay();
        updateBreakTimerDisplay();
    
        // Steuerbuttons aktualisieren
        elements.toggle.innerText = "Start";
    
        log("Alle Werte wurden zurückgesetzt.");
    };
    
    const calculateCurrentStrength = () => {
        // Globale Stärke aus dem Dropdown auslesen
        const fullStrength = parseInt(elements.fullStrengthGlobal.value, 10);
    
        // Anzahl aktiver Penalty-Timer pro Team ermitteln
        const activePenaltyTimersA = penaltyTimersTeamA.filter(timer => timer.time > 0).length;
        const activePenaltyTimersB = penaltyTimersTeamB.filter(timer => timer.time > 0).length;    
    
        // Aktuelle Stärke berechnen
        const currentStrengthA = Math.max(2, fullStrength - activePenaltyTimersA);
        const currentStrengthB = Math.max(2, fullStrength - activePenaltyTimersB);    
    
        let status = "";
    
        // Szenarien
        if (activePenaltyTimersA > 0 && activePenaltyTimersB === 0) {
            // Powerplay für Team B
            status = `${currentStrengthA} vs. ${currentStrengthB} (Powerplay für Team B)`;
    
            if (activePenaltyTimersA >= 2) {
                status = `${currentStrengthA} vs. ${currentStrengthB} (2 Man Adv für Team B)`;
            }
        } else if (activePenaltyTimersB > 0 && activePenaltyTimersA === 0) {
            // Powerplay für Team A
            status = `${currentStrengthA} vs. ${currentStrengthB} (Powerplay für Team A)`;
    
            if (activePenaltyTimersB >= 2) {
                status = `${currentStrengthA} vs. ${currentStrengthB} (2 Man Adv für Team A)`;
            }
        } else if (activePenaltyTimersA > 0 && activePenaltyTimersB > 0) {
            // Beide Teams haben Strafen
            status = `${currentStrengthA} on ${currentStrengthB}`;
        } else {
            // Beide Teams sind Full Strength
            status = `${currentStrengthA} vs. ${currentStrengthB} (Full Strength)`;
        }
    
        // Anzeige aktualisieren
        elements.fullStrengthDisplay.innerText = `Aktueller Zustand: ${status}`;
        log(`Stärke berechnet: Full Strength=${fullStrength}, Team A=${currentStrengthA}, Team B=${currentStrengthB}`);
    };
    
    const toggleInputField = (inputElement, buttonElement, label) => {
        if (buttonElement.innerText === "OK") {
            const value = inputElement.value.trim();
            if (value === "") {
                alert(`${label} darf nicht leer sein.`);
                return;
            }
            inputElement.disabled = true;
            buttonElement.innerText = "Change";
            log(`${label} gesetzt: ${value}`);
        } else {
            inputElement.disabled = false;
            buttonElement.innerText = "OK";
        }
    };    

    const resizeImage = (imageDataUrl, maxWidth, maxHeight, callback) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
    
            // Berechne den Skalierungsfaktor
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
    
            // Zeichne das Bild auf das Canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
            // Rückgabe als Data URL
            callback(canvas.toDataURL("image/png"));
        };
        img.onerror = () => {
            console.error("Bild konnte nicht geladen werden:", imageDataUrl);
            alert("Fehler beim Laden des Bildes. Bitte erneut versuchen.");
        };
        img.src = imageDataUrl; // Setze die Bildquelle
    };

    const updateTeamLabel = (team) => {
        const inputElement = team === "A" ? elements.teamAInput : elements.teamBInput;
        const labelElement = document.querySelector(`#team-${team.toLowerCase()} h2`);
        
        // Aktualisiere das Label mit dem eingegebenen Text oder setze den Standard zurück
        labelElement.innerText = inputElement.value.trim() || `Team ${team}`;
    };
    
    
    // Farbeingabe-Elemente und deren Vorschau für beide Teams
    const teamAColorInput = document.getElementById("team-a-color");
    const teamAColorDisplay = document.getElementById("team-a-color-display");
    const teamBColorInput = document.getElementById("team-b-color");
    const teamBColorDisplay = document.getElementById("team-b-color-display");

    const updateScoreboard = () => {
        // Team A
        const teamAName = elements.teamAInput.value.trim() || "Team A";
        const teamAScore = elements.teamAScore.innerText;
        const teamALogo = elements.teamALogoPreview.src;
    
        document.getElementById("team-a-name-display").innerText = teamAName;
        document.getElementById("team-a-score").innerText = teamAScore;
        document.getElementById("team-a-logo-preview").src = teamALogo;
    
        // Team B
        const teamBName = elements.teamBInput.value.trim() || "Team B";
        const teamBScore = elements.teamBScore.innerText;
        const teamBLogo = elements.teamBLogoPreview.src;
    
        document.getElementById("team-b-name-display").innerText = teamBName;
        document.getElementById("team-b-score").innerText = teamBScore;
        document.getElementById("team-b-logo-preview").src = teamBLogo;
    
        // Current Period
        document.getElementById("current-period").innerText = elements.currentPeriod.innerText;
    };

    const toggleScoreboardButton = document.getElementById("toggle-scoreboard");

    toggleScoreboardButton.addEventListener("click", () => {
        elements.scoreboard.classList.toggle("hidden");
        log("Scoreboard toggled.");
    });

    // Funktion: Lade Bilder für die Diashow
    async function loadImages(folderPath) {
        try {
            // Beispielbilder (ersetze durch Logik zur dynamischen Bildladefunktion)
            images = [
                `${folderPath}/sponsor1.jpg`,
                `${folderPath}/sponsor2.jpg`,
                `${folderPath}/sponsor3.jpg`
            ];
            startSlideshow();
        } catch (error) {
            console.error("Fehler beim Laden der Bilder:", error);
        }
    }
    
    // Button: Ein-/Ausblenden der Diashow
    toggleSlideshowButton.addEventListener("click", () => {
        // Prüfe, ob die hidden-Klasse gesetzt ist
        if (elements.slideshowContainer.classList.contains("hidden")) {
            // Entferne hidden, zeige den Container, starte die Slideshow
            elements.slideshowContainer.classList.remove("hidden");
            startSlideshow();
            console.log("Slideshow gestartet.");
        } else {
            // Füge hidden hinzu, verstecke den Container, stoppe die Slideshow
            elements.slideshowContainer.classList.add("hidden");
            stopSlideshow();
            console.log("Slideshow gestoppt und ausgeblendet.");
        }
    });

    // Funktion: Starte Diashow
    function startSlideshow() {
        if (images.length > 0 && !slideshowInterval) {
            elements.slideshowImage.src = images[currentIndex];
            slideshowInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                elements.slideshowImage.src = images[currentIndex];
            }, 3000); // Alle 3 Sekunden wechseln
            console.log("Slideshow läuft.");
        } else {
            console.warn("Keine Bilder verfügbar oder Slideshow läuft bereits.");
        }
    }
    
    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
            console.log("Slideshow gestoppt.");
        } else {
            console.warn("Slideshow läuft nicht.");
        }
    }
    
    // Button: Ein-/Ausblenden des Scoreboards
    toggleScoreboardButton.addEventListener("click", () => {
        scoreboard.classList.toggle("hidden");
    });



    // Lade die Bilder (Pfad anpassen)
    loadImages("path/to/sponsors");
    
    // **Event-Listener**
    elements.toggle.addEventListener("click", () => (isRunning ? stop() : start()));
    elements.reset.addEventListener("click", reset);
    elements.toggleMode.addEventListener("click", toggleMode);
    elements.increaseMinutes.addEventListener("click", () => adjustTime(60));
    elements.decreaseMinutes.addEventListener("click", () => adjustTime(-60));
    elements.increaseSeconds.addEventListener("click", () => adjustTime(1));
    elements.decreaseSeconds.addEventListener("click", () => adjustTime(-1));
    elements.setMaxTimeButton.addEventListener("click", () => {
        const maxMinutes = parseInt(elements.maxMinutesInput.value, 10) || 0;
        const maxSeconds = parseInt(elements.maxSecondsInput.value, 10) || 0;
        MAX_TIME = maxMinutes * 60 + maxSeconds;
        reset();
        log(`MAX_TIME angepasst: Neue maximale Zeit=${pad(Math.floor(MAX_TIME / 60))}:${pad(MAX_TIME % 60)}`);
    });    
    elements.setBreakTimeButton.addEventListener("click", () => {
        const breakMinutes = parseInt(elements.breakMinutesInput.value, 10) || 0;
        const breakSeconds = parseInt(elements.breakSecondsInput.value, 10) || 0;
        breakTime = breakMinutes * 60 + breakSeconds;
        updateBreakTimerDisplay();
        log(`Pausenzeit gesetzt: ${pad(breakMinutes)}:${pad(breakSeconds)}`);
    });    
    // **Event-Listener für Teamnamen**
    elements.setTeamAButton.addEventListener("click", () => toggleTeamNameEdit("Team A"));
    elements.setTeamBButton.addEventListener("click", () => toggleTeamNameEdit("Team B"));
    // **Event-Listener für Scores**
    elements.increaseTeamAScore.addEventListener("click", () => adjustScore("Team A", 1));
    elements.decreaseTeamAScore.addEventListener("click", () => adjustScore("Team A", -1));
    elements.increaseTeamBScore.addEventListener("click", () => adjustScore("Team B", 1));
    elements.decreaseTeamBScore.addEventListener("click", () => adjustScore("Team B", -1));
    elements.addPenaltyTimerTeamA.addEventListener("click", () => createPenaltyTimer("A"));
    elements.addPenaltyTimerTeamB.addEventListener("click", () => createPenaltyTimer("B"));    
    elements.nextPeriodButton.addEventListener("click", nextPeriod);
    elements.previousPeriodButton.addEventListener("click", previousPeriod);
    // Event-Listener für Add-Buttons
    elements.shootoutAddTeamA.addEventListener('click', () => addShootoutField('A'));
    elements.shootoutAddTeamB.addEventListener('click', () => addShootoutField('B'));
    // Event-Listener für Miss/Score-Buttons
    elements.shootoutMissTeamA.addEventListener('click', () => updateShootout('A', 'M'));
    elements.shootoutScoreTeamA.addEventListener('click', () => updateShootout('A', 'S'));
    elements.shootoutMissTeamB.addEventListener('click', () => updateShootout('B', 'M'));
    elements.shootoutScoreTeamB.addEventListener('click', () => updateShootout('B', 'S'));
    elements.resetBreakTimerButton.addEventListener("click", resetBreakTimer);
    elements.toggleDelayedPenaltyTeamA.addEventListener("click", () => toggleDelayedPenalty("A"));
    elements.toggleDelayedPenaltyTeamB.addEventListener("click", () => toggleDelayedPenalty("B"));
    elements.toggleEmptyNetTeamA.addEventListener("click", () => toggleEmptyNet("A"));
    elements.toggleEmptyNetTeamB.addEventListener("click", () => toggleEmptyNet("B"));
    // Event-Listener für CSV-Uploads
    document.getElementById("csv-input-team-a").addEventListener("change", (event) => {
        handleFileUpload(event, document.querySelector("#lineup-team-a tbody"));
    });
    
    document.getElementById("csv-input-team-b").addEventListener("change", (event) => {
        handleFileUpload(event, document.querySelector("#lineup-team-b tbody"));
    });
    elements.resetAllButton.addEventListener("click", resetAll);
    elements.fullStrengthGlobal.addEventListener("change", calculateCurrentStrength);
    // Farbänderung für Team A
    teamAColorInput.addEventListener("input", () => {
        const selectedColor = teamAColorInput.value;
        teamAColorDisplay.style.backgroundColor = selectedColor;
        console.log(`Team A Trikotfarbe geändert zu: ${selectedColor}`);
    });

    // Farbänderung für Team B
    teamBColorInput.addEventListener("input", () => {
        const selectedColor = teamBColorInput.value;
        teamBColorDisplay.style.backgroundColor = selectedColor;
        console.log(`Team B Trikotfarbe geändert zu: ${selectedColor}`);
    });
    elements.teamAPlacement.addEventListener("input", () => {
        log(`Team A Platzierung geändert: ${elements.teamAPlacement.value}`);
    });
    elements.teamBPlacement.addEventListener("input", () => {
        log(`Team B Platzierung geändert: ${elements.teamBPlacement.value}`);
    });
    // Event-Listener für Meisterschaft
    elements.setChampionshipButton.addEventListener("click", () => {
        toggleInputField(elements.championshipInput, elements.setChampionshipButton, "Meisterschaft");
    });
    
    // Event-Listener für Spielort
    elements.setVenueButton.addEventListener("click", () => {
        toggleInputField(elements.venueInput, elements.setVenueButton, "Spielort");
    });
    
    // Event-Listener für Datum und Startzeit
    elements.setDateTimeButton.addEventListener("click", () => {
        toggleInputField(elements.dateTimeInput, elements.setDateTimeButton, "Datum und Startzeit");
    });    
    document.getElementById("team-a-logo").addEventListener("change", (event) => {
        handleFileUpload(event, document.getElementById("team-a-logo-preview"));
    });
    
    document.getElementById("team-b-logo").addEventListener("change", (event) => {
        handleFileUpload(event, document.getElementById("team-b-logo-preview"));
    });
    
    document.getElementById("association-logo").addEventListener("change", (event) => {
        handleFileUpload(event, document.getElementById("association-logo-preview"));
    });    
    elements.setTeamAButton.addEventListener("click", () => {
        toggleTeamNameEdit("Team A");
        updateTeamLabel("A");
    });
    
    elements.setTeamBButton.addEventListener("click", () => {
        toggleTeamNameEdit("Team B");
        updateTeamLabel("B");
    });    

    elements.setTeamAButton.addEventListener("click", updateScoreboard);
    elements.setTeamBButton.addEventListener("click", updateScoreboard);
    elements.increaseTeamAScore.addEventListener("click", updateScoreboard);
    elements.decreaseTeamAScore.addEventListener("click", updateScoreboard);
    elements.increaseTeamBScore.addEventListener("click", updateScoreboard);
    elements.decreaseTeamBScore.addEventListener("click", updateScoreboard);
    elements.nextPeriodButton.addEventListener("click", updateScoreboard);
    elements.previousPeriodButton.addEventListener("click", updateScoreboard);
    elements.teamALogo.addEventListener("change", updateScoreboard);
    elements.teamBLogo.addEventListener("change", updateScoreboard);
    document.getElementById("image-folder").addEventListener("change", (event) => {
        const files = event.target.files;
        images = Array.from(files).map(file => URL.createObjectURL(file)); // URLs der Bilder generieren
        startSlideshow(); // Starte die Diashow mit den hochgeladenen Bildern
    });  
    elements.slideshowImage = document.getElementById("slideshow-image");  
    elements.toggleSlideshowButton = document.getElementById("toggle-slideshow");
    elements.toggleSlideshowButton.addEventListener("click", () => {
        if (elements.slideshowContainer.classList.contains("hidden")) {
            elements.slideshowContainer.classList.remove("hidden");
            startSlideshow();
        } else {
            elements.slideshowContainer.classList.add("hidden");
            stopSlideshow();
        }
    }); 

    // **Initialisierung**
    updateDisplay();
    elements.toggle.innerText = "Start";
    log("Timer initialisiert.");
    updatePeriodDisplay();
    updateBreakTimerDisplay();
    updateScoreboard();
    });

    const toggleSlideshowButton = document.getElementById("toggle-slideshow");

