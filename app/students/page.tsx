import dbConnect from '@/lib/mongodb';
import Student from '@/models/student';
import { addStudent , deleteStudent } from '../actions/studentActions';

import StudentCard from '@/components/studentcard';

export default async function StudentPage() {
  await dbConnect();

  // Fetch plain JS objects instead of heavy Mongoose documents
  const rawStudents = await Student.find({}).lean();
  const students = rawStudents.map((s) => ({
     _id: String(s._id),
     name: s.name,
     parent_name: s.parent_name,
     age: s.age,
     image_url: s.image_url || '',
   }));

  return (
    <main>
      <form action={addStudent} className="space-y-4 border p-4 rounded-lg">
        <h2>Add a new Student</h2>
        <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="parent_name"
                  placeholder="Parent Name"
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="url"
                  name="image_url"
                  placeholder="Image URL (https://...)"
                  className="w-full border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Student
                </button>

      </form>
      <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold">Enrolled Students ({students.length})</h2>
              {students.map((student) => (
                 <StudentCard key={student._id} student={student} />
              ))}
            </div>
    </main>
  );
}
