$(function() {
    $('#stop').hide();
    // Control panel actions
    $('.control-panel').hide();
    $('.timer-info').on('click', function() {
        $('audio').get(0).play();
        $('.control-panel').toggle();
    })
    $('#control-panel-close').on('click', function() {
        $('audio').get(0).play();
        $('.control-panel').hide();
    })


    // jQuery knob settings
    $("#workdial").knob({
        'min': 1,
        'max': 59,
        'fgColor' : '#EE6055',
        'inputColor' : '#435058',
        'release': function(v) {
            mainTime = v;
            $('#maintime').html(v);
            $('#min').html(mainTime);
            $('#sec').html('00');
        }
    });

    $("#breakdial").knob({
        'min': 1,
        'max': 59,
        'fgColor' : '#70D6FF',
        'inputColor' : '#435058',
        'release': function(v) {
            breakTime = v;
            $('#breaktime').html(v);
        }
    });

    // variables
    var mainTime = 25, 
    breakTime    = 5,
    t,
    session      = true,
    relax        = false,
    timer        = false;
    //functions
    function getDuration() {
        let m = parseInt($('#min').html()),
        s     = parseInt($('#sec').html())
        t     = (m * 60) + s;
        return t;
    }

    function reset() {
        $('#min').html(mainTime);
        $('#sec').html('00');
        session = true;
        relax = false;
        $('polygon').css('fill', '#EE6055');
    } 

    function updateTimer() {
        t = getDuration();
        t--;
        console.log(t);
        var seconds = Math.floor(t % 60);
        var minutes = Math.floor((t/60) % 60);
        var secString = seconds.toString();
        secString = '0' + secString;
        var minString = minutes.toString();
        minString = '0' + minString;
        $('#min').html(minString.slice(-2));
        $('#sec').html(secString.slice(-2));

        if ((session) && (minutes + seconds === 0)) {
            $('audio').get(1).play();
            $('#min').html(breakTime);
            $('#sec').html('00');
            session = false;
            relax = true;
            $('polygon').css('fill', 'green');
        }
        else if ((relax) && (minutes + seconds === 0)) {
            $('audio').get(1).play();
            reset();
        }
    }

    $('.start').on('click', function () {
        if (timer) {
            return;
        }
        $('#stop').hide();
        $('#pause').show();
        timer = setInterval(function() {
        updateTimer()
        }, 1000);
    })

    $('#pause').on('click', function() {
        if (!timer) {
            return;
        }
        clearInterval(timer);
        timer = false;
        $('#pause').hide();
        $('#stop').show();
    })

    $('#stop').on('click', function(){
        reset();
    })

    });