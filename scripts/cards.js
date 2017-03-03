/* global chrome:false, $:false */
"use strict";

var cards = [];
var idIndex = -1;
var typeIndex = -1;
var titleIndex = -1;
var effortIndex = -1;
var zoom = true;

document.addEventListener("DOMContentLoaded", init);

function init() {
    var bg = chrome.extension.getBackgroundPage();
    var rows = bg.table.rows;
    var columns = bg.table.columns;

    if (rows.length > 0) {
        var $columns = $("#columns");
        var oneCard = rows[0];
        var cols = [];
        var options = [{
            index: -1,
            name: "None",
            value: ""
        }];

        for (var c in columns) {
            var column = {
                index: c,
                name: columns[c],
                value: oneCard[c]
            };
            options.push(column);

            switch (column.name.toLowerCase()) {
                case "id":
                    idIndex = column.index;
                    break;
                case "work item type":
                    typeIndex = column.index;
                    break;
                case "title":
                    titleIndex = column.index;
                    break;
                case "effort":
                    effortIndex = column.index;
                    break;
            }
        }

        appendOptions($("#id"), options);
        appendOptions($("#type"), options);
        appendOptions($("#title"), options);
        appendOptions($("#effort"), options);
        $("#zoom").attr("checked", zoom);

        $("#id")
            .val(idIndex)
            .on("change", function () {
                idIndex = $(this).val();
                printCards();
            });

        $("#type")
            .val(typeIndex)
            .on("change", function () {
                typeIndex = $(this).val();
                printCards();
            });

        $("#title")
            .val(titleIndex)
            .on("change", function () {
                titleIndex = $(this).val();
                printCards();
            });

        $("#effort")
            .val(effortIndex)
            .on("change", function () {
                effortIndex = $(this).val();
                printCards();
            });

        $("#zoom")
            .on("change", function () {
                zoom = this.checked;
                printCards();
            });

        cards = rows;

        $("#config").modal("show");

        printCards();
    }
}

function appendOptions($select, options) {
    for (var o in options) {
        var option = options[o];
        var msg = option.name;
        if (option.value.length > 0) {
            while (msg.length < 30) {
                msg += "\u2002";
            }
            var value = option.value;
            if (value.length > 50) {
                value = value.substring(0, 50) + "...";
            }
            msg += "'" + value + "'";
        }

        $select.append($("<option></option>", {
            value: option.index,
            html: msg,
            title: option.value
        }));
    }
}

function printCards() {
    var $page = $("#page");
    $page.empty();

    for (var c in cards) {
        var $card = generateCard(cards[c]);
        $card.appendTo($page);
    }

    if (zoom) {
        resizeTitles();
    }
}

function generateCard(card) {
    var id = card[idIndex];
    var type = card[typeIndex];
    var title = card[titleIndex].trim();
    var effort = card[effortIndex];

    if (effort > 0 && effort < 1) {
        effort = (effort+"").substring(1);
    }

    var typeClass = type === "Bug" ? "bug" : "pbi";
    var $wrapper = $("<span></span>", {
            "class": "wrapper "
        })
        .on("click", function (event) {
            $(event.currentTarget).toggleClass("no-print");
        });

    var $card = $("<div></div>", {
            "class": "card " + typeClass
        })
        .appendTo($wrapper);

    var $effort = $("<span></span>", {
        "class": "effort",
        html: effort
    }).appendTo($card);

    var $id = $("<span></span>", {
        "class": "id",
        html: id
    }).appendTo($card);

    var $title = $("<span></span>", {
        "class": "title",
        html: title
    }).appendTo($card);

    return $wrapper;
}

function resizeTitles() {
    $(".title").each(function (i, title) {
        var $title = $(title);
        var parentHeight = Math.floor($title.parent().height() * 0.9);
        var parentWidth = Math.floor($title.parent().width());

        var step = 2;
        for (var font = 50; font > 10; font -= step) {
            $title.css("font-size", px(font));

            if ($title.height() < parentHeight && $title.width() <= parentWidth) {
                $title.css("font-size", px(--font));
                return;
            }
        }
    });
}

function px(size){
    return size + "px";
}