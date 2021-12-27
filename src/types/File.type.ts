export interface ReadDirItem {
  ctime: Date | undefined;
  mtime: Date | undefined;
  name: string;
  path: string;
  size: string;
  isFile: () => boolean;
  isDirectory: () => boolean;
}
