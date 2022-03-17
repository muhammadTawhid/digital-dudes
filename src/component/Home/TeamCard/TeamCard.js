import './TeamCard.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const TeamCard = (props) => {
    const { img, name, position } = props.teamMember;

    return (
        <div className="col-md-3 team-card">
            <img src={img} alt="" />
            <h4>{name}</h4>
            <p>{position}</p>
            <div>
                <a href="https://web.facebook.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://twitter.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://www.instagram.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
        </div>
    );
};

export default TeamCard;