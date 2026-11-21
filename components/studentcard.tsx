'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState } from 'react';
import { updateStudent, deleteStudent } from '@/app/actions/studentActions';
import { Delete, Edit } from 'lucide-react';
import { Button } from './ui/button';
interface StudentProps {
  student: {
    _id: string;
    name: string;
    parent_name: string;
    age: number;
    image_url: string;
  };
}

export default function StudentCard({ student }: StudentProps) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdate(formData: FormData) {
    await updateStudent(student._id, formData);
    setIsEditing(false);
  }

  async function handleDelete() {
    if (confirm(`Delete ${student.name}?`)) {
      await deleteStudent(student._id);
    }
  }

  if (isEditing) {
    return (
      <form action={handleUpdate} className="border p-4 rounded-lg space-y-3 bg-gray-50">
        <input
          type="text"
          name="name"
          defaultValue={student.name}
          required
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="text"
          name="parent_name"
          defaultValue={student.parent_name}
          required
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="number"
          name="age"
          defaultValue={student.age}
          required
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="url"
          name="image_url"
          defaultValue={student.image_url}
          placeholder="Image URL"
          className="w-full border p-2 rounded bg-white"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center  flex-col w-2xs border p-4 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        {student.image_url && (
          <img
            src={student.image_url}
            alt={student.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col items-center pb-2">
          <h3 className="font-bold">
            {student.name} (Age: {student.age})
          </h3>
          <p className="text-sm text-gray-600">Parent: {student.parent_name}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="icon-lg"
          onClick={() => setIsEditing(true)}

        >
          <Edit/>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" size="icon-lg"  />}>
            <Delete/>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this student
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className={"bg-destructive"} onClick={()=>deleteStudent(student._id)} >Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
