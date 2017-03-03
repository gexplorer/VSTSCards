/* global chrome:false */
"use strict";
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        var backlogRule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    css: ["div.grid-row"]
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        };
        chrome.declarativeContent.onPageChanged.addRules([backlogRule]);
    });
});

var table = [];

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, { file: "scripts/content.js" }, function() {
        chrome.tabs.sendMessage(tab.id, {}, function(result) {
            table = result;
            chrome.tabs.create({
                url: "cards.html"
            });
        });
    });
});