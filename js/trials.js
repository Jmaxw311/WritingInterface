
var numbers = [
    'zero',
    'one', 
    'two', 
    'three',
    'four',
    'five',
    'six', 
    'seven',
    'eight',
    'nine'
];
var style1 = 'normally';
var style2 = 'quickly/roughly';
var trials = [
    [numbers[1], style1],
    [numbers[2], style1],
    [numbers[3], style1],
    [numbers[4], style1],
    [numbers[5], style1],
    [numbers[6], style1],
    [numbers[7], style1],
    [numbers[8], style1],
    [numbers[9], style1],
    [numbers[0], style1],

    [numbers[1], style2],
    [numbers[2], style2],
    [numbers[3], style2],
    [numbers[4], style2],
    [numbers[5], style2],
    [numbers[6], style2],
    [numbers[7], style2],
    [numbers[8], style2],
    [numbers[9], style2],
    [numbers[0], style2]
];

var trialN = 0;
$("#trialscount").text(trials.length.toString());

function selectTrial(n) {
    if (strokes.length > 0) {
        if (trialN < trials.length) {
            logResult(trialN);
            trialN = n;
        }
        if (n < trials.length) {
            $("#trialcounter").text((n + 1).toString());
            $("#drawthis").html(trials[n][0]);
            $("#styleprompt").html(trials[n][1]);
        }
        clearStrokes();
        if (n >= trials.length) {
            $("#nextbutton").addClass("hidden");
            //$("#copybutton").removeClass("hidden");
            $("#sendbutton").removeClass("hidden");
            $("#prompt").html('Thank you for taking the time to produce this sample. Please click the button below to send us your results.');
        }
    } else {
        $("#prompt").notify("Please follow the prompt before continuing.", "error");
    }
}

function logResult(n) {
    if (strokes.length > 0) {
        console.log("logged test " + (n + 1));
        results[n] = {
            strokes: strokes,
            canvas: width
        }
        return true;
    } else {
        $("#prompt").notify("Please follow the prompt before continuing.", "error");
        return false;
    }
}

results = [];