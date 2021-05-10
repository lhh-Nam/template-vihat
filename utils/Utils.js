/*************************
 * @providesModule Utils *
 * @created_by Kds       *
 *************************/

import _ from 'lodash';
import fastCompare from 'react-fast-compare'; // This is a fork of the brilliant fast-deep-equal with some extra handling for React.
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export function isUndefined(e) {
    switch (e) {
        case 'undefined': case 'NaN': case NaN: case undefined: case '': case null: case 'null': case false: case 'false': case 'Invalid date': return true;
        default: return false;
    }
}

export function isEmail(email) {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email).toLowerCase());
}

export function isString(value) {
    if (typeof value === 'string') { return true; }
    return false;
}

export function isNumber(value) {
    if (typeof value === 'number') { return true; }
    if (value && value.toString().split('.') === 2 && typeof parseFloat(value) === 'number') { return true; }
    if (isNumeric(value)) { return true; }
    return false;
}

export function isFloatNumber(evt, obj) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf('.') != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

export function isNumeric(str) {
    if (isUndefined(str)) { return false; }
    if (str.toString().match(/^[0-9]+$/) === null) { return false; }
    return true;
}

export function isBoolean(value) {
    if (typeof value === 'boolean') { return true; }
    return false;
}

export function isObject(value, isNotEmpty) {
    if (typeof value === 'object' && !isUndefined(value)) {
        if (isNotEmpty) {
            return !isEmpty(value);
        } else {
            return true;
        }
    }
    return false;
}

export function isEmpty(obj) {
    return _.isEmpty(obj);
}

export function isArray(value, isNotEmpty) {
    if (Array.isArray(value)) {
        if (isNotEmpty) {
            let min_length = isNumber(isNotEmpty) ? parseInt(isNotEmpty) : 0;
            return value.length > min_length ? true : false;
        } else {
            return true;
        }
    }
    return false;
}

export function isHaveValue(data, value, isArr) {
    if (!data || (isArr && !isArray(data))) { return false; }
    if (isArr) { return data.findIndex(i => isEqual(i, value)) > -1; }
    for (const key in data) { if (isEqual(data[key], value)) { return true; } }
    return false;
}

export function isHaveString(arr, str) {
    let status = false;
    if (!str || !isString(str) || !isArray(arr, true)) { return status; }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] && str.indexOf(arr[i].toString()) > -1) {
            status = true;
            break;
        }
    }
    return status;
}

export function isHaveProp(obj, prop) {
    if (!prop || !obj) { return false; }
    return Object.keys(obj).indexOf(prop) > -1;
}

export function isHaveProps(obj, propTxts) {
    if (!obj || !propTxts) { return false; }
    let props = propTxts.toString().split(' ');
    if (props.length === 0) { return false; }
    return Object.keys(obj).sort().join().indexOf(props.sort().join()) > -1;
}

export function isLeapYear(year) {
    if (isUndefined(year)) { return false; }
    let yearInt = parseInt(year);
    if (((yearInt % 4 === 0) && (yearInt % 100 !== 0)) || (yearInt % 400 === 0)) { return true; }
    return false;
}

export function isUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export function isJson(data) {
    try {
        if (!data) return false;
        if (isString(data)) {
            JSON.parse(data);
        } else {
            JSON.parse(JSON.stringify(data));
        }
    } catch (e) { return false; }
    return true;
}

export function toJson(data) {
    try {
        let json = null;
        if (isString(data)) {
            json = JSON.parse(data);
            if (isString(json)) {
                json = JSON.parse(json);
            }
        } else {
            json = JSON.parse(JSON.stringify(data));
        }
        return json;
    } catch (e) { return null; }
}

export function isFunction(func) {
    if (typeof func === 'function') { return true; }
    return false;
}

export function isEqual(arg1, arg2) { return fastCompare(arg1, arg2); }

