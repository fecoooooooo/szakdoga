import { InjectionToken } from '@angular/core';
import { HttpContextToken } from '@angular/common/http';

export const BASE_PATH = new InjectionToken<string>('basePath');
export const LOADER_TYPE_TOKEN = new InjectionToken<HttpContextToken<'info' | 'lock' | 'default'>>('loaderTypeToken');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
