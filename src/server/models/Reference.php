<?php

namespace app\models;

use lib\models\BaseModel;
use Yii;

/**
 * This is the model class for table "database1_data_Reference".
 *
 * @property integer $id
 * @property string $created
 * @property string $modified
 * @property string $citekey
 * @property string $reftype
 * @property string $abstract
 * @property string $address
 * @property string $affiliation
 * @property string $annote
 * @property string $author
 * @property string $booktitle
 * @property string $subtitle
 * @property string $contents
 * @property string $copyright
 * @property string $crossref
 * @property string $date
 * @property string $doi
 * @property string $edition
 * @property string $editor
 * @property string $howpublished
 * @property string $institution
 * @property string $isbn
 * @property string $issn
 * @property string $journal
 * @property string $key
 * @property string $keywords
 * @property string $language
 * @property string $lccn
 * @property string $location
 * @property string $month
 * @property string $note
 * @property string $number
 * @property string $organization
 * @property string $pages
 * @property string $price
 * @property string $publisher
 * @property string $school
 * @property \lib\schema\BibtexSchema $schema
 * @property string $series
 * @property string $size
 * @property string $title
 * @property string $translator
 * @property string $type
 * @property string $url
 * @property string $volume
 * @property string $year
 * @property string $createdBy
 * @property string $modifiedBy
 * @property string $hash
 * @property integer $markedDeleted
 * @property integer $attachments
 */
class Reference extends BaseModel
{
  /**
   * @inheritdoc
   */
  public static function tableName()
  {
    return '{{%data_Reference}}';
  }

  /**
   * @inheritdoc
   */
  public function rules()
  {
    return [
      [['created', 'modified'], 'safe'],
      [['abstract', 'annote', 'contents', 'note'], 'string'],
      [['markedDeleted', 'attachments'], 'integer'],
      [['citekey', 'affiliation', 'crossref', 'date', 'doi', 'edition', 'month', 'size', 'type', 'volume', 'createdBy', 'modifiedBy'], 'string', 'max' => 50],
      [['reftype', 'issn', 'key', 'language', 'year'], 'string', 'max' => 20],
      [['address', 'author', 'booktitle', 'subtitle', 'editor', 'howpublished', 'institution', 'keywords', 'lccn', 'title', 'url'], 'string', 'max' => 255],
      [['copyright', 'journal', 'location', 'organization', 'publisher', 'school'], 'string', 'max' => 150],
      [['isbn', 'number', 'pages', 'price'], 'string', 'max' => 30],
      [['series'], 'string', 'max' => 200],
      [['translator'], 'string', 'max' => 100],
      [['hash'], 'string', 'max' => 40],
    ];
  }

  /**
   * @inheritdoc
   */
  public function attributeLabels()
  {
    return [
      'id' => Yii::t('app', 'ID'),
      'created' => Yii::t('app', 'Created'),
      'modified' => Yii::t('app', 'Modified'),
      'citekey' => Yii::t('app', 'Citekey'),
      'reftype' => Yii::t('app', 'Reftype'),
      'abstract' => Yii::t('app', 'Abstract'),
      'address' => Yii::t('app', 'Address'),
      'affiliation' => Yii::t('app', 'Affiliation'),
      'annote' => Yii::t('app', 'Annote'),
      'author' => Yii::t('app', 'Author'),
      'booktitle' => Yii::t('app', 'Booktitle'),
      'subtitle' => Yii::t('app', 'Subtitle'),
      'contents' => Yii::t('app', 'Contents'),
      'copyright' => Yii::t('app', 'Copyright'),
      'crossref' => Yii::t('app', 'Crossref'),
      'date' => Yii::t('app', 'Date'),
      'doi' => Yii::t('app', 'Doi'),
      'edition' => Yii::t('app', 'Edition'),
      'editor' => Yii::t('app', 'Editor'),
      'howpublished' => Yii::t('app', 'Howpublished'),
      'institution' => Yii::t('app', 'Institution'),
      'isbn' => Yii::t('app', 'Isbn'),
      'issn' => Yii::t('app', 'Issn'),
      'journal' => Yii::t('app', 'Journal'),
      'key' => Yii::t('app', 'Key'),
      'keywords' => Yii::t('app', 'Keywords'),
      'language' => Yii::t('app', 'Language'),
      'lccn' => Yii::t('app', 'Lccn'),
      'location' => Yii::t('app', 'Location'),
      'month' => Yii::t('app', 'Month'),
      'note' => Yii::t('app', 'Note'),
      'number' => Yii::t('app', 'Number'),
      'organization' => Yii::t('app', 'Organization'),
      'pages' => Yii::t('app', 'Pages'),
      'price' => Yii::t('app', 'Price'),
      'publisher' => Yii::t('app', 'Publisher'),
      'school' => Yii::t('app', 'School'),
      'series' => Yii::t('app', 'Series'),
      'size' => Yii::t('app', 'Size'),
      'title' => Yii::t('app', 'Title'),
      'translator' => Yii::t('app', 'Translator'),
      'type' => Yii::t('app', 'Type'),
      'url' => Yii::t('app', 'Url'),
      'volume' => Yii::t('app', 'Volume'),
      'year' => Yii::t('app', 'Year'),
      'createdBy' => Yii::t('app', 'Created By'),
      'modifiedBy' => Yii::t('app', 'Modified By'),
      'hash' => Yii::t('app', 'Hash'),
      'markedDeleted' => Yii::t('app', 'Marked Deleted'),
      'attachments' => Yii::t('app', 'Attachments'),
    ];
  }

