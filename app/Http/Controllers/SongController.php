<?php

namespace App\Http\Controllers;

use App\Song;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSongRequest;
use App\Http\Requests\UpdateSongRequest;

class SongController extends Controller
{
    public function get($id)
    {
        return Song::find($id);
    }

    public function post(CreateSongRequest $request)
    {
        $song = new Song;
        $song->fill($request->all());
        $song->save();
        return $song;
    }    

    public function patch(UpdateSongRequest $request, $id)
    {
        $song = Song::find($id);
        $song->fill($request->all());
        $song->save();
        return $song;
    }

    public function delete($id)
    {
        return Song::destroy($id);
    }    

}