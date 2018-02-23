Vue.component('employees', {

    mounted() {
        this.getEmployees();
    },

    data() {
        return {
            employees:[],
            employee : {
                'name':'',
                'email':''
            },
            selected: [],
        }
    },

    created() {
        let self = this;

        this.$on('reloadTable', () => {
            self.getEmployees();
        });
    },

    methods: {
        getEmployees() {
            this.$http.get('/api/v1/employees')
                .then((response) => {
                    this.employees = response.body;
                });
        },

        create() {
            let employee = this.employee;
            this.$http.post('/api/v1/employees', employee)
                .then((response) => {
                    this.employee.name = '';
                    this.employee.email = '';

                    $("#employee-modal").modal('hide');
                    this.successMessage();
                    this.$emit('reloadTable');
                }, (response) => {
                        this.formErrors = response.data;
                });
        },

        edit(employee) {
            this.employee.name = employee.name;
            this.employee.id = employee.id;
            this.employee.email = employee.email;

            $("#employee-modal").modal('show');
        },

        update() {
            let employee = this.employee;
            this.$http.put('/api/v1/employees/' + employee.id, employee)
                .then((response) => {
                    this.employee.name = '';
                    this.employee.email = '';

                    $("#employee-modal").modal('hide');
                    this.successMessage();
                    this.$emit('reloadTable');
                }, (response) => {
                    this.formErrors = response.data;
                });
        },

        destroy(employee_id) {
            this.$http.delete('/api/v1/employees/' + employee_id)
                .then((response) => {
                    this.successMessage();
                    this.$emit('reloadTable');
                });
        },
        
        setEmployee(employee) {
            this.selected = employee;
        },

        showModal() {
            this.employee.name = '';
            this.employee.email= '';
            this.employee.id = '';

            $("#employee-modal").modal('show');
        },

        successMessage() {
            swal({
                title: 'Success!',
                type: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        },

        deleteMessage: function (employee_id){
            let self = this;
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover it",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                (isConfirm) => {
                    if (isConfirm) {
                        self.destroy(employee_id);
                        this.selected = [];
                    } 
                });
        },

    }
});
