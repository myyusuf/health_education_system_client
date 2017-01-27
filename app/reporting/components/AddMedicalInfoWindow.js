import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import AddMedicalInfoForm from "./AddMedicalInfoForm";

export default class AddMedicalInfoWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.onSaveSuccess = options.onSaveSuccess;

    var addMedicalInfoForm = new AddMedicalInfoForm({
      riwayatMppdId: options.riwayatMppdId
    });

    this.window = new AddWindow({
      width: 390,
      height: 300,
      title: 'Tambah Surat Sakit',
      content: addMedicalInfoForm,
      onSave: function(){
        addMedicalInfoForm.validate();
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
