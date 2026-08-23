import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  //   let total = 0;
  //   course.parts.forEach((content) => (total += content.exercises));

  const total = course.parts.reduce((acc, num) => acc + num.exercises, 0);

  console.log("total", total);

  return (
    <div>
      <Header header={course.name} />
      <ul>
        {course.parts.map((content) => (
          <Content key={content.id} content={content} />
        ))}
      </ul>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
