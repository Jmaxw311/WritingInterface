
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
        var row = "";
        for (i in s.xcoordinates) {
            row += s.xcoordinates[i].toString();
            row += " , ";
            row += s.ycoordinates[i].toString();
            row += " ; ";
        }
        table = "[" + row + "] ; ";
        table = table.replace(" ; ]", " ]");
        text += table;
    }
    text = "{ " + text + " }";
    text = text.replace(";  }", " }");
    return text;
}

function sendData() {
    selectElementContents(document.getElementById("outcontent"));
    var results = getResultsText();
    if (results == "") {
        $("#sendbutton").notify("No data to send.", "warn");
    } else {
        var email = 'bigbrain427@gmail.com';
        var subject = 'Test Results';
        var bodytext = 'Please send this Email as-is, without modifying the following message:\n\n' + results;
        window.open('mailto:' + email + '?subject=' + encodeURI(subject) + '&body=' + encodeURI(bodytext));
    }
}