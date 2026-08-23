import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <ul>
        {course.parts.map((content) => (
          <Content key={content.id} content={content} />
        ))}
      </ul>
    </div>
  );
};

export default Course;
