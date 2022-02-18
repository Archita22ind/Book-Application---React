import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class Delete extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      bookId: -1,
      redirectVar: null,
    };

    //Bind the handlers to this class
    this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
    this.delete = this.delete.bind(this);
  }

  bookIdChangeHandler = (event) => {
    this.setState({
      bookId: event.target.value,
    });
  };

  delete = (event) => {
    event.preventDefault();
    //make a delete request with the book ID

    let url = "http://localhost:3001/delete/" + this.state.bookId;
    axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            redirectVar: <Redirect to="/home" />,
          });
        } else if (response.status === 201) {
          alert(response.data);
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  render() {
    let redirectVarLogin = null;
    if (!cookie.load("cookie")) {
      redirectVarLogin = <Redirect to="/Login" />;
    }
    return (
      <div class="container">
        {this.state.redirectVar}
        {redirectVarLogin}
        <form>
          <div style={{ width: "50%", float: "left" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="BookID"
              placeholder="Search a Book by Book ID"
              onChange={this.bookIdChangeHandler}
            />
          </div>
          <div style={{ width: "50%", float: "right" }}>
            <button class="btn btn-success" type="submit" onClick={this.delete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Delete;
