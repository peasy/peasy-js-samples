class ViewModelBase {
  constructor(id, list) {
    this._id = id;
    this._list = list;
  }

  get entity() {
    if (!this._currentEntity) {
      this._currentEntity = {};
      if (this._id) {
        if (this._list) {
          var entity = this._list.find(e => e.id === this._id)
          this._currentEntity = Object.assign({}, entity);
        }
      }
    }
    return this._currentEntity;
  }

  formatDollars(value) {
    return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
  }

}

export default ViewModelBase;