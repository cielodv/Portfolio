function showAll() {
    const list = document.getElementById('list');

    let nameList = "";

    names.forEach(element => {
        nameList += element + "<br/>";

    });

    list.innerHTML = nameList;
}
function addName(){
    const name = document.getElementById('name').value;
    
    names.push(name);
    showAll();
    document.getElementById('name').value="";
}