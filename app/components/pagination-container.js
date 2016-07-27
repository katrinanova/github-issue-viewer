import React from 'react';
import { connect } from 'react-redux';
import Pagination from './pagination';
import store from '../store';


const PaginationContainer = React.createClass({

  render: function() {
    return (
      <Pagination
        currentPageNum={this.props.currentPageNum}
        lastPageNum={this.props.lastPageNum}
        repoInfo={this.props.repoInfo}
        pages={this.props.pages}
      />
    );
  }
});

const mapStateToProps = function(store){
  return {
    currentPageNum: store.issueState.get('currentPageNum'),
    lastPageNum: store.issueState.get('lastPageNum'),
    pages: store.issueState.get('pages')
  };
}
export default connect(mapStateToProps)(PaginationContainer);
