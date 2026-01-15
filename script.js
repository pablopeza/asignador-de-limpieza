// Funciones de utilidad para fechas

/**
 * Obtiene el número de semana ISO del año (semanas empiezan en lunes)
 */
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Obtiene el año ISO de una fecha (puede diferir del año calendario en los bordes)
 */
function getISOYear(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return d.getUTCFullYear();
}

/**
 * Calcula qué brigada le toca según la semana del año
 * Brigada = ((semana - 1) % 4) + 1
 */
function getBrigadeForWeek(weekNumber) {
    return ((weekNumber - 1) % 4) + 1;
}

/**
 * Obtiene el lunes de la semana dada
 */
function getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

/**
 * Obtiene el domingo de la semana dada
 */
function getSundayOfWeek(date) {
    const monday = getMondayOfWeek(date);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return sunday;
}

/**
 * Formatea una fecha como "dd/mm"
 */
function formatShortDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
}

/**
 * Formatea un rango de fechas
 */
function formatDateRange(monday, sunday) {
    const mondayStr = formatShortDate(monday);
    const sundayStr = formatShortDate(sunday);
    const year = sunday.getFullYear();
    return `${mondayStr} - ${sundayStr}/${year}`;
}

/**
 * Obtiene los datos de una semana específica
 */
function getWeekData(date) {
    const monday = getMondayOfWeek(date);
    const sunday = getSundayOfWeek(date);
    const weekNumber = getWeekNumber(date);
    const year = getISOYear(date);
    const brigade = getBrigadeForWeek(weekNumber);

    return {
        weekNumber,
        year,
        brigade,
        monday,
        sunday,
        dateRange: formatDateRange(monday, sunday)
    };
}

/**
 * Renderiza la semana actual con sus integrantes
 */
function renderCurrentWeek() {
    const today = new Date();
    const data = getWeekData(today);
    const brigadeData = BRIGADAS[data.brigade];

    document.getElementById('currentWeekNumber').textContent =
        `Semana ${data.weekNumber} de ${data.year}`;

    // Nombre de brigada con color
    const brigadeNameEl = document.getElementById('currentBrigade');
    brigadeNameEl.textContent = brigadeData.nombre;
    brigadeNameEl.className = `brigade-name brigade-color-${data.brigade}`;

    document.getElementById('currentDateRange').textContent =
        data.dateRange;

    // Renderizar integrantes con color de fondo de la brigada
    const membersContainer = document.getElementById('currentMembers');
    membersContainer.className = `members-list brigade-bg-${data.brigade}`;
    const membersHtml = brigadeData.integrantes
        .map(nombre => `<span class="member">${nombre}</span>`)
        .join('');
    membersContainer.innerHTML = membersHtml;
}

/**
 * Renderiza el calendario de las próximas 3 semanas (sin la actual)
 */
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const today = new Date();

    let html = '';

    for (let i = 1; i <= 3; i++) {
        const weekDate = new Date(today);
        weekDate.setDate(today.getDate() + (i * 7));

        const data = getWeekData(weekDate);
        const brigadeData = BRIGADAS[data.brigade];

        html += `
            <div class="calendar-item brigade-${data.brigade}">
                <div class="week-label">Semana ${data.weekNumber}</div>
                <div class="brigade">${brigadeData.nombre}</div>
                <div class="dates">${data.dateRange}</div>
            </div>
        `;
    }

    grid.innerHTML = html;
}

/**
 * Renderiza la sección de todos los miembros
 */
function renderAllMembers() {
    const grid = document.getElementById('allMembersGrid');
    let html = '';

    for (let i = 1; i <= 4; i++) {
        const brigadeData = BRIGADAS[i];
        const membersHtml = brigadeData.integrantes
            .map(nombre => `<li>${nombre}</li>`)
            .join('');

        html += `
            <div class="brigade-card brigade-${i}">
                <h3>${brigadeData.nombre}</h3>
                <ul>${membersHtml}</ul>
            </div>
        `;
    }

    grid.innerHTML = html;
}

/**
 * Configura el botón de toggle para mostrar/ocultar miembros
 */
function setupToggleButton() {
    const btn = document.getElementById('toggleMembersBtn');
    const grid = document.getElementById('allMembersGrid');

    btn.addEventListener('click', function() {
        const isHidden = grid.style.display === 'none';
        grid.style.display = isHidden ? 'grid' : 'none';
        btn.textContent = isHidden ? 'Ocultar miembros' : 'Ver todos los miembros';
    });
}

// Inicializar la aplicación cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    renderCurrentWeek();
    renderCalendar();
    renderAllMembers();
    setupToggleButton();
});
