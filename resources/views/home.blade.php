@extends('layouts.app')

@section('content')
    <employees inline-template>
        <div class="container">
            <div class="pull-right">
                <button type="button" class="btn btn-success" data-toggle="modal" @click="showModal()">
                    Create Item
                </button>
            </div>

            <table class="table table-bordered">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="employee in employees" @click="setEmployee(employee)">
                    <td>@{{ employee.name }}</td>
                    <td>@{{ employee.email }}</td>
                    <td><button class="btn btn-primary" @click="edit(employee)">Edit</button>
                        <button class="btn btn-danger" @click="deleteMessage(employee.id)">Delete</button></td>
                </tr>
            </table>

            @include('layouts.details')

            @include('layouts.modal')
        </div>
    </employees>
@endsection