  /**
   * Indexes
   * @todo use this
   */
  protected $indexes = [
    "fulltext" => [
      "type" => "fulltext",
      "properties" => [
        'abstract', 'annote', 'author', 'booktitle', 'subtitle', 'contents',
        'editor', 'howpublished', 'journal', 'keywords', 'note', 'publisher',
        'school', 'title', 'year'
      ]
    ],
    "basic" => [
      "type" => "fulltext",
      "properties" => ["author", "title", "year", "editor"]
    ]
  ];

  //-------------------------------------------------------------
  // Relations
  //-------------------------------------------------------------

  /**
   * @return \yii\db\ActiveQuery
   */
  public function getReferenceFolders()
  {
    Folder_Reference::setDatasource(static::getDatasource());
    return $this->hasMany(Folder_Reference::class, ['ReferenceId' => 'id']);
  }

  /**
   * @return \yii\db\ActiveQuery
   */
  public function getFolders()
  {
    Folder::setDatasource(static::getDatasource());
    return $this->hasMany(Folder::class, ['id' => 'FolderId'])->via('referenceFolders');
  }


  //-------------------------------------------------------------
  // API
  //-------------------------------------------------------------

  /**
   * Returns the schema object used by this model
   * @return \app\schema\BibtexSchema
   */
  public static function getSchema()
  {
    static $schema = null;
    if (is_null($schema)) {
      $schema = new \app\schema\BibtexSchema();
    }
    return $schema;
  }

  /**
   * Overridden to set "modifiedBy"/"createdBy" columns
   */
  function beforeSave($insert)
  {
    if (!parent::beforeSave($insert)) {
      return false;
    }
    try {
      /** @var User $activeUser */
      $activeUser = Yii::$app->user->getIdentity();
      if ($insert and $this->hasAttribute("createdBy")) {
        $this->createdBy = $activeUser->getUsername();
      } elseif( $this->hasAttribute("modifiedBy")) {
        $this->modifiedBy = $activeUser->getUsername();
      }
    } catch (\Throwable $e) {
      Yii::warning("Error getting active user:" . $e->getMessage());
    }
    return true;
  }

  /**
   * Returns author or editor depending on reference type
   * @return string
   */
  function getCreator()
  {
    $author = $this->author;
    return empty($author) ? $this->editor : $author;
  }

  /**
   * Computes the citation key from the record data.
   * The format is Author-Year-TitleWord or Author1+Author2+Author3-Year-Titleword
   * @return string
   */
  function computeCiteKey()
  {
    $creators = explode(trim(BIBLIOGRAPH_VALUE_SEPARATOR), $this->getCreator());
    $lastNames = array();
    foreach ($creators as $name) {
      $parts = explode(",", $name);
      $lastName= substr( trim($parts[0]),0, 20);
      $lastNames[] = str_replace(" ", "-", $lastName);
    }
    $citekey = implode("+", $lastNames);

    $citekey .= "-" . $this->year;

    $titlewords = explode(" ", $this->title);
    while (count($titlewords) and strlen($titlewords[0]) < 4) {
      array_shift($titlewords);
    }
    if (count($titlewords)) {
      $citekey .= "-" . $titlewords[0];
    }
    $citekey= preg_replace("/[^[:alnum:][:space:]\-\+]/u", '', $citekey);
    $citekey= str_replace(" ","_",$citekey);
    return $citekey;
  }

  /**
   * Selects potential duplicates
   * @param $threshold The threshold score to count as a duplicate
   * @return array
   *    Returns an array of match scores in the order of the found records
   * @todo this works only with MySQL, must be abstracted to support other backends
   */
  function findPotentialDuplicates_todo($threshold = 50)
  {
    $author = $this->author;
    $title = $this->title;
    $year = $this->year();

    $match = $adapter->fullTextSql(
      $queryBehavior->getTableName(),
      "basic", "$author $title $year", "fuzzy"
    );
    $table = $queryBehavior->getTableName();
    $id = $this->id();
    $sql = "
      SELECT id,
        $match AS score,
        ($match / maxScore)*100 AS normalisedScore
      FROM $table,
        (SELECT MAX($match) AS maxScore FROM $table) AS maxScoreTable
      WHERE
        $match
      HAVING normalisedScore > $threshold AND id != $id
      ORDER BY score DESC
    ";
    $rows = $adapter->fetchAll($sql);

    $ids = array();
    $scores = array();
    foreach ($rows as $row) {
      $ids[] = $row['id'];
      $scores[] = $row['normalisedScore'];
    }
    if (count($ids)) {
      $this->lastQuery = $queryBehavior->selectIds($ids);
    }
    return $scores;
  }
}
