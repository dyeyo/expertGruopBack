import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWTSECRET as jwt.Secret,
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) {
          reject('Error con el token');
        } else {
          resolve(token as string);
        }
      }
    );
  });
};
