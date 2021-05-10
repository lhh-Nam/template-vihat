import { doRequest } from '../../utils/CoreUtils';
import { errorHandler } from '../../utils/StringUtils';

import { auth_domain, contact_domain } from '../../constants/Domain';

export default class UserApis {

    async userLogin(params) {
        try {
            let url = `${auth_domain}auth/pre_auth`;
            return await doRequest('post', url, { body: params });
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getLoginToken(params) {
        try {
            let url = `${auth_domain}auth/login`;
            return await doRequest('post', url, { body: params });
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getUserInfo({ id } = {}) {
        try {
            let url = `${contact_domain}contact/agent/get/${id}`;
            return await doRequest('get', url);
        } catch (error) {
            throw errorHandler(error);
        }
    }

}