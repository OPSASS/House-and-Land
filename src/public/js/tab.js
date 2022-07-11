// open tap
function opentab(evt, noid) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(noid).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function opentab2(evt, noid) {
    var i, tabcontent2, tablink2;
    tabcontent2 = document.getElementsByClassName('tabcontent2');
    tablink2 = document.getElementsByClassName('tablink2');
    for (i = 0; i < tabcontent2.length; i++) {
        tabcontent2[i].style.display = 'none';
    }
    for (i = 0; i < tablink2.length; i++) {
        tablink2[i].className = tablink2[i].className.replace(' active', '');
    }
    document.getElementById(noid).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function opentab3(evt, noid) {
    var i, tabcontent3, tablink3;
    tabcontent3 = document.getElementsByClassName('tabcontent3');
    tablink3 = document.getElementsByClassName('tablink3');
    for (i = 0; i < tabcontent3.length; i++) {
        tabcontent3[i].style.display = 'none';
    }
    for (i = 0; i < tablink3.length; i++) {
        tablink3[i].className = tablink3[i].className.replace(' active', '');
    }
    document.getElementById(noid).style.display = 'block';
    evt.currentTarget.className += ' active';
}

document.getElementById('defaultOpen').click();