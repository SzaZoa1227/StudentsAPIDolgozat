import express from "express";

const students = [
  { id: 1, name: "Ann", subject: "maths" },
  { id: 2, name: "Bob", subject: "IT" },
  { id: 3, name: "Cloe", subject: "PE" },
];

const port = 3300;
const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/students", (req, res) => {
  return res.status(200).json(students);
});

app.get("/students/:id", (req, res) => {
  const id = +req.params.id;
  const student =
    students.find((s) => s.id === id) ??
    res.status(404).json({ message: "Student not found" });
  res.status(200).json(student);
});

app.post("/students", (req, res) => {
  const { name, subject } = req.body;
  if (!name || !subject)
    return res.status(400).json({ message: "Name and subject are required" });
  const id = students[students.length - 1]?.id + 1 ?? 1;
  const student = { id, name, subject };
  students.push(student);
  res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
  const id = +req.params.id;
  const student =
    students.find((s) => s.id === id) ??
    res.status(404).json({ message: "Student not found" });
  const { subject, name } = req.body;
  if (!subject || !name) {
    return res.status(400).json({ message: "Name and subject are required" });
  }
  student.subject = subject;
  student.name = name;
  res.status(200).json(student);
});
