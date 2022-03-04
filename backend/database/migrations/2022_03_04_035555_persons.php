<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Persons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('persons')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();

                $table->string('name');
                $table->date('birthday');
                
                $table->string('phone_number')->unique();
                $table->string('email')->unique();
                $table->string('website')->nullable();

                $table->string('address')->nullable();
                $table->string('country')->nullable();
                $table->string('city')->nullable();

                $table->enum('education_level', ['pré-fundamental', 'fundamental', 'médio', 'superior', 'pós-superior']);
                $table->string('work_at')->nullable();

                $table->timestamp('created_at')->useCurrent();
                $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
