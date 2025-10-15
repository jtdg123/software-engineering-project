function logoutUser() {
// Remove the real session keys your app uses
localStorage.removeItem('user_session');
sessionStorage.removeItem('user_session');

// Optional tidy-ups
sessionStorage.removeItem('csrf_token');
// sessionStorage.clear(); // only if you truly want to clear everything else too

// Go back to login
window.location.href = '../index.php';
}


document.addEventListener('DOMContentLoaded', function() {
const calendarContainer = document.getElementById('calendarContainer');
const currentMonthSpan = document.getElementById('currentMonth');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');
const logoutBtn = document.getElementById('logoutBtn');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
const monthNames = [
"January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
currentMonthSpan.textContent = `${monthNames[month]} ${year}`;

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

let table = '<table class="calendar-table">';
table += '<thead><tr>';
['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
table += `<th>${day}</th>`;
});
table += '</tr></thead><tbody><tr>';

let day = 1;
// Fill initial empty cells
for (let i = 0; i < firstDay; i++) {
table += '<td></td>';
}
// Fill days
for (let i = firstDay; i < 7; i++) {
table += `<td>${day}</td>`;
day++;
}
table += '</tr>';

while (day <= daysInMonth) {
table += '<tr>';
for (let i = 0; i < 7; i++) {
if (day > daysInMonth) {
table += '<td></td>';
} else {
table += `<td>${day}</td>`;
day++;
}
}
table += '</tr>';
}
table += '</tbody></table>';
calendarContainer.innerHTML = table;
console.log('Calendar rendered for', monthNames[month], year);
}
if (calendarContainer) {
prevBtn.addEventListener('click', function() {
currentMonth--;
if (currentMonth < 0) {
currentMonth = 11;
currentYear--;
}
renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', function() {
currentMonth++;
if (currentMonth > 11) {
currentMonth = 0;
currentYear++;
}
renderCalendar(currentMonth, currentYear);
});
// Initial render
renderCalendar(currentMonth, currentYear);
}
if (logoutBtn){
logoutBtn.addEventListener('click', function (e) {
e.preventDefault();
logoutUser();
});
}


});
