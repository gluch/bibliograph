<?php

namespace app\migrations\data;

use yii\db\Schema;
use yii\db\Migration;

class m180105_075537_data_RoleDataInsert extends Migration
{


  public function safeUp()
  {
    $this->batchInsert('{{%data_Role}}',
      ["namedId", "name", "description", "active"],
      [
        [
          'namedId' => 'admin',
          'name' => 'Administrator role',
          'description' => null,
          'active' => '1',
        ],
        [
          'namedId' => 'anonymous',
          'name' => 'Anonymous user',
          'description' => null,
          'active' => '1',
        ],
        [
          'namedId' => 'manager',
          'name' => 'Manager role',
          'description' => null,
          'active' => '1',
        ],
        [
          'namedId' => 'user',
          'name' => 'Normal user',
          'description' => null,
          'active' => '1',
        ],
      ]
    );
  }

  public function safeDown()
  {
    $this->truncateTable('{{%data_Role}}');
  }
}
