import { File } from "expo-file-system";

export class FileUtil {
  public async base64(uri: string): Promise<string> {
    const file = new File(uri);
    return await file.base64();
  }
}
