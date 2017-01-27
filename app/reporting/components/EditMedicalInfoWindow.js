import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import EditMedicalInfoForm from "./EditMedicalInfoForm";

export default class EditMedicalInfoWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;

    var editMedicalInfoForm = new EditMedicalInfoForm({
      medicalInfo: options.medicalInfo,
      onSaveSuccess: function(){
        _this.window.close();
        if(_this.onSaveSuccess){
          _this.onSaveSuccess();
        }
      }
    });

    this.window = new AddWindow({
      width: 390,
      height: 430,
      title: 'Edit Surat Sakit',
      content: editMedicalInfoForm,
      onSave: function(){
        editMedicalInfoForm.validate();
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
