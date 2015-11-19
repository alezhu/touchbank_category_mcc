// ==UserScript==
// @name         TouchBank MCC Category
// @namespace    https://github.com/alezhu/touchbank_category_mcc
// @version      0.1
// @description  Switching visibility of MCC code for category in the internet bank of TouchBank
// @author       alezhu
// @match        https://www.touchbank.com/lk/bonus*
// @source       https://raw.githubusercontent.com/alezhu/touchbank_category_mcc/master/TouchBank%20MCC%20Category.user.js
// @updateURL    https://raw.githubusercontent.com/alezhu/touchbank_category_mcc/master/TouchBank%20MCC%20Category.user.js
// @downloadURL  https://raw.githubusercontent.com/alezhu/touchbank_category_mcc/master/TouchBank%20MCC%20Category.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function(window, angular) {
    var LOG = 0;

    angular.element(document).ready(function() {
        if (LOG) console.log('ready');
        var doc = angular.element(document);
        var count = 100;
        var wait = function(check, action, context) {
            count--;
            if (!count) return;
            if (check(context)) {
                action(context);
                return;
            }
            setTimeout(function() {
                wait(check, action, context);
            }, 500);

        };
        wait(function(doc) {
            if (angular.isDefined(doc.scope)) {
                var scope = doc.scope();
                return angular.isDefined(scope);
            }
            return false;
        }, function(doc) {
            if (LOG) console.log('scope');
            doc.scope().$evalAsync(function() {
                angular.element("<style type='text/css'> " +
                    ".icon2-bonus-switch:before {" +
                    "    content: '\\e649';" +
                    "    margin-left: 1em;" +
                    "    cursor: pointer;" +
                    "}" +
                    ".bonus-category-list {" +
                    "    display: block;" +
                    "    width: 100%;" +
                    "    text-align: left;" +
                    "}" +
                    ".mcc {" +
                    "    position: absolute;" +
                    "    left: 0px;" +
                    "    top: 0px;" +
                    "    width: 100%;" +
                    "    display: none;" +
                    "    overflow-y: auto;" +
                    "    text-align: left;" +
                    "    height: 110px;" +
                    "    padding-left: 150px;" +
                    "}" +
                    ".bonus-category-list .mcc{" +
                    "    display: block;" +
                    "}" +
                    ".bonus-categories-list .category-icon {" +
                    "    font-size: 44px;" +
                    "    margin: 40px;" +
                    "}" +
                    ".bonus-category .ico-favorite {" +
                    "    position: absolute;" +
                    "    top: 6px;" +
                    "    right: inherit;" +
                    "    left: 120px;" +
                    "}" +
                    "</style>").appendTo("head");
                var context = {};
                wait(
                    function(context) {
                        context.bcl = angular.element('.bonus-categories-list');
                        return angular.isDefined(context.bcl) && context.bcl.length > 0;
                    },
                    function(context) {
                        var h2 = context.bcl.find('h2');
                        angular.element("<i/>").addClass("icon2-bonus-switch").click(function(event) {
                            if (LOG) console.log('click');
                            event.preventDefault();
                            context.bcl.find(".bonus-category").toggleClass("bonus-category-list");
                        }).appendTo(h2);
                        wait(
                            function(context) {
                                context.categ = context.bcl.find(".bonus-category");
                                return angular.isDefined(context.categ) && context.categ.length > 0;
                            },
                            function(context) {
                                //debugger;
                                context.categ.each(function() {
                                    var scope = angular.element(this).scope();
                                    angular.element("<div class='mcc' />").text(scope.category.tooltip).appendTo(this);
                                });

                            },
                            context
                        );
                    },
                    context
                );
            })
        }, doc);
    });
})(window, angular);
