Vue.component('employees', {

    mounted: function () {
        this.getEmployees();
    },

    data: function () {
        return {
            employees:[],
            employee : {
                'name':'',
                'email':''
            },
            selected: [],
            formErrors:{}
        }
    },

    created: function() {
        var self = this;

        this.$on('reloadTable', function() {
            self.getEmployees();
        });
    },

    methods: {
        getEmployees: function () {
            this.$http.get('/api/v1/employees')
                .then(function (response) {
                    this.employees = response.body;
                });
        },

        create: function () {
            var employee = this.employee;
            this.$http.post('/api/v1/employees', employee)
                .then(function (response) {
                    this.employee.name = '';
                    this.employee.email = '';

                    $("#employee-modal").modal('hide');
                    this.successMessage();
                    this.$emit('reloadTable');
                }, function (response){
                        this.formErrors = response.data;
                });
        },

        edit: function (employee) {
            this.employee.name = employee.name;
            this.employee.id = employee.id;
            this.employee.email = employee.email;

            $("#employee-modal").modal('show');
        },

        update: function () {
            var employee = this.employee;
            this.$http.put('/api/v1/employees/' + employee.id, employee)
                .then(function (response) {
                    this.employee.name = '';
                    this.employee.email = '';

                    $("#employee-modal").modal('hide');
                    this.successMessage();
                    this.$emit('reloadTable');
                }, function (response){
                    this.formErrors = response.data;
                });
        },

        destroy: function (employee_id) {
            this.$http.delete('/api/v1/employees/' + employee_id)
                .then(function (response) {
                    this.successMessage();
                    this.$emit('reloadTable');
                });
        },
        
        setEmployee: function (employee) {
            this.selected = employee;
        },

        showModal: function () {
            $("#employee-modal").modal('show');
        },

        successMessage: function () {
            swal({
                title: 'Success!',
                type: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        },

        deleteMessage: function (employee_id){
            var self = this;
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
                function(isConfirm){
                    if (isConfirm) {
                        self.destroy(employee_id);
                    } 
                });
        },

    }
});
