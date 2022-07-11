function update() {
    const collection = document.getElementsByClassName('info');
    const collection2 = document.getElementsByClassName('iput');
    const collection3 = document.getElementsByClassName('iput2');
    const collection4 = document.getElementById('info2');
    const width = document.getElementById('noi3');
    document.getElementById('butt').style.display = 'none';
    document.getElementById('but2').style.display = 'block';
    for (let i = 0; i < collection.length || i < collection2.length || i < collection3; i++) {
        collection[i].style.display = 'none';
        collection2[i].style.display = 'block';
        collection3[i].style.display = 'block';
        collection4.style.display = 'none';
        width.style.gridColumnEnd = '4';
    }
}