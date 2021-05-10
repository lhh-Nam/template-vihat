/*******************************
 * @providesModule RouterUtils *
 * @created_by Kds             *
 *******************************/

import { Router } from '../routes';
import RouterMgr from '../cores/RouterMgr';

import { removeProps } from './Utils';
import { getDomainWeb } from './WebUtils';

const ScreenInstance = RouterMgr.getInstance();

function getRouterParamPath(path, { e, a, force, redirect } = {}) { // e: exclude, a: addition;
    if (!e && !a && !redirect) { return ''; }
    let paramPath = '', params = {
        ...(!force && getRouterQuery()), ...a,
        ...(redirect && { redirect: encodeBase64URI(getRouterAsPath()) }),
    };
    let keys = Object.keys(removeProps(params, e)), hadParam = path && path.indexOf('?') > -1;
    if (keys.length > 0) {
        keys.forEach((key, index) => {
            paramPath += (index == 0 ? (hadParam ? '&' : '?') : '&') + `${key}=${params[key]}`;
        });
    }
    return paramPath;
}

export function routerPush(path) { if (!path) { return; } Router.push(path); }
export function routerBack(redirect) {
    if (redirect) {
        let havePrevPage = document && document.referrer && document.referrer.indexOf(getDomainWeb()) || getRouterPage(2);
        if (havePrevPage) {
            Router.back();
        } else {
            Router.replaceRoute(redirect);
        }
    } else {
        Router.back();
    }
}
export function pushRoute(path, { params, options, paramPath, event } = {}) {
    if (!path) return;
    event && event.preventDefault();
    return new Promise((resolve) => {
        Router.pushRoute(path + getRouterParamPath(path, paramPath), params, options).then(() => resolve());
    });
}
export function replaceRoute(path, { params, options, paramPath, event } = {}) {
    if (!path) return;
    if (path === 'current') { path = window.location.pathname; }
    event && event.preventDefault();
    return new Promise((resolve) => {
        Router.replaceRoute(path + getRouterParamPath(path, paramPath), params, options).then(() => resolve());
    });
}
export function prefetchRoute(path, params, options) {
    if (!path) return;
    return new Promise((resolve) => {
        Router.prefetchRoute(path, params, options).then(() => resolve());
    });
}

export function getRouter() { return Router.router; }
export function getRouterQuery() { return Router.router.query; } // query: { sourceId: '5d19b76e4e940b0007d02b27' }
export function getRouterPathname() { return window.location.pathname; } // pathname: '/customer/list'
export function getRouterRoute() { return Router.router.route; } // route: '/customer-list'
export function getRouterAsPath() { return Router.asPath; } // asPath: '/customer/5d19b76e4e940b0007d02b27/list'

export function setCurrentRouter(page) { ScreenInstance.setCurrentRouter(page); }
export function getRouterPage(index) { return ScreenInstance.getRouterPage(index); }

export function getRouterPathId() {
    const pathParts = getRouterAsPath().split('/');
    let menuId = pathParts[1] || '';
    let pageType = (pathParts[3] ? pathParts[3].split('?')[0] : '').replace(/-/g, '_');
    let subMenuId = (pageType ? (pathParts[2] || '') : (pathParts[2] ? pathParts[2].split('?')[0] : '')).replace(/-/g, '_');
    return { menuId, subMenuId, pageType };
}

export function getRouterSubMenu(subMenus) {
    const { menuId, subMenuId, pageType } = getRouterPathId();
    const routeId = `${menuId}-${subMenuId}`;
    return subMenus.find(i => i.id === routeId || i.id === `${routeId}-list` || i.child.includes(routeId) || i.child.includes(`${routeId}-${pageType}`));
}