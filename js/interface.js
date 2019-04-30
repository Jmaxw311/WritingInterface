
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
    for (ti in results) {
        trial = "";
        for (si in results[ti].strokes) {
            var s = results[ti].strokes[si];
            var table = "";
            var row = "";
            for (i in s.xcoordinates) {
                row += s.xcoordinates[i].toFixed(0);
                row += " , ";
                row += s.ycoordinates[i].toFixed(0);
                row += " ; ";
            }
            table = "[" + row + "] ; ";
            table = table.replace(" ; ]", " ]");
            trial += table;
        }
        trial = "{ " + trial + " }";
        trial = trial.replace(";  }", " }");
        trial += " " + results[ti].canvas.toFixed(0);
        text += trial + "; ";
    }
    text = "{ " + text + " }";
    text = text.replace(";  }", " }");
    text = text.replaceAll(" ", "");
    console.log(text);
    return text;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function sendData() {
    selectElementContents(document.getElementById("outcontent"));
    var results = getResultsText();
    if (results == "") {
        $("#sendbutton").notify("No data to send.", "warn");
    } else {
        var email = 'bigbrain427@gmail.com';
        var subject = 'Test Results';
        var bodytext = 'Please send this Email as-is, without modifying the following message:\n\n' + results;
        window.open('mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodytext));
    }
}

window.addEventListener("orientationchange", resizeCanvas, false);