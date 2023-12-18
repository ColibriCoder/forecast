<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forecasts', function (Blueprint $table) {
            $table->id();
			$table->string('date')->unique()->nullable();
			$table->tinyInteger('temperature')->nullable();
			$table->unsignedTinyInteger('sunshine_percentage')->nullable();
			$table->unsignedTinyInteger('cloudiness_percentage')->nullable();
			$table->unsignedTinyInteger('rainfall_percentage')->nullable();
			$table->unsignedTinyInteger('snowfall_percentage')->nullable();
			$table->unsignedTinyInteger('thunderstorms_percentage')->nullable();
			$table->unsignedInteger('icon_media_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forecasts');
    }
};
