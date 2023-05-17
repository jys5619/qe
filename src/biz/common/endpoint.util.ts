import { Notify } from 'quasar';

async function getList<T>(response: Promise<T[]>) {
  return response
    .then<T[], never>((res: T[]) => {
      Notify.create({
        type: 'positive',
        message: `${res.length} data was retrieved.`,
      });
      return res;
    })
    .catch((reason: any) => {
      Notify.create({
        type: 'negative',
        message: `${reason}`,
      });
      return [] as T[];
    });
}

async function get<T>(response: Promise<T>) {
  return response
    .then<T, never>((res: T) => {
      Notify.create({
        type: 'positive',
        message: 'data was retrieved.',
      });
      return res;
    })
    .catch((reason: any) => {
      Notify.create({
        type: 'negative',
        message: `${reason}`,
      });
      return undefined;
    });
}

async function post(response: Promise<number>) {
  return response
    .then<number, never>((res: number) => {
      Notify.create({
        type: 'positive',
        message: 'completed',
      });
      return res;
    })
    .catch((reason: any) => {
      Notify.create({
        type: 'negative',
        message: `${reason}`,
      });
      return 0;
    });
}

const endpointUtil = {
  getList,
  get,
  post,
};

export default endpointUtil;
