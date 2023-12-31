import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export const getUserId = () => {
  const token = headers().get('x-auth-token');

  if (!token) return {};

  try {
    const SECRET_KEY = process.env.SECRET_KEY;

    const decoded = jwt.verify(token, SECRET_KEY);

    return { myId: decoded.userId };
  } catch (err) {
    console.log(err.message);
    if (!token) {
      return {};
    }
  }
};

export const authorization = async (prisma, body, query) => {
  const { amount, pin, amountToPay } = body;

  const { myId } = getUserId();

  const response = {
    myId,
    error: true,
    statusCode: 400,
    msg: 'Insufficient balance!',
  };

  if (!myId) {
    return {
      ...response,
      statusCode: 401,
      msg: 'Unauthorized request!',
    };
  }

  const getUser = prisma.user.findUnique({
    where: { id: myId },
    select: {
      balance: true,
      amount_spent: true,
      transaction_pin: true,
    },
  });

  const options = [getUser];

  if (query) {
    options.push(query);
  }

  const [user, queryData] = await prisma.$transaction(options);

  const { transaction_pin, balance, role } = user;

  if (role === 'BLOCKED' || role === 'DELETED') {
    return {
      ...response,
      statusCode: 401,
      msg: 'You are not allowed to perform this transaction! Send us mail at support@saukie.net for assistance!',
    };
  }

  if (pin !== transaction_pin) {
    return {
      ...response,
      statusCode: 401,
      msg: 'Incorrect transaction pin!',
    };
  }

  if (amountToPay) {
    if (amountToPay > balance) return response;
  } else if (amount) {
    if (amount > balance) return response;
  }

  return {
    ...response,
    queryData,
    user,
    myId,
    error: false,
  };
};
