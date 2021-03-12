var latest;

function hideElement(elem) {
    $(elem).slideUp();
}

function showElement(elem) {
    $(elem).slideDown();
}

function defaultHideElement(elem) {
    $(elem).hide();
}

function getCurrentVersion() {
    $.get("https://cdn.jsdelivr.net/gh/ImExiledd/NCS@new/latest.json", function(data) {
        console.log(data);
        console.log(data.latest);
        $('#version').text("Version: " + data.latest);
    });
}

window.onload = function() {
    defaultHideElement('#about');
    setTimeout(function() {
        getCurrentVersion();
    }, 1000);
}