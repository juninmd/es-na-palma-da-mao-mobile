import { IHttpService } from 'angular';
import { Push, AndroidPushOptions, IOSPushOptions, PushNotification } from 'ionic-native';

import { ISettings } from '../settings/index';
import { PushUser } from './models/index';
import { TransitionService } from '../transition.service';

export class PushService {

    public static $inject: string[] = [
        '$http',
        'settings',
        'authenticationStorageService',
        'authenticationService',
        'transitionService'
    ];

    /**
     * Creates an instance of PushService.
     * 
     * @param {IHttpService} $http
     * @param {ISettings} settings
     * @param {AuthenticationService} authenticationService
     * @param {TransitionService} transitionService
     * 
     * @memberOf PushService
     */
    constructor( private $http: IHttpService,
        private settings: ISettings,
        private transitionService: TransitionService ) {
    }

    public init() {
        let androidPushConfig: AndroidPushOptions = {
            senderID: this.settings.push.senderId,
            forceShow: this.settings.push.forceShow,
            icon: 'notification',
            iconColor: '#549db2'
        };

        let iosPushConfig: IOSPushOptions = {
            senderID: this.settings.push.senderId,
            alert: this.settings.push.alert,
            badge: this.settings.push.badge,
            sound: this.settings.push.sound,
            gcmSandbox: this.settings.push.gcmSandbox
        };

        let push: PushNotification = Push.init( { android: androidPushConfig, ios: iosPushConfig });

        if ( push.on ) {
            push.on( 'registration', ( data ) => {
                this.registerUser( data.registrationId );
            });

            push.on( 'notification', ( data ) => {
                this.notify( data.additionalData );
            });

            push.on( 'error', ( e ) => console.log( e ) );
        }
    }

    /**
     * 
     * 
     * @param {string} token
     */
    public registerUser( token: string ) {
        let data: PushUser = {
            user: 123, // this.authenticationService.user.sub,
            type: ionic.Platform.platform(),
            token: token
        };

        this.$http.post( `${this.settings.api.push}/subscribe`, data );
    }

    /**
     * 
     * 
     * @param {*} data
     */
    public notify( data: any ): void {
        if ( data.appData && data.appData.state ) {
            this.transitionService.changeState( data.appDatta.state, data.appData.params, {}, { root: true, reload: true });
        }
    }
}
