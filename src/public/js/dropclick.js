// click dropdown
function Dropclick() {
    document.getElementById('Dropclick').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropclick')) {
        const Dropdown = document.getElementById('Dropclick');
        if (Dropdown.classList.contains('show')) {
            Dropdown.classList.remove('show');
        }
    }
}