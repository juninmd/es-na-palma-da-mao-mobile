class DashBoardController {

    /**
     * @constructor
     *
     * @param {Object} toast - toast service
     *
     */
    constructor( toast, $state ) {
        this.toast = toast;
        this.$state = $state;
        this.activate();
    }

    /**
     * Navega para o state especificado
     *
     * @param {string} stateName - o nome do state destino
     *
     * @returns {void}
     */
    navigateTo( stateName ) {
        this.$state.go( stateName );
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        //this.toast.show( { title: 'DashBoard Controller ativado' } );
    }
}

export default [ 'toast', '$state', DashBoardController ];


