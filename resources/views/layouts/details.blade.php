<employee-info :employee="selected" inline-template>
    <div v-show="employee.id" class="container">
        <div class="panel">
            <h2>Details</h2>
            <div>Name: <span>@{{ employee.name }}</span></div>
            <div>Email: <span>@{{ employee.email }}</span></div>
        </div>
    </div>
</employee-info>
