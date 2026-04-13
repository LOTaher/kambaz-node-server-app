import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1, image: 1, number: 1, credits: 1 });
  }
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }
  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }
  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }
  function findCourseById(courseId) {
    return model.findById(courseId);
  }
  return {
    findAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    findCourseById,
  };
}
