import { } from '../../utils/CoreUtils';
import { errorHandler } from '../../utils/StringUtils';
import { doRequest } from '../../utils/CoreUtils';

const username = 'lhh-Nam';

export default class UserAPIs {
    async getGitRepo() {
        try {
            let url = `https://api.github.com/users/${username}/repos`
            return await doRequest('get', url, { noAuth: true });
        } catch (error) {
            throw errorHandler(error);
        }
    };
}