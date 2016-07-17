@Records = React.createClass
  getInitialState: ->
    records: @props.data

  getDefaultProps: ->
    records: []

  credits: ->
    credits = @state.records.filter (val) -> val.amount >= 0
    credits.reduce ((prev, curr) ->
      prev + parseFloat(curr.amount)
    ), 0

  debits: ->
    debits = @state.records.filter (val) -> val.amount < 0
    debits.reduce ((prev, curr) ->
      prev + parseFloat(curr.amount)
    ), 0

  balance: ->
    @debits() + @credits()

  addRecord: (record) ->
    records = React.addons.update(@state.records, { $push: [record] })
    @setState records: records

  deleteRecord: (record) ->
    index = @state.records.indexOf record
    records = React.addons.update(@state.records, { $splice: [[index, 1]] })
    @replaceState records: records

  updateRecord: (record, data) ->
    index = @state.records.indexOf record
    records = React.addons.update(@state.records, { $splice: [[index, 1, data]] })
    @replaceState records: records

  render: ->
    React.DOM.div
      className: 'col-md-12'
      React.DOM.div
        className: 'records col-md-6 col-md-offset-3'
        React.DOM.div
          className: 'records col-md-12'
          React.DOM.h1
            className: 'title text-center'
            'Overview'
          React.DOM.hr null
          React.DOM.h4
            className: 'title text-center'
            'New Transaction'
          React.createElement RecordForm, handleNewRecord: @addRecord
          React.DOM.hr null
          React.DOM.div
            className: 'row text-center'
            React.createElement AmountBox, type: 'success', amount: @credits(), text: 'Income'
            React.createElement AmountBox, type: 'danger', amount: @debits(), text: 'Expenses'
            React.createElement AmountBox, type: 'info', amount: @balance(), text: 'Balance'

          React.DOM.table
            className: 'table table-striped'
            React.DOM.thead null,
              React.DOM.tr null,
                React.DOM.th null, 'Date'
                React.DOM.th null, 'Title'
                React.DOM.th null, 'Amount'
                React.DOM.th null, ''
            React.DOM.tbody null,
              for record in @state.records
                React.createElement Record, key: record.id, record: record, handleDeleteRecord: @deleteRecord, handleEditRecord: @updateRecord