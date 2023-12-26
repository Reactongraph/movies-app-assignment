export const validateServerSide = (session) => {
  let isAuth = true;
  let data = null;

  if (session) {
    const { user } = session;
    if (user) {
      const { authToken } = user;
      if (!authToken) {
        isAuth = false;
      }
      data = user;
    } else {
      isAuth = false;
    }
  } else {
    isAuth = false;
  }

  return { status: isAuth, data };
};
