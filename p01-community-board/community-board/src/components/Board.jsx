// holds the resource data and renders one Card per item.

import Card from './Card';

const Board = () => {
  // stores the items that appear as cards.
  const resources = [
    { id: 1,  title: 'FAFSA Application',        category: 'Financial Aid' },
    { id: 2,  title: 'Scholarship Search',        category: 'Financial Aid' },
    { id: 3,  title: 'Internships & Jobs',        category: 'Career' },
    { id: 4,  title: 'Resume & Interview Prep',   category: 'Career' },
    { id: 5,  title: 'Graduate School Guide',     category: 'Grad School' },
    { id: 6,  title: 'Tutoring Center',           category: 'Academics' },
    { id: 7,  title: 'Writing Center',            category: 'Academics' },
    { id: 8,  title: 'Food Pantry',               category: 'Basic Needs' },
    { id: 9,  title: 'Student Housing Resources', category: 'Basic Needs' },
    { id: 10, title: 'Mental Health Services',    category: 'Wellness' },
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
