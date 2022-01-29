import { Request } from 'express';
import User from '../user/user.entity';

interface customRequest extends Request {
  user: User;
}

export default customRequest;