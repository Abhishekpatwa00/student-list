'use server';

import dbConnect from '@/lib/mongodb';
import Student from '@/models/student';
import { revalidatePath } from 'next/cache';

function revalidateStudentPages() {
  revalidatePath('/');
  revalidatePath('/students');
}

export async function addStudent(formData: FormData) {
  await dbConnect();
  const name = formData.get('name') as string;
  const parent_name = formData.get('parent_name') as string;
  const age = Number(formData.get('age'));
  const image_url = (formData.get('image_url') as string) || '';

  await Student.create({
    name,
    parent_name,
    age,
    image_url,
  });
  revalidateStudentPages();
}

export async function updateStudent(id: string, formData: FormData) {
  await dbConnect();

  await Student.findByIdAndUpdate(id, {
    name: formData.get('name') as string,
    parent_name: formData.get('parent_name') as string,
    age: Number(formData.get('age')),
    image_url: (formData.get('image_url') as string) || '',
  });

  revalidateStudentPages();
}

export async function deleteStudent(id : string) {
  await dbConnect();
  await Student.findByIdAndDelete(id);
  revalidateStudentPages();
}
