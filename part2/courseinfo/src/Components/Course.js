import React from "react";

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    return <p><b>total of {
        parts.reduce((prev, current) => prev + current.exercises, 0)
    } exercises</b></p>
}


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