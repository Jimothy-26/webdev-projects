// holds the resource data and renders one Card per item.

import Card from './Card';

const Board = () => {
  // stores the items that appear as cards.
  const resources = [
    { id: 1,  title: 'FAFSA Application',        category: 'Applications open Oct. 1st!' },
    { id: 2,  title: 'Scholarship Search',        category: 'Earn FREE Money $$' },
    { id: 3,  title: 'Internships & Jobs',        category: 'Start Your Career Path!' },
    { id: 4,  title: 'Resume & Interview Prep',   category: 'Practice makes progress!' },
    { id: 5,  title: 'Graduate School Guide',     category: 'Consult with a counselor for application help!' },
    { id: 6,  title: 'Tutoring Center',           category: 'Perfect for Midterms, Finals, and Reviews!' },
    { id: 7,  title: 'Writing Center',            category: 'Get Peer Feedback and More!' },
    { id: 8,  title: 'Food Pantry',               category: 'No student should go hungry' },
    { id: 9,  title: 'Student Housing Resources', category: 'Recieve help on housing through our campus partners' },
    { id: 10, title: 'Mental Health Services',    category: 'You are a human first' },
  ];

  // returns the responsive grid of cards.
  return (
    <div className="Board">
      <div className="grid">
        {resources.map((r) => (
          // creates a Card for each resource with title and category.
          <Card key={r.id} title={r.title} category={r.category} />
        ))}
      </div>
    </div>
  );
};

export default Board;
