import React from "react";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  render() {
    return (
      <form>
              <div className="input-group">
                  <input 
                  className="form-control py-2  px-2 icon-rtl" 
                  type="search" 
                  id="example-search-input" 
                  placeholder="Search..."
                  value={this.props.filterText}
                  onChange={this.handleFilterTextChange}
                />
                </div>
          
        
      </form>
    );
  }
}