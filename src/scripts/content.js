/* global chrome:false */
"use strict";

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    const columns = Array.from(document.querySelectorAll(".grid-header-column"))
        .map($column => $column.textContent || "")
        .map((name, index) => {
            return {
                index: index,
                name: name.trim()
            }
        })
        .filter(column => column.name !== "");
 
    const rows = Array.from(document.querySelectorAll(".grid-row"))
        .map($row => Array.from($row.children))
        .map($cells => $cells
            .reduce((row, $cell) => {
                row.push($cell.textContent.trim());
                return row;
            }, [])
        );

    sendResponse({
        columns: columns,
        rows: rows
    });
});