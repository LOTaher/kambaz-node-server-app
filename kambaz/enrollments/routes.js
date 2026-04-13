import EnrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getEnrollments = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const courses = await dao.findCoursesForUser(currentUser._id);
    res.json(courses);
  };

  app.get("/api/enrollments", getEnrollments);
}
