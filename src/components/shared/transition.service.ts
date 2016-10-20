import { ITimeoutService, IScope } from 'angular';

export class TransitionService {

    public static $inject: string[] = [
        '$rootScope',
        '$state',
        '$timeout',
        '$ionicHistory',
        '$ionicNativeTransitions',
        '$mdSidenav'
    ];

    private sideMenuId = 'left';
    private hasSideMenu: boolean = false;

    constructor( private $rootScope: IScope,
        private $state: angular.ui.IStateService,
        private $timeout: ITimeoutService,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $ionicNativeTransitions,
        private $mdSidenav: angular.material.ISidenavService ) {

        this.$mdSidenav( this.sideMenuId, true ).then(() => {
            this.hasSideMenu = true;
        });
    }

    /**
     * 
     * 
     * @param {string} stateName
     * 
     * @memberOf TransitionService
     */
    public changeRootState( stateName: string ): void {
        this.changeState( stateName, {}, {}, { root: true, noBack: true });
    }

    /**
     * 
     * 
     * @param {string} stateName
     * 
     * @memberOf TransitionService
     */
    public changeMenuState( stateName: string ) {
        this.changeState( stateName, {}, {}, { noBack: false });
    }

    /**
     * 
     * 
     * @param {string} stateName
     * @param {string} direction
     * 
     * @memberOf TransitionService
     */
    public changeTab( stateName: string, direction: string ): void {
        let options = { type: 'slide', direction: direction };
        this.changeState( stateName, {}, options, { root: false, tabs: true });
    }

    /**
     * 
     * 
     * @memberOf TransitionService
     */
    public goBack() {
        if ( this.$ionicNativeTransitions ) {
            this.$ionicNativeTransitions.goBack();
        } else {
            this.$ionicHistory.goBack();
        }
    }

    /**
     * 
     * 
     * @param {string} stateName
     * @param {*} [routeParameters={}]
     * @param {*} [options={}]
     * @param {#} [serviceOptions={}]
     * 
     * @memberOf TransitionService
     */
    public changeState( stateName: string, routeParameters: any = {}, options: any = {}, serviceOptions: any = {}): void {
        // this.$timeout(() => {

        if ( this.hasSideMenu ) {
            this.$mdSidenav( this.sideMenuId ).close();
            this.executeTransition( stateName, routeParameters, options, serviceOptions );
        } else {
            this.executeTransition( stateName, routeParameters, options, serviceOptions );
        }

        // }, ( this.$rootScope.isAndroid === false ? 300 : 0 ) );
    }

    private executeTransition( stateName: string, routeParameters: any = {}, options: any = {}, { root = false, tabs = false, reload = false, noBack = false } = {}) {
        let defaultOptions: any = { type: 'fade' };
        angular.extend( defaultOptions, options );

        this.$ionicHistory.nextViewOptions( { disableBack: noBack, historyRoot: root });

        if ( tabs ) {
            if ( this.$rootScope.isAndroid ) {
                defaultOptions.fixedPixelsTop = 93;
            } else if ( this.$rootScope.isIOS ) {
                defaultOptions.fixedPixelsBottom = 48;
            }
        }

        if ( this.$ionicNativeTransitions ) {
            this.$ionicNativeTransitions.stateGo( stateName, routeParameters, { reload: reload }, defaultOptions );
        } else {
            if ( this.$ionicHistory.currentStateName() !== stateName ) {
                this.$state.go( stateName, routeParameters );
            }
        }
    }

    /**
     * 
     * 
     * 
     * @memberOf TransitionService
     */
    public clearCache(): Promise<void> {
        // limpa view caches do ionic
        // ref: http://stackoverflow.com/questions/29593018/ionic-there-is-a-way-to-delete-the-cache-in-controller-method
        return new Promise(( resolve ) => {
            this.$timeout(() => {
                this.$ionicHistory.clearCache();
                this.$ionicHistory.clearHistory();
                resolve();
            }, 100 );
        });
    }
}