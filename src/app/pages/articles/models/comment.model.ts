import { Profile } from "src/app/shared/models";


export class Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
