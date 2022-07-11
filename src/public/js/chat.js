function Chat() {
    const form = document.getElementById('chat');
    const icon = document.getElementById('chatic');
    const show = document.getElementById('chat-show');

    icon.style.display = 'none';
    form.style.display = 'none';
    show.style.display = 'block';
}

// close chat
function Close() {
    const form = document.getElementById('chat');
    const icon = document.getElementById('chatic');
    const show = document.getElementById('chat-show');

    icon.style.display = 'block';
    form.style.display = 'block';
    show.style.display = 'none';
}