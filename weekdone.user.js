// ==UserScript==
// @name        OU Week-Finished
// @namespace   http://userscripts.org/users/435889
// @description Hides weeks that are marked finished (have all boxes checked) in the study planner.
// @include     https://learn2.open.ac.uk/course/view.php?id=*
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

var tickedBox = "/i/completion-manual-y"
var untickedBox = "/i/completion-manual-n"

var main = function() {
    // create the div for our use.
    $("<div id='gm_weekhide_div' style='background-color:yellow;padding:5px 15px;'></div>").insertAfter(".studyplanheadingbar");
    //hide completed weeks
    hideWeeks();
};

var createShowButton = function() {
    // Create the clickable text for showing hidden weeks.
    $("#gm_weekhide_div").append("<a href='#' id='gm_showcomplete'>Show Completed Weeks</a>");
    // Listen for click events on the text.
    document.getElementById("gm_showcomplete").addEventListener("click", showComplete_click, false);
};

var createHideButton = function() {
    // As for createShowButton but for hiding completed weeks.
    $("#gm_weekhide_div").append("<a href='#' id='gm_hidecomplete'>Hide Completed Weeks</a>");
    document.getElementById("gm_hidecomplete").addEventListener("click", hideComplete_click, false);
};

var showComplete_click = function() {
    // Show hidden weeks
    showHiddenWeeks();
    // Remove the clickable text.
    $("#gm_showcomplete").remove();
};

var hideComplete_click = function() {
    // Hide completed weeks
    hideWeeks();
    // Remove the clickable text.
    $("#gm_hidecomplete").remove();
};

var hideWeeks = function() {
    // Find all the divs relating to weeks in the study planner
    var e = $(".studyplanweeks.studyplan-withheadings > div.studyplansection");
    // Count them for looping
    var count = e.length;
    // Record if anything has anything been hidden
    var hidden = false;
    for (var i=0;i<count;i++) { // Loop through all the weeks and for each:
        if ((!isCurrentWeek(e[i])) && (!isNextWeek(e[i]))) { // if not this week or next week
            if (isFinishedWeek(e[i])) { // and week has been finished
                hideWeek(e[i]); // Hide the week
                hidden = true; // Record that something has been hidden
            };
        };
    };
    if (hidden) { // if anything has been hidden
        var welcome = document.getElementById("section-1");
        hideWeek(welcome);
        createShowButton(); // create the text to re-show the hidden elements
    };
};

var showHiddenWeeks = function() {
    // Find all the weeks that have been hidden
    var e = $(".studyplanweeks.studyplan-withheadings > div.studyplansection.accesshide");
    // Count them for looping
    var count = e.length;
    for (var i=0;i<count;i++) { // Loop through the found weeks, and for each
        showWeek(e[i]); // reveal it.
    };
    createHideButton(); // create the text to re-hide the completed weeks.
};

var hideWeek = function(week) {week.className += " accesshide"};

var showWeek = function(week) {$('#'+week.id).removeClass("accesshide")};

var isFinishedWeek = function(week) {return ((hasComplete(week)) && (!hasIncomplete(week)))};

var hasComplete = function(week) {return (week.innerHTML.search(tickedBox) > -1)};

var hasIncomplete = function(week) {return (week.innerHTML.search(untickedBox) > -1)};

var isCurrentWeek = function(week) {return week.classList.contains("current")};

var isNextWeek = function(week) {return week.classList.contains("aftercurrent")};

main();
