import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="experience__item">
        <div className="experience__item__icon">
          <img src="/img/briefcase.png" alt="experience icon" />
        </div>
        <div className="experience__item__detail">
          <h4 className="experience__item__detail--position">{exp.title}</h4>
          <p className="experience__item__detail--company">{exp.company}</p>
          <p className="experience__item__detail--duration">
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </p>
          <p className="experience__item__detail--location">
            {exp.location === "" ? null : <span>{exp.location}</span>}
          </p>
          <p className="experience__item__detail--description">
            {exp.description === "" ? null : <span>{exp.description}</span>}
          </p>
        </div>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="education__item">
        <div className="education__item__icon">
          <img src="/img/graduationcap.png" alt="education icon" />
        </div>
        <div className="education__item__detail">
          <h4 className="education__item__detail--school">{edu.school}</h4>
          <p className="education__item__detail--degree">
            {edu.degree}, {edu.fieldofstudy}
          </p>
          <p className="education__item__detail--duration">
            <Moment format="YYYY">{edu.from}</Moment> -{" "}
            {edu.to === null ? "Now" : <Moment format="YYYY">{edu.to}</Moment>}
          </p>
          <p className="education__item__detail--description">
            {edu.description === "" ? null : <span>{edu.description}</span>}
          </p>
        </div>
      </li>
    ));
    return (
      <div className="profile__creds">
        <div className="experience">
          <h3 className="experience__title">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="experience__list">{expItems}</ul>
          ) : (
            <p className="experience__title">No Experience Listed</p>
          )}
        </div>

        <div className="education">
          <h3 className="education__title">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="education__list">{eduItems}</ul>
          ) : (
            <p className="education__title">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
