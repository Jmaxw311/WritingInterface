
function displayData() {
    $("#outcontent").text(getResultsText());
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
        trial += "," + results[ti].canvas.toFixed(0);
        text += trial + "; ";
    }
    text = "{ " + text + " }";
    text = text.replaceAll(" ", ""); // remove spaces (condense/optimize for URI)
    text = text.replaceAll(",;", ";"); // remove empty columns
    text = text.replaceAll(";,", ";"); // remove empty columns
    text = text.replaceAll(";}", "}"); // remove empty rows
    text = text.replaceAll(",}", "}"); // remove empty columns
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