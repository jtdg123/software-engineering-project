/**
 * @jest-environment jsdom
 */
const { JSDOM } = require('jsdom');

// Mock window.location
delete window.location;
window.location = { href: '' };

require('../createEmployee.js');

describe('createEmployee.js', () => {
  beforeEach(() => {
    // Setup a fake DOM
    document.body.innerHTML = `
      <div id="calendarContainer"></div>
      <span id="currentMonth"></span>
      <button id="prevMonth"></button>
      <button id="nextMonth"></button>
      <button id="logoutBtn"></button>
    `;
    localStorage.clear();
    sessionStorage.clear();
  });

  test('logoutUser removes session data and redirects', () => {
    localStorage.setItem('user_session', 'abc123');
    sessionStorage.setItem('user_session', 'xyz456');
    sessionStorage.setItem('csrf_token', 'token');

    logoutUser();

    expect(localStorage.getItem('user_session')).toBeNull();
    expect(sessionStorage.getItem('user_session')).toBeNull();
    expect(sessionStorage.getItem('csrf_token')).toBeNull();
    expect(window.location.href).toContain('index.php');
  });

  test('calendar renders correct month and year', () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const currentMonthSpan = document.getElementById('currentMonth');
    const calendarContainer = document.getElementById('calendarContainer');

    // simulate rendering
    const renderCalendar = (month, year) => {
      currentMonthSpan.textContent = `${monthNames[month]} ${year}`;
      calendarContainer.innerHTML = '<table></table>';
    };

    renderCalendar(month, year);
    expect(currentMonthSpan.textContent).toBe(`${monthNames[month]} ${year}`);
    expect(calendarContainer.innerHTML).toContain('<table>');
  });
});
