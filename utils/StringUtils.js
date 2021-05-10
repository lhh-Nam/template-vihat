/*******************************
 * @providesModule StringUtils *
 * @created_by Kds             *
 *******************************/

import i18n from '../libs/I18n/i18n';
import numeral from 'numeral';
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie';

import { getCustomDate } from './DateUtils';
import { isString } from './Utils';
import { getDomainWeb } from './WebUtils';

import { RespCode } from '../constants';
import { domain_upload_file, auth_domain } from '../constants/Domain';
import { cookieProps } from '../constants/Constants';

export function replaceAllStr(str, search, rep) {
    // new RegExp('[^0-9\,]', 'g') = /[^0-9\,]/g => remove all non-numeric, except char ",";
    // /[^A-Za-z0-9]/ => remove all non-alphanumeric
    if (!str || !search) { return ''; }
    return str.toString().replace(new RegExp(search, 'g'), rep || '');
}

export function getFullName(name) {
    if (!name) { return ''; }
    let nameStr = name.toString().trim(), chars = nameStr.split(' '), newChars = [];
    if (chars.length > 0) {
        chars.forEach(c => newChars.push(c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()));
    }
    return newChars.join(' ');
}

export function getLastName(fullName) {
    if (!fullName) { return ''; }
    let split = fullName.toString().split(' ');
    if (split.length === 1) {
        return split[0];
    } else {
        return split[split.length - 1];
    }
}

export function getEmailName(email) {
    if (!email) { return ''; }
    return email.toString().split('@')[0];
}

