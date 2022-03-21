import React from "react";

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises} />
        </div>
    )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map((part) =>
            <Part key={part.id} part={part} />
        )}
    </>

export default Course;