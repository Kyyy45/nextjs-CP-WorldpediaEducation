// src/lib/file-upload.ts

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = `${uuidv4()}-${file.name}`;
    const path = join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(path, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

