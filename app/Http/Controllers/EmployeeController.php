<?php

namespace App\Http\Controllers;

use App\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function create(Request $request)
    {
        $this->validate($request,[
            'name' => 'required|max:255',
            'email' => 'required|email'
        ]);

        $name = $request->name;
        $email = $request->email;

        Employee::create([
            'name' => $name,
            'email' => $email
        ]);

        return response('ok', 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll()
    {
        $employees = Employee::all();

        return response()->json($employees, 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getById(Request $request)
    {
        $employee_id = $request->employee_id;
        $employee = Employee::find($employee_id);

        return response()->json($employee, 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function delete(Request $request)
    {
        $employee_id = $request->employee_id;
        Employee::destroy($employee_id);

        return response('ok', 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $employee_id = $request->employee_id;
        $name = $request->name;
        $email = $request->email;

        $employee = Employee::find($employee_id)->update([
            'name' => $name,
            'email' => $email
        ]);

        return response()->json($employee, 200);
    }

}
