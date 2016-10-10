import React from "react";
import {withRouter} from "react-router";
import FeedItem from "./feed_item.jsx";

class Feeds extends React.Component{
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.requestCurrentUser();
    }
    this.props.requestUserFeeds();
  }

  render() {

    let feeds;
    if (this.props.loggedIn && this.props.feeds) {

      feeds = this.props.feeds.map((feed, idx) => {
        return (
          <FeedItem key={idx} feed={feed}/>
        );
      });
    } else {
      feeds = (<div>fetching feeds</div>);
    }

    return (
      <div className="feeds-container">}
        <ul className="feeds-list-container">{feeds}</ul>
      </div>
    );
  }
}

export default withRouter(Feeds);