export function capitalizedStr(str, all) {
    if (!str) { return ''; }
    if (all) {
        str = str.trim(); let chars = str.split(' '), newChars = [];
        if (chars.length > 0) {
            chars.forEach(c => newChars.push(c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()));
        }
        return newChars.join(' ');
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export function i18nText(id, data) {
    let text = i18n.t(id, data && data.opts || null);
    return data && data.type ? textTransform(text, data.type) : text;
}

export function changeLanguage(langue) { return i18n.changeLanguage(langue); }

export function toNumber(number, isGetFull) {
    // 974              974
    // 0.12345          0.12345
    // '10,000.12'      10000.12
    // '23rd'           23
    // '$10,000.00'     10000
    // '100B'           100
    // '3.467TB'        3467000000000
    // '-76%'           0.76
    // '2:23:57'        NaN
    if (isGetFull) { return numeral(number); }
    return numeral(number).value();
}

export function formatNumber(number, format) {
    // Numbers
    // 10000            '0,0.0000'          10,000.0000
    // 10000.23         '0,0'               10,000
    // 10000.23         '+0,0'              +10,000
    // -10000           '0,0.0'             -10,000.0
    // 10000.1234       '0.000'             10000.123
    // 100.1234         '00000'             00100
    // 1000.1234        '000000,0'          001,000
    // 10               '000.00'            010.00
    // 10000.1234       '0[.]00000'         10000.12340
    // -10000           '(0,0.0000)'        (10,000.0000)
    // -0.23            '.00'               -.23
    // -0.23            '(.00)'             (.23)
    // 0.23             '0.00000'           0.23000
    // 0.23             '0.0[0000]'         0.23
    // 1230974          '0.0a'              1.2m
    // 1460             '0 a'               1 k
    // -104000          '0a'                -104k
    // 1                '0o'                1st
    // 100              '0o'                100th

    // Currency
    // 1000.234         '$0,0.00'           $1,000.23
    // 1000.2           '0,0[.]00 $'        1,000.20 $
    // 1001             '$ 0,0[.]00'        $ 1,001
    // -1000.234        '($0,0)'            ($1,000)
    // -1000.234        '$0.00'             -$1000.23
    // 1230974          '($ 0.00 a)'        $ 1.23 m

    // Bytes
    // 100              '0b'                100B
    // 1024             '0b'                1KB
    // 2048             '0 ib'              2 KiB
    // 3072             '0.0 b'             3.1 KB
    // 7884486213       '0.00b'             7.88GB
    // 3467479682787    '0.000 ib'          3.154 TiB

    // Percentages
    // 1                '0%'                100%
    // 0.974878234      '0.000%'            97.488%
    // -0.43            '0 %'               -43 %
    // 0.43             '(0.000 %)'         43.000 %

    // Time
    // 25               '00:00:00'          0:00:25
    // 238              '00:00:00'          0:03:58
    // 63846            '00:00:00'          17:44:06

    // Exponential
    // 1123456789       '0,0e+0'            1e+9
    // 12398734.202     '0.00e+0'           1.24e+7
    // 0.000123987      '0.000e+0'          1.240e-4
    return numeral(number).format(format || '0,0');
}

export function validateResp(resp, skipPayload) {
    return resp && resp.status_code === RespCode.SUCCESS && (skipPayload ? true : resp.payload);
}

export function getErrorMsg(error) {
    let errorCode = 'error_occurred';
    if (error && error.message) {
        switch (error.message) {
            case 'No value present':
                errorCode = 'no_value_present';
                break;
            case 'Unauthorized':
                errorCode = 'unauthorized';
                break;
            default:
                if (error.message.indexOf('Resource not found') > -1) {
                    errorCode = 'api_not_exist';
                } else if (error.message.indexOf(' ') > -1) {
                    return error.message;
                } else {
                    errorCode = error.message;
                }
                break;
        }
    }
    return i18n.t('error.' + errorCode);
}

export function getSubDomain() {
    return window.location.hostname.split('.')[0];
}

export function accessTokenKey() {
    return window.location.hostname.split('.').join('_').toString();
}

export function errorHandler(error) {
    if (!isString(error)) { return error; }
    return { status_code: RespCode.FAILURE, message: error }
}

export function convertStringToNumber(string) {
    if (!string) { return 0; }
    string = string.split('.').join('');
    return (string.replace(/[^0-9.]/g, "") * 1);
}

export function encodeBase64(str) { return Base64.encode(str); }
export function encodeBase64URI(str) { return Base64.encodeURI(str); }
export function decodeBase64(base64) { return Base64.decode(base64); }
export function toBase64(data) { return Base64.toBase64(data); }

export function textTransform(str, type) {
    if (!str) return '';
    switch (type) {
        case 'low': str = str.toLowerCase(); break;
        case 'up': str = str.toUpperCase(); break;
        case 'first': str = capitalizedStr(str); break;
        case 'all': str = capitalizedStr(str, true); break;
        default: break;
    }
    return str;
}

export function trimStr(str, { type, full, validate } = {}) {
    if (!str) { return ''; }
    str = str.toString().trim(); // trim text; 
    str = str.replace(full ? / /g : /  +/g, full ? '' : ' '); // full ? replace all space to none : replace 2 space to 1 space;
    if (type) { str = textTransform(str); }
    if (validate) { return str ? true : false } { return str; }
}

export function securityText(str, target) {
    if (!str) { return ''; }
    return str.toString().split('').map(i => { return target || '*'; }).join('');
}

function securityEmailLength(email) {
    let visable_length = 3;
    if (email.length <= 6) {
        visable_length = Math.round(email.length / 2);
        if (visable_length > 0) { visable_length -= 1; }
    }
    return visable_length;
}

export function securityCustomerData(str) {
    if (!str) { return ''; }
    let display_txt = '', security_txt = '';
    if (str.indexOf('@') > -1) {
        if (str.indexOf(',') > -1) {
            let arr_email = str.split(',');
            arr_email = arr_email.filter(item => item);
            if (arr_email.length === 0) { return ''; }
            return arr_email.map(a_email => {
                let email_txt = a_email.split('@');
                let a_e_display_txt = '', a_e_security_txt = '';
                if (email_txt[0]) {
                    let visable_length = securityEmailLength(email_txt[0]);
                    a_e_display_txt = email_txt[0].substring(0, visable_length);
                    a_e_security_txt = email_txt[0].substring(visable_length, email_txt[0].length);
                }
                return `${a_e_display_txt}${securityText(a_e_security_txt)}@${email_txt[1]}`;
            }).join(', ');
        } else {
            let email = str.split('@');
            if (email[0]) {
                let visable_length = securityEmailLength(email[0]);
                display_txt = email[0].substring(0, visable_length);
                security_txt = email[0].substring(visable_length, email[0].length);
            }
            return `${display_txt}${securityText(security_txt)}@${email[1]}`;
        }
    } else {
        if (str.indexOf(',') > -1) {
            let arr_str = str.split(',');
            arr_str = arr_str.filter(item => item);
            if (arr_str.length === 0) { return ''; }
            return arr_str.map(a_str => {
                let a_display_txt = a_str.substring(0, 3);
                let a_security_txt = a_str.substring(3, str.length);
                return a_display_txt + securityText(a_security_txt);
            }).join(', ');
        } else {
            display_txt = str.substring(0, 3);
            security_txt = str.substring(3, str.length);
            return display_txt + securityText(security_txt);
        }
    }
}

export function getLogDate(date) {
    return getCustomDate('YYYY-MM-DD HH:mm:ss:ms', date);
}

export function webLog(content, { type, color, tColor, data } = {}) {
    if (content) {
        let args = [], sub_content = `%c${`[${getLogDate()}]`}${type ? `[${type.toString().toUpperCase()}] ` : ''}`;
        if (color) {
            args.push(`${sub_content}%c${content}`, `color: ${tColor || 'unset'}`, `color: ${color}`);
        } else {
            args.push(`${sub_content}${content}`, `color: ${tColor || 'unset'}`);
        }
        if (data) { args.push(data); }
        console.log(...args);
    }
}

export function getCookie(cookieName) {
    if (!cookieName) cookieName = accessTokenKey();
    let cookie = Cookies.getJSON(cookieName);
    if (!cookie) { return; }
    let parsed_cookie = {};
    let c_props = Object.keys(cookie);
    c_props.forEach(prop => {
        if (cookieProps.get.hasOwnProperty(prop)) {
            parsed_cookie[cookieProps.get[prop]] = cookie[prop];
        }
    });
    return parsed_cookie;
}

export function setCookie(content, cookieName, options) {
    if (!cookieName) cookieName = accessTokenKey();
    let cookie = {};
    if (content) {
        let c_props = Object.keys(content);
        c_props.forEach(prop => {
            if (cookieProps.set.hasOwnProperty(prop)) {
                cookie[cookieProps.set[prop]] = content[prop];
            }
        });
    }
    Cookies.set(cookieName, cookie, { domain: `.${getDomainWeb()}`, ...options });
}

export function removeCookie(name, options) {
    Cookies.remove(name || '', { ...options });
    Cookies.remove(name || '', { domain: `.${getDomainWeb()}`, ...options });
}

export function getReduxPagination(payload) {
    return {
        page: payload ? payload.page : 1,
        has_next: payload ? (payload.has_next || payload.hasNext || false) : false,
        has_previous: payload ? (payload.has_previous || payload.hasPrevious || false) : false,
        next_page: payload ? (payload.next_page || payload.nextPage || 0) : 0,
        page_number: payload ? (payload.page_number || payload.pageNumber || 0) : 0,
        page_size: payload ? (payload.page_size || payload.pageSize || 10) : 10,
        previous_page: payload ? (payload.previous_page || payload.previousPage || 0) : 0,
        total_items: payload ? (payload.total_items || payload.totalItems || 0) : 0,
        total_pages: payload ? (payload.total_pages || payload.totalPages || 1) : 1,
    };
}

export function getUploadedFileUrl(url) {
    if (url && url.substr(0, 4) !== 'http') {
        return domain_upload_file + url;
    }
    return url;
}

export function isEmptyString(str) {
    if (trimStr(str) === '') return true;
    return false;
}

export function getRefreshToken(url) {
    return url && url.toString().split('&refresh_token=')[1] || '';
}

export function getRefreshTokenUrl(access_token, refresh_token) {
    return `${auth_domain}auth/refresh_token?access_token=${access_token}&refresh_token=${refresh_token}`;
}