var the_text = [];
var history = [];
var direction = 1;
var speed = 1;
var fast_speed = 40;
var pause = 60;
var min_time = 100;
var char_delay = 20;

// parse the text in the textarea
var crunch_text = function() {
    tokenize($("#text_input").val());
    var temp = the_text.pop();
    history.push(temp);
    next(temp);
};

// show the actual word
var flip_word = function (word) {
    var first_half, middle, second_half, html = "";

    if (word.length == 1) {
        middle = word;
    } else if (word.length == 2) {
        middle = word[0];
        second_half = word[1];
    } else if (word.length == 3) {
        first_half = word[0];
        middle = word[1];
        second_half = word[2];
    } else {
        first_half = word.slice(0, Math.floor(word.length/2)-1);
        middle = word[Math.floor(word.length/2)-1];
        second_half = word.slice(Math.floor(word.length/2), word.length);
    }

    if (first_half) {
        html += "<span class='first_half'>" + first_half + "</span>";
    }
    if (middle) {
        html += "<span class='middle'>" + middle + "</span>";
    }
    if (second_half) {
        html += "<span class='second_half'>" + second_half + "</span>";
    }
    $("#output").html(html);
};

// split the text into words, removing non-words
var tokenize = function (str) {
    str = str.replace(/\s+/g, " ");
    str = str.replace(/ [^\w]+ /g, " ");
    str = str.replace(/\s$/g, "");
    temp = str.split(/\s+/).reverse();
    the_text = temp;
};

// go to the next word after a timer
var next = function (word, delay) {
    if (direction != 1 || (delay && speed == 1)) {
        return;
    }
    flip_word(word);
    // set a minimum delay, and a delay per letter
    time = delay || Math.max(min_time, char_delay * word.length);
    // add a delay for periods and commas
    if (word.indexOf(".") != -1 || word.indexOf(",") != -1) {
        time += pause;
    }

    if(the_text.length > 0) {
        var temp = the_text.pop();
        history.push(temp);
        setTimeout(function () {
            if(delay) {
                next(temp, delay);
            } else {
                next(temp);
            }
        }, time);
    }
};

// go to the previous word
var prev = function (word) {
    if (direction != -1) return;
    flip_word(word);
    if(history.length > 0) {
        var temp = history.pop();
        the_text.push(temp);
        setTimeout(function () {
            prev(temp);
        }, fast_speed);
    } else {
        swap_directions();
    }
}

var swap_directions = function () {
    if (direction == 1) {
        direction = -1;
        var temp = history.pop();
        the_text.push(temp);
        prev(temp);
    } else {
        direction = 1;
        var temp = the_text.pop();
        the_text.push(temp);
        next(temp)
    }
};

// listen for rewinds and fast forwards
var setup_events = function () {
    $(document).keydown(function (e) {
        if (e.keyCode == 37 && direction == 1) {
            swap_directions();
        }
        if (e.keyCode == 39 && speed == 1) {
            speed = 2;
            var temp = the_text.pop();
            history.push(temp);
            next(temp, fast_speed);
        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 37 && direction == -1) {
            swap_directions();
        }
        if (e.keyCode == 39 && speed == 2) {
            alert(1);
            speed = 1;
            var temp = the_text.pop();
            history.push(temp);
            next(temp);
        } else if (e.keyCode == 39) {
            alert(1);
        }
    });
}

$(function () {
    setup_events();
})();
