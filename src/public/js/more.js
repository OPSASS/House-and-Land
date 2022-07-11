// dem van ban
function charCount(textarea) {
    max = 3000;
    var length = textarea.value.length;
    if (length > max) {
        textarea.value = textarea.value.substring(0, max);
    } else {
        document.getElementById('textCount').innerHTML = length + '/' + max;
    }
}

function charTitle(text) {
    max = 99;
    var length = text.value.length;
    if (length > max) {
        text.value = text.value.substring(0, max);
    } else {
        document.getElementById('textTitle').innerHTML = length + '/' + max;
    }
}



