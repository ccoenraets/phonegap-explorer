window.GlobalizationView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
    },

    events: {
        "click .getPreferredLanguageBtn"     : "getPreferredLanguage",
        "click .getLocaleNameBtn"            : "getLocaleName",
        "click .getDateToStringBtn"          : "checkDateString",
        "click .getStringToDateBtn"          : "checkStringDate",
        "click .getDatePatternBtn"           : "checkDatePattern",
        "click .getDateNamesBtn"             : "checkDateNames",
        "click .getIsDayLightSavingsTimeBtn" : "checkDayLightSavings",
        "click .getFirstDayOfWeekBtn"        : "checkFirstDay",
        "click .getNumberToStringBtn"        : "checkNumberToString",
        "click .getStringToNumberBtn"        : "checkStringToNumber",
        "click .getNumberPatternBtn"         : "checkNumberPattern",
        "click .getCurrencyPatternBtn"       : "checkCurrencyPattern"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    log: function(msg) {
        $('#log').val($('#log').val() + msg + "\r\n");
    },

    getPreferredLanguage: function() {
        var self = this;
        navigator.globalization.getPreferredLanguage(
            function (language) {
                self.log('Language: ' + language.value);
                showAlert('language: ' + language.value + '\n', 'getPreferredLanguage Result');
            },
            function () {
                showAlert('Error getting Preferred Language\n', 'Error');
            }
        );
        return false;
    },

    getLocaleName: function() {
        navigator.globalization.getLocaleName(
              function (locale) { showAlert('Locale: ' + locale.value + '\n', 'Locale Value'); }
            , function () { showAlert('Error getting locale\n', 'Error');}
        );

        return false;
    },

    successHandler: function(localeName) {
        this.log( localeName );
    },

    errorHandler: function(error) {
        showAlert(
              "Can't get your locale name. Make sure the globalization service is enabled for this app."
            , 'Globalization'
        );
    },

    checkDateString: function() {
        navigator.globalization.dateToString(
            new Date(),
            function(date) { 
                showAlert('Date: ' + date.value + '\n'); 
            },
            function()     { 
                alert('Error getting dateString\n', 'Error'); 
            },
            { formatLength: 'short', selector: 'date and time' }
        );
    },

    checkStringDate: function() {
        navigator.globalization.stringToDate(
            '8/2/1977',
            function (date) { 
                showAlert('Month:' + date.month + '\n' + 'Day:' + date.day + '\n' + 'Year:' + date.year + '\n', 'String Date');
            },
            function () {
                showAlert('Error getting date\n', 'Error');
            },
            { selector:'date' }
        );
    },

    checkDatePattern: function() {
        var self = this;
        navigator.globalization.getDatePattern(
            function (date) { 
                self.log('Pattern: ' +  date.pattern);
                showAlert('Pattern: ' + date.pattern + '\n', 'Date Pattern'); 
            },
            function () { 
                self.log( 'Error getting pattern' );
                showAlert('Error getting pattern\n', 'Error'); 
            },
            { formatLength: 'short', selector: 'date and time' }
        );
    },

    checkDateNames: function () {
        var self = this;
        navigator.globalization.getDateNames(
            function (names) {
                for (var i=0; i<names.value.length; i++) {
                    self.log('Month: ' + names.value[i]);
                }
            },
            function () {
                showAlert('Error getting names\n', 'Error');
            },
            {type:'wide', item:'months'}
        );
    },

    checkDayLightSavings: function() {
        navigator.globalization.isDayLightSavingsTime(
            new Date(),
            function (date) {
                showAlert('DST: ' + date.dst + '\n', 'DST Active');
            },
            function () {
                showAlert('Error getting names\n', 'Error');
            }
        );
    },

    checkFirstDay: function() {
        navigator.globalization.getFirstDayOfWeek(
            function (day) {
                showAlert('First Day: ' + day.value + '\n', 'First Day of Week');
            },
            function () {
                showAlert('Error getting First Day of the week\n', 'Error');
            }
        );
    },

    checkNumberToString: function() {
        navigator.globalization.numberToString(
            3.1415926,
            function (number) {
                showAlert('Number: ' + number.value + '\n');
            },
            function () {
                showAlert('Error getting number\n');
            },
            { type:'decimal' }
        );
    },

    checkStringToNumber: function() {
        navigator.globalization.stringToNumber(
            '1234.56',
            function (number) {
                showAlert('Number: ' + number.value + '\n');
            },
            function () {
                showAlert('Error getting number\n');
            },
            { type:'decimal' }
        );
    },

    checkNumberPattern: function() {
        navigator.globalization.getNumberPattern(
            function (pattern) {
                showAlert(  'Pattern  : ' + pattern.pattern  + '\n' +
                            'Symbol   : ' + pattern.symbol   + '\n' +
                            'Fraction : ' + pattern.fraction + '\n' +
                            'Rounding : ' + pattern.rounding + '\n' +
                            'Positive : ' + pattern.positive + '\n' +
                            'Negative : ' + pattern.negative + '\n' +
                            'Decimal  : ' + pattern.decimal  + '\n' +
                            'Grouping : ' + pattern.grouping
                         );
            },
            function () {
                showAlert('Error getting number pattern\n', 'Error');
            },
            { type:'decimal' }
        );
    },

    checkCurrencyPattern: function() {
        navigator.globalization.getCurrencyPattern(
            'USD',
            function (pattern) {
                showAlert(  'Pattern: '  + pattern.pattern  + '\n' +
                            'Code: '     + pattern.code     + '\n' +
                            'Fraction: ' + pattern.fraction + '\n' +
                            'Rounding: ' + pattern.rounding + '\n' +
                            'Decimal: '  + pattern.decimal  + '\n' +
                            'Grouping: ' + pattern.grouping
                         );
            },
            function () {
                showAlert('Error getting pattern\n', 'Error');
            }
        );
    }

});