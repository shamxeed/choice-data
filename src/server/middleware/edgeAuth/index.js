const jwt = require('jsonwebtoken');
import { headers } from 'next/headers';

export const getUserId = () => {
  const token = headers().get('x-auth-token');

  if (!token) return {};

  try {
    const SECRET_KEY = process.env.SECRET_KEY;

    jwt.verify(token, 'musa'.toString('utf-8'));

    const decoded = {};

    return { myId: decoded.userId };
  } catch (err) {
    console.log(err.message);
    if (!token) {
      return {};
    }
  }
};

export const authorization = async (data) => {
  const { prismaEdge, body, query, is_data, select = {} } = data;

  const { amount, pin, amountToPay, myId } = body;

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

  const getUser = prismaEdge.user.findUnique({
    where: { id: myId },
    select: {
      balance: true,
      transaction_pin: true,
      amount_spent: true,
      role: true,
      ...select,
    },
  });

  const options = [getUser];

  if (query) {
    options.push(query);
  }

  const [user, queryData] = await prismaEdge.$transaction(options);

  const { transaction_pin, balance, role } = user;

  if (role === 'BLOCKED' || role === 'DELETED') {
    return {
      ...response,
      statusCode: 401,
      msg: 'You are not allowed to perform this transaction! Send us mail at support@thritelecoms.com for assistance!',
    };
  }

  if (!pin || pin !== transaction_pin) {
    return {
      ...response,
      statusCode: 401,
      msg: 'Incorrect transaction pin!',
    };
  }

  if (is_data) {
    if (queryData.is_disabled) {
      return {
        ...response,
        msg: 'This bundle is temporarily disabled!',
      };
    } else if (queryData.amount > balance) return response;
  } else if (amountToPay) {
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

export const isAdmin = async (data) => {
  const { prismaEdge, body, query, isUser, select = {} } = data;

  const { pin } = body;

  const { myId } = getUserId();

  const response = {
    myId,
    error: true,
    statusCode: 401,
    msg: 'Unauthorized request!',
  };

  if (!myId) {
    return response;
  }

  const getUser = prismaEdge.user.findUnique({
    where: { id: myId },
    select: {
      role: true,
      transaction_pin: true,
      ...select,
    },
  });

  const options = [getUser];

  if (query) {
    options.push(query);
  }

  const [user, queryRes] = await prismaEdge.$transaction(options);

  const { transaction_pin, role } = user || {};

  if (role !== 'Admin') {
    return response;
  }

  if (!pin || pin !== transaction_pin) {
    return {
      ...response,
      msg: 'Incorrect transaction pin!',
    };
  }

  if (isUser && !queryRes) {
    return {
      ...response,
      msg: 'No User Found',
      statusCode: 400,
    };
  }

  return {
    ...response,
    queryRes,
    user,
    myId,
    error: false,
  };
};
