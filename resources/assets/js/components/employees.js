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
            errors: [],
            loading: false
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
            if(this.checkForm()) {
                this.loading = true;
                let employee = this.employee;

                this.$http.post('/api/v1/employees', employee)
                    .then((response) => {
                        this.employee.name = '';
                        this.employee.email = '';

                        $("#employee-modal").modal('hide');
                        this.successMessage();
                        this.$emit('reloadTable');
                        this.loading = false;
                    }, (response) => {
                        this.employee.name = '';
                        this.employee.email = '';
                        this.loading = false;
                        $("#employee-modal").modal('hide');
                        this.errorMessage();
                    });
            }
        },

        edit(employee) {
            this.employee.name = employee.name;
            this.employee.id = employee.id;
            this.employee.email = employee.email;

            $("#employee-modal").modal('show');
        },

        update() {
            if(this.checkForm()) {
                this.loading = true;
                let employee = this.employee;

                this.$http.put('/api/v1/employees/' + employee.id, employee)
                    .then((response) => {
                        this.employee.name = '';
                        this.employee.email = '';

                        $("#employee-modal").modal('hide');
                        this.successMessage();
                        this.$emit('reloadTable');
                    }, (response) => {
                        this.employee.name = '';
                        this.employee.email = '';
                        this.loading = false;

                        $("#employee-modal").modal('hide');
                        this.errorMessage();
                    });
            }
        },

        destroy(employee_id) {
            this.$http.delete('/api/v1/employees/' + employee_id)
                .then((response) => {
                    this.successMessage();
                    this.$emit('reloadTable');
                }, (response) => {
                    this.errorMessage();
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
        errorMessage() {
            swal({
                title: 'Something went wrong!',
                type: 'error',
                showConfirmButton: false,
                timer: 2000
            });
        },

        deleteMessage(employee_id){
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

        checkForm() {
            this.errors = [];
            if(!this.employee.name) this.errors.push("Name required.");
            if(!this.employee.email) {
                this.errors.push("Email required.");
            } else if(!this.validEmail(this.employee.email)) {
                this.errors.push("Valid email required.");
            }
            if(!this.errors.length) return true;
        },

        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

    }
});
