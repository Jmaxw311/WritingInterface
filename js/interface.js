
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

function getResultsText() {
    var text = "";
    for (si in strokes) {
        var s = strokes[si];
        var table = "";
        var xrow = "";
        var yrow = "";
        for (i in s.xcoordinates) {
            xrow += s.xcoordinates[i].toString() + " ";
        }
        for (i in s.ycoordinates) {
            yrow += s.ycoordinates[i].toString() + " ";
        }
        table += xrow + ";\n" + yrow;
        text += "[" + table + "]\n\n";
    }
    return text;
}

function sendData() {
    selectElementContents(document.getElementById("outcontent"));
    var results = getResultsText();
    if (results == "") {
        $("#sendbutton").notify("No data to send.", "warn");
    } else {
        window.open('mailto:test@example.com?subject=Test%20Results&body=' + encodeURI('Please send this Email as-is, without modifying the following message:\n\n' + results));
    }
}