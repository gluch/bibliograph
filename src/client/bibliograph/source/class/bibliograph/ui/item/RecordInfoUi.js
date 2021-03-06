/*******************************************************************************
 *
 * Bibliograph: Online Collaborative Reference Management
 *
 * Copyright: 2007-2015 Christian Boulanger
 *
 * License: LGPL: http://www.gnu.org/licenses/lgpl.html EPL:
 * http://www.eclipse.org/org/documents/epl-v10.php See the LICENSE file in the
 * project's top-level directory for details.
 *
 * Authors: Christian Boulanger (cboulanger)
 *
 ******************************************************************************/

/*global qx qcl bibliograph*/

/**
 * The Record info view
 * @asset(bibliograph/icon/button-reload.png)
 */
qx.Class.define("bibliograph.ui.item.RecordInfoUi",
{
  extend : bibliograph.ui.item.RecordInfo,
  construct : function()
  {
    this.base(arguments);
    this.__qxtCreateUI();
  },
  members : {
    __qxtCreateUI : function()
    {
      var qxVbox1 = new qx.ui.layout.VBox(null, null, null);
      var qxComposite1 = this;
      this.setLayout(qxVbox1)
      var qxHbox1 = new qx.ui.layout.HBox(5, null, null);
      var qxComposite2 = new qx.ui.container.Composite();
      qxComposite2.setLayout(qxHbox1)
      qxComposite2.setPadding(5);
      qxComposite1.add(qxComposite2, {
        flex : 1
      });
      qxHbox1.setSpacing(5);
      var qxGroupBox1 = new qx.ui.groupbox.GroupBox(this.tr('Record Info'), null);
      qxGroupBox1.setMinWidth(250);
      qxGroupBox1.setLegend(this.tr('Record Info'));
      qxComposite2.add(qxGroupBox1, {
        flex : 2
      });
      var qxVbox2 = new qx.ui.layout.VBox(null, null, null);
      qxGroupBox1.setLayout(qxVbox2);
      var recordInfoHtml = new qx.ui.embed.Html(null);
      this.recordInfoHtml = recordInfoHtml;
      recordInfoHtml.setOverflowY("auto");
      qxGroupBox1.add(recordInfoHtml, {
        flex : 1
      });
      this.getApplication().addListener("changeModelId", this.reloadData, this);
      recordInfoHtml.addListener("appear", this._on_appear, this);
      var qxGroupBox2 = new qx.ui.groupbox.GroupBox(this.tr('Folders'), null);
      qxGroupBox2.setLegend(this.tr('Folders'));
      qxComposite2.add(qxGroupBox2, {
        flex : 3
      });
      var qxVbox3 = new qx.ui.layout.VBox(5, null, null);
      qxVbox3.setSpacing(5);
      qxGroupBox2.setLayout(qxVbox3);
      var qxHbox2 = new qx.ui.layout.HBox(5, null, null);
      var qxComposite3 = new qx.ui.container.Composite();
      qxComposite3.setLayout(qxHbox2)
      qxGroupBox2.add(qxComposite3);
      qxHbox2.setSpacing(5);
      var qxLabel1 = new qx.ui.basic.Label(this.tr('Folders containing the current record'));
      qxLabel1.setValue(this.tr('Folders containing the current record'));
      qxComposite3.add(qxLabel1);
      var containingFoldersTable = new qx.ui.table.Table(null, {
        tableColumnModel : function(obj) {
          return new qx.ui.table.columnmodel.Resize(obj);
        }
      });
      this.containingFoldersTable = containingFoldersTable;
      containingFoldersTable.setShowCellFocusIndicator(false);
      containingFoldersTable.setStatusBarVisible(false);
      containingFoldersTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
      containingFoldersTable.setKeepFirstVisibleRowComplete(true);
      qxGroupBox2.add(containingFoldersTable, {
        flex : 1
      });

      // ------
      var qxTableModel1 = new qx.ui.table.model.Simple();
      qxTableModel1.setColumns(["FID", " ", "Folder"], ["folderId", "icon", "path"]);

      // -------
      containingFoldersTable.setTableModel(qxTableModel1);
      containingFoldersTable.getTableColumnModel().setColumnVisible(0, false);
      containingFoldersTable.getTableColumnModel().setColumnWidth(1, 30);
      containingFoldersTable.getTableColumnModel().getBehavior().setWidth(1, 30);
      containingFoldersTable.getTableColumnModel().setDataCellRenderer(1, new qx.ui.table.cellrenderer.Image);
      var qxHbox3 = new qx.ui.layout.HBox(5, null, null);
      var qxComposite4 = new qx.ui.container.Composite();
      qxComposite4.setLayout(qxHbox3)
      qxGroupBox2.add(qxComposite4);
      qxHbox3.setSpacing(5);
      var qxButton1 = new qx.ui.form.Button(null, "bibliograph/icon/button-reload.png", null);
      qxButton1.setIcon("bibliograph/icon/button-reload.png");
      qxComposite4.add(qxButton1);
      qxButton1.addListener("execute", function(e) {
        this.reloadFolderData()
      }, this);
      var qxButton2 = new qx.ui.form.Button(this.tr('Open folder'), null, null);
      qxButton2.setLabel(this.tr('Open folder'));
      qxComposite4.add(qxButton2);
      qxButton2.addListener("execute", this.openFolder, this);
      var qxButton3 = new qx.ui.form.Button(this.tr('Remove from folder'), null, null);
      qxButton3.setEnabled(false);
      qxButton3.setLabel(this.tr('Remove from folder'));
      qxComposite4.add(qxButton3);
      qx.core.Init.getApplication().getAccessManager().getPermissionManager().create("reference.remove").bind("state", qxButton3, "enabled", {

      });
      qxButton3.addListener("execute", this.removeFromFolder, this);
    }
  }
});
