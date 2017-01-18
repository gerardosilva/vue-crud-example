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
            <employee-info :employee="selected" inline-template>
                <div class="container">
                    <div v-show="employee.name">Name: <span>@{{ employee.name }}</span></div>
                    <div v-show="employee.email">Email: <span>@{{ employee.email }}</span></div>
                </div>
            </employee-info>

            @include('layouts.modal')
        </div>
    </employees>
@endsection
