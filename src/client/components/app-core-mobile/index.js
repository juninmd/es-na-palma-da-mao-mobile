// 3th party
import 'jquery';
import 'ionic'; // carrega angular e ui-router junto
import 'angular-material';

// shared (mobile and web)
import '../app-core-shared/app.shared.css!';
import themeConfig from '../app-core-shared/app.theme.config.js';
import toastComponent from '../app-core-shared/toast/index.js';
import dialogComponent from '../app-core-shared/dialog/index.js';
import appConfig from '../app-core-shared/app.config.js';
import validadores from '../app-core-shared/validators/index.js';

// mobile
import 'ionic-native-transitions';
import ionicConfig from './app.ionic.config.js';
import routesConfig from './app.routes.js';
import appRun from './app.run.js';
import MenuController from './menu.controller.js';
import storageState from '../app-states/storage/index.js';
import principalState from '../app-states/principal/index.js';
import loginState from '../app-states/login/index.js';
//import nativeTransition from './directive/nativeTransition.js';

import mobileProviders from '../providers/mobileProviders.js';
import httpInterceptor from './http-interceptor.js';
import 'ngstorage';

let dependencies = [
    'ionic',
    'ngMaterial',
    'ngStorage',
    'ionic-native-transitions',
    //nativeTransition.name,
    appConfig.name,
    validadores.name,
    mobileProviders.name,
    toastComponent.name,
    dialogComponent.name,
    principalState.name,
    storageState.name,
    loginState.name
];

let app = angular.module( 'app', dependencies )
                 .config( ionicConfig )
                 .config( themeConfig )
                 .config( routesConfig )
                 .config( httpInterceptor )
                 .controller( 'menuController', MenuController )
                 .run( appRun );

// bootstrap app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ app.name ], {
        strictDi: true
    } );
} );







