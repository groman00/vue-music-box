<?php

namespace App\Http\Controllers;

use App\Employee;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;

class EmployeeController extends Controller
{
    public function get($id)
    {
        return Employee::find($id);
    }

    public function post(CreateEmployeeRequest $request)
    {

        $employee = new Employee;
        $employee->fill($request->all());
        $employee->save();
        return $employee;
    }    

    public function patch(UpdateEmployeeRequest $request, $id)
    {
        $employee = Employee::find($id);
        $employee->fill($request->all());
        $employee->save();
        return $employee;
    }

    public function delete($id)
    {
        return Employee::destroy($id);
    }    

}