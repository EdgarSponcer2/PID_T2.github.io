import { HttpError } from 'wasp/server'

export const createControlMethod = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.ControlMethod.create({
    data: {
      name: args.name,
      userId: context.user.id
    }
  });
}

export const updateControlMethod = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const controlMethod = await context.entities.ControlMethod.findUnique({
    where: { id: args.id }
  });
  if (controlMethod.userId !== context.user.id) { throw new HttpError(403) };
  return context.entities.ControlMethod.update({
    where: { id: args.id },
    data: { name: args.name }
  });
}

export const createTuningParameter = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const controlMethod = await context.entities.ControlMethod.findUnique({
    where: { id: args.controlMethodId }
  });
  if (controlMethod.userId !== context.user.id) { throw new HttpError(403) };
  return context.entities.TuningParameter.create({
    data: {
      name: args.name,
      value: args.value,
      controlMethod: { connect: { id: args.controlMethodId } }
    }
  });
}

export const updateTuningParameter = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const tuningParameter = await context.entities.TuningParameter.findUnique({
    where: { id: args.id, controlMethodId: args.controlMethodId }
  });

  if (!tuningParameter) { throw new HttpError(404, 'Tuning parameter not found') };

  const controlMethod = await context.entities.ControlMethod.findUnique({
    where: { id: args.controlMethodId }
  });

  if (!controlMethod) { throw new HttpError(404, 'Control method not found') };

  if (controlMethod.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.TuningParameter.update({
    where: { id: args.id },
    data: { name: args.name, value: args.value }
  });
}