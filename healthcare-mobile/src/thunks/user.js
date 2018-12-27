import { getPrescriptions as getPrescriptionsApi } from '../api/user';
import { getPrescriptions } from '../reducers/medical';

export function getPrescriptionsAction(id) {
  return dispatch => getPrescriptionsApi(id)
    .then((response) => {
      const { data } = response;
      return {
        prescriptions: data,
      };
    })
    .then(async (payload) => {
      dispatch(getPrescriptions(payload));
    });
}
