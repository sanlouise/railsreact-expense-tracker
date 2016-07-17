this.Records = React.createClass({

  getInitialState: function() {
    return {
      records: this.props.data
    };
  },

  getDefaultProps: function() {
    return {
      records: []
    };
  },

  credits: function() {
    var credits;
    credits = this.state.records.filter(function(val) {
      return val.amount >= 0;
    });
    return credits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  },

  debits: function() {
    var debits;
    debits = this.state.records.filter(function(val) {
      return val.amount < 0;
    });
    return debits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  },

  balance: function() {
    return this.debits() + this.credits();
  },

  addRecord: function(record) {
    var records;
    records = React.addons.update(this.state.records, {
      $push: [record]
    });
    return this.setState({
      records: records
    });
  },

  deleteRecord: function(record) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1]]
    });
    return this.replaceState({
      records: records
    });
  },

  updateRecord: function(record, data) {
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1, data]]
    });
    return this.replaceState({
      records: records
    });
  },

  render: function() {
    var record;
    return React.DOM.div({
      className: 'col-md-12'
    }, React.DOM.div({
      className: 'records col-md-6 col-md-offset-3'
    }, React.DOM.div({
      className: 'records col-md-12'
    }, React.DOM.h1({
      className: 'title text-center'
    }, 'Overview'), React.DOM.hr(null), React.DOM.h4({
      className: 'title text-center'
    }, 'New Transaction'), React.createElement(RecordForm, {
      handleNewRecord: this.addRecord
    }), React.DOM.hr(null), React.DOM.div({
      className: 'row text-center'
    }, React.createElement(AmountBox, {
      type: 'success',
      amount: this.credits(),
      text: 'Income'
    }), React.createElement(AmountBox, {
      type: 'danger',
      amount: this.debits(),
      text: 'Expenses'
    }), React.createElement(AmountBox, {
      type: 'info',
      amount: this.balance(),
      text: 'Balance'
    })), React.DOM.table({
      className: 'table table-striped'
    }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Date'), React.DOM.th(null, 'Title'), React.DOM.th(null, 'Amount'), React.DOM.th(null, ''))), React.DOM.tbody(null, (function() {
      var i, len, ref, results;
      ref = this.state.records;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        record = ref[i];
        results.push(React.createElement(Record, {
          key: record.id,
          record: record,
          handleDeleteRecord: this.deleteRecord,
          handleEditRecord: this.updateRecord
        }));
      }
      return results; 
    }).call(this))))));
  }
});
