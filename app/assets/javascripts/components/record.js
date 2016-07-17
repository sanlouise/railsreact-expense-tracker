this.Record = React.createClass({
  getInitialState() {
    return {
      edit: false
    };
  },

  handleToggle(e) {
    e.preventDefault();
    return this.setState({
      edit: !this.state.edit
    });
  },

  handleDelete(e) {
    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      success: ((_this => () => _this.props.handleDeleteRecord(_this.props.record)))(this)
    });
  },

  handleEdit(e) {
    let data;
    e.preventDefault();
    data = {
      title: this.refs.title.value,
      date: this.refs.date.value,
      amount: this.refs.amount.value
    };
    return $.ajax({
      method: 'PUT',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      data: {
        record: data
      },
      success: ((_this => data => {
        _this.setState({
          edit: false
        });
        return _this.props.handleEditRecord(_this.props.record, data);
      }))(this)
    });
  },

  recordRow() {
    return React.DOM.tr(null, React.DOM.td(null, this.props.record.date), React.DOM.td(null, this.props.record.title), React.DOM.td(null, amountFormat(this.props.record.amount)), React.DOM.td(null, React.DOM.a({
      className: 'btn btn-default btn-xs',
      onClick: this.handleToggle
    }, 'Edit'), React.DOM.a({
      className: 'btn btn-danger btn-xs',
      onClick: this.handleDelete
    }, 'Delete')));
  },

  recordForm() {
    return React.DOM.tr(null, React.DOM.td(null, React.DOM.input({
      className: 'form-control',
      type: 'text',
      defaultValue: this.props.record.date,
      ref: 'date'
    })), React.DOM.td(null, React.DOM.input({
      className: 'form-control',
      type: 'text',
      defaultValue: this.props.record.title,
      ref: 'title'
    })), React.DOM.td(null, React.DOM.input({
      className: 'form-control',
      type: 'number',
      defaultValue: this.props.record.amount,
      ref: 'amount'
    })), React.DOM.td(null, React.DOM.a({
      className: 'btn btn-default btn-xs',
      onClick: this.handleEdit
    }, 'Update'), React.DOM.a({
      className: 'btn btn-danger btn-xs',
      onClick: this.handleToggle
    }, 'Cancel')));
  },

  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
});