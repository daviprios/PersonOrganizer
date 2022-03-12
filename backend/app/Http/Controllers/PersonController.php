<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;


class PersonController extends Controller
{
  private String $table = 'persons';

  public function index(){
    $data = DB::table($this->table)->select()->get();
    return new Response(['message' => 'Dados resgatados com sucesso', 'data' => $data], 200);
  }

  public function show($id){
    if(!$id || !is_integer(intval($id))) return new Response(['message' => 'ID inválido', 'id' => $id], 400);

    $person = DB::table($this->table)->select()->where('id', '=', intval($id))->first();
    if(!$person) return new Response(['message' => 'Nenhuma pessoa encontrada com tal id', 'id' => $id], 204);
    return new Response(['message' => 'Dados resgatados com sucesso', 'data' => $person], 200);
  }

  public function create(Request $request){
    $this->validate($request, [
      'name' => 'string|required',
      'birthday' => 'integer|required',
      'phoneNumber' => 'string|required',
      'email' => 'email|required',
      'country' => 'string',
      'city' => 'string',
    ]);

    [
      'name' => $name,
      'birthday' => $birthday,
      'phoneNumber' => $phoneNumber,
      'email' => $email,
      'country' => $country,
      'city' => $city,
    ] = $request;

    $created = DB::table($this->table)->insert([
      'name' => $name,
      'birthday' => $birthday,
      'phone_number' => $phoneNumber,
      'email' => $email,
      'country' => $country,
      'city' => $city,
    ]);

    if($created) return new Response(['message' => 'Cadastro de pessoa adicionado'], 201);
    return new Response(['message' => 'Não se pode criar cadastro de pessoa'], 500);
  }

  public function update(Request $request, $id){
    if(!$id || !is_integer(intval($id))) return new Response(['message' => 'ID inválido'], 400);

    $this->validate($request, [
      'name' => 'string|required',
      'birthday' => 'integer|required',
      'phoneNumber' => 'string|required',
      'email' => 'email|required',
      'country' => 'string',
      'city' => 'string',
    ]);

    [
      'name' => $name,
      'birthday' => $birthday,
      'phoneNumber' => $phoneNumber,
      'email' => $email,
      'country' => $country,
      'city' => $city,
    ] = $request;

    $updated = DB::table($this->table)->where('id', '=', intval($id))->update([
      'name' => $name,
      'birthday' => $birthday,
      'phone_number' => $phoneNumber,
      'email' => $email,
      'country' => $country,
      'city' => $city,
    ]);

    if($updated > 0) return new Response(['message' => 'Dados atualizados com sucesso', 'amount' => $updated], 200);
    return new Response(['message' => 'Não se pode atualizar cadastro de pessoa'], 500);
  }

  public function delete($id){
    if(!$id || !is_integer(intval($id))) return new Response(['message' => 'ID inválido'], 400);

    $deleted = DB::table($this->table)->where('id', '=', intval($id))->delete();

    if($deleted > 0) return new Response(['message' => 'Dados deletados com sucesso', 'amount' => $deleted], 200);
    return new Response(['message' => 'Não se pode deletar cadastro de pessoa'], 500);
  }
}