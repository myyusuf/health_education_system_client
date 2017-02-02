import { guid } from '../../base/Utils';
import Tabs from "../../base/components/Tabs";
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import StudentForm from './StudentForm';
export default class EditRiwayatMPPDWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var riwayatMppd = options.data;
    this.onSaveSuccess = options.onSaveSuccess;
    this.onCancel = options.onCancel;

    var studentForm = new StudentForm({riwayatMppd: riwayatMppd});

    var title = '<b>Riwayat MPPD : ' + riwayatMppd.nama +
    ' [ ' + riwayatMppd.stambuk_lama + ' - ' + riwayatMppd.stambuk_baru + ' ]</b>';

    this.window = new AddWindow({
      width: 550,
      height: 700,
      title: title,
      content: studentForm,
      onSave: function(){
        studentForm.validate();
      },
      onCancel: function(){
        _this.window.close();
        if(_this.onCancel){
          _this.onCancel();
        }
      },
      cancelButtonTitle: 'Close'
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
