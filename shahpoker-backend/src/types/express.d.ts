// FILE: shahpoker-backend/src/types/express.d.ts
import { User } from '../users/entities/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
