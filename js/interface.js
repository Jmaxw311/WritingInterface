
function displayData() {
    document.getElementById("outcontent").innerHTML = "";
    for (si in strokes) {
        var s = strokes[si];
        var table = document.createElement("table");
        var xrow = document.createElement("tr");
        var yrow = document.createElement("tr");
        table.appendChild(xrow);
        table.appendChild(yrow);
        for (i in s.xcoordinates) {
            var column = document.createElement("td");
            xrow.appendChild(column);
            var text = document.createTextNode(s.xcoordinates[i].toString());
            column.appendChild(text);
        }
        for (i in s.ycoordinates) {
            var column = document.createElement("td");
            yrow.appendChild(column);
            var text = document.createTextNode(s.ycoordinates[i].toString());
            column.appendChild(text);
        }
        document.getElementById("outcontent").appendChild(table);
    }
}

function copyData() {
    console.log("copy");
    displayData();
    selectElementContents(document.getElementById("outcontent"));
    if (document.execCommand("copy"))
        $("#copybutton").notify("Results copied to the clipboard.", "success");
    else
        $("#outcontainer").notify("Please copy this table and send it to us.", "error");
}