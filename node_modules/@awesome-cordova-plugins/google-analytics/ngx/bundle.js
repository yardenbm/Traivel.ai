'use strict';

var tslib = require('tslib');
var i0 = require('@angular/core');
var core = require('@awesome-cordova-plugins/core');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);

var GoogleAnalytics = /** @class */ (function (_super) {
    tslib.__extends(GoogleAnalytics, _super);
    function GoogleAnalytics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleAnalytics.prototype.startTrackerWithId = function (id, interval) { return core.cordova(this, "startTrackerWithId", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    GoogleAnalytics.prototype.setAllowIDFACollection = function (allow) { return core.cordova(this, "setAllowIDFACollection", {}, arguments); };
    GoogleAnalytics.prototype.setUserId = function (id) { return core.cordova(this, "setUserId", {}, arguments); };
    GoogleAnalytics.prototype.setAnonymizeIp = function (anonymize) { return core.cordova(this, "setAnonymizeIp", {}, arguments); };
    GoogleAnalytics.prototype.setAppVersion = function (appVersion) { return core.cordova(this, "setAppVersion", {}, arguments); };
    GoogleAnalytics.prototype.getVar = function (key) { return core.cordova(this, "getVar", {}, arguments); };
    GoogleAnalytics.prototype.setVar = function (key, value) { return core.cordova(this, "setVar", {}, arguments); };
    GoogleAnalytics.prototype.setOptOut = function (optout) { return core.cordova(this, "setOptOut", {}, arguments); };
    GoogleAnalytics.prototype.debugMode = function () { return core.cordova(this, "debugMode", {}, arguments); };
    GoogleAnalytics.prototype.trackMetric = function (key, value) { return core.cordova(this, "trackMetric", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    GoogleAnalytics.prototype.trackView = function (title, campaignUrl, newSession) { return core.cordova(this, "trackView", { "successIndex": 3, "errorIndex": 4 }, arguments); };
    GoogleAnalytics.prototype.addCustomDimension = function (key, value) { return core.cordova(this, "addCustomDimension", {}, arguments); };
    GoogleAnalytics.prototype.trackEvent = function (category, action, label, value, newSession) { return core.cordova(this, "trackEvent", { "successIndex": 5, "errorIndex": 6 }, arguments); };
    GoogleAnalytics.prototype.trackException = function (description, fatal) { return core.cordova(this, "trackException", {}, arguments); };
    GoogleAnalytics.prototype.trackTiming = function (category, intervalInMilliseconds, variable, label) { return core.cordova(this, "trackTiming", {}, arguments); };
    GoogleAnalytics.prototype.addTransaction = function (id, affiliation, revenue, tax, shipping, currencyCode) { return core.cordova(this, "addTransaction", {}, arguments); };
    GoogleAnalytics.prototype.addTransactionItem = function (id, name, sku, category, price, quantity, currencyCode) { return core.cordova(this, "addTransactionItem", {}, arguments); };
    GoogleAnalytics.prototype.enableUncaughtExceptionReporting = function (shouldEnable) { return core.cordova(this, "enableUncaughtExceptionReporting", {}, arguments); };
    GoogleAnalytics.prototype.dispatch = function () { return core.cordova(this, "dispatch", { "platforms": ["Android", "iOS", "Windows"] }, arguments); };
    GoogleAnalytics.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GoogleAnalytics, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    GoogleAnalytics.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GoogleAnalytics });
    GoogleAnalytics.pluginName = "GoogleAnalytics";
    GoogleAnalytics.plugin = "cordova-plugin-google-analytics";
    GoogleAnalytics.pluginRef = "ga";
    GoogleAnalytics.repo = "https://github.com/danwilson/google-analytics-plugin";
    GoogleAnalytics.platforms = ["Android", "Browser", "iOS", "Windows Phone 8"];
    GoogleAnalytics = tslib.__decorate([], GoogleAnalytics);
    return GoogleAnalytics;
}(core.AwesomeCordovaNativePlugin));
i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GoogleAnalytics, decorators: [{
            type: i0.Injectable
        }], propDecorators: { startTrackerWithId: [], setAllowIDFACollection: [], setUserId: [], setAnonymizeIp: [], setAppVersion: [], getVar: [], setVar: [], setOptOut: [], debugMode: [], trackMetric: [], trackView: [], addCustomDimension: [], trackEvent: [], trackException: [], trackTiming: [], addTransaction: [], addTransactionItem: [], enableUncaughtExceptionReporting: [], dispatch: [] } });

exports.GoogleAnalytics = GoogleAnalytics;
