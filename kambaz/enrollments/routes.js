import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getEnrollments = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const userEnrollments = db.enrollments.filter(
      (e) => e.user === currentUser._id,
    );
    res.json(userEnrollments);
  };

  const enrollInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const existing = db.enrollments.find(
      (e) => e.user === currentUser._id && e.course === courseId,
    );
    if (existing) {
      res.status(400).json({ message: "Already enrolled" });
      return;
    }
    dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(db.enrollments);
  };

  const unenrollFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === currentUser._id && e.course === courseId),
    );
    res.sendStatus(200);
  };

  app.get("/api/enrollments", getEnrollments);
  app.post("/api/enrollments/:courseId", enrollInCourse);
  app.delete("/api/enrollments/:courseId", unenrollFromCourse);
}
