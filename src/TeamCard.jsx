import { getDisplayName, getImageAlt } from "./Teamdata";

const TeamCard = ({ member }) => {
  return (
    <div className="team-card">
      <div className="team-card-glow" aria-hidden="true" />

      <div className="team-image-wrapper">
        <div className="team-image-ring" aria-hidden="true" />

        <div className="team-image-inner">
          <img src={member.image} alt={getImageAlt(member)} />
        </div>
      </div>

      <div className="team-info">
        <span className="team-member-label">TEAM MEMBER</span>

        <h4>{getDisplayName(member)}</h4>

        <p className="role">{member.role}</p>

        <span className="location">{member.location}</span>
      </div>

      <div className="team-view-details" aria-hidden="true">
        <span>Click to view full details</span>

        <span className="team-view-arrow">↗</span>
      </div>
    </div>
  );
};

export default TeamCard;