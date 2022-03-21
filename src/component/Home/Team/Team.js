import '../TeamCard/TeamCard.css';
import React from 'react';
import Fade from 'react-reveal/Reveal';
import team1 from '../../../images/team1.jpg'
import team2 from '../../../images/team2.jpg'
import team3 from '../../../images/team3.jpg'
import team4 from '../../../images/team4.jpg'
import TeamCard from '../TeamCard/TeamCard';

const teamData = [
    {
        img: team1,
        name: "Peter Ronson",
        position: "Project Manager"
    },
    {
        img: team2,
        name: "Ivan Dondur",
        position: "Founder"
    },
    {
        img: team3,
        name: "Marku Gudgji",
        position: "Designer"
    },
    {
        img: team4,
        name: "Victo Tuba",
        position: "Developer"
    },
]

const Team = () => {
    return (
        <Fade bottom>
            <div className="container mb-5 pb-5">
                <h2 className="brand-text text-center team-heading">Our Team Members</h2>
                <div className="row d-flex justify-content-around">
                    {
                        teamData.map(teamMember => <TeamCard key={teamMember.name} teamMember={teamMember} />)
                    }
                </div>
            </div>
        </Fade>
    );
};

export default Team;