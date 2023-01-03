$(function() {
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;

    var lapminutes, lapseconds, lapcentiseconds, timeminutes, timeseconds, timecentiseconds;
    hideandshowButtons("#startButton", "#lapButton");

    $("#startButton").click(function() {
        mode = 1;
        hideandshowButtons("#stopButton", "#lapButton");
        startAction();
    });

    $("#stopButton").click(function() {
        hideandshowButtons("#resumeButton", "#resetButton");
        clearInterval(action);
    });

    $("#resumeButton").click(function() {
        hideandshowButtons("#stopButton", "#lapButton");
        startAction();
    });

    $("#resetButton").click(function() {
        location.reload();
    });

    $("#lapButton").click(function() {
        clearInterval(action);
        lapCounter = 0;
        addLap();
        startAction();
    })

    function hideandshowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    function startAction() {
        action = setInterval(function() {
            lapCounter++;
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            timeCounter++;
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            updateTime();
        }, 10);
    }

    function updateTime() {
        timeminutes = Math.floor(timeCounter / 6000);
        timeseconds = Math.floor((timeCounter % 6000) / 100);
        timecentiseconds = (timeCounter % 6000) % 100;

        $("#timeminute").text(format(timeminutes));
        $("#timesecond").text(format(timeseconds));
        $("#timecentisecond").text(format(timecentiseconds));

        lapminutes = Math.floor(lapCounter / 6000);
        lapseconds = Math.floor((lapCounter % 6000) / 100);
        lapcentiseconds = (lapCounter % 6000) % 100;

        $("#lapminute").text(format(lapminutes));
        $("#lapsecond").text(format(lapseconds));
        $("#lapcentisecond").text(format(lapcentiseconds));
    }

    function format(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function addLap() {
        lapNumber++;
        var myLapDetails =
            '<div class="lap">' +
            '<div class="laptimetitle">' + 'Lap' + lapNumber + '</div>' +
            '<div class="laptime">' + '<span>' + format(lapminutes) + ':</span>' + '<span>' + format(lapseconds) + '</span>' + ':<span>' + format(lapcentiseconds) + '</span>' + '</div>' +
            '</div>';

        $(myLapDetails).prependTo("#laps");
    }
});