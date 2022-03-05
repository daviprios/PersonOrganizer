<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Persons extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('persons')) {
            Schema::create('persons', function (Blueprint $table) {
                $table->id();

                $table->string('name');
                $table->timestamp('birthday');
                
                 $table->string('phone_number')->unique()->nullable();
                $table->string('email')->unique()->nullable();
                $table->string('country')->nullable();
                $table->string('city')->nullable();

                $table->timestamp('created_at')->useCurrent();
                $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('persons');
    }
}
