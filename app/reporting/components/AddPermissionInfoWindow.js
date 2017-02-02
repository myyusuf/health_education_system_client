import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import AddPermissionInfoForm from "./AddPermissionInfoForm";

export default class AddPermissionInfoWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;

    var addPermissionInfoForm = new AddPermissionInfoForm({
      riwayatMppdId: options.riwayatMppdId,
      bagianId: options.bagianId,
      onSaveSuccess: function(){
        _this.window.close();
        if(_this.onSaveSuccess){
          _this.onSaveSuccess();
        }
      }
    });

    this.window = new AddWindow({
      width: 390,
      height: 300,
      title: 'Tambah Surat Izin',
      content: addPermissionInfoForm,
      onSave: function(){
        addPermissionInfoForm.validate();
      },
      onCancel: function(){
        _this.window.close();
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
