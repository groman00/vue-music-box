@extends('layouts.default')

@section('styles')
<link rel="stylesheet" href="./css/app.css">
@stop

@section('content')    
    <div class="container">
        <div class="page-header">
          <h1>Employees</h1>
        </div>
        <div id="app">
            <!-- <employees :employees="{{ $employees }}"></employees> -->
            <employee-list></employee-list>
        </div>
    </div>
@stop

@section('scripts')
<script src="./js/app.js"></script>
@stop
        