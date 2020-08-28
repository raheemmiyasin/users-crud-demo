import React, { Component } from "react";
import moment from "moment";
import UserDataService from "../services/user.service";

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
    this.onChangeSkillsets = this.onChangeSkillsets.bind(this);
    this.onChangeHobby = this.onChangeHobby.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      username: "",
      email: "", 
      phone_no: "",
      skillsets: "",
      hobby: "",
      createdAt: "",

      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhoneNo(e) {
    this.setState({
      phone_no: e.target.value
    });
  }

  onChangeSkillsets(e) {
    this.setState({
      skillsets: e.target.value
    });
  }

  onChangeHobby(e) {
    this.setState({
      hobby: e.target.value
    });
  }

  saveUser() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      phone_no: this.state.phone_no,
      skillsets: this.state.skillsets,
      hobby: this.state.hobby
    };

   UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          phone_no: response.data.phone_no,
          skillsets: response.data.skillsets,
          hobby: response.data.hobby,
          createdAt: moment(response.data.createdAt).format('MMMM Do YYYY, h:mm:ss a'),

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      username: "",
      email: "",
      phone_no: "",
      skillsets: "",
      hobby: "",
      createdAt: "",

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>User registered successfully!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Register
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  name="username"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_no">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_no"
                  required
                  value={this.state.phone_no}
                  onChange={this.onChangePhoneNo}
                  name="phone_no"
                />
              </div>

              <div className="form-group">
                <label htmlFor="hobby">Hobby</label>
                <input
                  type="text"
                  className="form-control"
                  id="hobby"
                  required
                  value={this.state.hobby}
                  onChange={this.onChangeHobby}
                  name="hobbt"
                />
              </div>

              <div className="form-group">
                <label htmlFor="skillsets">Skillsets</label>
                <input
                  type="text"
                  className="form-control"
                  id="skillsets"
                  required
                  value={this.state.skillsets}
                  onChange={this.onChangeSkillsets}
                  name="email"
                />
              </div>
  
              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
          }
}