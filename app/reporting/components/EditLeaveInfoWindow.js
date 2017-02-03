import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import EditWindow from '../../base/components/EditWindow';
import EditLeaveInfoForm from "./EditLeaveInfoForm";

export default class EditLeaveInfoWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;
    this.leaveInfo = options.leaveInfo;

    var editLeaveInfoForm = new EditLeaveInfoForm({
      leaveInfo: this.leaveInfo,
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
      title: 'Edit Surat Cuti',
      content: editLeaveInfoForm,
      onSave: function(){
        editLeaveInfoForm.validate();
      },
      onCancel: function(){
        _this.window.close();
      },
      onDelete: function(){
        var r = confirm("Proses hapus data akan dilakukan!");
        if (r == true) {
          $.ajax({
                method: "DELETE",
                url: "/leaveinfo/" + _this.leaveInfo.id,
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
