import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import AddLeaveInfoForm from "./AddLeaveInfoForm";

export default class AddLeaveInfoWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;

    var addLeaveInfoForm = new AddLeaveInfoForm({
      riwayatMppdId: options.riwayatMppdId,
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
      title: 'Tambah Surat Cuti',
      content: addLeaveInfoForm,
      onSave: function(){
        addLeaveInfoForm.validate();
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
