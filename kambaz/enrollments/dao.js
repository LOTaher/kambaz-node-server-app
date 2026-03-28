import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }

  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function findEnrollmentsForCourse(courseId) {
    return db.enrollments.filter(
      (enrollment) => enrollment.course === courseId,
    );
  }

  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) =>
        !(enrollment.user === userId && enrollment.course === courseId),
    );
  }

  function isUserEnrolledInCourse(userId, courseId) {
    return db.enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === courseId,
    );
  }

  return {
    findAllEnrollments,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    isUserEnrolledInCourse,
  };
}
