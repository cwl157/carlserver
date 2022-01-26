function csSetCookie(cvalue, exdays) {
    var cname = 'cs_cookie_consent'
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function allowClick() {
    csSetCookie('accepted', 365);
    csHideConsentBanner();
    csLoadScript('/js/vendor/ga.js');
    csLoadScript('/js/vendor/autotrack.js');
}

function disallowClick() {
    csSetCookie('declined', 365);
    csHideConsentBanner();
}

function csHideConsentBanner() {
    var b = document.getElementById("consent-banner");
    if (b !== undefined && b !== null) {
        b.style.display = "none";
    }
}

function csGetCookie() {
    var cname = 'cs_cookie_consent'
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function firstRenderCheckConsentAndLoadScripts() {
    var cookie = csGetCookie();
    console.log("cookie is", cookie);
    if (cookie !== "") {
        csHideConsentBanner();
        if (cookie === "accepted") {
            csLoadScript("/js/vendor/ga.js");
            csLoadScript("/js/vendor/autotrack.js");
        }
    }
}

function csLoadScript (scriptUrl) {
    var scriptEl = document.createElement('script');
    scriptEl.onload = function () {
        console.log(scriptUrl + " loaded");
    };
    scriptEl.src = scriptUrl;
    document.head.appendChild(scriptEl);
}