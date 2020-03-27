var tracker;
var project;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

$(function() {
    jqueryDatepicker($);

    toggleDarkmode(parseInt(localStorage.getItem('darkmode')));

    $('#darkmode-toggle').click(function() {
        toggleDarkmode(($('#darkmode').attr('href') !== 'css/darkmode.css'));
    });

    function toggleDarkmode(setDark) {
        if (setDark) {
            localStorage.setItem('darkmode', '1');
            $('#darkmode').attr('href', 'css/darkmode.css');
        } else {
            localStorage.setItem('darkmode', '0');
            $('#darkmode').attr('href', '');
        }
    }

    tracker = new Tracker();

    route('', () => {
        project = undefined;
        riot.mount('issue-tracker');
    });
    route('/projects/*', (client_id) => {
        project = tracker.getProject(client_id);
        riot.mount('issue-tracker');
    });
    route.start(true);

    if (typeof project === 'undefined') {
        project = tracker.get(0);
    }
    if (typeof project !== 'undefined') {
        route('projects/' + project.client_id);
    }

    riot.mount('issue-tracker');
});