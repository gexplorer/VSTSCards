/* global chrome:false */
"use strict";

function getColumns() {
    var $columns = document.querySelectorAll(".grid-header-column");

    var columns = [];
    for (var c = 0; c < $columns.length; c++) {
        var col = $columns[c];
        columns.push(col.textContent);
    }
    return columns;
}

function getRows() {
    var $rows = document.querySelectorAll(".grid-row");

    var rows = [];
    for (var r = 0; r < $rows.length; r++) {
        var $row = $rows[r];
        var $cells = $row.children;
        var item = [];
        for (var c = 0; c < $cells.length; c++) {
            item.push($cells[c].textContent.trim());
        }
        console.debug(item);
        rows.push(item);
    }
    return rows;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({
        columns: getColumns(),
        rows: getRows()
    });
});