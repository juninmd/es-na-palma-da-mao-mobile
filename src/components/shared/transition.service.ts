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
        this.changeState( stateName, {}, { type: 'fade' }, { noBack: false });
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

    public goBack() {
        this.$rootScope.$ionicGoBack();
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
        if ( this.hasSideMenu ) {
            this.$mdSidenav( this.sideMenuId ).close();
            this.executeTransition( stateName, routeParameters, options, serviceOptions );
        } else {
            this.executeTransition( stateName, routeParameters, options, serviceOptions );
        }
    }

    private executeTransition( stateName: string, routeParameters: any = {}, options: any = {}, { root = false, tabs = false, reload = false, noBack = false } = {}) {
        let allOptions: any = {};
        angular.extend( allOptions, options );

        this.$ionicHistory.nextViewOptions( { disableBack: noBack, historyRoot: root });

        if ( tabs ) {
            if ( this.$rootScope.isAndroid ) {
                allOptions.fixedPixelsTop = 93;
            } else if ( this.$rootScope.isIOS ) {
                allOptions.fixedPixelsBottom = 48;
            }
        }

        if ( angular.equals(allOptions, {}) ) {
            this.$state.go( stateName, routeParameters, { reload: reload } );
        } else {
            this.$ionicNativeTransitions.stateGo( stateName, routeParameters, { reload: reload }, allOptions );
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