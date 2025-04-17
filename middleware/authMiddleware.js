import { UnauthenticatedError, UnauthorizedError } from '../errors/customeErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizeRole= async (req, res, next)=>{
      if(!req.user.role==='admin'){
         throw new UnauthorizedError("Unauthorized");
      }
      next();
}
