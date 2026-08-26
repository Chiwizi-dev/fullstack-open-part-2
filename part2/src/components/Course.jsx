import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  //   let total = 0;
  //   course.parts.forEach((content) => (total += content.exercises));

  const total = courses.reduce((acc, course) => {
    const grandSum = course.parts.reduce(
      (sum, part) => sum + part.exercises,
      0,
    );
    return acc + grandSum;
  }, 0);
  //   console.log("total", total);

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header header={course.name} />

            <ul>
              {course.parts.map((content) => {
                return <Content key={content.id} content={content} />;
              })}
            </ul>
          </div>
        );
      })}

      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
