/* ************************************************************************

  Bibliograph. The open source online bibliographic data manager

  http://www.bibliograph.org

  Copyright: 
    2018 Christian Boulanger

  License: 
    MIT license
    See the LICENSE file in the project's top-level directory for details.

  Authors: 
    Christian Boulanger (@cboulanger) info@bibliograph.org

************************************************************************ */

/**
 * This mixin holds the properties and logic of the application state, which
 * is stores as properties of the application object. This should really be 
 * its own class. 
 */
qx.Mixin.define("bibliograph.MApplicationState",
{

  /**
   * Properties provided by this mixin
   */
  properties :
  {
    /**
     * The name of the current datasource
     */
    datasource :
    {
      check : "String",
      nullable : true,
      apply : "_applyDatasource",
      event : "changeDatasource"
    },

    /**
     * The model of the current datasource
     * @todo this is not part of the app state
     */
    datasourceModel :
    {
      check : "qx.core.Object",
      nullable : true,
      event : "changeDatasourceModel"
    },

    /**
     * The name of the datasource as it should appear in the UI
     * @todo remove, use datasourceModel instead
     */
    datasourceLabel :
    {
      check : "String",
      nullable : true,
      event : "changeDatasourceLabel",
      apply : "_applyDatasourceLabel"
    },   

    /**
     * The id of the currently displayed model record
     */
    modelId :
    {
      check : "Integer",
      nullable : true,
      apply : "_applyModelId",
      event : "changeModelId"
    },

    /**
     * The type of the currently displayed model record
     */
    modelType :
    {
      check : "String",
      nullable : true,
      apply : "_applyModelType",
      event : "changeModelType"
    },

    /**
     * The current folder id
     */
    folderId :
    {
      check : "Integer",
      nullable : true,
      apply : "_applyFolderId",
      event : "changeFolderId"
    },

    /**
     * The current query
     */
    query :
    {
      check : "String",
      nullable : true,
      apply : "_applyQuery",
      event : "changeQuery"
    },

    /**
     * The currently active item view
     */
    itemView :
    {
      check : "String",
      nullable : true,
      event : "changeItemView",
      apply : "_applyItemView"
    },

    /**
     * The ids of the currently selected rows
     */
    selectedIds :
    {
      check : "Array",
      nullable : false,
      event : "changeSelectedIds",
      apply : "_applySelectedIds"
    },

    /**
     * The name of the theme
     * currently not used, because only the modern theme functions
     * correctly with the current UI
     */
    theme :
    {
      check : ["Modern","Simple","Indigo" ],
      nullable : false,
      apply : "_applyTheme",
      init : "Modern"
    },

    /**
     * Target for inserting something from an external source into a
     * TextField or TextArea widget
     */
    insertTarget :
    {
      check : "qx.ui.form.AbstractField",
      nullable : true
    }
  },

  /**
   * Events provided by this mixin 
   */
  events :
  {
    /** Fired when something happens */
    "changeSituation" : "qx.event.type.Data"
  },  

  /**
   * Methods provided by this mixin
   */
  members :
  {

    /*
    ---------------------------------------------------------------------------
       APPLY METHODS: synchronize state with property etc.
    ---------------------------------------------------------------------------
    */

    /**
     * Applies the datasource property
     */
    _applyDatasource : function(value, old)
    {
      var stateMgr = this.getStateManager();

      /*
       * reset all states that have been connected
       * with the datasource if a previous datasource
       * has been loaded
       * @todo hide search box when no datasource is selected
       */
      if (old)
      {
        this.setModelId(0);
        this.setFolderId(0);
        this.setSelectedIds([]);
        this.setQuery(null);
        this.setDatasourceModel(null);
      }
      if (value)
      {
        // set the application state
        stateMgr.setState("datasource", value);

        // load datasource model from server
        this.showPopup(this.tr("Loading datasource information ..."));
        this.getRpcClient("model").send(
            "getDatasourceModelData", [value],
            function(data) {
              this.hidePopup();
              var model = qx.data.marshal.Json.createModel(data);
              this.setDatasourceModel(model);
              this.setModelType(model.getTableModelType());
            }, this);
      }
      else
      {
        stateMgr.removeState("datasource");
      }
    },

    /**
     * @todo rename to application title
     */
    _applyDatasourceLabel : function(value, old)
    {
      if (!value) {
        value = this.getConfigManager().getKey("application.title");
      }
      window.document.title = value;
      this.getWidgetById("bibliograph/datasource-name").setValue('<span style="font-size:1.2em;font-weight:bold">' + value + '</spsn>');
    },

    /**
     * Applies the folderId property
     */
    _applyFolderId : function(value, old)
    {
      var stmgr = this.getStateManager()
      stmgr.setState("modelId", 0);
      if (parseInt(value))
      {
        stmgr.setState("folderId", value);
        stmgr.setState("query", "");
        stmgr.removeState("query");
      } else
      {
        stmgr.removeState("folderId");
      }
    },

    /**
     * Applies the query property
     * @todo Searchbox widget should observe query state instead of
     * query state binding the searchbox.
     */
    _applyQuery : function(value, old)
    {
      this.getStateManager().setState("query", value);
      if (value && this.getDatasource()) {
        this.getWidgetById("bibliograph/searchbox").setValue(value);
      } else {
        this.getStateManager().removeState("query");
        this.getWidgetById("bibliograph/searchbox").setValue("");
      }
    },

    /**
     * Applies the modelType property
     */
    _applyModelType : function(value, old)
    {
      if (old) {
        this.getStateManager().setState("modelId", 0);
      }
      if (value) {
        this.getStateManager().setState("modelType", value);
      } else {
        this.getStateManager().removeState("modelType");
      }
    },

    /**
     * Applies the modelId property
     */
    _applyModelId : function(value, old) {
      if (parseInt(value)) {
        this.getStateManager().setState("modelId", value);
      } else {
        this.getStateManager().removeState("modelId");
      }
    },

    /**
     * Applies the itemView property
     */
    _applyItemView : function(value, old) {
      if (value) {
        this.getStateManager().setState("itemView", value);
      } else {
        this.getStateManager().removeState("itemView");
      }
    },

    /**
     * Applies the selectedIds property. Does nothing.
     */
    _applySelectedIds : function(value, old) {
      //
    },

    /**
     * Applies the theme property. Does nothing.
     */
    _applyTheme : function(value, old) {
      //qx.theme.manager.Meta.getInstance().setTheme(qx.theme[value]);
    }

  }
});