import { IScope, IPromise, ILogService } from 'angular';
import { SepApiService, Process, ProcessUpdate } from './shared/index';
import { ToastService, ToastOptions } from '../shared/toast/index';

export class SepConsultaController {

    public static $inject: string[] = [
        '$scope',
        '$ionicScrollDelegate',
        'toast',
        'sepApiService'
    ];

    private processNumber: string;
    private lastProcessNumber: string;
    private process: Process | undefined;
    private searched: boolean;
    private showAllUpdates: boolean;


    /**
     * Creates an instance of SepConsultaController.
     * 
     * @param {IScope} $scope
     * @param {ionic.scroll.IonicScrollDelegate} $ionicScrollDelegate
     * @param {ToastService} toast
     * @param {SepApiService} sepApiService
     */
    constructor( private $scope: IScope,
                 private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
                 private toast: ToastService,
                 private sepApiService: SepApiService ) {
        this.$scope.$on( '$ionicView.beforeEnter', () => this.activate() );
    }

    /**
     *
     */
    public activate(): void {
        this.processNumber = '';
        this.lastProcessNumber = '';
        this.process = undefined;
        this.searched = false;
        this.showAllUpdates = false;
    }


    /**
     * Obtém a última atualização do processo
     * 
     * @readonly
     * @type {ProcessUpdate}
     */
    public get lastUpdate(): ProcessUpdate {
        return this.process!.updates[ 0 ];
    }


    /**
     * Indica se existe algum processo carregado
     * 
     * @readonly
     * @type {boolean}
     */
    public get hasProcess(): boolean {
        return angular.isDefined( this.process );
    }

    /**
     * Alterna a visibilidade das atualizações do processo eletrônico
     */
    public toggleUpdates(): void {
        this.showAllUpdates = !this.showAllUpdates;
        this.$ionicScrollDelegate.scrollTo( 0, 300, true ); // TODO: try to search the element to scroll: anchorScroll
    }

    /**
     * Obtém um processo eletrônico pelo número do processo.
     * @param {Number} number: Process number
     * @return {undefined}
     */
    public getProcess( procNumber: string ): void {

        if ( !procNumber ) {
             this.toast.info( { title: 'N° do processo é obrigatório', } as ToastOptions ); return;
        }

        this.sepApiService.getProcessByNumber( procNumber )
                          .then( process => {
                              this.process = process;
                              return process;
                          } )
                          .catch( error => {
                              this.process = undefined;
                          } )
                          .finally( () => {
                              this.searched = true;

                              if ( this.process ) {
                                  this.lastProcessNumber = '';
                              } else {
                                  this.lastProcessNumber = procNumber;
                              }
                          } );
    }
}
