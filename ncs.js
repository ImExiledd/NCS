/*
 *
 *	NCS is Copyright (C) Exile, 2021.
 *   NCS is licensed under MIT. Please give credit
 *   Where credit is due.
 *
 */
// ensure jquery works
window.onload = function() {
    if (!window.jquery) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://code.jquery.com/jquery-3.5.1.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        jQuery.noConflict();
    }
}

const NCS = {
    // all code goes here, to prevent conflicts with Musiqpad or other scripts.
    settings: {
    	rcs: {
    		rcsThemeJson: {"room":"Radiant Music","author":"Origin","icon":"https://cdn.radiant.dj/rcs/icons/radiant/logo.png","css":"https://cdn.radiant.dj/rcs/rs_room.css","rules":{"allowAutorespond":true,"allowAutowoot":true,"allowAutojoin":true,"allowAutograb":true,"allowSmartVote":true,"allowEmotes":true,"allowShowingMehs":true,"forceSmartVote":false},"ccc":{"admin":"#42A5DC","ambassador":"#84B423","host":"#FF9B00","cohost":"#F3508F","manager":"#F3508F","bouncer":"#F3508F","rdj":"#5DB4FF","subscriber":"#A1A6B3","silversubscriber":"#A1A6B3","friend":"#B35D88","user":"#8B92A3"},"images":{"background":null,"playback":null,"admin":"https://cdn.radiant.dj/rcs/icons/radiant/admin.png","ambassador":"https://cdn.radiant.dj/rcs/icons/radiant/ambassador.png","host":"https://cdn.radiant.dj/rcs/icons/radiant/host.png","cohost":"https://cdn.radiant.dj/rcs/icons/radiant/cohost.png","manager":"https://cdn.radiant.dj/rcs/icons/radiant/manager.png","bouncer":"https://cdn.radiant.dj/rcs/icons/radiant/bouncer.png","rdj":"https://cdn.radiant.dj/rcs/icons/radiant/residentdj.png","subscriber":null,"silversubscriber":"https://cdn.radiant.dj/rcs/icons/radiant/subscriber.png"},"autocomplete":[],"emotes":{"custom_test":"https://cdn.radiant.dj/rcs/icons/test_custom.png"}},
    		
    	}
    },
    funct: {
        addMenu: (function() {
            var models = {
                'tab': `<div id="NCSMenu" data-ng-click="prop.c = 31" data-ng-class="{\'active\' : prop.c == 31}" class="tab ncs-tab">
                    <span class="icon-info">NCS</span>
                </div>`,
                'back': `<div data-ng-show="(prop.c == 31)" class="ng-hide" id="ncs-back">
                    <div class="items">
                        <div id="header-settings" class="mheader">NCS Settings</div>
                        <div id="header-general" class="header">General Functionality</div>
                        <div id="auto-like" class="item auto-like">AutoLike</div>
                        <div id="auto-join" class="item auto-join">AutoJoin DJ Queue</div>
                        <div id="afk-responder" class="item afk-responder">AFK Responder</div>
                        <div id="header-personalization" class="header">Personalization</div>
                        <div id='custom-theme' class='item custom-theme' onclick='ncsThemeShit();'>RCS Theme Revived</div>
                        <div id="desktop-notifs" class="item desktop-notifs" onclick='toggleDesktopNotifications();'>Desktop Notifications</div>
                        <div id="custom-background" class="item custom-background">Custom Background</div>
                        <div id="custom-mention-sounds" class="item custom-mention-sounds">Custom Mention Sounds</div>
                        <div id="eta" class="item eta">ETA</div>
                        <div id="header-moderation" class="header">Moderation</div>
                        <div id="moderatorSongDurationAlert" class="item eta">Song Duration Alert</div>
                        <div id="header-edit-stuff" class="header">Edit your Settings</div>
                        <div id="afk-message" class="item editable afk-message">Edit AFK Message</div>
                        <div id="custom-background-edit" class="item editable custom-background">Custom Background</div>
                        <div id="custom-mention-sounds" class="item editable custom-mention-sounds">Custom Mention Sounds</div>
                        <div id="header-miscellaneous" class="header">Miscellaneous</div>
                        <div id="hideChat" class="item hideChat" onclick="hideChat();">Hide Chat</div>
                        <a href="javascript:updateCheck();"><div id="update-check" class="item update-check">Check for Updates</div></a>
                        <div id="issue-reporter" class="item issue-reporter"><a id="NCSIssues" href="https://github.com/bentenz5/NCS/issues" target="_blank">Found an issue!? Report it here!</a></div>
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
            $('body').injector().invoke(function($compile, $rootScope) {
                $compile($('.dash .tray .ncs-tab'))(scope);
                $compile($('#app-right > #ncs-back'))(scope);
                scope.$apply();
            });
        })
    },
    init: function() {


    }
};