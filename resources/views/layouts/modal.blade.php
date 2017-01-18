<div class="modal fade" id="employee-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="employee-modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 v-if="employee.id" class="modal-title" id="myModalLabel">Edit Employee</h4>
                <h4 v-else class="modal-title" id="myModalLabel">New Employee</h4>
            </div>
            <div class="modal-body">

                <form enctype="multipart/form-data">

                    <div class="form-group">
                        <label for="title">Name:</label>
                        <input type="text" name="name" class="form-control" v-model="employee.name" />
                    </div>

                    <div class="form-group">
                        <label for="title">Email:</label>
                        <input type="email" name="email" class="form-control" v-model="employee.email" />
                    </div>
                    <input v-if="employee.id" type="hidden" name="id" class="form-control" v-model="employee.id" />
                    <div class="form-group">
                        <button v-if="employee.id" type="submit" @click.prevent="update()" class="btn btn-success">Update</button>
                        <button v-else= type="submit" class="btn btn-success" @click.prevent="create()">Create</button>
                    </div>

                </form>


            </div>
        </div>
    </div>
</div>
