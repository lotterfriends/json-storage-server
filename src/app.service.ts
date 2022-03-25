import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private getUploadFolderPath(): string {
    return join(process.cwd(), 'uploads');
  }

  private randomString(length = 16, readable: boolean, noSpecial: boolean) {
    let charset;
    if (readable) {
      charset =
        '23456789ABCDEFGHJKLMNPQRSTUVXYZabcdefghijklmnopqrstuvwxyz' +
        (!noSpecial ? '-._"\'`' : '');
    } else {
      charset =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz' +
        (!noSpecial ? '-._"\'`' : '');
    }
    let result = '';

    while (length > 0) {
      const random = randomBytes(16);

      random.forEach(function (c) {
        if (length == 0) {
          return;
        }
        if (c < charset.length) {
          result += charset[c];
          length--;
        }
      });
    }
    return result;
  }

  upload(json: unknown, filename: string): { filename: string } {
    const uploadsFolderPath = this.getUploadFolderPath();

    if (!existsSync(uploadsFolderPath)) {
      mkdirSync(uploadsFolderPath, { recursive: true });
    }

    const targetFilename =
      filename && existsSync(join(uploadsFolderPath, filename + '.json'))
        ? filename
        : this.randomString(24, true, true);
    writeFileSync(
      join(uploadsFolderPath, targetFilename + '.json'),
      JSON.stringify(json, null, 2),
    );
    return {
      filename: targetFilename,
    };
  }

  getFile(filename: string): unknown {
    const uploadsFolderPath = this.getUploadFolderPath();
    const filePath = join(uploadsFolderPath, filename + '.json');
    if (!existsSync(filePath)) {
      throw new BadRequestException('invalid filename');
    }

    const fileContent = readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(fileContent);
    } catch (e) {
      throw new BadRequestException('invalid json');
    }
  }
}
