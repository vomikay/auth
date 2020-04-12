import { User } from 'src/users/user.entity';
import { IJwtPayload } from 'src/auth/types/jwt-payload.interface';

export type TRequestWithUser = Request & { user: User };
export type TRequestWithJwt = Request & { user: IJwtPayload };
