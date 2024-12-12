import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const filename = `${uuid.v4()}.${file.originalname.split(".").pop()}`;
      const filePath = path.resolve(__dirname, "..", "..", "uploads");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fileDestination = path.join(filePath, filename);
      fs.writeFileSync(fileDestination, file.buffer);

      return filename;
    } catch (err) {
      throw new HttpException(
        "Something went wrong while saving the file",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, "..", "..", "uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);

        return;
      }
    } catch (err) {
      throw new HttpException(
        "Something went wrong while deleting the file",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
