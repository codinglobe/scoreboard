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
        teamAFullStrength: document.getElementById("team-a-full-strength"),
        teamBFullStrength: document.getElementById("team-b-full-strength"),
        fullStrengthDisplay: document.getElementById("full-strength-display"),
        championshipInput: document.getElementById("championship"),
        setChampionshipButton: document.querySelector('[data-action="set-championship"]'),
        associationLogo: document.getElementById("association-logo"),
        teamALogo: document.getElementById("team-a-logo"),
        teamBLogo: document.getElementById("team-b-logo"),
        teamAColor: document.getElementById("team-a-color"),
        teamBColor: document.getElementById("team-b-color"),
        teamAPlacement: document.getElementById("team-a-placement"),
        teamBPlacement: document.getElementById("team-b-placement"),
        venueInput: document.getElementById("venue"),
        setVenueButton: document.querySelector('[data-action="set-venue"]'),
        dateTimeInput: document.getElementById("date-time"),
        setDateTimeButton: document.querySelector('[data-action="set-date-time"]'),
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
            // Sortiere die Timer nach ihrer ID (niedrigste zuerst)
            timers.sort((a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]));
    
            // Wähle die zwei niedrigsten Timer
            const activeTimers = timers.slice(0, 2);
    
            // Reduziere die Zeit der aktiven Timer
            activeTimers.forEach((timer) => {
                if (timer.time > 0) {
                    timer.time--; // Zeit reduzieren
                    timer.element.innerText = `${pad(Math.floor(timer.time / 60))}:${pad(timer.time % 60)}`;
                } else if (timer.time === 0) {
                    log(`Penalty-Timer erreicht 00:00 und wird automatisch gelöscht: ${timer.id}`);
                    deletePenaltyTimer(timer.id, timers, true);
                }
            });
        };
    
        // Aktualisiere die Penalty-Timer für beide Teams
        processTimers(penaltyTimersTeamA);
        processTimers(penaltyTimersTeamB);
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
        const rows = csvString.split("\n").filter(row => row.trim() !== ""); // Zeilen aufteilen und leere Zeilen entfernen
        const header = rows.shift(); // Erste Zeile (Header) entfernen
        return rows.map(row => {
            const [number, name, position] = row.split(";"); // Semikolon als Trennzeichen verwenden
            if (!number || !name || !position) {
                console.error("Ungültige CSV-Zeile:", row);
                return null;
            }
            return { number: number.trim(), name: name.trim(), position: position.trim() };
        }).filter(Boolean); // Ungültige Zeilen entfernen
    };
    
    // Tabelle mit Lineup-Daten füllen
    const populateLineup = (lineupData, tbody) => {
        tbody.innerHTML = ""; // Tabelle zurücksetzen
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

    // CSV-Datei für ein Team hochladen und verarbeiten
    const handleFileUpload = (event, target) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const fileType = file.type;
    
        // Prüfen, ob es eine CSV-Datei ist
        if (fileType === "text/csv") {
            const tbody = target; // Ziel-Tabelle für CSV-Inhalte
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvContent = e.target.result;
                const players = parseCSV(csvContent);
    
                // Tabelle mit Daten füllen
                populateLineup(players, tbody);
            };
            reader.readAsText(file);
            log(`CSV-Datei hochgeladen: ${file.name}`);
        }
        // Prüfen, ob es ein Bild ist
        else if (fileType.startsWith("image/")) {
            const imgElement = target; // Ziel-Element für das Bild
            const reader = new FileReader();
            reader.onload = (e) => {
                imgElement.src = e.target.result; // Bild anzeigen
            };
            reader.readAsDataURL(file);
            log(`Bild hochgeladen: ${file.name}`);
        }
        // Nicht unterstützter Dateityp
        else {
            alert("Ungültiger Dateityp. Bitte laden Sie eine CSV- oder Bilddatei hoch.");
            log(`Ungültiger Dateityp: ${file.name}`);
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

        // Full-Strength zurücksetzen
        elements.teamAFullStrength.value = 5;
        elements.teamBFullStrength.value = 5;
        calculateCurrentStrength();

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

        // Timer-Display aktualisieren
        updateDisplay();
        updateBreakTimerDisplay();

        // Steuerbuttons aktualisieren
        elements.toggle.innerText = "Start";

        log("Alle Werte wurden zurückgesetzt.");
        };

    const calculateCurrentStrength = () => {
        // Teamstärken aus den Eingabefeldern auslesen
        const fullStrengthA = parseInt(elements.teamAFullStrength.value, 10) || 5;
        const fullStrengthB = parseInt(elements.teamBFullStrength.value, 10) || 5;
    
        // Anzahl aktiver Penalty-Timer pro Team ermitteln
        const activePenaltyTimersA = penaltyTimersTeamA.filter(timer => timer.time > 0).length;
        const activePenaltyTimersB = penaltyTimersTeamB.filter(timer => timer.time > 0).length;
    
        // Aktuelle Stärke berechnen
        const currentStrengthA = fullStrengthA - activePenaltyTimersA;
        const currentStrengthB = fullStrengthB - activePenaltyTimersB;
    
        // Status berechnen
        let status = `${currentStrengthA} vs. ${currentStrengthB}`;
    
        // Spezielle Szenarien hinzufügen
        if (currentStrengthA === currentStrengthB) {
            if (currentStrengthA === 4) {
                status += ` = 4 on 4`;
            } else if (currentStrengthA === 3) {
                status += ` = 3 on 3`;
            } else {
                status += ` = Full Strength`;
            }
        } else {
            status += ` = ${currentStrengthA} on ${currentStrengthB}`;
        }
    
        // 2-Man Advantage oder Unterbesetzung
        if (currentStrengthA < 3) {
            status += ` | Team A unterbesetzt`;
        }
        if (currentStrengthB < 3) {
            status += ` | Team B unterbesetzt`;
        }
    
        // Anzeige aktualisieren
        elements.fullStrengthDisplay.innerText = `Aktueller Zustand: ${status}`;
        log(`Aktueller Zustand berechnet: ${status}`);
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
    elements.csvInputTeamA.addEventListener("change", (event) => handleFileUpload(event, elements.lineupTeamA));
    elements.csvInputTeamB.addEventListener("change", (event) => handleFileUpload(event, elements.lineupTeamB));
    elements.resetAllButton.addEventListener("click", resetAll);
    elements.teamAFullStrength.addEventListener("change", calculateCurrentStrength);
    elements.teamBFullStrength.addEventListener("change", calculateCurrentStrength);
    elements.teamAColor.addEventListener("input", () => {
        log(`Team A Trikotfarbe geändert: ${elements.teamAColor.value}`);
    });
    elements.teamBColor.addEventListener("input", () => {
        log(`Team B Trikotfarbe geändert: ${elements.teamBColor.value}`);
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

    elements.associationLogo.addEventListener("change", () => {
        handleFileUpload(elements.associationLogo, "Verband Logo");
    });
    
    elements.teamALogo.addEventListener("change", () => {
        handleFileUpload(elements.teamALogo, "Team A Logo");
    });
    
    elements.teamBLogo.addEventListener("change", () => {
        handleFileUpload(elements.teamBLogo, "Team B Logo");
    });

    // **Initialisierung**
    updateDisplay();
    elements.toggle.innerText = "Start";
    log("Timer initialisiert.");
    updatePeriodDisplay();
    updateBreakTimerDisplay();
    });
