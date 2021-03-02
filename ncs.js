/*
 *
 *	NCS is Copyright (C) Exile, 2021.
 *   NCS is licensed under MIT. Please give credit
 *   Where credit is due.
 *
 */
// ensure jquery works
window.onload = function () {
    if (!window.jquery) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://code.jquery.com/jquery-3.5.1.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        jQuery.noConflict();
    }
    setTimeout(NCS.init(), 1500);
}

window.onbeforeunload = function (e) {
    // save ncs settings
    window.localStorage.setItem('ncs2-settings', JSON.stringify(NCS.userSettings));
}

var NCS = {
    // all code goes here, to prevent conflicts with Musiqpad or other scripts.
    userSettings: $.extend({
        autoLike: false,
        autoJoin: false,
        eta: true,
        customBackground: false,
        customBackgroundUri: null,
        customThemeEnabled: false,
        moderatorSongAlert: false,
        currentTheme: null,
        hideChat: false,
        desktopnotif: false,
    }, (JSON.parse(window.localStorage.getItem('ncs2-settings')) || {})),
    settings: {
        version: "2.0.0",
        changelog: $.getJSON("https://cdn.jsdelivr.net/gh/ImExiledd/NCS@new/changelog.json", function (json) { console.info("found changelog");/*NCS.settings.changelog= json;*/ }),
        rcs: {
            rcsThemeJson: {
                "room": "Radiant Music",
                "author": "Origin",
                "icon": "https://cdn.radiant.dj/rcs/icons/radiant/logo.png",
                "css": "https://cdn.radiant.dj/rcs/rs_room.css",
                "rules": {
                    "allowAutorespond": true,
                    "allowAutowoot": true,
                    "allowAutojoin": true,
                    "allowAutograb": true,
                    "allowSmartVote": true,
                    "allowEmotes": true,
                    "allowShowingMehs": true,
                    "forceSmartVote": false
                },
                "ccc": {
                    "admin": "#42A5DC",
                    "ambassador": "#84B423",
                    "host": "#FF9B00",
                    "cohost": "#F3508F",
                    "manager": "#F3508F",
                    "bouncer": "#F3508F",
                    "rdj": "#5DB4FF",
                    "subscriber": "#A1A6B3",
                    "silversubscriber": "#A1A6B3",
                    "friend": "#B35D88",
                    "user": "#8B92A3"
                },
                "images": {
                    "background": null,
                    "playback": null,
                    "admin": "https://cdn.radiant.dj/rcs/icons/radiant/admin.png",
                    "ambassador": "https://cdn.radiant.dj/rcs/icons/radiant/ambassador.png",
                    "host": "https://cdn.radiant.dj/rcs/icons/radiant/host.png",
                    "cohost": "https://cdn.radiant.dj/rcs/icons/radiant/cohost.png",
                    "manager": "https://cdn.radiant.dj/rcs/icons/radiant/manager.png",
                    "bouncer": "https://cdn.radiant.dj/rcs/icons/radiant/bouncer.png",
                    "rdj": "https://cdn.radiant.dj/rcs/icons/radiant/residentdj.png",
                    "subscriber": null,
                    "silversubscriber": "https://cdn.radiant.dj/rcs/icons/radiant/subscriber.png"
                },
                "autocomplete": [],
                "emotes": {
                    "custom_test": "https://cdn.radiant.dj/rcs/icons/test_custom.png"
                }
            },

        }
    },
    funct: {
        addMenu: (function () {
            var models = {
                'tab': `<div id="NCSMenu" data-ng-click="prop.c = 31" data-ng-class="{\'active\' : prop.c == 31}" class="tab ncs-tab">
                    <span class="icon-info">NCS</span>
                </div>`,
                'back': `<div data-ng-show="(prop.c == 31)" class="ng-hide" id="ncs-back">
                    <div class="items">
                        <div id="header-general" class="header">General Functionality</div>
                        <div id="autoLike" class="item auto-like" onclick='NCS.funct.settingChanger("autoLike");'>AutoLike</div>
                        <div id="autoJoin" class="item auto-join" onclick='NCS.funct.settingChanger("autoJoin");'>AutoJoin DJ Queue</div>
                        <div id="afk-responder" class="item afk-responder">WIP AFK Responder</div>
                        <div id="header-themes" class="header">Themes</div>
                        <div id='custom-theme' class='item mqp-rcs' onclick='NCS.funct.setTheme("rcs");'>RCS Theme Revived</div>
                        <div id='mqp-tiki-theme' class=item mqp-tiki' onclick='NCS.funct.setTheme("tiki");'>Tiki</div>
                        <div id='mqp-halloween-theme' class=item mqp-halloween' onclick='NCS.funct.setTheme("halloween");'>Halloween</div>
                        <div id='mqp-ncs-classic-theme' class=item mqp-ncs-classic' onclick='NCS.funct.setTheme("ncs-classic");'>NCS Classic</div>
                        <div id="header-personalization" class="header">Personalization</div>
                        <div id="desktopnotif" class="item desktop-notifs" onclick='NCS.funct.settingChanger("desktopnotif");'>Desktop Notifications</div>
                        <div id="custom-background" class="item custom-background">WIP Custom Background</div>
                        <div id="custom-mention-sounds" class="item custom-mention-sounds">WIP Custom Mention Sounds</div>
                        <div id="eta" class="item eta" onclick='NCS.funct.settingChanger("eta");'>ETA</div>
                        <div id="header-moderation" class="header">Moderation</div>
                        <div id="moderatorSongDurationAlert" class="item eta">Song Duration Alert</div>
                        <div id="header-edit-stuff" class="header">Edit your Settings</div>
                        <div id="afk-message" class="item editable afk-message">WIP Edit AFK Message</div>
                        <div id="custom-background-edit" class="item editable custom-background">WIP Custom Background</div>
                        <div id="custom-mention-sounds" class="item editable custom-mention-sounds">WIP Custom Mention Sounds</div>
                        <div id="header-miscellaneous" class="header">Miscellaneous</div>
                        <div id="hideChat" class="item hideChat" onclick="NCS.funct.hideChat();">Hide Chat</div>
                    </div>
                </div>`
            };
            var tab = $('.dash .tray').append(models.tab);
            var back = $('#app-right').append(models.back);

            back.find('.item').append('<i class="mdi mdi-check"></i>');
            back.find('.editable').append('<i class="mdi mdi-pencil"></i>');
            back.find('.header').append('<i class="mdi mdi-puzzle"></i>');

            // Apply shit to the scope
            var scope = angular.element('.tray > *').scope();
            $('body').injector().invoke(function ($compile, $rootScope) {
                $compile($('.dash .tray .ncs-tab'))(scope);
                $compile($('#app-right > #ncs-back'))(scope);
                scope.$apply();
            });
        }),
        intervals: {
            readableEta: function (total) {
                var hours = ~~(total / 3600);
                var minutes = (~~(total / 60)) % 60;
                var seconds = total % 60
                return NCS.funct.intervals.normalize(hours) + ':' + NCS.funct.intervals.normalize(minutes) + ':' + NCS.funct.intervals.normalize(seconds);
            },
            normalize: function (number) {
                var addition = (number < 10
                    ? '0'
                    : '');
                return addition + number;
            },
            eta: setInterval(function () {
                var position = API.queue.getPosition();
                if (NCS.userSettings.eta) {
                    position = (position < 0) ? API.queue.getDJs().length : position - 1;
                    var eta = ~~((position * (3.5 * 60)) + API.room.getTimeRemaining());

                    if (NCS.userSettings.eta) {
                        // true
                        if (API.queue.getPosition() === 0) {
                            $('.btn-join').attr('data-eta', "You're the DJ!");
                        } else {
                            $('.btn-join').attr('data-eta', NCS.funct.intervals.readableEta(eta));
                        }
                    } else {
                        $('btn-join').removeAttr('data-eta');
                    }
                }
                if (position == -1 && NCS.userSettings.autoJoin) {
                    NCS.funct.intervals.autojoin();
                }
            }, 1000),
            autojoin: function () {
                var permission = (typeof permissions === "undefined") ? API.util.hasPermission('djqueue.join') : permission
                if (API.queue.getPosition() == -1 && permission) {
                    API.queue.join()
                } else {
                    return;
                }
            },
            autolike: setInterval(function () {
                if (NCS.userSettings.autoLike) {
                    if (!('.btn-upvote').hasClass('active')) {
                        $('.btn-upvote').click();
                    }
                }
            }, 1000)
        },
        hideChat: function (state) {
            if (typeof state === "undefined") {
                NCS.funct.settingChanger('hideChat');
            }
            NCS.funct.checkMarkChanger('hideChat');
            console.log("Run HideChat");
            if (NCS.userSettings.hideChat === false) {
                console.log("Showing Chat");
                $('#app-right').css('visibility', 'visible');
                $('#chat').css('visibility', 'visible');
                $('.playback').removeClass('centerPlayer');
                $('#ShowChatBtnCtrl').remove();
                $('.logo-menu').removeClass('NCSlogo-menu-width');
                $('.btn-chat').removeClass('disabled');
                $('.btn-people').removeClass('disabled');
                $('.btn-waitlist').removeClass('disabled');
                $('.ncs-tab').removeClass('disabled');
                $('#StandWithKeem').removeClass('StandWithKeemCenter');
                $('#KeemText').removeClass('KeemTextCenter');
            } else {
                console.log("Hiding Chat")
                $('#app-right').css('visibility', 'hidden');
                $('#chat').css('visibility', 'hidden');
                $('.playback').addClass('centerPlayer');
                $('#NCSMenu').css('visibility', 'visible');
                $('.controls').append('<div id="ShowChatBtnCtrl" class="ctrl NCSBtnHover" onclick="NCS.funct.hideChat();">Show Chat</div>');
                $('.logo-menu').addClass('NCSlogo-menu-width');
                $('.btn-chat').addClass('disabled');
                $('.btn-people').addClass('disabled');
                $('.btn-waitlist').addClass('disabled');
                $('.ncs-tab').addClass('disabled');
                $('#StandWithKeem').addClass('StandWithKeemCenter');
                $('#KeemText').addClass('KeemTextCenter');
            }
        },




        checkMarkSetting: function () {
            /*
                    autoLike: false,
                    autoJoin: false,
                    eta: true,
                    customBackground: false,
                    customBackgroundUri: null,
                    customThemeEnabled: false,
                    moderatorSongAlert: false,
                    currentTheme: null,
                    */
            if (NCS.userSettings.autoLike) {
                NCS.funct.checkMarkChanger('autoLike',true);
            } else {
                NCS.funct.checkMarkChanger('autoLike',false)
            }
            if (NCS.userSettings.autoJoin) {
                NCS.funct.checkMarkChanger('autoJoin', true);
            } else {
                NCS.funct.checkMarkChanger('autoJoin',false);
            }
            if (NCS.userSettings.eta) {
                NCS.funct.checkMarkChanger('eta',true);
            } else {
                NCS.funct.checkMarkChanger('eta',false);
            }
            if (NCS.userSettings.currentTheme) {
                NCS.funct.checkMarkChanger('customBackground',true);
                NCS.funct.setTheme(NCS.userSettings.currentTheme)
            }
            if (NCS.userSettings.hideChat) {
                NCS.funct.hideChat(true);
            }
        },
        settingChanger: function (setting, state) {
            if (typeof state === "undefined") {
                NCS.userSettings[setting] = !NCS.userSettings[setting];
            } else {
                NCS.userSettings[setting] = state;
            }
            this.checkMarkChanger(setting)
            window.localStorage.setItem('ncs2-settings', JSON.stringify(NCS.userSettings));
        },
        checkMarkChanger: function (setting, state) {
            if ($('#' + setting).hasClass('active')) {
                $('#' + setting).removeClass('active');
            } else if (typeof state ==="undefined" || state) {
                $('#' + setting).addClass('active');
            }
        },




        desktopNotification(message) {
            if (NCS.userSettings.desktopNotification) {
                API.util.desktopnotif.showNotification("NCS", message)
            }
        },
        chatMsg: function (message, classname) {
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes();
            $('#messages').append('\
            <div id="cm-34" style="" class="cm '+ classname + ' message self"><span class="time">' + time + '</span><svg viewBox="0 0 16 16" xmlns="https://www.w3.org/2000/svg" version="1.1" class="bdg  hidden">\
                    <defs>\
                        <linearGradient id="badgegrad;#ff0000;#4800ff;">\
                            <stop stop-color="#ff0000" offset="49%"></stop>\
                            <stop stop-color="#4800ff" offset="51%"></stop>\
                        </linearGradient>\
                    </defs>\
                    <g>\
                        <circle id="circle" r="7.25" cy="8" cx="8" transform="rotate(45, 8, 8)" stroke-linecap="null" stroke-linejoin="null" stroke="#ffffff" fill="url(#badgegrad;#ff0000;#4800ff;)" stroke-width="1.5"></circle>\
                    </g>\
                </svg>\
                <div class="text"><span class="umsg">' + message + '</span></div>\
            </div>');
            NCS.funct.desktopNotification(message)
        },
        previousThemeName: null,
        loadCount: (typeof loadCount === "undefined") ? 0 : this.funct.loadCount,
        setTheme: function (themeName) {
            var themeURI = "https://get.imexile.moe/NCS/themes/" + themeName + ".css";
            $('#NCSTheme').remove();
            $('head').append("<link id='NCSTheme' rel='stylesheet' href='" + themeURI + "' />");
            // set active
            $('#mqp-' + themeName + '-theme').addClass('active');
            $('#mqp-' + this.previousThemeName + '-theme').removeClass('active');
            NCS.userSettings.currentTheme = themeName;
            // end set active
            this.previousThemeName = themeName;
        },
        unload: function () {
            $("[id^=NCS").remove();
            $('#ncs-back').remove();
            $('style[class=NCSSTYLE]').remove();
            $('link[class=NCS]').remove();
            NCS = null;
            $('.NCSMSG').remove();
            this.chatMsg('Unloaded NCS, you may have to refresh to reload it.');

        },
    },
    sleep: function (milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    },
    waitload: function () {
        if (!NCS.settings.changelog.responseJSON) {
            console.debug(NCS.settings.changelog)
            console.debug(Object.keys(NCS.settings.changelog))
            if (NCS.funct.loadCount > 1) {
                console.error("Failed to load")
                this.funct.chatMsg("Failed to load changelog");
                this.funct.unload;
                return 'exit';
            } else {
                NCS.funct.loadCount++;
                this.sleep(2000);
                this.waitload();
            }
        }
    },

    init: function () {
        // Changelog json stuffs:
        // changelog.title changelog.tagline changelog.html
        // begin init
        if (this.waitload() == 'exit') {
            delete this;
        }
        NCS.funct.addMenu();
        $('head').append('<link rel="stylesheet" class="NCS" href="https://get.imexile.moe/NCS/ncs.css" />');
        $('head').append('<link rel="stylesheet" id="NCSTheme" href="" />');
        NCS.funct.checkMarkSetting();
        // do this after init success
        var onLoadMsg = "NCS version " + NCS.settings.version + " loaded successfully!";
        // Make sure that changelog loaded

        var changelog = NCS.settings.changelog.responseJSON;
        NCS.funct.chatMsg("NCS v" + NCS.settings.version + " loaded! | " + changelog.title, "NCSMSG NCSMSG-TITLE");
        NCS.funct.chatMsg(changelog.tagline, "NCSMSG-TAGLINE");
        NCS.funct.chatMsg(changelog.HTML, "NCSMSG");
        $('head').append('<style class="NCSSTYLE">\
        .NCSMSG {\
            background-color: rgba(102,204,255,0.4) !important;\
        }\
        .NCSMSG-TITLE {\
            background-color: rgba(102,204,255,0.4);\
            font-size: 22px;\
            font-style: bold;\
        }\
        .NCSMSG-TAGLINE {\
            background-color: rgba(102,204,255,0.4) !important;\
            font-style:italic;\
        }\
        </style>');

    }
};