export function removeUnicode(str, { type, middle } = {}) {
    if (!str || !isString(str)) { return ''; }
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    if (type === 'email') str = str.replace(/[^_@.a-z0-9]/g, '-');
    else str = str.replace(/[^a-z0-9]/g, '-');
    str = str.replace(/-+-/g, '-'); // replace 2- to 1-
    str = str.replace(/^\-+|\-+$/g, '');
    str = str.replace(/-/g, middle || ' '); // replace - to \s
    return str;
}

export function randomColor() {
    let letters = '0123456789ABCDEF', color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function randomString(type, length) {
    let randomStr = '', types = { num: '0123456789', char: 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', mix: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', charLow: 'abcdefghiklmnopqrstuvwxyz', charUp: 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', numLow: '0123456789abcdefghiklmnopqrstuvwxyz', numUp: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ', };
    for (let i = 0; i < length; i++) { let rnum = Math.floor(Math.random() * types[type].length); randomStr += types[type].substring(rnum, rnum + 1); }
    return randomStr;
}

export function reverseStr(str) {
    if (!str) { return ''; }
    return str.toString().split('').reverse().join('');
}

export function randomValue(inputValue, isInt) {
    if (!inputValue || !isString(inputValue)) { return null; }
    let rnum = Math.floor(Math.random() * inputValue.length);
    let rvalue = inputValue.substring(rnum, rnum + 1);
    if (isInt) { return parseInt(rvalue); }
    return rvalue;
}

export function calcCrowDistance(lat1, lon1, lat2, lon2, unit) {
    let R = 6371; // km
    if (unit) {
        if (unit === 'm') {
            R = 6371 * 1000;
        }
    }
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let dlat1 = lat1 * Math.PI / 180;
    let dlat2 = lat2 * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

export function json2String(json) {
    return JSON.stringify(json).replace(/"/g, `'`);
}

export function string2Json(txt) {
    try {
        if (!txt || !isString(txt)) { return null; }
        return JSON.parse(txt.replace(/'/g, '"'));
    } catch (error) {
        return null;
    }
}

export function indexText(index, max, isSkipZero) {
    if (!index && !max) { return null; }
    let index_txt = isSkipZero ? (index + 1).toString() : index.toString(),
        max_txt = max.toString(), index_l = index_txt.length, max_l = max_txt.length, subTxt = '';
    if (max_l > index_l) { for (let i = 0; i < max_l - index_l; i++) { subTxt += '0'; } }
    return subTxt + index_txt;
}

export async function miniTimer(time) {
    if (!time || !isNumber(time)) { return false; }
    return new Promise((resolve) => { setTimeout(() => { resolve(true); }, time); });
}

export function getProps(data, field, isConcatArray, isUnique) {
    if (!isArray(data) || data.length == 0 || !field) { return []; }
    let props = [];
    data.forEach(item => {
        if (isConcatArray) {
            props = props.concat(item[field]);
        } else {
            props.push(item[field]);
        }
    });
    if (isUnique) { props = _.uniq(props); }
    return props;
}

export function removeProps(obj, propTxt) {
    if (!obj) { return null; }
    if (!propTxt || !isString(propTxt)) { return obj; }
    let props = propTxt.split(' ');
    if (props.length === 0) { return obj; }
    let newObj = _.cloneDeep(obj);
    props.forEach(prop => delete newObj[prop]);
    return newObj;
}

export function uniqArray(datas) {
    if (!datas || !isArray(datas)) { return null; }
    return _.uniq(datas);
}

export function formatBytes(a, b, space) {
    if (0 == a) return '0 Bytes';
    var c = 1024, d = b || 2, e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + (space ? ' ' : '') + e[f];
}

export function cloneObj(obj, rmPropTxts) {
    let clonedObj = _.cloneDeep(obj);
    if (rmPropTxts) {
        let rmProps = rmPropTxts.split(' ');
        rmProps.forEach(prop => delete clonedObj[prop]);
    }
    return clonedObj;
}

export function cloneArray(arrayData) {
    if (!arrayData || !isArray(arrayData)) { return []; }
    let clonedArray = [];
    arrayData.forEach(data => clonedArray.push(data));
    return clonedArray;
}

export function getMediaTimer(time, options) {
    let validTime = parseInt(time);
    if (!validTime) return options?.middle ? `00${options.middle}00` : '00:00';
    let hr = 0, min = 0, sec = 0, formatHr = null, formatMin = null, formatSec = null;
    if (validTime > 3600) {
        hr = Math.trunc(validTime / 3600);
        min = Math.trunc((validTime % 3600) / 60);
        sec = Math.trunc((validTime % 3600) % 60);
    } else {
        min = Math.trunc(validTime / 60);
        sec = Math.trunc(validTime % 60);
    }
    let middleTxt = options && options.middle || ':',
        hrUnitTxt = (options && options.hourUnit || ''),
        minUnitTxt = (options && options.minUnit || ''),
        secUnitTxt = (options && options.secUnit || ''),
        isMinStr = options && options.minStr;
    if (0 < hr && hr < 10 && !isMinStr) { formatHr = '0' + hr + hrUnitTxt; } else { formatHr = hr + hrUnitTxt; }
    if (min < 10 && !isMinStr) { formatMin = '0' + min + minUnitTxt; } else { formatMin = min + minUnitTxt; }
    if (sec < 10 && !isMinStr) { formatSec = '0' + sec + secUnitTxt; } else { formatSec = sec + secUnitTxt; }
    let timerText = '';
    if (isMinStr) {
        if (hr > 0) {
            timerText = formatHr + middleTxt + formatMin + middleTxt + formatSec;
        } else {
            if (min > 0) {
                timerText = formatMin + middleTxt + formatSec;
            } else {
                timerText = formatSec;
            }
        }
    } else {
        if (hr === 0) {
            timerText = formatMin + middleTxt + formatSec;
        } else {
            timerText = formatHr + middleTxt + formatMin + middleTxt + formatSec;
        }
    }
    return timerText;
}

export function getPagingData(datas, page, size) {
    if (!isArray(datas) || isUndefined(page) || isUndefined(size) || !isNumber(page) || !isNumber(size)) { return []; }
    let from = page * size;
    return datas.slice(from, from + size);
}

// START: use for function: verifyParams, getMissingParams;
function cutParam(p) { return p.substring(3, p.length); }
// END: use for function: verifyParams, getMissingParams;

export function verifyParams(data, params) {
    if (!params || !isString(params) || !data || !isObject(data)) { return false; }
    let listParams = params.split(' ');
    if (listParams.length === 0) { return false; }
    for (let i = 0; i < listParams.length; i++) {
        let param = listParams[i];  // [a]: array; [b]: boolean; [n]: number; [e]: exist;
        if (param === 'pageable') {
            if (!isHaveProp(data, param) || !isObject(data[param]) || !isNumber(data[param].page) || !isNumber(data[param].size)) { return false; }
        } else {
            if (param.indexOf('[b]') === 0) {
                if (!isHaveProp(data, cutParam(param)) || !isBoolean(data[cutParam(param)])) { return false; }
            } else if (param.indexOf('[a]') === 0) {
                if (!isHaveProp(data, cutParam(param)) || !isArray(data[cutParam(param)]) || data[cutParam(param)].length === 0) { return false; }
            } else if (param.indexOf('[n]') === 0) {
                if (!isHaveProp(data, cutParam(param)) || !isNumber(data[cutParam(param)]) || data[cutParam(param)] < 0) { return false; }
            } else if (param.indexOf('[e]') === 0) {
                if (!isHaveProp(data, cutParam(param))) { return false; }
            } else if (!isHaveProp(data, param) || isUndefined(data[param])) { return false; }
        }
    }
    return true;
}

export function getMissingParams(data, params, joinList, toArray) {
    let missingParams = [];
    if (params && isString(params) && data && isObject(data)) {
        let listParams = params.split(' ');
        if (listParams.length > 0) {
            for (let i = 0; i < listParams.length; i++) {
                let param = listParams[i]; // [a]: array; [b]: boolean; [n]: number; [e]: exist;
                if (param === 'pageable') {
                    if (!isHaveProp(data, param) || !isObject(data[param])) {
                        missingParams.push(param);
                    } else {
                        if (!isNumber(data[param].page)) { missingParams.push('page'); }
                        if (!isNumber(data[param].size)) { missingParams.push('size'); }
                    }
                } else {
                    if (param.indexOf('[b]') === 0) {
                        if (!isHaveProp(data, cutParam(param)) || !isBoolean(data[cutParam(param)])) { missingParams.push(cutParam(param)); break; }
                    } else if (param.indexOf('[a]') === 0) {
                        if (!isHaveProp(data, cutParam(param)) || !isArray(data[cutParam(param)]) || data[cutParam(param)].length === 0) { missingParams.push(cutParam(param)); break; }
                    } else if (param.indexOf('[n]') === 0) {
                        if (!isHaveProp(data, cutParam(param)) || !isNumber(data[cutParam(param)]) || data[cutParam(param)] < 0) { missingParams.push(cutParam(param)); break; }
                    } else if (param.indexOf('[e]') === 0) {
                        if (!isHaveProp(data, cutParam(param))) { missingParams.push(cutParam(param)); break; }
                    } else if (!isHaveProp(data, param) || isUndefined(data[param])) { missingParams.push(param); break; }
                }
            }
        }
    }
    if (joinList) { return missingParams.join(', '); }
    if (toArray) { return missingParams; }
    if (missingParams.length > 0) { return `Missing params! ${missingParams.join(', ')}`; }
    return 'Missing params!';
}

export function genUuid(version, options) {
    let custom_namespace;
    version = version ? version.toString() : '1';
    if (version === '3' || version === '5') {
        if (!isArray(options, true)) { return; }
        switch (options[1]) {
            case 'DNS': custom_namespace = uuidv3.DNS; break;
            case 'URL': custom_namespace = uuidv3.URL; break;
            default: custom_namespace = options[1]; break;
        }
    }
    switch (version) {
        case '1': // timestamp => '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d';
            return uuidv1();
        case '3': // namespace
            // using predefined DNS namespace (for domain names) => '9125a8dc-52ee-365b-a5aa-81b0b3681cf6';
            // using predefined URL namespace (for, well, URLs) => 'c6235813-3ba4-3801-ae84-e0a6ebb7d138';
            // using a custom namespace;
            // => Note: Custom namespaces should be a UUID string specific to your application!
            // => E.g. the one here was generated using this modules `uuid` CLI.
            // => const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
            // => 'e8b5a51d-11c8-3310-a6ab-367563f20686';
            return uuidv3(options[0], custom_namespace);
        case '4': return uuidv4(); // random => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
        case '5': return uuidv5(options[0], custom_namespace); // namespace, same input type as v3;
        default: return;
    }
}

export function cloneDeep(obj) {
    return _.cloneDeep(obj);
}

export function timerFunc(timeout, callback) {
    if (!timeout || parseFloat(timeout) <= 0) { callback(); return; }
    let timeoutTxt = timeout.toString();
    if (timeoutTxt.indexOf('s') > -1) {
        timeoutTxt = parseFloat(timeoutTxt.replace('s', '')) * 1000;
    } else if (timeoutTxt.indexOf('m') > -1) {
        timeoutTxt = parseFloat(timeoutTxt.replace('m', '')) * 60000;
    } else if (timeoutTxt.indexOf('h') > -1) {
        timeoutTxt = parseFloat(timeoutTxt.replace('h', '')) * 3600000;
    }
    if (parseInt(timeoutTxt) > 0) {
        setTimeout(() => { callback(); }, parseInt(timeoutTxt));
    } else {
        callback();
    }
}

export function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isOdd(number) {
    return number % 2;
}

export function compareJson(obj1, obj2) {
    try {
        return JSON.stringify(obj1).split('"').sort().join('') === JSON.stringify(obj2).split('"').sort().join('');
    } catch (error) {
        return obj1 === obj2;
    }
}

export function extractHostname(url) {
    if (!url) return '';
    return (url.toString().indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0]).split(':')[0].split('?')[0];
}