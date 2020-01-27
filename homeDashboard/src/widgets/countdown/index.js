import React from "react";
export class CountdownWidget extends React.Component {
  constructor(props) {
    super(props);
    const then = new Date(2020, 01, 14);
    const today = new Date();
    const count = Math.abs(Math.round((today - then) / (1000 * 60 * 60 * 24)));
    this.state = {
      count: count
    };
  }
  componentDidMount() {
    setInterval(() => {
      const then = new Date(2020, 3, 14);
      const today = new Date();
      const count = Math.abs(
        Math.round((today - then) / (1000 * 60 * 60 * 24))
      );

      this.setState({
        count: count
      });
    }, 36000);
  }
  render() {
    return (
      <div className="widget countdown fl w-25 pa2">
        <div className="heading">Sri Lanka Trip</div>
        <div className="count">{this.state.count}</div>
        <div className="meta">Days</div>
      </div>
    );
  }
}
