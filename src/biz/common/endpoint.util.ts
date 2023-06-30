import { Notify } from 'quasar';

async function getList<T>(response: Promise<T[]>, showNotify = true) {
  return (
    response
      .then<T[], never>((res: T[]) => {
        if (showNotify) {
          Notify.create({
            type: 'positive',
            message: `${res.length} data was retrieved.`,
          });
        }
        return res;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((reason: any) => {
        Notify.create({
          type: 'negative',
          message: `${reason}`,
        });
        return [] as T[];
      })
  );
}

async function get<T>(response: Promise<T>, showNotify = true) {
  return (
    response
      .then<T, never>((res: T) => {
        if (showNotify) {
          Notify.create({
            type: 'positive',
            message: 'data was retrieved.',
          });
        }
        return res;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((reason: any) => {
        Notify.create({
          type: 'negative',
          message: `${reason}`,
        });
        return undefined;
      })
  );
}

async function post(response: Promise<number>, showNotify = true) {
  return (
    response
      .then<number, never>((res: number) => {
        if (showNotify) {
          Notify.create({
            type: 'primary',
            message: 'completed',
          });
        }
        return res;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((reason: any) => {
        Notify.create({
          type: 'negative',
          message: `${reason}`,
        });
        return 0;
      })
  );
}

const endpointUtil = {
  getList,
  get,
  post,
};

export default endpointUtil;
