import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Create extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      bookId: "",
      bookTitle: "",
      bookAuthor: "",
      redirectVar: null,
    };
    this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
    this.bookTitleChangeHandler = this.bookTitleChangeHandler.bind(this);
    this.bookAuthorChangeHandler = this.bookAuthorChangeHandler.bind(this);
    this.create = this.create.bind(this);
  }

  bookIdChangeHandler = (event) => {
    this.setState({
      bookId: event.target.value,
    });
  };
  bookTitleChangeHandler = (event) => {
    this.setState({
      bookTitle: event.target.value,
    });
  };
  bookAuthorChangeHandler = (event) => {
    this.setState({
      bookAuthor: event.target.value,
    });
  };

  create = (event) => {
    event.preventDefault();
    const newData = {
      bookId: parseInt(this.state.bookId),
      bookTitle: this.state.bookTitle,
      bookAuthor: this.state.bookAuthor,
    };
    axios
      .post("http://localhost:3001/create", newData)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            redirectVar: <Redirect to="/home" />,
          });
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
      <div>
        {this.state.redirectVar}
        {redirectVarLogin}
        <br />
        <div class="container">
          <form>
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="BookID"
                required={true}
                placeholder="Book ID"
                onChange={this.bookIdChangeHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Title"
                placeholder="Book Title"
                onChange={this.bookTitleChangeHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Author"
                placeholder="Book Author"
                onChange={this.bookAuthorChangeHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                class="btn btn-success"
                type="submit"
                onClick={this.create}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
