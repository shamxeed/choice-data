export const getBundle = (prisma, id) => {
  let qeury = {
    where: {
      is_disabled: false,
    },
  };

  if (!id) {
    return prisma.plan.findMany(qeury);
  } else {
    return prisma.plan.findUnique({
      where: { id },
    });
  }
};
