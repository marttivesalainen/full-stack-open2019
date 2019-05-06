import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => {
        return <Part key={part.name} part={part} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  const count = parts
    .map(part => part.exercises)
    .reduce((total, part) => total + part);

  return <p>yhteensä {count} tehtävää</p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
