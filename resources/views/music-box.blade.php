@extends('layouts.default')

@section('styles')
<link rel="stylesheet" href="./css/music-box.css">
@stop

@section('content')
    <div id="app" style="height:100%;width:100%;">
        <music-box></music-box>
    </div>
@stop

@section('scripts')
<script src="./js/music-box.js"></script>
@stop
        