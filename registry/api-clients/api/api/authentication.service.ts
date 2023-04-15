﻿/**
 * Registry-Backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpContextToken,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { JWTTokenResponse } from '../model/jWTTokenResponse';
// @ts-ignore
import { LoginData } from '../model/loginData';

// @ts-ignore
import { BASE_PATH, LOADER_TYPE_TOKEN, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    protected basePath = 'https://localhost:44301';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public loaderTypeToken: HttpContextToken<'info' | 'lock' | 'default'> | undefined;
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional()@Inject(LOADER_TYPE_TOKEN) loaderTypeToken: HttpContextToken<'info' | 'lock' | 'default'>, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if(loaderTypeToken) {
            this.loaderTypeToken = loaderTypeToken;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if(value == null) {
            return httpParams;
        }

        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param loaderType modify the httpContext->loaderTypeToken value
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAuthenticationIsLoggedInGet(loaderType?: 'info' | 'lock' | 'default', observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<string>;
    public apiAuthenticationIsLoggedInGet(loaderType?: 'info' | 'lock' | 'default', observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<HttpResponse<string>>;
    public apiAuthenticationIsLoggedInGet(loaderType?: 'info' | 'lock' | 'default', observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<HttpEvent<string>>;
    public apiAuthenticationIsLoggedInGet(loaderType?: 'info' | 'lock' | 'default', observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<any> {
        let lvHeaders = this.defaultHeaders;
        let lvHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (lvHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            lvHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (lvHttpHeaderAcceptSelected !== undefined) {
            lvHeaders = lvHeaders.set('Accept', lvHttpHeaderAcceptSelected);
        }
        let lvHttpContext: HttpContext | undefined;
        lvHttpContext = options && options.context;
        if (lvHttpContext === undefined) {
            lvHttpContext = new HttpContext();
        }
        if(this.loaderTypeToken) {
            lvHttpContext.set(this.loaderTypeToken, loaderType === undefined || loaderType === null ? 'default' : loaderType);
        }
        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (lvHttpHeaderAcceptSelected) {
            if (lvHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(lvHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }
        let lvPath = `/api/Authentication/IsLoggedIn`;
        return this.httpClient.request<string>('get', `${this.configuration.basePath}${lvPath}`,
            {
                context: lvHttpContext,
                responseType: <any>responseType_,
                headers: lvHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param loginData 
     * @param loaderType modify the httpContext->loaderTypeToken value
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAuthenticationLoginPost(loginData?: LoginData, loaderType?: 'info' | 'lock' | 'default', observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<JWTTokenResponse>;
    public apiAuthenticationLoginPost(loginData?: LoginData, loaderType?: 'info' | 'lock' | 'default', observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<HttpResponse<JWTTokenResponse>>;
    public apiAuthenticationLoginPost(loginData?: LoginData, loaderType?: 'info' | 'lock' | 'default', observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<HttpEvent<JWTTokenResponse>>;
    public apiAuthenticationLoginPost(loginData?: LoginData, loaderType?: 'info' | 'lock' | 'default', observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<any> {
        let lvHeaders = this.defaultHeaders;
        let lvHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (lvHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            lvHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (lvHttpHeaderAcceptSelected !== undefined) {
            lvHeaders = lvHeaders.set('Accept', lvHttpHeaderAcceptSelected);
        }
        let lvHttpContext: HttpContext | undefined;
        lvHttpContext = options && options.context;
        if (lvHttpContext === undefined) {
            lvHttpContext = new HttpContext();
        }
        if(this.loaderTypeToken) {
            lvHttpContext.set(this.loaderTypeToken, loaderType === undefined || loaderType === null ? 'default' : loaderType);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            lvHeaders = lvHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (lvHttpHeaderAcceptSelected) {
            if (lvHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(lvHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }
        let lvPath = `/api/Authentication/Login`;
        return this.httpClient.request<JWTTokenResponse>('post', `${this.configuration.basePath}${lvPath}`,
            {
                context: lvHttpContext,
                body: loginData,
                responseType: <any>responseType_,
                headers: lvHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param loaderType modify the httpContext->loaderTypeToken value
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAuthenticationLogoutPost(loaderType?: 'info' | 'lock' | 'default', observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<string>;
    public apiAuthenticationLogoutPost(loaderType?: 'info' | 'lock' | 'default', observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<HttpResponse<string>>;
    public apiAuthenticationLogoutPost(loaderType?: 'info' | 'lock' | 'default', observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<HttpEvent<string>>;
    public apiAuthenticationLogoutPost(loaderType?: 'info' | 'lock' | 'default', observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json', context?: HttpContext}): Observable<any> {
        let lvHeaders = this.defaultHeaders;
        let lvHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (lvHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            lvHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (lvHttpHeaderAcceptSelected !== undefined) {
            lvHeaders = lvHeaders.set('Accept', lvHttpHeaderAcceptSelected);
        }
        let lvHttpContext: HttpContext | undefined;
        lvHttpContext = options && options.context;
        if (lvHttpContext === undefined) {
            lvHttpContext = new HttpContext();
        }
        if(this.loaderTypeToken) {
            lvHttpContext.set(this.loaderTypeToken, loaderType === undefined || loaderType === null ? 'default' : loaderType);
        }
        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (lvHttpHeaderAcceptSelected) {
            if (lvHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(lvHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }
        let lvPath = `/api/Authentication/Logout`;
        return this.httpClient.request<string>('post', `${this.configuration.basePath}${lvPath}`,
            {
                context: lvHttpContext,
                responseType: <any>responseType_,
                headers: lvHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
