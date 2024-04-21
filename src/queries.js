import { HttpError } from 'wasp/server'

export const getControlMethods = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.ControlMethod.findMany({
    where: { userId: context.user.id }
  });
}

export const getControlMethod = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const controlMethod = await context.entities.ControlMethod.findUnique({
    where: { id },
    include: { tuningParameters: true }
  });

  if (!controlMethod) throw new HttpError(404, 'ControlMethod with id ' + id + ' not found');

  if (controlMethod.userId !== context.user.id) throw new HttpError(400, 'ControlMethod does not belong to the authenticated user');

  return controlMethod;
}

export const getTuningParameters = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const { controlMethodId } = args;
  const controlMethod = await context.entities.ControlMethod.findUnique({
    where: { id: controlMethodId }
  });
  if (!controlMethod) { throw new HttpError(404, 'ControlMethod with id ' + controlMethodId + ' does not exist.') };
  if (controlMethod.userId !== context.user.id) { throw new HttpError(400, 'ControlMethod with id ' + controlMethodId + ' does not belong to the user.') };
  return context.entities.TuningParameter.findMany({
    where: { controlMethodId }
  });
}