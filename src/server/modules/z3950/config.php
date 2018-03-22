<?php

use app\modules\z3950\Module;
use yii\base\ModelEvent;
use yii\db\BaseActiveRecord;
use yii\web\User;
use yii\web\UserEvent;

/** @noinspection MissedFieldInspection */
return [
  'id' => 'z3950',
  'class' => Module::class,
  'events' => [
    [
      'class' => User::class,
      'event' => User::EVENT_AFTER_LOGOUT,
      'callback' => function ( UserEvent $e) {
        $user = $e->identity;
        /** @var Module $module */
        $module = \Yii::$app->getModule('z3950');
        $module->clearSearchData($user);
      }
    ],
    [
      'class' => \app\models\User::class,
      'event' => BaseActiveRecord::EVENT_AFTER_DELETE,
      'callback' => function ( \yii\base\Event $e) {
        $user = $e->sender;
        /** @var Module $module */
        $module = \Yii::$app->getModule('z3950');
        $module->clearSearchData($user);
      }
    ],
  ]
];