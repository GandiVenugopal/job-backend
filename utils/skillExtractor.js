const SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'MongoDB', 'AWS', 'SQL'];

module.exports = function extractSkills(text) {
  return SKILLS.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
};
