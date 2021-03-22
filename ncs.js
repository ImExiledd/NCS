/*
 *
 *	NCS is Copyright (C) Exile, 2021.
 *  NCS is licensed under MIT. Please give credit
 *  Where credit is due.
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
try {
    var NCS = {
        // all code goes here, to prevent conflicts with Musiqpad or other scripts.
        userSettings: $.extend({
            autoLike: false,
            autoJoin: false,
            eta: true,
            loliCount: false,
            customBackground: false,
            customBackgroundUri: null,
            customThemeEnabled: false,
            moderatorSongAlert: false,
            customMentionSound: '../lib/sound/mention.wav',
            currentTheme: null,
            hideChat: false,
            desktopnotif: false,
            afkResponder: false,
            afkMessage: "I am currently AFK",
        }, (JSON.parse(window.localStorage.getItem('ncs2-settings')) || {})),
        variables: {
            loliCount: 0,
            previousThemeName: null,
            loadCount: (typeof loadCount === "undefined") ? 0 : this.variables.loadCount,
            cooldown: false,
            themesTagMap: {},
        },
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

            },
            themesJson: $.getJSON("https://cdn.jsdelivr.net/gh/ImExiledd/NCS@new/themes.json", function (item) { NCS.settings.themesJson = item })
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
                        <div id="autoLike" class="item auto-like" onclick='NCS.funct.settingChanger("autoLike");NCS.funct.autolike();'>AutoLike</div>
                        <div id="autoJoin" class="item auto-join" onclick='NCS.funct.settingChanger("autoJoin");'>AutoJoin DJ Queue</div>
                        <div id="afkResponder" class="item afk-responder" onclick='NCS.funct.settingChanger("afkResponder");'>AFK Responder</div>
                        <div id="header-themes" class="header">Themes</div>
                        <div id="theme-manager" class="item" onclick='NCS.funct.themeManager()'>Theme Manager</div>
                        <div id="header-personalization" class="header">Personalization</div>
                        <div id="desktopnotif" class="item desktop-notifs" onclick='NCS.funct.settingChanger("desktopnotif");'>Desktop Notifications</div>
                        <div id="customBackground" class="item custom-background" onclick='NCS.funct.settingChanger("customBackground");NCS.funct.setCustomBackground();'>Custom Background</div>
                        <div id="customMentionSound" class="item custom-mention-sounds" onclick='NCS.funct.settingChanger("customMentionSound");'>Custom Mention Sounds</div>
                        <div id="eta" class="item eta" onclick='NCS.funct.settingChanger("eta");'>ETA</div>
                        <div id="loliCount" class="item loli" onclick='NCS.funct.hideloliCount();'>Loli Count</div>
                        <div id="header-moderation" class="header">Moderation</div>
                        <div id="moderatorSongAlert" class="item eta" onclick='NCS.funct.settingChanger("moderatorSongAlert");'>Song Duration Alert</div>
                        <div id="header-edit-stuff" class="header">Edit your Settings</div>
                        <div id="afkMessage" class="item editable afk-message" onclick="NCS.funct.modalBoxAFKResponse();">Edit AFK Message</div>
                        <div id="customBackgroundEdit" class="item editable custom-background" onclick="NCS.funct.modalBoxCustomBackgroundResponse();">Custom Background</div>
                        <div id="customMentionSoundEdit" class="item editable custom-mention-sounds" onclick="NCS.funct.modalBoxCustomMentionSoundResponse();">Custom Mention Sounds</div>
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
                chatTrigger: API.on('chat', function (chat) {
                    if (NCS.userSettings.loliCount) {
                        NCS.variables.loliCount += (chat.message.match(/loli/gi) || []).length;
                        $('#ncs-lc').text("Loli count: " + NCS.variables.loliCount)
                        if (NCS.userSettings.afkResponder) {
                            if (NCS.variables.cooldown === false && $('#cm-' + chat.cid).hasClass('mention') === true) {
                                API.chat.send('@' + $('#cm-' + chat.cid + ' .text .uname').text() + " " + NCS.userSettings.afkMessage);
                                NCS.funct.cooldown();
                            }
                        }
                    }
                }),
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
                        var curposition = (position < 0) ? API.queue.getDJs().length : position - 1;
                        var eta = ~~((curposition * (3.5 * 60)) + API.room.getTimeRemaining());

                        if (NCS.userSettings.eta) {
                            // true
                            if (position === 0) {
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
                autolikeRunner: API.on('advance', function () {
                    NCS.funct.autolike();
                }),
                songDurationALerty: API.on('advance', function () {
                    if (NCS.userSettings.moderatorSongAlert) {
                        var song = API.room.getMedia();
                        var dj = API.queue.getDJ();
                        if (song.duration > 360) {
                            if ($('#notifySound').length == 0) {
                                var audioElement = document.createElement('audio');
                                audioElement.setAttribute('id', 'notifySound');
                                audioElement.setAttribute('src', NCS.userSettings.customMentionSound);
                                audioElement.setAttribute('autoplay', 'autoplay');
                            } else {
                                document.getElementById("notifySound").play();
                            }
                            NCS.funct.chatMsg("Song " + song.title + " is over 6 minutes!!!\n Currently played by: " + dj.un);
                        }
                    }
                })
            },
            autolike: function () {
                if (NCS.userSettings.autoLike) {
                    var position = API.queue.getPosition();
                    if (position != 0 && !$('.btn-upvote').hasClass('active')) {

                        $('.btn-upvote')[0].click();
                    }
                }
            },

            setCustomBackground: function () {

                if (NCS.userSettings.customBackground && NCS.userSettings.customBackgroundUri) {
                    $('#room-bg').css({ 'cssText': 'background-image:url("' + NCS.userSettings.customBackgroundUri + '") !important' });
                } else {
                    $('#room-bg').css({ 'cssText': '' });
                }
            },

            modalBoxAFKResponse: function () {
                API.util.makeCustomModal({
                    content: '<div>\
                <h3>AFK Message</h3>\
                <textarea rows="2" cols="100" type="text" id="afkResponse" maxlength="200" placeholder="'+ NCS.userSettings.afkMessage + '"/></div>',
                    dismissable: true,
                    buttons: [
                        {
                            icon: 'mdi-close',
                            classes: 'modal-no',
                            handler: function (e) {
                                $('.modal-bg').remove();
                            }
                        },
                        {
                            icon: 'mdi-check',
                            classes: 'modal-yes',
                            handler: function (e) {
                                NCS.funct.settingChanger('afkMessage', $('#afkResponse').val())
                                $('.modal-bg').remove();
                            }
                        },
                        {
                            icon: 'mdi-autorenew',
                            classes: 'modal-yes',
                            handler: function (e) {
                                $('#afkResponse').val(NCS.userSettings.afkMessage);
                            }
                        },
                        {
                            icon: 'mdi-delete',
                            classes: 'modal-yes',
                            handler: function (e) {
                                API.util.makeConfirmModal({
                                    content: "Are you sure want to Reset AFK response?",
                                    callback: function (res) {
                                        if (res) {
                                            NCS.funct.settingChanger('afkMessage', "I am currently AFK");
                                            $('.modal-bg').remove();
                                        };
                                    }
                                });

                            }

                        }
                    ]
                })
            },

            modalBoxCustomBackgroundResponse: function () {
                API.util.makeCustomModal({
                    content: '<div>\
                <h3>Custom Background</h3>\
                <img scr="'+ NCS.userSettings.customBackgroundUri + '"> \
                <textarea rows="2" cols="200" type="text" id="customBackgroundResponse" maxlength="400" placeholder="'+ NCS.userSettings.customBackgroundUri + '"/></div>',
                    dismissable: true,
                    buttons: [
                        {
                            icon: 'mdi-close',
                            classes: 'modal-no',
                            handler: function (e) {
                                $('.modal-bg').remove();
                            }
                        },
                        {
                            icon: 'mdi-check',
                            classes: 'modal-yes',
                            handler: function (e) {
                                NCS.funct.settingChanger('customBackgroundUri', $('#customBackgroundResponse').val())
                                NCS.funct.setCustomBackground();
                                $('.modal-bg').remove();
                            }
                        },
                        {
                            icon: 'mdi-autorenew',
                            classes: 'modal-yes',
                            handler: function (e) {
                                $('#customBackgroundResponse').val(NCS.userSettings.customBackgroundUri);
                            }
                        },
                        {
                            icon: 'mdi-delete',
                            classes: 'modal-yes',
                            handler: function (e) {
                                API.util.makeConfirmModal({
                                    content: "Are you sure want to clear custom background url?",
                                    callback: function (res) {
                                        if (res) {
                                            NCS.funct.settingChanger('customBackgroundUri', null);
                                            $('.modal-bg').remove();
                                        };
                                    }
                                });

                            }

                        }
                    ]
                })
            },

            modalBoxCustomMentionSoundResponse: function () {
                API.util.makeCustomModal({
                    content: '<div>\
                <h3>Custom Mention Sounds</h3>\
                <img scr="'+ NCS.userSettings.customMentionSound + '"> \
                <textarea rows="2" cols="200" type="text" id="customMentionSoundResponse" maxlength="400" placeholder="'+ NCS.userSettings.customMentionSound + '"/></div>',
                    dismissable: true,
                    buttons: [
                        {
                            icon: 'mdi-close',
                            classes: 'modal-no',
                            handler: function (e) {
                                $('.modal-bg').remove();
                            }
                        },
                        {
                            icon: 'mdi-check',
                            classes: 'modal-yes',
                            handler: function (e) {
                                NCS.funct.settingChanger('customBackgroundUri', $('#customMentionSoundResponse').val())
                                NCS.funct.setCustomBackground();
                                $('.modal-bg').remove();
                            }
                        },
                        {
                            icon: 'mdi-autorenew',
                            classes: 'modal-yes',
                            handler: function (e) {
                                $('#customMentionSoundResponse').val(NCS.userSettings.customMentionSound);
                            }
                        },
                        {
                            icon: 'mdi-delete',
                            classes: 'modal-yes',
                            handler: function (e) {
                                API.util.makeConfirmModal({
                                    content: "Are you sure want to reset mention sound?",
                                    callback: function (res) {
                                        if (res) {
                                            NCS.funct.settingChanger('customMentionSound', '../lib/sound/mention.wav');
                                            $('.modal-bg').remove();
                                        };
                                    }
                                });

                            }

                        }
                    ]
                })
            },
            hideChat: function (state) {
                if (typeof state === "undefined") {
                    NCS.funct.settingChanger('hideChat');
                } else {
                    NCS.funct.checkMarkChanger('hideChat');
                }
                console.log("Run HideChat");
                if (NCS.userSettings.hideChat === false || state === false) {
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

            hideloliCount: function (state) {
                if (typeof state === "undefined") {
                    NCS.funct.settingChanger('loliCount');
                } else {
                    NCS.funct.checkMarkChanger('loliCount');
                }
                if (!NCS.userSettings.loliCount || !state) {
                    console.log("Hiding lolicount");
                    $('#ncs-lc').css('visibility', 'hidden');
                } else {
                    console.log("Showing lolicount");
                    $('#ncs-lc').css('visibility', 'visible');
                }
            },



            cooldown: function () {
                NCS.variables.cooldown = true;
                setTimeout(function () { NCS.variables.cooldown = false; }, 10000);
            },

            themeManager: function () {
                var construct = "<input type='text' id='NCSThemeInput' onkeyup='NCS.funct.themeSearch()' placeholder='Search for themes..'> \
                <table class='items' id='NCSThemeManager'>\
                  <tr class='header'> \
                    <th style='width:30%;'>Name</th> \
                    <th style='width:70%;'>Description</th> \
                "
                NCS.settings.themesJson.forEach(theme => {
                    console.log(theme)
                    construct += "<tr class='item'" + (NCS.userSettings.currentTheme == theme.name ? "active" : "");
                    construct +=" id='mqp-" + theme.name + "-theme' onclick=\"NCS.funct.setTheme('" + theme.name + "');\">\
                    <td>"+ theme.name + "</td>\
                    <td>" + theme.description + "</td> \
                    </tr>";
                })
                construct += "</table>"
                console.log(construct)

                API.util.makeCustomModal({
                    content: construct,
                    dismissable: true,
                    buttons: [
                        {
                            icon: 'mdi-close',
                            classes: 'modal-no',
                            handler: function (e) {
                                $('.modal-bg').remove();
                            }
                        }
                    ]
                })
            },

            themeSearch: function () {
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("NCSThemeInput");
                filter = input.value.toUpperCase();
                table = document.getElementById("NCSThemeManager");
                tr = table.getElementsByTagName("tr");

                // Loop through all table rows, and hide those who don't match the search query
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[0];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1 || td.className.includes("active")) {
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
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
                    NCS.funct.checkMarkChanger('autoLike', true);
                    NCS.funct.autolike();
                } else {
                    NCS.funct.checkMarkChanger('autoLike', false)
                }

                if (NCS.userSettings.autoJoin) {
                    NCS.funct.checkMarkChanger('autoJoin', true);
                } else {
                    NCS.funct.checkMarkChanger('autoJoin', false);
                }

                if (NCS.userSettings.afkResponder) {
                    NCS.funct.checkMarkChanger('afkResponder', true);
                } else {
                    NCS.funct.checkMarkChanger('afkResponder', false)
                }

                if (NCS.userSettings.eta) {
                    NCS.funct.checkMarkChanger('eta', true);
                } else {
                    NCS.funct.checkMarkChanger('eta', false);
                }

                NCS.funct.hideloliCount(NCS.userSettings.loliCount)


                if (NCS.userSettings.currentTheme) {
                    //NCS.funct.checkMarkChanger('customBackground', true);
                    NCS.funct.setTheme(NCS.userSettings.currentTheme);
                }

                if (NCS.userSettings.desktopnotif) {
                    NCS.funct.checkMarkChanger('desktopnotif', true);
                } else {
                    NCS.funct.checkMarkChanger('desktopnotif', false);
                }

                if (NCS.userSettings.customBackground) {
                    NCS.funct.checkMarkChanger("customBackground", true);
                    NCS.funct.setCustomBackground();
                } else {
                    NCS.funct.checkMarkChanger("customBackground", false);
                }


                NCS.funct.hideChat(NCS.userSettings.hideChat);

            },
            settingChanger: function (setting, state) {
                if (typeof state === "undefined") {
                    NCS.userSettings[setting] = !NCS.userSettings[setting];
                } else {
                    NCS.userSettings[setting] = state;
                }
                this.checkMarkChanger(setting)
                NCS.funct.saveSettings();
            },

            saveSettings: function () {
                window.localStorage.setItem('ncs2-settings', JSON.stringify(NCS.userSettings));
                this.chatMsg("Saved settings to local storage.", undefined, false);
            },

            checkMarkChanger: function (setting, state) {
                if ($('#' + setting).hasClass('active')) {
                    $('#' + setting).removeClass('active');
                } else if (typeof state === "undefined" || state) {
                    $('#' + setting).addClass('active');
                }
            },




            desktopNotification(message) {
                if (NCS.userSettings.desktopNotification) {
                    API.util.desktopnotif.showNotification("NCS", message)
                }
            },
            chatMsg: function (message, classname = "NCSMSG", desktopVar = true) {
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
                if (desktopVar) {
                    NCS.funct.desktopNotification(message)
                }
            },
            setTheme: function (themeName) {
                if (this.previousThemeName == themeName) {
                    $('#NCSTheme').remove();
                    $('#mqp-' + this.previousThemeName + '-theme').removeClass('active');
                    NCS.funct.settingChanger('customThemeEnabled', false)
                    NCS.userSettings.currentTheme = null;
                    NCS.funct.saveSettings();
                    return;
                }
                var themeobj = NCS.settings.themesJson.find(item =>
                    item.name === themeName
                )
                $('#NCSTheme').remove();
                if (themeobj) {
                    var themeURI = themeobj.location;
                    $('head').append("<link id='NCSTheme' rel='stylesheet' href='" + themeURI + "' />");
                    // set active
                    $('#mqp-' + themeName + '-theme').addClass('active');
                    if (typeof this.previousThemeName != "undefined")
                        $('#mqp-' + this.previousThemeName + '-theme').removeClass('active');
                    NCS.userSettings.currentTheme = themeName;
                    NCS.funct.saveSettings();
                    // end set active
                    this.previousThemeName = themeName;
                } else {
                    this.previousThemeName = null;
                    NCS.userSettings.currentTheme = null;
                    NCS.funct.saveSettings();
                }
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
                    NCS.variables.loadCount++;
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
            $('#app-left').prepend('<span id="ncs-lc" style="display:block;">Loli count: 0</span>');
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
} catch (error) {
    NCS.funct.chatMsg("NCS script has errored check console for the error", "NCSMSG", false);
    console.error(error)
}