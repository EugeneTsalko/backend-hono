import { type File } from 'buffer';
import fs from 'fs';
import path from 'path';

export const fileService = {
  isDirEmpty(path: string): boolean {
    return fs.readdirSync(path).length === 0;
  },

  async uploadFile(file: File, dir: string, fileName: string): Promise<string> {
    const ext = path.extname(file.name);
    const pathToFile = `${dir}/${fileName}${ext}`;

    const arr = await file.arrayBuffer();

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!this.isDirEmpty(dir)) {
      fs.readdirSync(dir).forEach((f) => {
        fs.rmSync(`${dir}/${f}`);
      });
    }

    fs.writeFile(pathToFile, Buffer.from(arr), (err) => {
      if (err) throw err;
    });

    return pathToFile;
  },
};
