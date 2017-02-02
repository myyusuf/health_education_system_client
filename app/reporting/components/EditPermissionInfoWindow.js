import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import EditWindow from '../../base/components/EditWindow';
import EditPermissionInfoForm from "./EditPermissionInfoForm";

export default class EditPermissionInfoWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;
    this.permissionInfo = options.permissionInfo;

    var editPermissionInfoForm = new EditPermissionInfoForm({
      permissionInfo: this.permissionInfo,
      onSaveSuccess: function(){
        _this.window.close();
        if(_this.onSaveSuccess){
          _this.onSaveSuccess();
        }
      }
    });

    this.window = new EditWindow({
      width: 390,
      height: 430,
      title: 'Edit Surat Sakit',
      content: editPermissionInfoForm,
      onSave: function(){
        editPermissionInfoForm.validate();
      },
      onCancel: function(){
        _this.window.close();
      },
      onDelete: function(){
        var r = confirm("Proses hapus data akan dilakukan!");
        if (r == true) {
          $.ajax({
                method: "DELETE",
                url: "/permissioninfo/" + _this.permissionInfo.id,
                data: { }
              }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
              }).fail(function() {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
              });
        }
      }
    });

  }

  render(container) {

    var _this = this;
    this.window.render(container);

  }

  open(){
    this.window.open();
  }
}
