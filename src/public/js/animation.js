// back to top
const navtop = document.getElementById('navtop');
const navt = document.getElementById('navt');
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
    ) {
        navtop.style.height = '83px';
        navt.style.marginTop = '0%';
    } else {
        navtop.style.height = '50px';
        navt.style.marginTop = '2%';
    }
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function xemthem() {
    const them = document.getElementsByClassName('them')
    const tatca = document.getElementsByClassName('tatca')
    for (let i = 0; i < them.length && i < tatca.length; i++) {
        them[i].style.display = 'none';
        tatca[i].style.display = 'block';
    }
    document.getElementById('add8b').style.display = 'block';
    document.getElementById('add8t').style.display = 'block';
    document.getElementById('add8s').style.display = 'block';
}

function exit() {
    window.onbeforeunload = function() {
        return 'Mọi thay đổi bạn thực hiện có thể không được lưu.';
    };
}