import { teamMembers } from '../constants/teamMembers.js';

class TeamDisplay {
    constructor() {
        this.teamMembers = teamMembers;
        this.gridContainer = document.querySelector('.team-section__grid');
        this.createTeamGrid();
    }

    createTeamGrid() {
        if (!this.gridContainer) return;

        // Clear existing content
        this.gridContainer.innerHTML = '';

        // Create member cards for each team member
        this.teamMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'team-section__member';

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="team-section__member-image">
                <div class="team-section__member-info">
                    <h3>${member.name}</h3>
                    <p data-i18n="about.team.positions.${member.position}">${member.position}</p>
                </div>
            `;

            this.gridContainer.appendChild(memberCard);
        });
    }


}

// Export for module usage or initialize directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeamDisplay;
} else {
    window.TeamDisplay = TeamDisplay;
}

export default TeamDisplay;
