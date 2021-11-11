import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private randomString(length: number = 16, readable: boolean, noSpecial: boolean) {
    let charset
    if (readable) {
      charset = '23456789ABCDEFGHJKLMNPQRSTUVXYZabcdefghijklmnopqrstuvwxyz' + (!noSpecial ? '-._"\'`' : '');
    } else {
      charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz' + (!noSpecial ? '-._"\'`' : '');
    }
    let result = '';

    while (length > 0) {
      var random = randomBytes(16);

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

  upload(json: {}, filename: string): {filename: string} {
    const uploadsFolder = join(process.cwd(), 'uploads');

    if (!existsSync(uploadsFolder)) {
      mkdirSync(uploadsFolder, { recursive: true });
    }

    const targetFilename = filename && existsSync(join(uploadsFolder, filename + '.json')) ? filename : this.randomString(24, true, true);
    writeFileSync(join(uploadsFolder, targetFilename + '.json'), JSON.stringify(json, null, 2));
    return {
      filename: targetFilename
    }
  }
}
