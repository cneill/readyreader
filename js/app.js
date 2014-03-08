var the_text = [];

var crunch_text = function() {
    tokenize($("#text_input").val());
    next(the_text.pop());
};

// go to the next word after a timer
var next = function (word) {
    flip_word(word);
    // set a minimum delay, and a delay per letter
    time = Math.max(120, 20 * word.length);
    // add a delay for periods and commas
    if (word.indexOf(".") != -1 || word.indexOf(",") != -1) {
        time += 80;
    }
    setTimeout(function () {
        if(the_text.length > 0) {
            next(the_text.pop());
        }
    }, time);
};

var prev = function () {

}

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

var tokenize = function (str) {
    str = str.replace(/\s+/g, " ");
    str = str.replace(/ [^\w]+ /g, " ");
    str = str.replace(/\s$/g, "");
    temp = str.split(/\s+/).reverse();
    the_text = temp;
};

$(function () {

});
