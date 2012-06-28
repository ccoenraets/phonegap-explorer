window.DatabaseView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
        this.db = window.openDatabase("demodb", "1.0", "Demo DB", 1000000);
    },

    events: {
        "click .execBtn":       "execSQL",
        "click .clearSQLBtn":   "clearSQL",
        "click .clearLogBtn":   "clearLog"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    execSQL: function() {
        this.db.transaction(this.executeStatements, this.txError, this.txSuccess);
    },

    executeStatements: function(tx) {
        var statements = $('#sql').val().trim().split(";");
        for (var i = 0; i < statements.length; i++) {
            if (statements[i].trim().length !== 0) {
                this.log(statements[i]);
                tx.executeSql(statements[i], null, this.stmtSuccess, this.stmtError);
            }
        }
        this.logln('');
    },

    log: function(msg) {
        $('#log').val($('#log').val() + msg);
    },

    logln: function(msg) {
        this.log(msg + "\r\n");
    },

    clearLog: function() {
        $('#log').val("");
    },

    clearSQL: function() {
        $('#sql').val("");
    },

    stmtSuccess: function(tx, results) {
        var l = results.rows.length;
        if (l > 0) {
            this.logln(l + " rows returned");
            for (var i=0; i < l; i++) {
                var row = results.rows.item(i);
                var str = "";
                for (var col in row) {
                    str += col + ": " + row[col] + " ";
                }
                this.logln(str);
            }
        } else if (!results.rowsAffected) {
            this.logln(results.rowsAffected + " rows affected");
        } else {
            this.logln("No rows affected");
        }
    },

    stmtError: function(error) {
        this.logln('Statement error' + error.message);
    },

    txSuccess: function() {
        this.logln('Transaction succeeded');
    },

    txError: function(error) {
        this.logln('Transaction failed: ' + error.message);
    }

});