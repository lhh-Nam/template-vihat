import { doRequest } from '../../utils/CoreUtils';
import { errorHandler } from '../../utils/StringUtils';

import { auth_domain } from '../../constants/Domain';

export default class UserApis {

    async getRoles({ page, size } = {}) {
        try {
            let url = `${auth_domain}role/get?page=${page}&size=${size}`;
            return await doRequest('post', url);
        } catch (error) {
            throw errorHandler(error);
        }
    }

}