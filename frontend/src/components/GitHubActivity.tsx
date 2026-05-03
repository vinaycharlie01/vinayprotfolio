import React, { useEffect, useState } from 'react';
import '../styles/GitHubActivity.css';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubActivity: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const username = 'vinaycharlie01';

  useEffect(() => {
    // Generate mock data for now - you can replace this with actual GitHub API call
    const generateMockData = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      let total = 0;
      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const count = Math.floor(Math.random() * 10);
        total += count;
        data.push({
          date: new Date(d).toISOString().split('T')[0],
          count: count,
          level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
        });
      }
      setTotalContributions(total);
      return data;
    };

    setContributions(generateMockData());
  }, []);

  const getMonths = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const result = [];
    for (let i = 0; i < 12; i++) {
      const monthIndex = (today.getMonth() - 11 + i + 12) % 12;
      result.push(months[monthIndex]);
    }
    return result;
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 0: return 'level-0';
      case 1: return 'level-1';
      case 2: return 'level-2';
      case 3: return 'level-3';
      case 4: return 'level-4';
      default: return 'level-0';
    }
  };

  // Group contributions by week
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <div className="github-activity">
      <h3 className="activity-title">GitHub Activity</h3>
      
      <div className="contribution-graph">
        <div className="months-labels">
          {getMonths().map((month, index) => (
            <span key={index} className="month-label">{month}</span>
          ))}
        </div>
        
        <div className="graph-container">
          <div className="days-labels">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          
          <div className="weeks">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="week">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`day ${getLevelClass(day.level)}`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="activity-footer">
        <span className="contribution-count">{totalContributions} contributions in the last year</span>
        <div className="legend">
          <span>Less</span>
          <div className="legend-colors">
            <div className="legend-box level-0"></div>
            <div className="legend-box level-1"></div>
            <div className="legend-box level-2"></div>
            <div className="legend-box level-3"></div>
            <div className="legend-box level-4"></div>
          </div>
          <span>More</span>
        </div>
      </div>
      
      <a 
        href={`https://github.com/${username}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-link"
      >
        Follow me on GitHub →
      </a>
    </div>
  );
};

export default GitHubActivity;

// Made with Bob